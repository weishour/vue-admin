<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account" class="enter-x">
      <Input size="large" v-model:value="formData.account" :placeholder="t('sys.login.userName')" />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="6">
        <FormItem>
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="18">
        <FormItem>
          <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
            {{ t('sys.login.loginButton') }}
          </Button>
        </FormItem>
      </ACol>
    </ARow>
  </Form>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, toRaw, unref, computed } from 'vue';
  // import { onKeyStroke } from '@vueuse/core';
  import { Checkbox, Form, Input, Row, Col, Button } from 'ant-design-vue';
  import { useI18n, useMessage, useDesign } from '/@app/hooks/web';
  import { useUserStore } from '/@app/store/modules';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import LoginFormTitle from './LoginFormTitle.vue';

  export default defineComponent({
    name: 'LoginForm',
    components: {
      [Col.name]: Col,
      [Row.name]: Row,
      Checkbox,
      Button,
      Form,
      FormItem: Form.Item,
      Input,
      LoginFormTitle,
      InputPassword: Input.Password,
    },
    setup() {
      const { t } = useI18n();
      const { notification, createErrorModal } = useMessage();
      const { prefixCls } = useDesign('login');
      const userStore = useUserStore();

      const { setLoginState, getLoginState } = useLoginState();
      const { getFormRules } = useFormRules();

      const formRef = ref();
      const loading = ref(false);
      const rememberMe = ref(false);

      const formData = reactive({
        account: 'weishour',
        password: '123456',
      });

      const { validForm } = useFormValid(formRef);

      // onKeyStroke('Enter', handleLogin);

      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

      async function handleLogin() {
        const data = await validForm();
        if (!data) return;
        try {
          loading.value = true;
          const userInfo = await userStore.login(
            toRaw({
              password: data.password,
              username: data.account,
              mode: 'none', //不要默认的错误提示
            })
          );
          if (userInfo) {
            notification.success({
              message: t('sys.login.loginSuccessTitle'),
              description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realname}`,
              duration: 3,
            });
          }
        } catch (error) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: error.message || t('sys.api.networkExceptionMsg'),
            getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
          });
        } finally {
          loading.value = false;
        }
      }

      return {
        t,
        prefixCls,
        formRef,
        formData,
        getFormRules,
        rememberMe,
        handleLogin,
        loading,
        setLoginState,
        LoginStateEnum,
        getShow,
      };
    },
  });
</script>
