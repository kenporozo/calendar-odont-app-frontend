import { useAuthStore, useCalendarStore, useDentistStore } from "../../hooks/"
import "D:/db-nosql/calendar-odon-app/src/css/style.css"
import "D:/db-nosql/calendar-odon-app/src/css/icomoon.css";
import { NavLink } from "react-router-dom";
// import "./css/flaticon.css";

export const Navbar = () => {

	const { startLogout, user } = useAuthStore();
	const { startLoadingEvents, events } = useCalendarStore();
	const {setActiveDentist} = useDentistStore();

	const onLogout = () => {
		startLogout();
		startLoadingEvents();
		setActiveDentist(null)
	}

	return (
		<>
			<div className="py-md-5 py-4 border-bottom">
				<div className="container">
					<div className="row no-gutters d-flex align-items-start align-items-center px-3 px-md-0">
						<div className="col-md-4 order-md-2 mb-2 mb-md-0 align-items-center text-center">
							<a className="navbar-brand" href="index.html">Odontofeliz<span>Clínica dental</span></a>
						</div>
						<div className="col-md-4 order-md-1 d-flex topper mb-md-0 mb-2 align-items-center text-md-right">
							<div className="icon d-flex justify-content-center align-items-center order-md-last">
								<span className="icon-map"></span>
							</div>
							<div className="pr-md-4 pl-md-0 pl-3 text">
								<p className="con"><span>Llámenos al</span> <span>+1 234 456 78910</span></p>
								<p className="con">#12345 Concha y toro, Puente Alto</p>
							</div>
						</div>
						<div className="col-md-4 order-md-3 d-flex topper mb-md-0 align-items-center">
							<div className="icon d-flex justify-content-center align-items-center"><span className="icon-paper-plane"></span></div>
							<div className="text pl-3 pl-md-3">
								<p className="hr"><span>Horario de atención</span></p>
								<p className="time"><span>Lunes a Sábado:</span> <span>9:00am - 8:00pm</span> Domingo: Cerrado</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark ftco-navbar-light" id="ftco-navbar">
				<div className="container d-flex align-items-center">
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="oi oi-menu"></span> Menu
					</button>
					<div className="collapse navbar-collapse" id="ftco-nav">
						<ul className="navbar-nav m-auto">
							<li
								className="nav-item active"
							>
								<NavLink
									to={"/calendar"}
									className={({ isActive }) => {
										return `${isActive ? "nav-link pl-0" : "nav-link pl-0"}`
									}}
								>
									Inicio
								</NavLink>
								{/* <a href="#" className="nav-link pl-0">Inicio</a> */}
							</li>
							{
								(localStorage.getItem("token"))
									?
									(user.role === "ADMIN_ROLE")
										?
										<>
											<li className="nav-item">
												<NavLink
													to={"/dentist"}
													className="nav-link"
												>
													Dentistas
												</NavLink>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													onClick={onLogout}
													href="#"
												>
													Salir
													&nbsp;
													<i className="fas fa-sign-out-alt"></i>
												</a>
											</li>
										</>

										:
										// 	(<li className="nav-item">
										// 		<a
										// 			className="nav-link"
										// 			onClick={onLogout}
										// 			href="#"
										// 		>
										// 			Salir
										// 			&nbsp;
										// 			<i className="fas fa-sign-out-alt"></i>
										// 		</a>
										// 	</li>)
										// :
										(<li className="nav-item">
											<a
												className="nav-link"
												onClick={onLogout}
												href="#"
											>
												Salir
												&nbsp;
												<i className="fas fa-sign-out-alt"></i>
											</a>
										</li>)
									:
									(<li className="nav-item">
										<NavLink
											to={"/auth/login"}
											className="nav-link"
										>
											Login
										</NavLink>
									</li>)
							}
						</ul>
					</div>
				</div>
			</nav>
		</>
	)
}
