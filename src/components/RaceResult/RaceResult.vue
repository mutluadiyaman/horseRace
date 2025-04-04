<template>
  <div class="p-4">
    <h2 class="text-xl font-bold">Race Results</h2>
    <div v-if="results.length">
      <div v-for="result in results" :key="result.round" class="mb-4">
        <h3 class="font-semibold">{{ result.round }} ST Lap {{result.distance}}m</h3>
        <table class="w-full border-collapse border border-gray-400 mt-2">
          <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-400 px-2 py-1">Position</th>
            <th class="border border-gray-400 px-2 py-1">Name</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(horse, index) in result.result" :key="horse.id">
            <td class="border border-gray-400 px-2 py-1">{{ index + 1 }}</td>
            <td class="border border-gray-400 px-2 py-1">{{ horse.name }} ({{horse.id}})</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p v-else class="text-gray-500">No results yet. Start the race!</p>
  </div>
</template>

<script>
export default {
  computed: {
    results() {
      return this.$store.state.race.results;
    },
  },
};
</script>