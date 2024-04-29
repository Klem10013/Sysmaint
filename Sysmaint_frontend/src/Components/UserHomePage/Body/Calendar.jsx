import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import "./Calendar.css"
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Calendar() {

    const [events,setEvents] = useState([])
    const history = useNavigate();
    const [calendar_array, setCalendar_array] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const user = {
        username: cookies.user.name,
        company: cookies.user.id_company,
        token: cookies.user.token
    }
    const redirectToLogPage = () => {
        history('/login'); // Redirects to the '/login' route
    };
    useEffect(() => {
        fetch("http://localhost:3001/calendar/get", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({name: user.username, token: user.token, id_company: user.company})
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    console.log(data[0][0])
                    setCalendar_array(data[0][0])
                    const cal = data[0][0]
                    console.log(cal.task_name)
                    const ev = []
                    for (let i = 0; i<cal.task_name.length;i++)
                    {
                        const event = {
                            start : cal.task_start[i]/30 - 12,
                            end : cal.task_end[i]/30 - 12,
                            title : cal.task_name[i]

                        }
                        ev.push(event)
                        setEvents(ev)
                    }
                })
            } else {
                redirectToLogPage()
            }
        });
    }, [])

    // Array to hold hours of the day
    const hoursOfDay = Array.from({length: (21-6)*2}, (_, index) => {
        let hour = Math.trunc(index/2+6).toString();
        hour += ":"
        if (index%2 !== 0)
        {
            hour += "30"
        }
        else
        {
            hour +="00"
        }
        return hour
    });

    // Sample events data (you can replace it with your actual data)


    let move = 0;
    const size_time = 35
    const font_size_min = 6 ;
    const font_size_max = 50;
    return (
        <Container>
            <Row>
                <Col className={"col-2"}>
                    <div key={"title_hours"} className="header">Time</div>
                    {hoursOfDay.map(hour => (
                        <div key={hour} className="hour">
                            {hour}-
                        </div>
                    ))}
                </Col>
                <Col className={"col-10"}>
                    <div key={"title_event"} className="header">Task of the day for {calendar_array.name}</div>
                    {events.map(event => {
                        console.log(event)
                        const height = (event.end - event.start) * size_time
                        const top = event.start * size_time - 4 - move
                        const fontsize = font_size_min+1/((font_size_max-font_size_min)*(1/height))*font_size_min
                        move += top + height;
                        return <div key={event.title + event.start} className={"event-box"} style={{height: height, marginTop: top}}>
                            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}> <h1 style={{fontSize:fontsize}}> {event.title}</h1>
                            </div>
                        </div>
                    })}
                </Col>
            </Row>
        </Container>
    );
}

export default Calendar










