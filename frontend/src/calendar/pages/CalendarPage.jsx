import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { addHours } from "date-fns";

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../../components";
import { localizer, getMessagesES } from "../../helpers";
import { useEffect, useState } from "react";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";

// const myEventsList = [
//   {
//     title: "Cumpleaños del jefe",
//     notes: "Hay que comprar el pastel",
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgcolor: "#fafafa",
//     user: {
//       _id: "123",
//       name: "Mario",
//     },
//   },
//   {
//     title: "Lavar auto",
//     notes: "Hay que lavar y encerar el auto",
//     start: addHours(new Date(), 5),
//     end: addHours(new Date(), 8),
//     bgcolor: "#fafafa",
//     user: {
//       _id: "123",
//       name: "Mario",
//     },
//   },
// ];

export const CalendarPage = () => {

  const { user } = useAuthStore();

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()
  const { openDateModal } = useUiStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);

    const style = {
      backgroundColor: isMyEvent ? "#367CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return { style };
  };

  const onDoubleClick = (e) => {
    // console.log({ doubleClick: e });
    openDateModal();
  };

  const onSelect = (e) => {
    // console.log({ click: e });
    setActiveEvent(e);
  };

  const onViewChange = (e) => {
    localStorage.setItem("lastView", e);
  };

  useEffect(() => {
    startLoadingEvents()
  }, [])
  


  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
        
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
