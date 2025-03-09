import { create } from 'zustand';
import axios from 'axios';

const useEventStore = create((set) => ({
    events: [],
    fetchEvents: async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/events`);
            set({ events: response.data.events });
        } catch (error) {
            console.error("Ошибка загрузки ивентов", error);
        }
    }
}));

export default useEventStore;
