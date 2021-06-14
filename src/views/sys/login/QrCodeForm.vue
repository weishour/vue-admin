<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <div class="enter-x min-w-64 min-h-64">
      <QrCode
        :value="qrCodeUrl"
        class="enter-x flex justify-center xl:justify-start"
        :width="280"
      />
      <Divider class="enter-x">{{ t('sys.login.scanSign') }}</Divider>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </div>
  </template>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';
  import { Button, Divider } from 'ant-design-vue';
  import { QrCode } from '/@app/components/Qrcode';
  import { useI18n } from '/@app/hooks/web';
  import { useLoginState, LoginStateEnum } from './useLogin';
  import LoginFormTitle from './LoginFormTitle.vue';

  const qrCodeUrl = 'https://vvbin.cn/next/login';
  export default defineComponent({
    name: 'QrCodeForm',
    components: {
      Button,
      QrCode,
      Divider,
      LoginFormTitle,
    },
    setup() {
      const { t } = useI18n();
      const { handleBackLogin, getLoginState } = useLoginState();

      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.QR_CODE);

      return {
        t,
        handleBackLogin,
        qrCodeUrl,
        getShow,
      };
    },
  });
</script>
