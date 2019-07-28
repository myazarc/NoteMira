<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name>
          <div class="layout-logo">NoteMira</div>
          <div class="layout-nav">
            <MenuItem name="1" to="/note">
              <Icon type="md-add"></Icon>
              {{$t('notes')}}
            </MenuItem>
            <MenuItem name="2" to="/main">{{$t('mainCategory')}}</MenuItem>
            <MenuItem name="3" to="/second">{{$t('subCategory')}}</MenuItem>
            <MenuItem v-if="isAdmin" name="4" to="/user">{{$t('users')}}</MenuItem>
            <MenuItem v-if="isAdmin" name="5" to="/department">{{$t('departments')}}</MenuItem>

            <Select v-model="$i18n.locale" style="width:50px">
              <Option
                v-for="(lang, i) in langs"
                :key="`Lang${i}`"
                :value="lang.value"
                :label="lang.text"
              >
                <span>{{lang.text}}</span>
                <span style="float:right;color:#ccc;padding-left:10px">{{lang.label}}</span>
              </Option>
            </Select>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="0" theme="light" width="auto">
            <MenuItem name="0" :to="`/notelist/0-0`">
              <Icon type="md-apps"></Icon>
              <span>{{$t('all')}}</span>
            </MenuItem>

            <Submenu :name="mItem.ID" :key="mItem.ID" v-for="mItem in leftSideMenus">
              <template slot="title">{{mItem.MAINGROUPNAME}}</template>
              <MenuItem
                :to="`/notelist/${mItem.ID}-${mSubItem.ID}`"
                :name="`${mItem.ID}-${mSubItem.ID}`"
                :key="`${mItem.ID}-${mSubItem.ID}`"
                v-for="mSubItem in mItem.child"
              >{{mSubItem.SECONDGROUPNAME}}</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '24px 24px 24px'}">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  computed: {
    leftSideMenus() {
      return this.$store.state.groups.main;
    },
    isAdmin() {
      return this.$store.state.user.isAdmin;
    }
  },
  data() {
    return {
      langs: [
        {
          text: "EN",
          label: "English",
          value: "en"
        },
        {
          text: "TR",
          label: "Türkçe",
          value: "tr"
        }
      ]
    };
  },
  watch: {
    "$i18n.locale"(val) {
      if (localStorage) {
        localStorage.setItem("defLang", val);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100vh;
}
.ivu-layout {
  height: calc(100% - 24px);
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
  color: #f5f7f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 30px;
  text-indent: 18px;
}
.layout-nav {
  width: 600px;
  margin: 0 auto;
  margin-right: 10px;

  .ivu-menu-item {
    padding: 0 10px;
  }
}

.ivu-layout-content {
  min-height: auto !important;
}

.layout-footer-center {
  text-align: center;
}
</style>