import React from "react";
import { FormControl } from "react-bootstrap";

function OpinionFree({opinions}) {

    return ( 
        <>
        <ul>
            {opinions.map(opinion => (
                <li key={opinion.id}>
<FormControl placeholder={opinion.content} style={{width: "295px", marginTop: "7px", height: "55px", borderLeft: "transparent", borderRight: "transparent"}}/>
                </li>
            ))}
        </ul>
        </>
     );
}

export default OpinionFree;