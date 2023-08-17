

<template>
  <a-modal width="600px" :visible="props.visible" :footer="false" @cancel="close" modal-class="login_modal">
    <div class="left">

    </div>
    <div class="right">
      <div class="head">
        <h2>登录文档系统</h2>
        <div class="close" @click="close"><IconClose></IconClose></div>
      </div>
      <div class="body">
        <a-form ref="formRef" :model="form" :label-col-props="{span: 0, offset: 0}"
                :wrapper-col-props="{span:24, offset: 0}">
          <a-form-item field="userName" :rules="[{required:true,message:'请输入用户名'}]" :validate-trigger="['blur']">
            <a-input v-model="form.userName" placeholder="用户名"/>
          </a-form-item>
          <a-form-item field="password" :rules="[{required:true,message:'请输入密码'}]" :validate-trigger="['blur']">
            <a-input v-model="form.password" type="password" placeholder="密码"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="login" style="width: 100%;">登录</a-button>
          </a-form-item>
          <a-form-item>
            <span class="other_login">第三方登录</span>
          </a-form-item>
          <a-form-item>
            <div class="other_login_icons">
              <img src="../../assets/icon/qq.png" alt="">
            </div>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import {reactive, ref} from "vue";
import {IconClose} from "@arco-design/web-vue/es/icon";
import {loginApi} from "@/api/user_api";

const form = reactive({
  userName: "",
  password: "",
})

const props = defineProps(["visible"])
const emits = defineEmits(["update:visible"])

function close(){
  emits("update:visible", false)
}

const formRef = ref()

async function login() {

  let _res = await formRef.value.validate()
  if (_res !== undefined){
    return
  }
  let res = await loginApi(form)
  console.log(res)


}


</script>

<style lang="scss">
.login_modal {
  .arco-modal-header {
    display: none;
  }

  .arco-modal-body {
    display: flex;
    padding: 0;
    height: 380px;

    .left {
      width: 50%;
      border-right: 1px solid var(--bg);
      height: 100%;
    }

    .right {
      width: 50%;
      height: 100%;

      .head {
        display: flex;
        justify-content: center;
        position: relative;
        border-bottom: 1px solid var(--bg);

        h2 {
          margin: 10px 0;
          font-size: 20px;
        }

        .close {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
      }

      .body {
        margin: 10px 0 0 0;
        padding: 20px;

        .other_login {
          width: 100%;
          font-size: 12px;
          color: var(--color-text-2);
          display: flex;
          align-items: center;
          justify-content: space-between;

          &::before {
            width: 35%;
            height: 1px;
            background-color: var(--bg);
            content: "";
            display: inline-block;
          }

          &::after {
            width: 35%;
            height: 1px;
            background-color: var(--bg);
            content: "";
            display: inline-block;
          }
        }

        .other_login_icons {
          width: 100%;
          display: flex;
          justify-content: center;

          img {
            width: 40px;
            height: 40px;
          }
        }
      }
    }
  }
}
</style>
