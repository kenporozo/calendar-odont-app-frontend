import "./LoginPage.css";
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import { NavLink } from "react-router-dom";

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    name: '',
    lastname: '',
    rut: '',
    email: '',
    phone: '',
    password: '',
}

export const LoginPage = () => {

    const { startLogin, errorMessage, startRegister } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);
    const { name, lastname, rut, email, phone, password, onInputChange: onRegisterInputChange } = useForm(registerFormFields);

    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    }

    const registerSubmit = (event) => {
        event.preventDefault();
        startRegister({ name, lastname, rut, email, phone, password });
    }
    const onSelectChanged = (event) =>{
        console.log("El evnto es", event.target.value);
        setIdDentist(event.target.value);
    }


    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire({
                title: "Error",
                confirmButtonText: "Volver",
                confirmButtonColor: "#46b7de",
                text: errorMessage,
                icon: "error"
            });
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
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="row">
                            <input
                                type="submit"
                                className="btnSubmit col"
                                value="Ingresar"
                            />
                            <NavLink
                                to={"/calendar"}
                                className="btnSubmit col text-center"
                            >
                                Ingresar sin registro
                            </NavLink>
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="row">
                            <div className="form-group mb-2 col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    name="name"
                                    value={name}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="form-group mb-2 col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Apellido"
                                    name="lastname"
                                    value={lastname}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group mb-2 col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="RUT"
                                    name="rut"
                                    value={rut}
                                    onChange={onRegisterInputChange}

                                />
                            </div>

                            <div className="form-group mb-2 col">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Correo"
                                    name="email"
                                    value={email}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group mb-2 col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Teléfono"
                                    name="phone"
                                    value={phone}
                                    onChange={onRegisterInputChange}
                                />
                            </div>

                            <div className="form-group mb-2 col">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    name="password"
                                    value={password}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                        </div>

                        <div className="d-grid gap-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}