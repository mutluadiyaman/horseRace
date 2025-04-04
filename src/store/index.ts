import { createStore } from 'vuex';
import raceModule from './modules/race.ts';

export default createStore({
    modules: {
        race: raceModule,
    }
});