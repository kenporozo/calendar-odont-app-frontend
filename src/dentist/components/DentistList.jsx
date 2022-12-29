import { useEffect } from "react";
import Swal from "sweetalert2";
import { useDentistStore } from "../../hooks";


export const DentistList = () => {
    const { dentists, startLoadingDentists, setActiveDentist, startDeletingDentist, startActivatingDentist } = useDentistStore();

    useEffect(() => {
        startLoadingDentists();
    }, []);

    const handleUpdate = async (dentist) => {
       setActiveDentist(dentist);
    }

    const handleDelete = (dentist) => {
        Swal.fire({
            title: "¿Deseas desactivar?",
            text: `El dentista ${dentist.name} ${dentist.lastname} será desactivado de manera permanente`,
            confirmButtonText: "Desactivar",
            confirmButtonColor: "#46b7de",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#46b7de',
            cancelButtonText: "Volver"
        }).then((result) => {
            if (result.isConfirmed) {
                startDeletingDentist(dentist);
            }
        })
    }

    const handleActivate = (dentist) => {
        Swal.fire({
            title: "¿Deseas activar?",
            text: `El dentista ${dentist.name} ${dentist.lastname} será activado`,
            confirmButtonText: "Activar",
            confirmButtonColor: "#46b7de",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#46b7de',
            cancelButtonText: "Volver"
        }).then((result) => {
            if (result.isConfirmed) {
                startActivatingDentist(dentist);
            }
        })
    }

    return (
        <>
            <div className="container">
                <p><strong>Total de dentistas: </strong> {dentists.length}</p>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="text-center">Nombre</th>
                            <th className="text-center">Apellido</th>
                            <th className="text-center">RUT</th>
                            <th className="text-center">Telefóno</th>
                            <th className="text-center">Acción</th>
                            <th className="text-center">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dentists.map((dentist) => {
                                return (
                                    <tr key={dentist._id}>
                                        <td className="text-center">{dentist.name}</td>
                                        <td className="text-center">{dentist.lastname}</td>
                                        <td className="text-center">{dentist.rut}</td>
                                        <td className="text-center">{dentist.phone}</td>
                                        {
                                            (dentist.isActive)
                                                ?
                                                <td className="delete text-center"
                                                    onClick={() => handleDelete(dentist)}>
                                                    <i className="fa-solid fa-user-minus"></i>
                                                </td>
                                                :
                                                <td className="delete text-center"
                                                    onClick={() => handleActivate(dentist)}>
                                                    <i className="fa-solid fa-user-plus"></i>
                                                </td>
                                        }
                                        <td className="delete text-center"
                                            onClick={() => handleUpdate(dentist)}>
                                            <i className="fa-solid fa-user-pen"></i>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )

}