<template>
  <div class="w-full px-10 py-5 bg-gray-200 border-gray-600">
    <div class="flex ">
      <div class="flex w-1/2 justify-start items-center">
        <h2 class="text-xl font-bold">Horse Racing</h2>
      </div>
      <div class="flex w-1/2 justify-end items-center">
        <button
            @click="generateRace"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            :disabled="isRacing"
        >
          Generate Race
        </button>
        <button
            @click="startRace"
            class="px-4 py-2 ml-5 bg-green-500 text-white rounded hover:bg-green-600"
            :style="isRacing ? 'cursor: none' : 'cursor: pointer'"
        >
          Start Race
        </button>
        <button v-if="!isRacing" @click="resetRace" class="px-4 py-2 ml-5 bg-red-500 text-white rounded hover:bg-red-600 transition">
          Reset Race
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isRacing() {
      return this.$store.state.race.isRacing;
    },
  },
  methods: {
    generateRace() {
      this.$store.commit('race/generateHorses');
      this.$store.commit('race/generateSchedule');
    },
    startRace() {
      this.$store.dispatch('race/runRace');
    },
    resetRace() {
      this.$store.commit('race/resetRace');
    }
  },
};
</script>