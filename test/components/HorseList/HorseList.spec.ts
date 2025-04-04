import { describe, it, expect, vi, beforeEach } from "vitest";
import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import HorseList from "../../../src/components/HorseList/HorseList.vue";

describe("HorseList Component", () => {
    let store: any;
    let wrapper: any;

    beforeEach(() => {
        store = createStore({
            modules: {
                race: {
                    namespaced: true,
                    state: {
                        horses: [
                            { id: 1, name: "Caş", condition: 85, color: "#FF5733" },
                            { id: 2, name: "Kafkaslı", condition: 78, color: "#33FF57" },
                            { id: 3, name: "Ayabakan", condition: 92, color: "#3357FF" },
                        ],
                    },
                },
            },
        });

        wrapper = mount(HorseList, {
            global: {
                plugins: [store],
            },
        });
    });

    it("should render the list of horses", () => {
        expect(wrapper.find("table").exists()).toBe(true);
        expect(wrapper.findAll("tr").length).toBeGreaterThan(1);
    });

    it("should display horse details correctly", () => {
        const firstHorse = store.state.race.horses[0];
        const horseRows = wrapper.findAll("tbody tr");

        const firstRow = horseRows[0];
        expect(firstRow.text()).toContain(firstHorse.id.toString());
        expect(firstRow.text()).toContain(firstHorse.name);
        expect(firstRow.text()).toContain(firstHorse.condition.toString());
    });
});
