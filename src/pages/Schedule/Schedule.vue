<template>
  <h1 class="text-pageHeader text-cPageHeader font-bold mt-15 mb-5">League Schedule</h1>
  <table class="table-auto text-cTb w-9/10">
    <thead class="text-tbHeader bg-tbHeader h-15">
      <tr>
        <th class="w-20 text-right hidden sx:table-cell">Date/Time</th>
        <th class="w-16 hidden md:table-cell"></th>
        <th class="text-left hidden md:table-cell">Stadium</th>
        <th class="text-right">Home Team</th>
        <th></th>
        <th class="text-left">Away Team</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(match, index) in matches"
        :key="index"
        :class="`h-17.5 text-tbCell ${(index + 1) % 2 === 0 ? 'bg-evenRow' : undefined}`"
      >
        <td class="text-right hidden sx:table-cell">
          <p>
            {{
              new Date(match.matchDate)
                .toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                })
                .replaceAll('/', '.')
            }}
          </p>
          <p>
            {{
              new Date(match.matchDate).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })
            }}
          </p>
        </td>
        <td class="hidden md:table-cell"></td>
        <td class="hidden md:table-cell">{{ match.stadium }}</td>
        <td class="text-tbCellBolded">
          <div class="flex items-center justify-end gap-2 font-bold">
            <p>{{ match.homeTeam }}</p>
            <img
              :src="`https://flagsapi.codeaid.io/${match.homeTeam}.png`"
              class="h-9.25 w-13.25"
            />
          </div>
        </td>
        <td class="text-center text-tbCellBolded font-bold">
          {{ match.homeTeamScore }} : {{ match.awayTeamScore }}
        </td>
        <td class="text-tbCellBolded">
          <div class="flex items-center justify-start gap-2 font-bold">
            <img
              :src="`https://flagsapi.codeaid.io/${match.homeTeam}.png`"
              class="h-9.25 w-13.25"
            />
            <p>{{ match.homeTeam }}</p>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref, onMounted } from 'vue';
import LeagueService from '../../services/LeagueService';
import PublicService from '../../services/PublicService';
export default {
  name: 'Schedule',
  setup() {
    const matches = ref([]);

    onMounted(async () => {
      const publicService = new PublicService();
      await publicService.fetchAuthToken();

      const leagueService = new LeagueService();
      await leagueService.fetchData();
      matches.value = leagueService.getMatches();
    });

    return { matches };
  },
};
</script>
