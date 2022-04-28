import React from "react";
import { ListGroup } from "react-bootstrap";

function OpinionItemName({opinions}) {
    return ( 
        <>
        <ul>
            {opinions.map(opinion => (
                <li key={opinion.id}>
       <input type="text" placeholder={opinion.itemName} style={{width: "150px", borderLeft: "transparent", borderRight: "transparent", borderColor: "#dbdbdb"}}/> 
                </li>
            ))}
        </ul>
        </>
     );
}

export default OpinionItemName;