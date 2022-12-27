import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { useEffect, useState } from 'react';
import { addHours, setHours, setMinutes, isEqual } from 'date-fns';
import { useAuthStore, useCalendarStore, useDentistStore } from '../../hooks';

registerLocale('es', es);

export const ReserveForm = () => {

    const {dentists, startLoadingDentists} = useDentistStore();
    const {startSavingEvent, events} = useCalendarStore();
    const {user} = useAuthStore();

    const [idDentist, setIdDentist] = useState(0);

    const [formValues, setFormValues] = useState({
        start: new Date(),
        name: '',
        lastname: '',
        rut: '',
        email: '',
        phone: ''
    });

    const onSelectChanged = (event) =>{
        setIdDentist(event.target.value);
    }

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = (event) => {
        setFormValues({
            ...formValues,
            "start": event
        })
    }

    const onFormSubmit = async( event ) => {
        event.preventDefault();

        let dentist = dentists.find(dentist => dentist._id === idDentist);

        localStorage.setItem("name", dentist.name);
        localStorage.setItem("lastname", dentist.lastname);

        if(localStorage.getItem('token')){
            await startSavingEvent({
                start: formValues.start,
                end: addHours(formValues.start,1),
                user: user._id,
                dentist: idDentist,
            })
        }else{
            event = formValues;
            event.end = addHours(event.start,1);
            event.dentist = idDentist;
    
            // TODO: 
            console.log(event)
            await startSavingEvent( event );
        }
    }


    const times = [
        setHours(setMinutes(new Date(), 0), 21),
        setHours(setMinutes(new Date(), 0), 22),
        setHours(setMinutes(new Date(), 0), 23),
        setHours(setMinutes(new Date(), 0), 0),
        setHours(setMinutes(new Date(), 0), 1),
        setHours(setMinutes(new Date(), 0), 2),
        setHours(setMinutes(new Date(), 0), 3),
        setHours(setMinutes(new Date(), 0), 4),
        setHours(setMinutes(new Date(), 0), 5),
        setHours(setMinutes(new Date(), 0), 6),
        setHours(setMinutes(new Date(), 0), 7),
        setHours(setMinutes(new Date(), 0), 8),
    ];

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return currentDate.getTime() < selectedDate.getTime();
      }

    useEffect(() => {
        startLoadingDentists();
    }, []);

    return (
        <section className="ftco-section ftco-no-pt ftco-no-pb">
            <div className="container-fluid px-md-0">
                <div className="row no-gutters">
                    <div className="col-md-3 d-flex align-items-stretch">
                        <div className="consultation w-100 text-center px-4 px-md-5">
                            <h3 className="mb-4">Odontofeliz</h3>
                            <p>La más prestigiosa clínica dental al mejor precio</p>

                        </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch">
                        <div className="consultation consul w-100 px-4 px-md-5">
                            <div className="text-center">
                                <h3 className="mb-4">Consulta Gratis</h3>
                            </div>
                            <form onSubmit={onFormSubmit} className="appointment-form">
                                <div className="row">
                                    <div className="col-md-12 col-lg-6 col-xl-4">
                                        <div className="form-group">
                                            <input 
                                                type="text"
                                                name='name' 
                                                className="form-control" 
                                                placeholder="Nombre"
                                                required
                                                value={
                                                    (user.name === undefined)
                                                    ?
                                                    formValues.name
                                                    :
                                                    user.name
                                                }
                                                readOnly={
                                                    (!user)
                                                }
                                                onChange={onInputChanged}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-xl-4">
                                        <div className="form-group">
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                name='lastname' 
                                                placeholder="Apellido"
                                                required
                                                value={
                                                    (user.lastname === undefined)
                                                    ?
                                                    formValues.lastname
                                                    :
                                                    user.lastname
                                                }
                                                readOnly={
                                                    (!user)
                                                }
                                                onChange={onInputChanged}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-xl-4">
                                        <div className="form-group">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="RUT"
                                                name='rut'
                                                required
                                                value={
                                                    (user.rut === undefined)
                                                    ?
                                                    formValues.rut
                                                    :
                                                    user.rut
                                                }
                                                readOnly={
                                                    (!user)
                                                }
                                                onChange={onInputChanged}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-xl-4">
                                        <div className="form-group">
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                placeholder="Email"
                                                name='email'
                                                required
                                                value={
                                                    (user.email === undefined)
                                                    ?
                                                    formValues.email
                                                    :
                                                    user.email
                                                }
                                                readOnly={
                                                    (!user)
                                                }
                                                onChange={onInputChanged}    
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-xl-4">
                                        <div className="form-group">
                                            <input 
                                                type="text"
                                                className="form-control"
                                                placeholder="Telefono"
                                                name='phone'
                                                required
                                                value={
                                                    (user.phone === undefined)
                                                    ?
                                                    formValues.phone
                                                    :
                                                    user.phone
                                                }
                                                readOnly={
                                                    (!user)
                                                }
                                                onChange={onInputChanged}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-xl-4">
                                        <div className="form-group">
                                            <div className="form-field">
                                                <div className="select-wrap">
                                                    <select name="dentist" 
                                                        id="dentist" 
                                                        className="form-select form-select-sm" 
                                                        onChange={onSelectChanged} 
                                                        defaultValue={"Dentista"}
                                                        >
                                                        <option disabled>Dentista</option>
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
                                    <div className="col-md-8 ">
                                        <div className="form-group">
                                            <div className="input-wrap">
                                                {/* <input type="text" name="start" /> */}
                                                <DatePicker
                                                    minDate={ new Date() }
                                                    selected={formValues.start}
                                                    onChange={(event) => onDateChanged(event)}
                                                    className="form-control"
                                                    name='start'
                                                    dateFormat="Pp"
                                                    showTimeSelect
                                                    locale="es"
                                                    timeCaption="Hora"
                                                    timeIntervals={60}
                                                    isClearable
                                                    placeholderText='Fecha de inicio'
                                                    withPortal
                                                    excludeTimes={times}
                                                    filterTime={filterPassedTime}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-xl-4">
                                        <div className="form-group">
                                            <input 
                                                type="submit"
                                                value="Agenda una Hora"
                                                className="btn btn-secondary py-2 px-4"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-3 d-flex align-items-stretch">
                        <div className="consultation w-100 text-center px-4 px-md-5">
                            <h3 className="mb-4">Nuestro Personal</h3>
                            <p>Tenemos los dentistas más capacitados </p>
                            {/* <a href="#" className="btn-custom">Conoce a nuestros doctores</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}