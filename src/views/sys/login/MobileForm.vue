<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="mobile" class="enter-x">
        <Input size="large" v-model:value="formData.mobile" :placeholder="t('sys.login.mobile')" />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountdownInput
          size="large"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
          {{ t('sys.login.loginButton') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, computed, unref } from 'vue';
  import { Form, Input, Button } from 'ant-design-vue';
  import { CountdownInput } from '/@app/components/CountDown';
  import { useI18n } from '/@app/hooks/web';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import LoginFormTitle from './LoginFormTitle.vue';

  export default defineComponent({
    name: 'MobileForm',
    components: {
      Button,
      Form,
      FormItem: Form.Item,
      Input,
      CountdownInput,
      LoginFormTitle,
    },
    setup() {
      const { t } = useI18n();
      const { handleBackLogin, getLoginState } = useLoginState();
      const { getFormRules } = useFormRules();

      const formRef = ref();
      const loading = ref(false);

      const formData = reactive({
        mobile: '',
        sms: '',
      });

      const { validForm } = useFormValid(formRef);

      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE);

      async function handleLogin() {
        const data = await validForm();
        if (!data) return;
        console.log(data);
      }

      return {
        t,
        formRef,
        formData,
        getFormRules,
        handleLogin,
        loading,
        handleBackLogin,
        getShow,
      };
    },
  });
</script>
