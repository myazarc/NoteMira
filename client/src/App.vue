<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import api from './api';
import { mapActions } from 'vuex';
export default {
  name: 'app',
  computed: {
    userLogin () {
      return this.$store.state.user.isLogin;
    }
  },
  mounted(){
    if(!this.$store.state.user.isLogin){
      api.getLogin().then(res => {
        if(this.$route.name!='login'){
          if(res.data.status!='success'){
            this.$router.push({
              path:'/',
            });
          }else{
            this.$store.dispatch('doLogin',res.data.data);
          }
        }
          
        })
    }
  },
  methods:{
    ...mapActions(['allGroups']),
  },
  watch:{
    userLogin(val){
      if(!val && this.$route.path!='/'){
        this.$router.push({
          path:'/',
        });
      }

      if(val){
        this.allGroups();
      }
    },
  },
}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
}
html,body,#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  margin: 0px;
  padding: 0px;
}
</style>
