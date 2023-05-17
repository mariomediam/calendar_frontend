import { useEffect } from "react";

import "./loginPage.css";
import { useAuthStore, useForm } from "../../hooks";
import Swal from "sweetalert2"

const loginFields = {
  loginEmail: "",
  loginPassword: "",
};

const registerFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};

export const LoginPage = () => {
  const { startLogin, errorMessage, startRegister } = useAuthStore();


  const {
    loginEmail,
    loginPassword,
    onInputChange: loginOnInputChange,
  } = useForm(loginFields);

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: registerOnInputChange,
  } = useForm(registerFields);

  const loginSubmit = (e) => {
    e.preventDefault();
    startLogin(loginEmail, loginPassword)
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    try {

      if (registerPassword !== registerPassword2) {
        return Swal.fire({
          icon: 'error',
          title: 'Error en la autenticación',
          text: 'Las contraseñas deben de ser iguales',
        })
      }
      
      startRegister(registerEmail, registerPassword, registerName)
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error en la autenticación',
        text:  errorMessage,  
      })
    }

    


    console.log(
      registerName,
      registerEmail,
      registerPassword,
      registerPassword2
    );
  };

  useEffect(() => 
    {
      if(errorMessage){
        Swal.fire({
          icon: 'error',
          title: 'Error en la autenticación',
          text: errorMessage,
        })
      }

  }, [errorMessage])
  

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={loginOnInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={loginOnInputChange}
              />
            </div>
            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={registerOnInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={registerOnInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={registerOnInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                value={registerPassword2}
                onChange={registerOnInputChange}
              />
            </div>

            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
