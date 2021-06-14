<!--
 Access control component for fine-grained access control.
-->
<script lang="ts">
  import type { PropType } from 'vue';

  import { defineComponent } from 'vue';
  import { RoleEnum } from '/@app/enums';
  import { usePermission } from '/@app/hooks/web';
  import { getSlot } from '/@app/utils/helper';

  export default defineComponent({
    name: 'Authority',
    props: {
      /**
       * 指定角色可见
       * 当权限模式为角色模式时，可通过角色值.
       * 当权限模式为后台时，取值可以通过代码权限值
       * @default ''
       */
      value: {
        type: [Number, Array, String] as PropType<RoleEnum | RoleEnum[] | string | string[]>,
        default: '',
      },
    },
    setup(props, { slots }) {
      const { hasPermission } = usePermission();

      /**
       * Render role button
       */
      function renderAuth() {
        const { value } = props;
        if (!value) {
          return getSlot(slots);
        }
        return hasPermission(value) ? getSlot(slots) : null;
      }

      return () => {
        // 基于角色控制
        return renderAuth();
      };
    },
  });
</script>
