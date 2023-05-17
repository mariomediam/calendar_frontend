
import { useCalendarStore, useUiStore } from "../hooks";

export const FabDelete = () => {
  
  const { startDeletingEvent, activeEvent, hasActiveEevent } = useCalendarStore();

  const onClickDelete = (event) => {
    startDeletingEvent(activeEvent.id);
    
  };

  // if (!hasActiveEevent) {
  //   return null;
  // }

  return (
    <button className="btn btn-danger fab-danger" onClick={onClickDelete}
      style={{ display: hasActiveEevent ? "" : "none" }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
