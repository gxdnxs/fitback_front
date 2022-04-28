import React from "react";

function Score({opinions}) {
    return ( 
        <>
        <ul>
            {opinions.map(opinion => (
                <li key={opinion.id}>
<div style={{position: "absolute", marginTop: "30px", fontSize: "x-large"}}>점수: {opinion.score}</div>
                </li>
            ))}
        </ul>
        </>
     );
}

export default Score;