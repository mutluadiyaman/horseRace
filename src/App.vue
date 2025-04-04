<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div class="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-11 gap-4 flex-grow p-4">
      <div class="col-span-3"><HorseList /></div>
      <div class="col-span-4"><RaceTrack /></div>
      <div class="col-span-4 grid grid-cols-2 gap-2">
        <RaceSchedule />
        <RaceResults />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Header from "./components/Header/Header.vue";
import HorseList from "./components/HorseList/HorseList.vue";
import RaceSchedule from "./components/RaceSchedule/RaceSchedule.vue";
import RaceTrack from "./components/RaceTrack/RaceTrack.vue";
import RaceResults from "./components/RaceResult/RaceResult.vue";

export default {
  components: {
    Header,
    HorseList,
    RaceSchedule,
    RaceTrack,
    RaceResults,
  },
  created() {
    // this.generateHorses();
    // this.generateSchedule();
  },
  methods: {
    ...mapMutations("race", ["generateHorses", "generateSchedule"]),
  },
};
</script>

