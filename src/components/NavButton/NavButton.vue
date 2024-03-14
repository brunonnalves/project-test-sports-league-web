<template>
  <router-link :to="pathTo" class="flex pr-10 h-full text-menu text-cMenu items-center gap-2">
    <img :src="iconSrc" class="h-6.25" />
    <p>{{ title }}</p>
  </router-link>
</template>

<script>
export default {
  name: 'HeaderDefault',
  props: ['pathTo', 'title', 'iconSrc'],
  setup() {},
};
</script>
