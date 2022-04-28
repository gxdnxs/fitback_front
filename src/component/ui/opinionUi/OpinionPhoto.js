import React from "react";

function OpinionPhoto({opinions}) {
    return ( 
        <>
        <ul>
            {opinions.map(opinion => (
                <li key={opinion.id}>
<img style={{width: "130px", marginTop: "45px", marginLeft: "0px"}} src={`http://localhost:8080/opinion/image/${opinion.id}`} alt=""/>
                </li>
            ))}
        </ul>
        </>
     );
}

export default OpinionPhoto;