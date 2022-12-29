import { Footer, Navbar } from "../../calendar"
import { DentistForm, DentistList } from "../components"

export const DentistPage = () => {
    return (
        <>
            <Navbar />
            <DentistForm />
            <DentistList /> 
            <Footer />
        </>
    )
}