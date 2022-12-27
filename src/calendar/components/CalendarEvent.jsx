export const CalendarEvent = ({event}) => {
    // console.log(event)
    const {dentist} = event;

    return (
       <>
        <strong>{`${dentist.name || localStorage.getItem("name")} ${dentist.lastname || localStorage.getItem("lastname")}`}</strong>
       </>
    )
}