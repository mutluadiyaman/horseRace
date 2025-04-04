<template>
  <div class="p-4">
    <h2 class="text-xl font-bold pb-4">Race Track</h2>
    <div v-if="currentRound" class="border border-gray-400 p-4 rounded bg-gray-100">
      <h3 class="font-semibold">Round {{ currentRound.round }} - Distance: {{ currentRound.distance }}m</h3>
      <div class="relative w-full h-[350px] bg-green-100 mt-4 rounded overflow-hidden">
        <!-- Bitiş çizgisi -->
        <div class="absolute right-5 top-0 bottom-0 w-2 bg-red-600"></div>

        <!-- Başlangıç çizgisi -->
        <div class="absolute left-14 top-0 bottom-0 w-2 bg-black"></div>

        <!-- Kulvarlar -->
        <div v-for="(horse, index) in runningHorses" :key="'lane-' + horse.id"
             class="absolute w-full h-[30px] border-b border-gray-500"
             :style="{ top: `${index * 30 + 10}px` }"></div>

        <!-- Atlar -->
        <div
            v-for="(horse, index) in runningHorses"
            :key="horse.id"
            :title="horse.position"
            class="absolute flex items-center transition-all duration-1000 ease-linear"
            :style="{
            left: `${horse.position}%`,
            top: `${index * 30 + 10}px`,
            transitionDuration: `${horse.time * 50}ms`
          }">
        <span class="text-white px-1 rounded h-6 w-6 size-2" :style="{background: horse.color}">{{ horse.id }}</span>
          <img :alt="horse.name" src="../../assets/horse-ride.gif" height="20" width="40" />
        </div>
      </div>
    </div>

    <p v-else class="text-gray-500">No race in progress. Click "Start Race"!</p>
  </div>
</template>

<script>
export default {
  computed: {
    currentRound() {
      return this.$store.state.race.currentRound;
    },
    runningHorses() {
      return this.$store.state.race.runningHorses.map(horse => ({
        ...horse,
        position: Math.min(horse.position || 0, 100)
      }));
    },
  },
};
</script>