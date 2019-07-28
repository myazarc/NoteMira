import api from "../../api";

const state = {
  main: [],
};

const mutations = {
  setMain(state, data) {
    state.main = data;
  },
  addMain(state, data) {
    state.main.push(data);
  },
  editMain(state, data) {
    const index=state.main.findIndex(item => item.ID==data.ID);
    if(index>-1){
      state.main[index].MAINGROUPNAME=data.MAINGROUPNAME;
    }
  },
  removeMain(state, data) {
    const index=state.main.findIndex(item => item.ID==data.ID);
    if(index>-1){
      state.main.splice(index,1);
    }
  },
  addSecond(state, data) {
    const index=state.main.findIndex(item => item.ID==data.MAINGROUPID);
    if(index > -1){
      if(!('child' in state.main[index])){
        state.main[index].child=[];
      }
      state.main[index].child.push(data);
    }
  },
  editSecond(state, data) {
    const index=state.main.findIndex(item => item.ID==data.MAINGROUPID);
    if(index>-1){
      const secondIndex=state.main[index].child.findIndex(item => item.ID==data.ID);
      if(secondIndex>-1){
        state.main[index].child[secondIndex].SECONDGROUPNAME=data.SECONDGROUPNAME;
        state.main[index].child[secondIndex].MAINGROUPID=data.MAINGROUPID;
      }
    }
  },
  removeSecond(state, data) {
    const index=state.main.findIndex(item => item.ID==data.MAINGROUPID);
    if(index>-1){
      const secondIndex=state.main[index].child.findIndex(item => item.ID==data.ID);
      if(secondIndex>-1){
        state.main[index].child.splice(secondIndex,1);
      }
    }
  },
};

const actions = {
  allGroups({ commit }) {
    api.allGroups().then(res => {
      if(res.data.status=='success'){
        let data=res.data.data;
        commit('setMain', data);
      }
    })
  },
  addMainRow({commit},data){
    commit('addMain', data);
  },
  editMainRow({commit},data){
    commit('editMain', data);
  },
  removeMainRow({commit},data){
    commit('removeMain', data);
  },
  addSecondRow({commit},data){
    commit('addSecond', data);
  },
  editSecondRow({commit},data){
    commit('editSecond', data);
  },
  removeSecondRow({commit},data){
    commit('removeSecond', data);
  },
};

export default {
  state,
  mutations,
  actions,
};