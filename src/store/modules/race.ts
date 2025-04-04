import type { Horse, Round, RaceState } from "./../../types/race";

const state: RaceState = {
    horses: [],
    schedule: [],
    results: [],
    isRacing: false,
    currentRound: null,
    runningHorses: [],
};

const mutations = {
    resetRace(state: RaceState) {
        state.horses = [];
        state.schedule = [];
        state.results = [];
        state.isRacing = false;
        state.currentRound = null;
        state.runningHorses = [];
    },
    startRound(state: RaceState, round: Round) {
        state.currentRound = {
            round: round.round,
            distance: round.distance,
            participants: [],
        };
        state.runningHorses = round.participants.map(horse => ({
            ...horse,
            position: 0,
        }));
    },
    updateHorsePosition(state: RaceState, payload: { horseId: number; position: number }) {
        const horse = state.runningHorses.find(h => h.id === payload.horseId);
        if (horse) horse.position = payload.position;
    },
    finishRound(state: RaceState, payload: { round: number; distance: number; result: Horse[] }) {
        state.results.push(payload);
        state.currentRound = null;
        state.runningHorses = [];
    },
    generateHorses(state: RaceState) {
        const horseNames = [
            "Caş", "Kafkaslı", "Ayabakan", "İlbatur", "Özgün", "Sergen", "Bozdoğan",
            "Beyzade", "Atom Karınca", "Hürbatur", "Karayel", "Nadas", "Cartegena",
            "Yavuzhan", "Grand Ekinoks", "Trapper", "Bold Pilot", "Turbo", "Cihangir", "Harmony"
        ];

        const colors = [
            "#FF5733", "#33FF57", "#3357FF", "#F0F033", "#FF33A1", "#33FFF0", "#FF8333",
            "#33FF83", "#8333FF", "#F0F0F0", "#FF3366", "#66FF33", "#33FF99", "#9966FF",
            "#FF9933", "#33CCFF", "#FFCC33", "#33FFCC", "#CC33FF", "#FF6633"
        ];

        state.horses = horseNames.map((name, i) => ({
            id: i + 1,
            name,
            color: colors[i % colors.length],
            condition: Math.floor(Math.random() * 100) + 1,
            position: 0,
        }));
    },
    generateSchedule(state: RaceState) {
        const distances = [1200, 1400, 1600, 1800, 2000, 2200];
        state.schedule = distances.map((distance, index) => ({
            round: index + 1,
            distance,
            participants: [...state.horses].sort(() => Math.random() - 0.5).slice(0, 10),
        }));
    },
    startRace(state: RaceState) {
        state.isRacing = true;
        state.results = [];
    },
    endRace(state: RaceState) {
        state.isRacing = false;
    },
};

const actions = {
    async runRace({ commit, state }: { commit: Function; state: RaceState }) {
        commit("startRace");

        for (const round of state.schedule) {
            const result = round.participants.map(horse => {
                const baseSpeed = 10 + horse.condition / 10;
                const randomFactor = 0.9 + Math.random() * 0.2; // şans faktörü oranları
                const speed = baseSpeed * randomFactor;
                const time = round.distance / speed; // saniye

                if ( horse.condition > 40) {
                    horse.condition = Math.max(1, horse.condition - round.distance / 200);
                }
                return {
                    ...horse,
                    time: parseFloat(time.toFixed(2)),
                };
            }).sort((a, b) => a.time - b.time);

            commit("startRound", round);

            const animationStart = Date.now();
            let isRunning = true;
            const speedMultiplier = 5; // atların hızını artır

            while (isRunning) {
                await new Promise(resolve => setTimeout(resolve, 50));
                const now = Date.now();
                const elapsedSec = (now - animationStart) / 1000;

                state.runningHorses.forEach(horse => {
                    const matching = result.find(h => h.id === horse.id);
                    if (matching) {
                        const progress = Math.min((elapsedSec / matching.time) * 100 * speedMultiplier, 100);
                        horse.position = progress;
                    }
                });

                isRunning = !state.runningHorses.every(h => h.position >= 100);
            }

            commit("finishRound", {
                round: round.round,
                distance: round.distance,
                result,
            });

            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        commit("endRace");
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};