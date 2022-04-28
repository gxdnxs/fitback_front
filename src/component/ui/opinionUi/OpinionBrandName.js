import React from "react";

function OpinionBrandName({opinions}) {
    return ( 
        <>
        <ul>
            {opinions.map(opinion => (
                <li key={opinion.id}>
<input type="text" placeholder={opinion.brandName} style={{width: "150px", borderLeft: "transparent", borderRight: "transparent", borderColor: "#dbdbdb"}}/> 
                </li>
            ))}
        </ul>
        </>
     );
}

export default OpinionBrandName;