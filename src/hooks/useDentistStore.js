import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { backendApi } from '../api';
import { onAddNewDentist, onDeleteDentist, onLoadDentists } from '../store';


export const useDentistStore = () => {
  
    const dispatch = useDispatch();
    const { dentists } = useSelector( state => state.dentist );

    // const setActiveEvent = ( calendarEvent ) => {
    //     dispatch( onSetActiveEvent( calendarEvent ) )
    // }

    // const startSavingEvent = async( calendarEvent ) => {
        
    //     try {
    //         // if( calendarEvent.id ) {
    //         //     // Actualizando
    //         //     await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
    //         //     dispatch( onUpdateEvent({ ...calendarEvent, user }) );
    //         //     return;
    //         // } 
    
    //         // Creando
    //         const { data } = await backendApi.post('/reservations', calendarEvent );
    //         // if(!user){
    //         //     dispatch( onAddNewEvent({ ...calendarEvent, 
    //         //                             _id: data.reservation._id, 
    //         //                             user: {
    //         //                                 _id: data.reservation._ip,
    //         //                                 name: data.reservation.name
    //         //                             } }) );
    //         // }
    //         dispatch( onAddNewEvent({ ...calendarEvent, _id: data.reservation._id, user }) );

    //     } catch (error) {
    //         console.log(error);
    //         Swal.fire('Error al guardar', error.response.data.msg, 'error');
    //     }

       
        
    // }

    // const startDeletingEvent = async() => {
    //     // Todo: Llegar al backend
    //     try {
    //         await backendApi.delete(`/events/${ activeEvent.id }` );
    //         dispatch( onDeleteEvent() );
    //     } catch (error) {
    //         console.log(error);
    //         Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    //     }

    // }


    const startLoadingDentists = async() => {
        try {
            
            const { data } = await backendApi.get('/dentists');
            console.log(data.dentists)
            dispatch( onLoadDentists( data.dentists ) );

        } catch (error) {
          console.log('Error cargando dentistas');
          console.log(error)
        }
    }
    


    return {
        //* Propiedades
        // activeEvent,
        dentists,
        // hasEventSelected: !!activeEvent,

        //* Métodos
        // setActiveEvent,
        // startDeletingEvent,
        startLoadingDentists,
        // startSavingEvent,
    }
}
