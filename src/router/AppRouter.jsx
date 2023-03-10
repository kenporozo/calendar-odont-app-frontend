import { useEffect } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { DentistPage } from '../dentist';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {

    const { status, checkAuthToken, user } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, [])

    if ( status === 'checking' ) {
        return (
            <h3>Cargando...</h3>
        )
    }

    console.log('user ', user)

    return (
        <Routes>
            {
                (status === "authenticated")
                &&
                <>
                    <Route path="/*" element={<Navigate to={"/calendar/*"}/>} />
                    <Route path="/dentist" element={<DentistPage />} />
                </>
            }
            <Route path="/calendar/*" element={<CalendarPage />}/> 
            <Route path="/*" element={<LoginPage />}/>
        </Routes>
    )
}