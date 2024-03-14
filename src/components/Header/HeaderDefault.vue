<template>
  <header class="flex pl-10 h-15 bg-pageHeader items-center">
    <img src="../../../public/images/logo.svg" class="h-10 w-27.5" />
    <NavButton
      v-for="(option, index) in menuOptions"
      :key="option.title"
      :pathTo="option.pathTo"
      :title="option.title"
      :iconSrc="option.iconSrc"
      :class="`${index === 0 ? 'ml-auto' : undefined}`"
    />
  </header>
</template>

<script>
import NavButton from '../NavButton/NavButton.vue';
export default {
  name: 'HeaderDefault',
  setup() {
    const menuOptions = [
      {
        iconSrc: require('../../../public/images/schedule.png'),
        title: 'Schedule',
        pathTo: '/schedule',
      },
      {
        iconSrc: require('../../../public/images/leaderboard.png'),
        title: 'Leaderbord',
        pathTo: '/leaderbord',
      },
    ];

    return { menuOptions };
  },
  components: { NavButton },
};
</script>
