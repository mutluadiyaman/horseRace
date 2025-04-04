import { describe, it, expect, beforeEach, vi } from "vitest";
import { createStore } from "vuex";
import raceModule from "../../src/store/modules/race";

describe("Race Vuex Store", () => {
    let store: any;

    beforeEach(() => {
        store = createStore({
            modules: {
                race: { ...raceModule, namespaced: true },
            },
        });
    });

    it("Başlangıç state doğru set ediliyor mu?", () => {
        expect(store.state.race.horses).toEqual([]);
        expect(store.state.race.schedule).toEqual([]);
        expect(store.state.race.results).toEqual([]);
        expect(store.state.race.isRacing).toBe(false);
        expect(store.state.race.currentRound).toBe(null);
        expect(store.state.race.runningHorses).toEqual([]);
    });

    it("Atlar başarıyla üretiliyor mu?", () => {
        store.commit("race/generateHorses");
        expect(store.state.race.horses.length).toBe(20); // 20 at oluşturulmalı
        expect(store.state.race.horses[0]).toHaveProperty("id");
        expect(store.state.race.horses[0]).toHaveProperty("name");
        expect(store.state.race.horses[0]).toHaveProperty("color");
        expect(store.state.race.horses[0]).toHaveProperty("condition");
    });

    it("Yarış programı oluşturuluyor mu?", () => {
        store.commit("race/generateHorses");
        store.commit("race/generateSchedule");
        expect(store.state.race.schedule.length).toBeGreaterThan(0);
        expect(store.state.race.schedule[0]).toHaveProperty("round");
        expect(store.state.race.schedule[0]).toHaveProperty("distance");
        expect(store.state.race.schedule[0].participants.length).toBe(10);
    });

    it("Yarış başlatılıyor mu?", () => {
        store.commit("race/startRace");
        expect(store.state.race.isRacing).toBe(true);
        expect(store.state.race.results).toEqual([]);
    });

    it("Yarış sıfırlanıyor mu?", () => {
        store.commit("race/resetRace");
        expect(store.state.race.horses).toEqual([]);
        expect(store.state.race.schedule).toEqual([]);
        expect(store.state.race.results).toEqual([]);
        expect(store.state.race.isRacing).toBe(false);
        expect(store.state.race.currentRound).toBe(null);
        expect(store.state.race.runningHorses).toEqual([]);
    });

    it("Bir round başlatılıyor mu?", () => {
        store.commit("race/generateHorses");
        store.commit("race/generateSchedule");

        const firstRound = store.state.race.schedule[0];
        store.commit("race/startRound", firstRound);

        expect(store.state.race.currentRound.round).toBe(firstRound.round);
        expect(store.state.race.currentRound.distance).toBe(firstRound.distance);
        expect(store.state.race.runningHorses.length).toBe(10);
    });

    it("Atların pozisyonları güncelleniyor mu?", () => {
        store.commit("race/generateHorses");
        store.commit("race/generateSchedule");
        store.commit("race/startRound", store.state.race.schedule[0]);

        const horseId = store.state.race.runningHorses[0].id;
        store.commit("race/updateHorsePosition", { horseId, position: 50 });

        expect(store.state.race.runningHorses.find(h => h.id === horseId).position).toBe(50);
    });

    it("Bir round başarıyla bitiriliyor mu?", () => {
        store.commit("race/generateHorses");
        store.commit("race/generateSchedule");
        store.commit("race/startRound", store.state.race.schedule[0]);

        const result = store.state.race.runningHorses.map(horse => ({
            ...horse,
            time: Math.random() * 100,
        }));

        store.commit("race/finishRound", {
            round: store.state.race.currentRound.round,
            distance: store.state.race.currentRound.distance,
            result,
        });

        expect(store.state.race.results.length).toBe(1);
        expect(store.state.race.currentRound).toBe(null);
        expect(store.state.race.runningHorses).toEqual([]);
    });

    it("Yarış başarıyla tamamlanıyor mu?", async () => {
        vi.useFakeTimers();

        store.commit("race/generateHorses");
        store.commit("race/generateSchedule");

        const racePromise = store.dispatch("race/runRace");

        await vi.runAllTimersAsync();

        await racePromise;

        expect(store.state.race.isRacing).toBe(false);
        expect(store.state.race.results.length).toBe(store.state.race.schedule.length);
    });

});