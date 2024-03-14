<template>
  <HeaderDefault />
  <main class="flex flex-col items-center flex-1">
    <router-view />
  </main>
  <FooterDefault :appApiVersion="appApiVersion" />
</template>

<script>
import { onMounted, ref } from 'vue';
import FooterDefault from './components/Footer/FooterDefault.vue';
import HeaderDefault from './components/Header/HeaderDefault.vue';
import PublicService from './services/PublicService';
export default {
  setup() {
    const appApiVersion = ref('');

    onMounted(async () => {
      const publicService = new PublicService();
      await publicService.fetchApiVersion();
      appApiVersion.value = publicService.getApiVersion();
    });

    return { appApiVersion };
  },
  components: { HeaderDefault, FooterDefault },
};
</script>
