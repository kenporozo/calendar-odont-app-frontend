import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { backendApi } from '../api';
import { onSetActiveDentist, onAddNewDentist, onUpdateDentist, onDeleteDentist, onLoadDentists } from '../store';


export const useDentistStore = () => {
  
    const dispatch = useDispatch();
    const { dentists, activeDentist } = useSelector( state => state.dentist );

    const setActiveDentist = ( dentist ) => {
        dispatch(onSetActiveDentist( dentist ));
    }

    const startSavingDentist = async( dentist ) => {
        
        try {
            if( dentist._id ) {
                // Actualizando
                const {rut, ...dentistUpdate} = dentist;
                const {data} = await backendApi.put(`/dentists/${ dentist._id }`, dentistUpdate );
                dispatch( onUpdateDentist(data.dentist) );
                return;
            } 
    
            // Creando
            const { data } = await backendApi.post('/dentists', dentist );
            dispatch(onAddNewDentist(data.dentist))
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }

       
        
    }

    const startDeletingDentist = async(dentist) => {
        try {
            console.log(dentist);
            const {data} = await backendApi.delete(`/dentists/${dentist._id}` );
            console.log(data.dentist)
                dispatch( onUpdateDentist(data.dentist) );
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }

    }
    
    const startActivatingDentist = async(dentist) => {
        try {
            console.log(dentist);
            const {data} = await backendApi.put(`/dentists/${dentist._id}`, {isActive: true} );
            dispatch( onUpdateDentist({...data.dentist}) );
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }

    }


    const startLoadingDentists = async() => {
        try {
            
            const { data } = await backendApi.get('/dentists');
            dispatch( onLoadDentists( data.dentists ) );

        } catch (error) {
          console.log('Error cargando dentistas');
          console.log(error)
        }
    }
    


    return {
        //* Propiedades
        activeDentist,
        dentists,
        // hasEventSelected: !!activeEvent,

        //* Métodos
        setActiveDentist,
        startDeletingDentist,
        startLoadingDentists,
        startSavingDentist,
        startActivatingDentist
    }
}
