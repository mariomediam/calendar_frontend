import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
} from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  // const addNewEvent = (event) => {
  //     dispatch(onAddNewEvent(event));
  // };

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  // const clearActiveEvent = () => {
  //     dispatch(onClearActiveEvent());
  // };

  //   const updateEvent = (calendarEvent) => {
  //       dispatch(onUpdateEvent(calendarEvent));
  //   };

  // const deleteEvent = (event) => {
  //     dispatch(onDeleteEvent(event));
  // };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        //Actualizar
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      //Crear
      const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    } catch (error) {
      console.log(error)
      Swal.fire("Error al guardar", error.response.data.message, "error");
    }
  };

  const startDeletingEvent = async  (calendarEvent) => {
    try {
      await calendarApi.delete(`/events/${calendarEvent}`)
      dispatch(onDeleteEvent(calendarEvent));
      
    } catch (error) {
      console.log(error)
      Swal.fire("Error al eliminar", error.response.data.message, "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");

      const events = convertEventsToDateEvents(data.eventos);
      console.log({ events });
      dispatch(onLoadEvents(events));

      // const events = data.eventos.map((event) => ({
      //   ...event,
      //   start: new Date(event.start),
      //   end: new Date(event.end),
      // }));
      // dispatch(onAddNewEvent(events));
    } catch (error) {
      console.log("Error cargando eventos");
      console.log(error);
    }
  };

  return {
    events,
    activeEvent,
    // addNewEvent,
    hasActiveEevent: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    // clearActiveEvent,
    // updateEvent,
    // deleteEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
