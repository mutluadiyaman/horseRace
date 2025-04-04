<template>
  <div class="home">
    <main class="main-content">
      <div class="home-horse">
        <HorseList />
      </div>
      <div class="content-wrapper">
        <div class="left-area">
          <RaceSchedule />
        </div>
        <div class="center-area">
          <RaceTrack />
        </div>
        <div class="right-area">
          <RaceResults />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HorseList from "../components/HorseList/HorseList.vue";
import RaceSchedule from "../components/RaceSchedule/RaceSchedule.vue";
import RaceTrack from "../components//RaceTrack/RaceTrackn.vue";
import RaceResults from "../components//RaceResult/RaceResults.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    HorseList,
    RaceSchedule,
    RaceTrack,
    RaceResults,
  },
});
</script>

<style lang="scss">
</style>