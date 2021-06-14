<template>
  <MenuItem :key="key">
    <span class="flex items-center">
      <Icon :icon="icon" class="mr-1" />
      <span>{{ text }}</span>
    </span>
  </MenuItem>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Menu } from 'ant-design-vue';
  import { propTypes } from '/@app/utils/common';
  import Icon from '/@app/components/Icon';

  export default defineComponent({
    name: 'DropdownMenuItem',
    components: { MenuItem: Menu.Item, Icon },
    props: {
      key: propTypes.string,
      text: propTypes.string,
      icon: propTypes.string,
    },
  });
</script>
