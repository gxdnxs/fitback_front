import axios from "axios";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../../../../node_modules/@fullcalendar/common/main.css";

import { Link } from "react-router-dom";

// export default class DateGrid extends Component{

//     state = {events:[]};
//     constructor(props){
//         super(props);

//         const dailyUrl = 'http://localhost:8080/dailyLook/list';

//          axios.get(dailyUrl)
//          .then((response) => {
//             const arr = response.data;
//             let datas = [];
//             let imageUrl = 'http://localhost:8080';
//             arr.forEach(element => {
//                 datas.push({title:element.dailyLookName, start:element.createDate, url:imageUrl + element.filePath});
//             });
//             console.log({events:datas});
//             this.setState({events:datas});
//         })
//     }

//     render(){

//         function renderPhoto(eventInfo){
//             return(
//                 <div>
//                     <p>{eventInfo.event.title}</p>
//                     <img className="eventimage" src={eventInfo.event.url} alt="" />
//                 </div>
//             )
//         }

//         return(
//             <div>
//                 <div id="u230" className="ax_default box_2" style={{width: "1000px"}}>
//                    <div id="imageBox">
//                 </div>
//                     <FullCalendar
//                     plugins={[dayGridPlugin]}
//                     initialView="dayGridMonth"
//                     eventContent={renderPhoto}
//                     events={this.state.events}
//                     />
//             </div>
//         </div>
//         );
//     }
// }

function DateGrid() {
    const [event, setEvent] = useState();

    const dailyUrl = "http://localhost:8080/dailyLook/list";

    useEffect(() => {
        axios.get(dailyUrl).then((response) => {
            const arr = response.data;
            let datas = [];
            let imageUrl = "http://localhost:8080";
            arr.forEach((element) => {
                datas.push({
                    id: element.id,
                    title: element.dailyLookName,
                    date: element.createDate,
                    url: imageUrl + element.filePath,
                });
                console.log("date:%s", element.createDate);
                console.log("dailyName:%s", element.dailyLookName);
                console.log("photo:%s", element.filePath);
            });
            setEvent(datas);
        });
    }, []);

    // function renderPhoto(eventInfo){
    //     return(
    //         <div>
    //             <p>{eventInfo.event.title}</p>
    //             <img className="eventimage" src={eventInfo.event.url} alt=""/>
    //         </div>
    //     )
    // }

    const renderPhoto = (eventInfo) => {
        return (
            <div>
                <p>{eventInfo.event.title}</p>
                <Link to={`/dailyLook/${eventInfo.event.id}`}>
                    <img
                        className="eventimage"
                        src={eventInfo.event.url}
                        style={{ width: "100px", height: "100px" }}
                        alt=""
                    />
                </Link>
            </div>
        );
    };

    return (
        <div>
            <div
                id="u230"
                className="ax_default box_2"
                style={{ width: "1000px" }}
            >
                <div id="imageBox">
                    {/* {looks.map(look =>
                <div key={look.id} id={look.id}>
                    <h2><Link to={`/dailyLook/${list.id}`}>{list.dailyLookName}</Link></h2>
                    <img src={'http://localhost:8080'+ list.filePath} alt=''/>
                </div>
                )} */}
                </div>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    eventContent={renderPhoto}
                    events={event}
                />
            </div>
        </div>
    );
}

export default DateGrid;
