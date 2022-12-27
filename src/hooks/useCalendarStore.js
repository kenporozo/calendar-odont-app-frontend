import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { backendApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';


export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        
        try {
            const { data } = await backendApi.post('/reservations', calendarEvent );
            dispatch( onAddNewEvent({ 
                ...calendarEvent, 
                _id: data.reservation.uid, 
                user: data.reservation.user
            }));

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }    
    }

    const startDeletingEvent = async() => {
        try {
            await backendApi.delete(`/reservations/${ activeEvent._id }` );
            dispatch( onDeleteEvent() );
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }

    }


    const startLoadingEvents = async() => {
        try {
            
            const { data } = await backendApi.get('/reservations');
            const events = convertEventsToDateEvents( data.reservations );
            dispatch( onLoadEvents( events ) );

        } catch (error) {
          console.log('Error cargando eventos');
          Swal.fire('Error cargando eventos', error.response.data.msg, 'error');
        }
    }
    const startLoadingEventsByFilter = async(dentistId) => {
        try {
            const { data } = await backendApi.get(`/reservations/${dentistId}`);
            const events = convertEventsToDateEvents( data.reservations );
            dispatch( onLoadEvents( events ) );

        } catch (error) {
          console.log('Error cargando eventos');
          console.log(error)
        }
    }
    


    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //* Métodos
        setActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent,
        startLoadingEventsByFilter,
    }
}
