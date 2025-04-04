import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import RaceTrack from "../../../src/components/RaceTrack/RaceTrack.vue";

describe("RaceTrack Component", () => {
    let store: any;
    let wrapper: any;

    beforeEach(() => {
        store = createStore({
            modules: {
                race: {
                    namespaced: true,
                    state: {
                        currentRound: {
                            round: 2,
                            distance: 1600,
                        },
                        runningHorses: [
                            { id: 1, name: "Ayabakan", position: 20, color: "#FF0000", time: 12 },
                            { id: 2, name: "Caş", position: 80, color: "#00FF00", time: 11.5 },
                        ],
                    },
                },
            },
        });

        wrapper = mount(RaceTrack, {
            global: {
                plugins: [store],
            },
        });
    });

    it("renders current round info", () => {
        expect(wrapper.text()).toContain("Round 2 - Distance: 1600m");
    });

    it("renders the correct number of horses", () => {
        const horses = wrapper.findAll("img[alt]");
        expect(horses).toHaveLength(2);
        expect(horses[0].attributes("alt")).toBe("Ayabakan");
        expect(horses[1].attributes("alt")).toBe("Caş");
    });

    it("shows a message when no race is in progress", async () => {
        store.state.race.currentRound = null;
        await wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();

        expect(wrapper.text()).toContain("No race in progress. Click \"Start Race\"!");
    });

    it("limits horse position to a maximum of 100", () => {
        store.state.race.runningHorses[1].position = 150;
        const horses = wrapper.vm.runningHorses;
        expect(horses[1].position).toBe(100);
    });
});