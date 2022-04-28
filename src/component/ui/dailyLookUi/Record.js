import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Record() {

  const { id } = useParams();
  const findAllDailyLook = `http://localhost:8080/dailyLook/${id}`;
  const [list, setList] = useState([{}]);

  useEffect(() => {
    axios.get(findAllDailyLook).then(response => {setList(response.data)})
    console.log(list);
  }, [])
  
    return ( 
        <>
        <div>
          <div id="u608" className="ax_default box_3">
            <div id="u608_div" className=""></div>
            <div id="u608_text" className="text ">
              <p><span>Daily Record</span></p>
            </div>
          </div>

          <div id="u599" className="ax_default box_1">
            <div id="u599_div" className=""></div>
            <div id="u599_text">
              <p></p>
            </div>
          </div>

          <div id="u609" className="ax_default text_field">
            <div id="u609_div" className=""></div>
            <input id="u609_input" type="text" value="" placeholder={list.description}/>
          </div>
        </div>
        </>
     );
}

export default Record;