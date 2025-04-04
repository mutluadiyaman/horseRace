<template>
  <div class="p-4 w-full">
    <h2 class="text-xl font-bold">Horse List (1-20)</h2>
    <div class="overflow-y-scroll h-[45rem] w-full">
      <table class="w-full border-collapse border border-gray-400 mt-2">
      <thead>
      <tr class="bg-gray-200">
        <th class="border border-gray-400 px-2 py-1 w-40">Number</th>
        <th class="border border-gray-400 px-2 py-1 w-40">Name</th>
        <th class="border border-gray-400 px-2 py-1 w-20">Condition</th>
        <th class="border border-gray-400 px-2 py-1 w-10">Color</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="horse in horses" :key="horse.id">
        <td class="border border-gray-400 px-4 py-1">{{ horse.id }}</td>
        <td class="border border-gray-400 px-4 py-1">{{ horse.name }}</td>
        <td class="border border-gray-400 px-4 py-1">{{ horse.condition }}</td>
        <td class="border border-gray-400 px-4 py-1">
          <span class="inline-block w-6 h-6 rounded-full" :style="{ backgroundColor: horse.color }"></span>
        </td>
      </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    horses() {
      return this.$store.state.race.horses;
    },
  },
};
</script>