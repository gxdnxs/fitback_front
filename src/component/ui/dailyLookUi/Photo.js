import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

function Photo() {

  const { id } = useParams();
  const findAllDailyLook = `http://localhost:8080/dailyLook/${id}`;
  const [list, setList] = useState([]);

  const photoInput = useRef();
  
  const handleClick = () => {
    photoInput.current.click();
  };

  useEffect(() => {
    axios.get(findAllDailyLook).then(response => {setList(response.data)})
    console.log(list);
  }, [])

  // const [isHover, setIsHover] = useState(false);

  // const onMouseOver = () => setIsHover(true);

  // const onMouseOut = () => setIsHover(false);

  return ( 

  <div>
      <div id="u603" className="ax_default box_1">
        <div id="u603_div" className="">
        <img src={'http://localhost:8080'+ list.filePath} alt=""/>
        </div>
      </div>
    
      <div id="u634" className="ax_default box_3">
        <div id="u634_div" className=""></div>
        <div id="u634_text" className="text ">
          <span onClick={handleClick}>사진 바꾸기</span>
        </div>
      </div>
      <input 
      type="file"
      accept="image/*"
      multiple
      ref={photoInput}
      style={{display: 'none'}}
      />
  </div>
  );
}

export default Photo;