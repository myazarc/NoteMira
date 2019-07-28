<template>
  <div>
    <h3>{{$t('users')}}</h3>
    <br />
    <Card :bordered="false">
      <p slot="title">{{$t('userTitle')}}</p>

      <Form :label-width="180">
        <FormItem :label="$t('departmentName')">
          <Select
            v-model="formData.DEPARTMENTID"
            :not-found-text="$t('noData')"
            :placeholder="$t('departmentNamePlaceholder')"
          >
            <Option
              v-for="item in options.departmentList"
              :value="item.value"
              :key="item.value"
            >{{ item.text }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('userName')">
          <Input v-model="formData.USERNAME" :placeholder="$t('userNamePlaceholder')" />
        </FormItem>
        <FormItem :label="$t('password')">
          <Input v-model="formData.PASSWORD" :placeholder="$t('passwordPlaceholder')" />
        </FormItem>
        <FormItem>
          <Checkbox v-model="formData.ISADMIN">{{$t('userAdmin')}}</Checkbox>
        </FormItem>
        <FormItem>
          <Checkbox v-model="formData.SHOWPRIVATENOTES">{{$t('showPrivateNote')}}</Checkbox>
        </FormItem>
        <FormItem>
          <Checkbox v-model="formData.SHOWPRIVATEDEPARTMENTS">{{$t('showDepartmentPrivateNote')}}</Checkbox>
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
import api from "../api";
export default {
  mounted() {
    this.loadData();
    this.getDepartments();
  },
  data() {
    return {
      table: {
        loading: false,
        cols: [
          {
            title: this.$t("userName"),
            key: "USERNAME"
          },
          {
            title: this.$t("departmentName"),
            key: "DEPARTMENTNAME"
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
        DEPARTMENTID: null,
        USERNAME: null,
        PASSWORD: null,
        SHOWPRIVATENOTES: false,
        SHOWPRIVATEDEPARTMENTS: false,
        ISADMIN: false
      },

      options: {
        departmentList: []
      },

      modal: {
        removeRow: false
      },

      removeData: null
    };
  },
  methods: {
    toInt(val) {
      return parseInt(val) || 0;
    },
    getDepartments() {
      api.getDepartment().then(res => {
        if (res.data.status == "success") {
          this.options.departmentList = res.data.data.map(item => {
            return {
              text: item.DEPARTMENTNAME,
              value: item.ID
            };
          });
        }
      });
    },
    loadData() {
      this.table.loading = true;
      api
        .getUser()
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
      this.formData.DEPARTMENTID = null;
      this.formData.USERNAME = null;
      this.formData.PASSWORD = null;
      this.formData.SHOWPRIVATENOTES = false;
      this.formData.SHOWPRIVATEDEPARTMENTS = false;
      this.formData.ISADMIN = false;
    },
    save() {
      api
        .saveUser({
          ...this.formData,
          ISADMIN: +this.formData.ISADMIN,
          SHOWPRIVATENOTES: +this.formData.SHOWPRIVATENOTES,
          SHOWPRIVATEDEPARTMENTS: +this.formData.SHOWPRIVATEDEPARTMENTS
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
      this.formData.DEPARTMENTID = row.DEPARTMENTID;
      this.formData.USERNAME = row.USERNAME;
      this.formData.PASSWORD = row.PASSWORD;
      this.formData.SHOWPRIVATENOTES = !!row.SHOWPRIVATENOTES;
      this.formData.SHOWPRIVATEDEPARTMENTS = !!row.SHOWPRIVATEDEPARTMENTS;
      this.formData.ISADMIN = !!row.ISADMIN;
    },
    removeRow(index, row) {
      this.modal.removeRow = true;
      this.removeData = row;
    },
    removeApprove() {
      api.removeUser(this.removeData.ID).then(res => {
        this.$Message.success(this.$t("deleteOk"));
        this.resetForm();
        this.loadData();
        this.removeData = null;
      });
    },
    removeCancel() {
      this.$Message.info(this.$t("deleteCancel"));
    }
  }
};
</script>

<style>
</style>
