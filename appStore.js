import create from "zustand";

export const useStore = create((set) => ({
	origin: null,
	setOrigin: (e) => set({ origin: e }),

	destination: null,
	setDestination: (e) => set({ destination: e }),

	travelTimeInformation: null,
	setTravelTimeInformation: (e) => set({ travelTimeInformation: e }),
}));
