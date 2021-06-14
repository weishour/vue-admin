<template>
  <BasicTitle :helpMessage="helpMessage">
    {{ title }}
  </BasicTitle>
</template>
<script lang="ts">
  import type { PropType } from 'vue';

  import { defineComponent } from 'vue';
  import { BasicTitle } from '/@app/components/Basic';
  import { propTypes } from '/@app/utils/common';

  export default defineComponent({
    name: 'BasicModalHeader',
    components: { BasicTitle },
    props: {
      helpMessage: {
        type: [String, Array] as PropType<string | string[]>,
      },
      title: propTypes.string,
    },
  });
</script>
