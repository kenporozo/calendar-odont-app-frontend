import "D:/db-nosql/calendar-odon-app/src/css/style.css"
import "D:/db-nosql/calendar-odon-app/src/css/icomoon.css";

export const Footer = () => {
    return (
        <>
            <footer className="ftco-footer ftco-bg-dark ftco-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-5">
                                <h2 className="ftco-heading-2 logo">Diente Blanco</h2>
                                <p>Clínica dental con profesionales de primera categoría que aman su trabajo.</p>
                            </div>
                        </div>

                        <div className="col-md">
                            <div className="ftco-footer-widget mb-5">
                                <h2 className="ftco-heading-2">Contáctate con nosotros</h2>
                                <div className="block-23 mb-3">
                                    <ul>
                                        <li><span className="icon icon-map-marker"></span><span className="text">#12345 Concha y toro, Puente Alto</span></li>
                                        <li><a href="#"><span className="icon icon-phone"></span><span className="text"> +1 234 456 78910</span></a></li>
                                        <li><a href="#"><span className="icon icon-envelope"></span><span className="text">info@dentista.com</span></a></li>
                                    </ul>
                                </div>

                                <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
                                    <li className="ftco-animate"><a href="#"><span className="icon-twitter"></span></a></li>
                                    <li className="ftco-animate"><a href="#"><span className="icon-facebook"></span></a></li>
                                    <li className="ftco-animate"><a href="#"><span className="icon-instagram"></span></a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md">
                            <div className="ftco-footer-widget mb-5">
                                <h2 className="ftco-heading-2">Horario de atención</h2>
                                <h3 className="open-hours pl-4"><span className="ion-ios-time mr-3"></span>Lunes a sábado de 9:00 a 20:00</h3>
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
