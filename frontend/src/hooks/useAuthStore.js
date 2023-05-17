import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { onChecking, onLogin, onLogout, clearErrorMessage, onLogoutCalendar } from "../store";
import { set } from "date-fns";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const startLogin = async (email, password) => {
    
    try {
      dispatch(onChecking());
      const { data } = await calendarApi.post("/auth", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout(error.message));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async (email, password, name) => {    

    try {
      dispatch(onChecking());
      const { data } = await calendarApi.post("/auth/new", { email, password, name });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout( error.response.data?.msg || error.message));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };


  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(onLogout());
      return false;
    }
    try {
      const { data } =  await calendarApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("token-init-date");
      dispatch(onLogout(error.message));
    }
  };

  const startLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");
    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };

  return {
    // Propiedades
    errorMessage,
    status,
    user,

    // Métodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout
  };
};
