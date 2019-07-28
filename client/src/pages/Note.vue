<template>
  <div>
    <h3>{{$t('notes')}}</h3>
    <br />
    <Card :bordered="false">
      <p slot="title">{{$t('noteTitle')}}</p>

      <Form :label-width="180">
        <FormItem :label="$t('mainCategoryName')">
          <Select
            v-model="formData.MAINGROUPID"
            :not-found-text="$t('noData')"
            :placeholder="$t('mainCategoryNamePlaceholder')"
          >
            <Option
              v-for="item in options.mainList"
              :value="item.value"
              :key="item.value"
            >{{ item.text }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('subCategoryName')">
          <Select
            v-model="formData.SECONDGROUPID"
            :not-found-text="$t('noData')"
            :placeholder="$t('subCategoryNamePlaceholder')"
          >
            <Option
              v-for="item in options.secondList"
              :value="item.value"
              :key="item.value"
            >{{ item.text }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('noteTitleField')">
          <Input v-model="formData.TITLE" :placeholder="$t('noteTitleFieldPlaceholder')" />
        </FormItem>
        <FormItem :label="$t('noteField')">
          <vue-editor v-model="formData.NOTE"></vue-editor>
        </FormItem>
        <FormItem v-if="isPrivateNote">
          <Checkbox
            :disabled="formData.DEPARTMENTPRIVATENOTE"
            v-model="formData.PRIVATENOTE"
          >{{$t('privateNote')}}</Checkbox>
        </FormItem>
        <FormItem v-if="isPrivateDepartmentNote">
          <Checkbox
            :disabled="formData.PRIVATENOTE"
            v-model="formData.DEPARTMENTPRIVATENOTE"
          >{{$t('departmentPrivateNote')}}</Checkbox>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="save()">{{$t('save')}}</Button>
          <Button style="margin-left: 8px" @click="resetForm()">{{$t('reset')}}</Button>
        </FormItem>
      </Form>
    </Card>

    <br />

    <Table
      :columns="table.cols"
      :data="table.data"
      :loading="table.loading"
      :no-data-text="$t('noData')"
    >
      <template slot-scope="{ row }" slot="date">
        <strong>{{ toReadeableDate(row.CREATETIME) }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="editRow(index,row)"
        >{{$t('edit')}}</Button>
        <Button type="error" size="small" @click="removeRow(index,row)">{{$t('delete')}}</Button>
      </template>
    </Table>

    <Modal
      v-model="modal.removeRow"
      :title="$t('confirm')"
      :ok-text="$t('yes')"
      :cancel-text="$t('cancel')"
      @on-ok="removeApprove"
      @on-cancel="removeCancel"
    >
      <p>{{$t('deleteQuestion')}}</p>
    </Modal>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

import api from "../api";
import moment from "moment";
export default {
  components: {
    VueEditor
  },
  computed: {
    isPrivateNote() {
      return this.$store.state.user.userData.SHOWPRIVATENOTES;
    },
    isPrivateDepartmentNote() {
      return this.$store.state.user.userData.SHOWPRIVATEDEPARTMENTS;
    },
    userId() {
      return this.$store.state.user.userData.ID;
    }
  },
  mounted() {
    this.loadData();
    this.getMain();
  },
  data() {
    return {
      table: {
        loading: false,
        cols: [
          {
            title: this.$t("noteTitleField"),
            key: "TITLE"
          },
          {
            title: this.$t("mainCategoryName"),
            key: "MAINGROUPNAME"
          },
          {
            title: this.$t("subCategoryName"),
            key: "SECONDGROUPNAME"
          },
          {
            title: this.$t("creator"),
            key: "USERNAME"
          },
          {
            title: this.$t("createat"),
            slot: "date",
            key: "CREATETIME"
          },
          {
            title: this.$t("actions"),
            slot: "action",
            width: 150,
            align: "center"
          }
        ],
        data: []
      },
      formData: {
        ID: null,
        MAINGROUPID: null,
        SECONDGROUPID: null,
        TITLE: null,
        NOTE: null,
        PRIVATENOTE: false,
        DEPARTMENTPRIVATENOTE: false
      },

      options: {
        mainList: [],
        secondList: []
      },

      modal: {
        removeRow: false
      },

      removeData: null
    };
  },
  methods: {
    toReadeableDate(time) {
      return moment(time, "X").calendar();
    },
    toInt(val) {
      return parseInt(val) || 0;
    },
    getMain() {
      api.getMain().then(res => {
        if (res.data.status == "success") {
          this.options.mainList = res.data.data.map(item => {
            return {
              text: item.MAINGROUPNAME,
              value: item.ID
            };
          });
        }
      });
    },
    getSecond(val) {
      api.getSecond(val).then(res => {
        if (res.data.status == "success") {
          this.options.secondList = res.data.data.map(item => {
            return {
              text: item.SECONDGROUPNAME,
              value: item.ID
            };
          });
        }
      });
    },
    loadData() {
      this.table.loading = true;
      api
        .getNote()
        .then(res => {
          if (res.data.status == "success") {
            this.table.data = res.data.data;
          }
        })
        .finally(res => {
          this.table.loading = false;
        });
    },
    resetForm() {
      this.formData.ID = null;
      this.formData.MAINGROUPID = null;
      this.formData.SECONDGROUPID = null;
      this.formData.TITLE = null;
      this.formData.NOTE = null;
      this.formData.PRIVATENOTE = false;
      this.formData.DEPARTMENTPRIVATENOTE = false;
    },
    save() {
      api
        .saveNote({
          ...this.formData,
          PRIVATENOTE: +this.formData.PRIVATENOTE,
          DEPARTMENTPRIVATENOTE: +this.formData.DEPARTMENTPRIVATENOTE
        })
        .then(res => {
          if (res.data.status == "success") {
            this.resetForm();
            this.loadData();
          }
        });
    },
    editRow(index, row) {
      this.resetForm();
      this.formData.ID = row.ID;
      this.formData.MAINGROUPID = row.MAINGROUPID;
      this.formData.SECONDGROUPID = row.SECONDGROUPID;
      this.formData.TITLE = row.TITLE;
      this.formData.NOTE = row.NOTE;
      this.formData.PRIVATENOTE = !!row.PRIVATENOTE;
      this.formData.DEPARTMENTPRIVATENOTE = !!row.DEPARTMENTPRIVATENOTE;
    },
    removeRow(index, row) {
      if (row.USERID == this.userId) {
        this.modal.removeRow = true;
        this.removeData = row;
      } else {
        this.$Message.error(this.$t("noteEditOnlyCreator"));
      }
    },
    removeApprove() {
      api.removeNote(this.removeData.ID).then(res => {
        this.$Message.success(this.$t("deleteOk"));
        this.resetForm();
        this.loadData();
        this.removeData = null;
      });
    },
    removeCancel() {
      this.$Message.info(this.$t("deleteCancel"));
    }
  },
  watch: {
    "formData.MAINGROUPID"(val) {
      if (val) {
        this.getSecond(val);
      }
    }
  }
};
</script>

<style>
</style>
