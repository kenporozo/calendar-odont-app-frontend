import { Calendar } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Navbar, Footer, CalendarEvent, ReserveForm } from "../";
import { localizer, getMessagesES } from '../../helpers/';
import { useEffect, useState } from 'react';
import { useAuthStore, useCalendarStore, useDentistStore } from '../../hooks';
import Swal from 'sweetalert2';


export const CalendarPage = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    const { events, activeEvent, setActiveEvent, startLoadingEvents, startDeletingEvent, startLoadingEventsByFilter } = useCalendarStore();
    const { dentists, startLoadingDentists } = useDentistStore();
    const [idDentist, setIdDentist] = useState(0);

    const { user } = useAuthStore();

    const onDoubleClick = async (event) => {
        const { value: formValues } = await Swal.fire({
            title: 'CANCELAR RESERVA',
            text: `¿Deseas cancelar la reserva de ${event.name || event.user.name}?`,
            confirmButtonText: "Eliminar",
            confirmButtonColor: "#46b7de",
            icon: 'warning',
            html:
                '<input id="swal-input1" class="swal2-input" type="text" placeholder="Ingresa RUT del cliente">',
            showCancelButton: true,
            cancelButtonColor: '#46b7de',
            cancelButtonText: "Volver",
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value
                ]
            }
        })

        if (formValues !== undefined) {
            if (formValues[0] !== (event.rut || event.user.rut)) {
                setActiveEvent(null);
                return Swal.fire('RUT incorrecto', "El RUT ingresado no coincide con el registrado", 'error');
            }
            startDeletingEvent();
        }

    }
    const onSelect = (event) => {
        console.log({ click: event });
        setActiveEvent(event);
    }

    const onViewChanged = (event) => {
        localStorage.setItem("lastView", event)
    }

    useEffect(() => {
        startLoadingEvents()
    }, []);

    const onSelectChanged = (event) => {
        setIdDentist(event.target.value);
    }

    useEffect(() => {
        startLoadingDentists();
    }, []);

    const onFormFilterSubmit = async( event ) => {
        event.preventDefault();
        console.log(idDentist);
        if(idDentist == 0){
            await startLoadingEvents();
        }else{
            await startLoadingEventsByFilter(idDentist);
        }
    }

    return (
        <>
            <Navbar />
            <ReserveForm />
            <div className="container">
                <form onSubmit={onFormFilterSubmit}>
                    <div className="row">
                            <div className="col-md-12 col-lg-6 col-xl-4">
                                <div className="form-group">
                                    <div className="form-field">
                                        <div className="select-wrap">
                                            <select name="dentist"
                                                id="dentist"
                                                className="form-select form-select"
                                                onChange={onSelectChanged}
                                                defaultValue={"Dentista"}
                                            >
                                                <option disabled>Seleccione</option>
                                                <option value={0}>Todos</option>
                                                {
                                                    dentists.map(dentist => {
                                                        return (
                                                            <option
                                                                key={dentist._id}
                                                                value={dentist._id}
                                                            >{`${dentist.name} ${dentist.lastname}`}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-xl-4">
                                <div className="form-group">
                                    <input
                                        type="submit"
                                        value="Filtrar"
                                        className="btn btn-secondary py-2 px-4"
                                    />
                                </div>
                            </div>
                    </div>
                </form>
                <Calendar
                    culture='es'
                    defaultView={lastView}
                    views={['week', 'day']}
                    min={new Date(1972, 0, 1, 9, 0, 0)}
                    max={new Date(2024, 0, 1, 21, 0, 0)}
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 650 }}
                    messages={getMessagesES()}
                    components={{
                        event: CalendarEvent
                    }}
                    onDoubleClickEvent={onDoubleClick}
                    onSelectEvent={onSelect}
                    onView={onViewChanged}
                />
            </div>
            <Footer />
        </>
    )
}