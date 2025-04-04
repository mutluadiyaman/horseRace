<template>
  <div class="p-4">
    <h2 class="text-xl font-bold">Race Schedule</h2>
    <div v-for="round in schedule" :key="round.round">
      <h3 class="font-semibold">{{ round.round }} ST Lap {{round.distance}}m</h3>
      <div v-if="schedule.length">
        <div>
          <table class="w-full border-collapse border border-gray-400 mt-2">
        <thead>
        <tr class="bg-gray-200">
          <th class="border border-gray-400 px-2 py-1">Position</th>
          <th class="border border-gray-400 px-2 py-1">Name</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(horse, index) in round.participants" :key="horse.id">
          <td class="border border-gray-400 px-2 py-1">{{ index + 1 }}</td>
          <td class="border border-gray-400 px-2 py-1">{{ horse.name }}  ({{horse.id}})<span :style="{background: horse.color}"></span></td>
        </tr>
        </tbody>
      </table>
        </div>
      </div>
      <p v-else class="text-gray-500">No race schedule available.</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    schedule() {
      return this.$store.state.race.schedule;
    },
  },
};
</script>

