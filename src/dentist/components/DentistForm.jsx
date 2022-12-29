import { useEffect, useState } from 'react';
import { useAuthStore, useDentistStore } from '../../hooks';

export const DentistForm = () =>{

    const {user} = useAuthStore();

    const {activeDentist, startSavingDentist, setActiveDentist} = useDentistStore();

    const [formValues, setFormValues] = useState({
        name: '',
        lastname: '',
        rut: '',
        phone: ''
    });

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    useEffect(() => {
        if ( activeDentist !== null ) {
            setFormValues({ ...activeDentist });
        }    
        
      }, [ activeDentist ])

    const onFormSubmit = async( event ) => {
        event.preventDefault();
        console.log(formValues);
        await startSavingDentist(formValues);
        setActiveDentist(null);
    }

    return(
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
                                <h3 className="mb-4">Mantenedor de dentistas</h3>
                            </div>
                            <form onSubmit={onFormSubmit} className="appointment-form">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input 
                                                type="text"
                                                name='name' 
                                                className="form-control" 
                                                placeholder="Nombre"
                                                required
                                                value={formValues.name}
                                                onChange={onInputChanged}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                name='lastname' 
                                                placeholder="Apellido"
                                                required
                                                value={formValues.lastname}
                                                onChange={onInputChanged}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="RUT"
                                                name='rut'
                                                required
                                                value={formValues.rut}
                                                onChange={onInputChanged}
                                                readOnly={activeDentist}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input 
                                                type="text"
                                                className="form-control"
                                                placeholder="Telefono"
                                                name='phone'
                                                required
                                                value={formValues.phone}
                                                onChange={onInputChanged}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input 
                                                type="submit"
                                                value="Guardar"
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
                            <a href="#" className="btn-custom">Conoce a nuestros dentistas</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}