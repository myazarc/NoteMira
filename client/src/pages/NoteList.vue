<template>
  <div>
    <Card class="list-card" :key="item.ID" v-for="item in filteredData">
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>
        {{item.TITLE}}
      </p>
      <div href="#" slot="extra">
        <a
          href="javascript:;"
          style="color:black"
          v-if="item.PRIVATENOTE || item.DEPARTMENTPRIVATENOTE"
        >
          <Icon type="md-eye"></Icon>
        </a>
        <a href="javascript:;" style="color:black" @click="showDetail(item)">
          <Icon type="md-open"></Icon>
        </a>
      </div>
      <div v-html="item.NOTE" style="max-height: 150px;overflow-y: auto;"></div>
      <div style="border-top:1px solid #ccc;">
        <small
          style="color:#aaa;float: left;max-width:70%"
        >{{item.MAINGROUPNAME}} > {{item.SECONDGROUPNAME}}</small>
        <small style="color:#aaa;float:right;text-align:right">
          {{item.USERNAME}}
          <br />
          {{toReadeableDate(item.CREATETIME)}}
        </small>
      </div>
    </Card>

    <div>
      <Modal v-model="showDetailModal" :title="showData.TITLE">
        <div v-html="showData.NOTE"></div>
        <div slot="footer">
          <small
            style="color:#aaa;float: left;max-width:70%"
          >{{showData.MAINGROUPNAME}} > {{showData.SECONDGROUPNAME}}</small>
          <small style="color:#aaa;float:right;text-align:right">
            {{showData.USERNAME}}
            <br />
            {{toReadeableDate(showData.CREATETIME)}}
          </small>
          <br />
          <br />
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import api from "../api";
import moment from "moment";
export default {
  computed: {
    filteredData() {
      if (this.filterData == "0-0") {
        return this.notes;
      } else {
        const [m, s] = this.filterData.split("-");
        return this.notes.filter(
          item => item.MAINGROUPID == m && item.SECONDGROUPID == s
        );
      }
    },
    userId() {
      return this.$store.state.user.userData.ID;
    }
  },
  mounted() {
    moment.locale(this.$i18n.locale);
    if (this.$route.params.type) {
      this.filterData = this.$route.params.type;
    }
    this.loadData();
  },
  data() {
    return {
      notes: [],
      filterData: "0-0",
      showDetailModal: false,
      showData: {
        TITLE: null,
        NOTE: null,
        MAINGROUPNAME: null,
        SECONDGROUPNAME: null,
        USERNAME: null,
        CREATETIME: 0
      }
    };
  },
  methods: {
    loadData() {
      api.getNote().then(res => {
        if (res.data.status == "success") {
          this.notes = res.data.data;
        }
      });
    },
    toReadeableDate(time) {
      return moment(time, "X").calendar();
    },
    showDetail(item) {
      this.showData = item;
      this.showDetailModal = true;
    }
  },
  watch: {
    "$route.params.type"(val) {
      this.filterData = val;
    }
  }
};
</script>

<style>
.list-card {
  width: 350px;
  float: left;
  margin: 10px;
}
</style>
