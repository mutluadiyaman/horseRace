import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import RaceResults from "../../../src/components/RaceResult/RaceResult.vue";

describe("RaceResults Component", () => {
    let store: any;
    let wrapper: any;

    beforeEach(() => {
        store = createStore({
            modules: {
                race: {
                    namespaced: true,
                    state: {
                        results: [
                            {
                                round: 1,
                                distance: 1200,
                                result: [
                                    { id: 9, name: "Caş" },
                                    { id: 3, name: "Kafkaslı" },
                                    { id: 1, name: "Ayabakan" },
                                ],
                            },
                            {
                                round: 2,
                                distance: 1400,
                                result: [
                                    { id: 2, name: "Bozdoğan" },
                                    { id: 4, name: "İlbatur" },
                                ],
                            },
                        ],
                    },
                },
            },
        });

        wrapper = mount(RaceResults, {
            global: {
                plugins: [store],
            },
        });
    });

    it("should display race result titles", () => {
        const titles = wrapper.findAll("h3");
        expect(titles).toHaveLength(2);
        expect(titles[0].text()).toContain("1 ST Lap 1200m");
        expect(titles[1].text()).toContain("2 ST Lap 1400m");
    });

    it("should list horses with correct position", () => {
        const rows = wrapper.findAll("tbody tr");
        expect(rows).toHaveLength(5);

        expect(rows[0].text()).toContain("1");
        expect(rows[0].text()).toContain("Caş");

        expect(rows[1].text()).toContain("2");
        expect(rows[1].text()).toContain("Kafkaslı");

        expect(rows[4].text()).toContain("2");
        expect(rows[4].text()).toContain("İlbatur");
    });

    it("should show fallback message if no results", async () => {
        // Store'u güncelle
        await wrapper.setData({}); // önce data'yı sıfırla
        store.state.race.results = [];

        await wrapper.vm.$forceUpdate(); // Yeniden çizimi tetikle
        await wrapper.vm.$nextTick();

        expect(wrapper.text()).toContain("No results yet. Start the race!");
    });
});
