import React,{ useState, useEffect }  from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";


// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });



  const setDay = day => {
    console.log("day from setDay:", day);
    return setState({ ...state, day:day })};

    // const setDays = (days) => {
    //   setState(prev => setState({...prev, days}));
    // }

    useEffect(()=>{
      const dayURL = "http://localhost:8001/api/days";
      const appointmentURL="http://localhost:8001/api/appointments";
      const interviewersURL = "http://localhost:8001/api/interviewers";

      Promise.all([
        axios.get(dayURL),
        axios.get(appointmentURL),
        axios.get(interviewersURL)
      ]).then((all) =>{
        setState(prev=>({...prev, 
          days:all[0].data, 
          appointments:all[1].data,
        interviewers:all[2].data}));
      })
    },[]);

    let appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);

  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
    />
  );
});
  
  return (
    
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      
      <DayList
        days={state.days}
        value={state.day}
        onChange={setDay}
      />
      </nav>
    <img
      className="sidebar__lhl sidebar--centered"
      src="images/lhl.png"
      alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {schedule}
        
      {/* {dailyAppointments.map(appointment =>{
        return <Appointment 
        key={appointment.id} 
        name={appointment.name} 
        {...appointment} />
        })} */}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
