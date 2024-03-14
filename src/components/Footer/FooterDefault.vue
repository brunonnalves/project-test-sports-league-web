<template>
  <footer
    class="flex text-footer font-bold text-cFooter bg-footer h-10 pr-10 items-center justify-end"
  >
    API Version: {{ appApiVersion }}
  </footer>
</template>

<script>
export default {
  name: 'FooterDefault',
  props: ['appApiVersion'],
  setup() {},
};
</script>
