import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import RaceSchedule from "../../../src/components/RaceSchedule/RaceSchedule.vue";

describe("RaceSchedule Component", () => {
    let store: any;
    let wrapper: any;

    beforeEach(() => {
        store = createStore({
            modules: {
                race: {
                    namespaced: true,
                    state: {
                        schedule: [
                            {
                                round: 1,
                                distance: 1200,
                                participants: [
                                    { id: 1, name: "Ayabakan", color: "#FF0000" },
                                    { id: 2, name: "Caş", color: "#00FF00" },
                                ],
                            },
                            {
                                round: 2,
                                distance: 1600,
                                participants: [
                                    { id: 3, name: "İlbatur", color: "#0000FF" },
                                ],
                            },
                        ],
                    },
                },
            },
        });

        wrapper = mount(RaceSchedule, {
            global: {
                plugins: [store],
            },
        });
    });

    it("should render race schedule titles", () => {
        const titles = wrapper.findAll("h3");
        expect(titles).toHaveLength(2);
        expect(titles[0].text()).toContain("1 ST Lap 1200m");
        expect(titles[1].text()).toContain("2 ST Lap 1600m");
    });

    it("should render all horses in each round", () => {
        const rows = wrapper.findAll("tbody tr");
        expect(rows).toHaveLength(3);

        expect(rows[0].text()).toContain("1");
        expect(rows[0].text()).toContain("Ayabakan");

        expect(rows[1].text()).toContain("2");
        expect(rows[1].text()).toContain("Caş");

        expect(rows[2].text()).toContain("1");
        expect(rows[2].text()).toContain("İlbatur");
    });

    it("should show fallback text when no schedule", async () => {
        store.state.race.schedule = [];
        await wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();

        expect(wrapper.text()).toContain("Race Schedule");
    });
});
