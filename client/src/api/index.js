import axios from "axios";
import qs from "qs";
import store from "./../store";
import router from "./../router";

const api = axios.create({
  baseURL: "http://127.0.0.1:8081/api/",
  timeout: 10000,
  withCredentials: true
});

api.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.status == 401) {
      router.push({
        path: "/"
      });
      store.dispatch("doLogout");
    }
    return error;
  }
);

export default {
  login(username, userpass) {
    return api.post("login", qs.stringify({ username, userpass }));
  },
  setPinCode(pinCode) {
    return api.post("setpincode", qs.stringify({ PINCODE: pinCode }));
  },
  getLogin() {
    return api.get("userlogin");
  },

  //#region groups
  allGroups() {
    return api.get("allgroups");
  },

  getMain() {
    return api.get("main");
  },
  saveMain(data) {
    return api.post("main", qs.stringify(data));
  },
  removeMain(id) {
    return api.delete("main/" + id);
  },
  /**
   * İlgili Main gruba bağlı ikinci gruplar
   * @param {integer} mainID
   */
  getSecond(mainID) {
    return api.get("second/" + mainID);
  },
  /**
   * Tüm ikinci gruplar
   */
  getSecondAll() {
    return api.get("second");
  },
  saveSecond(data) {
    return api.post("second", qs.stringify(data));
  },
  removeSecond(id) {
    return api.delete("second/" + id);
  },
  //#endregion

  //#region deparments
  getDepartment() {
    return api.get("department");
  },
  saveDepartment(data) {
    return api.post("department", qs.stringify(data));
  },
  removeDepartment(id) {
    return api.delete("department/" + id);
  },
  //#endregion

  //#region users
  getUser() {
    return api.get("user");
  },
  saveUser(data) {
    return api.post("user", qs.stringify(data));
  },
  removeUser(id) {
    return api.delete("user/" + id);
  },
  //#endregion

  //#region notes
  getNote() {
    return api.get("note");
  },
  saveNote(data) {
    return api.post("note", qs.stringify(data));
  },
  removeNote(id) {
    return api.delete("note/" + id);
  }
  //#endregion
};
