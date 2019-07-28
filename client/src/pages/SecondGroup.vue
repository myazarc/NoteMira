<template>
  <div>
    <h3>{{$t('subCategory')}}</h3>
    <br />
    <Card :bordered="false">
      <p slot="title">{{$t('subCategoryTitle')}}</p>

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
          <Input
            v-model="formData.SECONDGROUPNAME"
            :placeholder="$t('subCategoryNamePlaceholder')"
          />
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
import { mapActions } from "vuex";
export default {
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
            title: this.$t("subCategoryName"),
            key: "SECONDGROUPNAME"
          },
          {
            title: this.$t("mainCategoryName"),
            key: "MAINGROUPNAME"
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
        SECONDGROUPNAME: null,
        MAINGROUPID: null
      },

      options: {
        mainList: []
      },

      modal: {
        removeRow: false
      },

      removeData: null
    };
  },
  methods: {
    ...mapActions(["addSecondRow", "removeSecondRow", "editSecondRow"]),
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
    loadData() {
      this.table.loading = true;
      api
        .getSecondAll()
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
      this.formData.SECONDGROUPNAME = null;
      this.formData.MAINGROUPID = null;
    },
    save() {
      api.saveSecond(this.formData).then(res => {
        if (res.data.status == "success") {
          if ((parseInt(this.formData.ID) || 0) > 0) {
            this.editSecondRow(this.formData);
          } else {
            this.addSecondRow(this.formData);
          }
          this.resetForm();
          this.loadData();
        }
      });
    },
    editRow(index, row) {
      this.resetForm();
      this.formData.ID = row.ID;
      this.formData.SECONDGROUPNAME = row.SECONDGROUPNAME;
      this.formData.MAINGROUPID = row.MAINGROUPID;
    },
    removeRow(index, row) {
      this.modal.removeRow = true;
      this.removeData = row;
    },
    removeApprove() {
      api.removeSecond(this.removeData.ID).then(res => {
        this.$Message.success(this.$t("deleteOk"));
        this.removeSecondRow(this.removeData);
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
