import { useEffect } from "react";
import useEventStore from "../store/eventStore";

const EventList = () => {
    const { events, fetchEvents } = useEventStore();

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div>
            {events.map(event => (
                <div key={event.Ivent_ID}>
                    <h3>{event.Ivent_name}</h3>
                    <p>{event.Ivent_description}</p>
                </div>
            ))}
        </div>
    );
};

export default EventList;
