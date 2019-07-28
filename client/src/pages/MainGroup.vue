<template>
  <div>
    <h3>{{$t('mainCategory')}}</h3>
    <br />
    <Card :bordered="false">
      <p slot="title">{{$t('mainCategoryTitle')}}</p>

      <Form :label-width="180">
        <FormItem :label="$t('mainCategoryName')">
          <Input v-model="formData.MAINGROUPNAME" :placeholder="$t('mainCategoryNamePlaceholder')" />
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
  },
  data() {
    return {
      table: {
        loading: false,
        cols: [
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
        MAINGROUPNAME: null
      },

      modal: {
        removeRow: false
      },

      removeData: null
    };
  },
  methods: {
    ...mapActions(["addMainRow", "removeMainRow", "editMainRow"]),
    loadData() {
      this.table.loading = true;
      api
        .getMain()
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
      this.formData.MAINGROUPNAME = null;
    },
    save() {
      api.saveMain(this.formData).then(res => {
        if (res.data.status == "success") {
          if ((parseInt(this.formData.ID) || 0) > 0) {
            this.editMainRow(this.formData);
          } else {
            this.addMainRow(this.formData);
          }
          this.resetForm();
          this.loadData();
        }
      });
    },
    editRow(index, row) {
      this.resetForm();
      this.formData.ID = row.ID;
      this.formData.MAINGROUPNAME = row.MAINGROUPNAME;
    },
    removeRow(index, row) {
      this.modal.removeRow = true;
      this.removeData = row;
    },
    removeApprove() {
      api.removeMain(this.removeData.ID).then(res => {
        this.$Message.success(this.$t("deleteOk"));
        this.removeMainRow(this.removeData);
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
