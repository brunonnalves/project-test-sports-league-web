<template>
  <h1 class="text-pageHeader text-cPageHeader font-bold mt-15 mb-5">League Schedule</h1>
  <table class="table-auto text-cTb w-9/10">
    <thead class="text-tbHeader bg-tbHeader h-15">
      <tr>
        <th class="text-left pl-4">Team Name</th>
        <th class="text-center">MP</th>
        <th class="text-center table-cell sx:hidden">GD</th>
        <th class="text-center hidden sx:table-cell">GF</th>
        <th class="text-center hidden sx:table-cell">GA</th>
        <th class="text-center">Points</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(team, index) in leaderboard" :key="index" class="h-17.5 text-tbCell border-b-2">
        <td class="text-tbCellBolded pl-4">
          <div class="flex items-center justify-start gap-2 font-bold">
            <img :src="`https://flagsapi.codeaid.io/${team.teamName}.png`" class="h-9.25 w-13.25" />
            <p>{{ team.teamName }}</p>
          </div>
        </td>
        <td class="text-center">{{ team.matchesPlayed }}</td>
        <td class="text-center hidden sx:table-cell">{{ team.goalsFor }}</td>
        <td class="text-center hidden sx:table-cell">{{ team.goalsAgainst }}</td>
        <td class="text-center table-cell sx:hidden">{{ team.goalsFor - team.goalsAgainst }}</td>
        <td class="text-center text-tbCellBolded font-bold text-cTbPoints">{{ team.points }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref, onMounted } from 'vue';
import LeagueService from '../../services/LeagueService';
import PublicService from '../../services/PublicService';
export default {
  name: 'Leaderboard',
  setup() {
    const leaderboard = ref([]);

    onMounted(async () => {
      const publicService = new PublicService();
      await publicService.fetchAuthToken();

      const leagueService = new LeagueService();
      await leagueService.fetchData();
      leaderboard.value = leagueService.getLeaderboard();
    });

    return { leaderboard };
  },
};
</script>
