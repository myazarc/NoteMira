<template>
  <div>
    <Row>
      <Col span="8" offset="8" style="margin-top:60px;">
        <Card :bordered="false">
          <p slot="title">NoteMira</p>
          <Form ref="formData" :model="formData" :rules="rules">
            <FormItem prop="user">
              <Input type="text" v-model="formData.user" :placeholder="$t('userName')">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="pass">
              <Input type="password" v-model="formData.pass" :placeholder="$t('password')">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formData')">{{$t('signIn')}}</Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import api from "../api";
import { mapActions } from "vuex";
export default {
  name: "HelloWorld",
  data() {
    return {
      formData: {
        user: null,
        pass: null
      },
      rules: {
        user: [
          {
            required: true,
            message: this.$t("userNameNotNull"),
            trigger: "blur"
          }
        ],
        pass: [
          {
            required: true,
            message: this.$t("passwordNotNull"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["doLogin"]),

    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          api.login(this.formData.user, this.formData.pass).then(res => {
            if (res.data.status == "success") {
              this.doLogin(res.data.data);
              this.$router.push({ path: "/notelist/0-0" });
            } else {
              this.$Message.error(this.$t("userNameOrPasswordWrong"));
            }
          });
        } else {
          this.$Message.error(this.$t("allRequired"));
        }
      });
    }
  }
};
</script>

<style>
</style>
