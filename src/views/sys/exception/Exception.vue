<script lang="tsx">
  import type { PropType } from 'vue';

  import { defineComponent, ref, computed, unref } from 'vue';
  import { Result, Button } from 'ant-design-vue';
  import { useRoute } from 'vue-router';
  import { useDesign, useI18n, useGo, useRedo } from '/@app/hooks/web';
  import { ExceptionEnum, PageEnum } from '/@app/enums';
  import warningSvg from '/@app/assets/svg/warning.svg';
  import notDataSvg from '/@app/assets/svg/no-data.svg';
  import netWorkSvg from '/@app/assets/svg/net-error.svg';

  interface MapValue {
    // 标题
    title: string;
    // 副标题
    subTitle: string;
    // 按钮名称
    btnText?: string;
    // 图标
    icon?: string;
    // 处理
    handler?: Fn;
    // 状态码
    status?: string;
  }

  export default defineComponent({
    name: 'ErrorPage',
    props: {
      // 状态码
      status: {
        type: [Number, String] as PropType<number | string>,
        default: ExceptionEnum.PAGE_NOT_FOUND,
      },

      title: {
        type: String as PropType<string>,
        default: '',
      },

      subTitle: {
        type: String as PropType<string>,
        default: '',
      },

      full: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
    },
    setup(props) {
      const statusMapRef = ref(new Map<string | number, MapValue>());

      const { query } = useRoute();
      const go = useGo();
      const redo = useRedo();
      const { t } = useI18n();
      const { prefixCls } = useDesign('app-exception-page');

      const getStatus = computed(() => {
        const { status: routeStatus } = query;
        const { status } = props;
        return Number(routeStatus) || status;
      });

      const getMapValue = computed((): MapValue => {
        return unref(statusMapRef).get(unref(getStatus)) as MapValue;
      });

      const backLoginI18n = t('sys.exception.backLogin');
      const backHomeI18n = t('sys.exception.backHome');

      unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_REGISTER, {
        title: t('sys.exception.subTitle300'),
        status: 'warning',
        subTitle: t('sys.exception.linkAdministrator'),
        btnText: props.full ? backLoginI18n : backHomeI18n,
        handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go()),
        icon: warningSvg,
      });

      unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_ACCESS, {
        title: '403',
        status: `${ExceptionEnum.PAGE_NOT_ACCESS}`,
        subTitle: t('sys.exception.subTitle403'),
        btnText: props.full ? backLoginI18n : backHomeI18n,
        handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go()),
      });

      unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_FOUND, {
        title: '404',
        status: `${ExceptionEnum.PAGE_NOT_FOUND}`,
        subTitle: t('sys.exception.subTitle404'),
        btnText: props.full ? backLoginI18n : backHomeI18n,
        handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go()),
      });

      unref(statusMapRef).set(ExceptionEnum.ERROR, {
        title: '500',
        status: `${ExceptionEnum.ERROR}`,
        subTitle: t('sys.exception.subTitle500'),
        btnText: backHomeI18n,
        handler: () => go(),
      });

      unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_DATA, {
        title: t('sys.exception.noDataTitle'),
        subTitle: '',
        btnText: t('common.redo'),
        handler: () => redo(),
        icon: notDataSvg,
      });

      unref(statusMapRef).set(ExceptionEnum.NET_WORK_ERROR, {
        title: t('sys.exception.networkErrorTitle'),
        subTitle: t('sys.exception.networkErrorSubTitle'),
        btnText: t('common.redo'),
        handler: () => redo(),
        icon: netWorkSvg,
      });

      return () => {
        const { title, subTitle, btnText, icon, handler, status } = unref(getMapValue) || {};
        return (
          <Result
            class={prefixCls}
            status={status as any}
            title={props.title || title}
            sub-title={props.subTitle || subTitle}>
            {{
              extra: () =>
                btnText && (
                  <Button type="primary" onClick={handler}>
                    {() => btnText}
                  </Button>
                ),
              icon: () => (icon ? <img src={icon} /> : null),
            }}
          </Result>
        );
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-app-exception-page';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    flex-direction: column;

    .ant-result-icon {
      img {
        max-width: 400px;
        max-height: 300px;
      }
    }
  }
</style>
