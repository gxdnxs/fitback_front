import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Row, Container, FormControl, InputGroup, Table, Badge, ListGroup } from "react-bootstrap";

function NewOpinion({listId}) {

    console.log("게시글 아이디 " + listId);

    const [checkedState, setCheckedState] = useState(
      new Array(5).fill(false)
    );
  
    // const navigate = useNavigate();
  
    const [imageSrc, setImageSrc] = useState([]);
    const [previewImg, setPreviewImg] = useState(null);
  
    let inputRef;
  
    const realButton = useRef();
    const content = useRef();
    const opiFile = useRef();
    const brandName = useRef();
    const itemName = useRef();
  
  
   //체크박스 상태 확인
    const changeHandler = (position) => {
      const updateCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item);
        setCheckedState(updateCheckedState);
    }
  
  
    //변수에 이미지 값 담기 및 이미지 미리보기
    const insertImg = (e) => {
      e.preventDefault();
      const file = e.target.files[0];
      setImageSrc([...imageSrc, { uploadedFile: file }]);
  
      let reader = new FileReader();
      if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0])
      }
      reader.onloadend = () => {
        const previewImgUrl = reader.result
        if(previewImgUrl){
          setPreviewImg(previewImgUrl)
        }
      }
    }
  
  
    //댓글 등록 요청
    const addOpinion = (e) => {
      e.preventDefault();    
      if(window.confirm("댓글을 등록할까요?"))
      {
      const formData = new FormData();
      formData.append("opiFile", imageSrc[0].uploadedFile);
      formData.append("content", content.current.value);
      formData.append("brandName", brandName.current.value);
      formData.append("itemName", itemName.current.value);
      formData.append("checkedState", checkedState);
      formData.append("dailyLook.id", listId);
      axios({
        method: "post",
        url:"http://localhost:8080/opinion/add",
        data: formData,
        headers: { "Content-Type" : "multipart/form-data" }
      })
        .then((response) => console.log("댓글 등록 성공 "+ response))
        .catch((error) => console.log("댓글 등록 실패 "+ error))
        return window.location.href = `/dailyLook/${listId}`;
        
        // console.log(
        //   " 콘텐트 " + content.current.value,
        //   "\n 체크 " + checkedState,
        //   "\n 이미지 " + imageSrc[0],
        //   "\n 게시글 아이디 " + listId,
        //  );
       }
    };
  

    return ( 
        <>
        
        <Button onClick={addOpinion} style={{width: "100px", position: "absolute", marginTop: "30px", height: "30px", lineHeight:"11px", backgroundColor: "black", border: "black", color: "white"}}>댓글 쓰기</Button>
        <InputGroup style={{marginTop: "70px"}}>
    <FormControl  value="1. 핏이 딱 맞나요?" aria-label="Text input with checkbox" />
    <InputGroup.Checkbox index="1" name="check1" type="checkbox" onChange={() => changeHandler(0)}/>
    </InputGroup>

    <InputGroup style={{marginTop: "5px"}}>
    <FormControl  value="2. 아이템의 컬러매치가 좋나요?" aria-label="Text input with checkbox" />
    <InputGroup.Checkbox index="2" name="check2" type="checkbox" onChange={() => changeHandler(1)}/>
    </InputGroup>

    <InputGroup style={{marginTop: "4px"}}>
    <FormControl value="3. 악세사리를 잘 활용했나요?" aria-label="Text input with checkbox" />
    <InputGroup.Checkbox index="3" name="check3" type="checkbox" onChange={() => changeHandler(2)}/>
    </InputGroup>

    <InputGroup style={{marginTop: "5px"}}>
    <FormControl value="4. 계절에 적절한 옷인가요?" aria-label="Text input with checkbox" />
    <InputGroup.Checkbox index="4" name="check4" type="checkbox" onChange={() => changeHandler(3)}/>
    </InputGroup>

    <InputGroup style={{marginTop: "5px"}}>
    <FormControl value="5. TPO에 알맞나요?" aria-label="Text input with checkbox" />
    <InputGroup.Checkbox index="5" name="check5" type="checkbox" onChange={() => changeHandler(4)}/>
    </InputGroup>

    <Badge style={{marginTop: "20px", height: "35px", fontSize: "large"}} bg="black">Free Opinion</Badge>
    <FormControl name="content" ref={content} style={{width: "295px", marginTop: "7px", height: "55px", borderLeft: "transparent", borderRight: "transparent"}}/>
      
    <Badge style={{marginTop: "20px", height: "35px", fontSize: "large"}} bg="black">Recommended Item</Badge>
    <input 
        type="file" 
        name="opiFile" 
        ref={opiFile} 
        accept="image/*" 
        onChange={(e) => {insertImg(e, e.target.files[0])}} />
      <Row>
    <img style={{width: "150px", marginTop: "45px", marginLeft: "0px"}} src={previewImg ? previewImg : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAMFBMVEX////MzMzJycnp6enw8PDt7e36+vrj4+P39/ff39/b29vQ0ND09PTd3d3o6OjT09Nr7EITAAADJUlEQVR4nO3c23aqMBRAUYwVBCz8/98esGi57CRgE8LmrPncUc0aCAkYswwAAAAAAAAAAAAAAAAAAAAAAAAAtMpjSz1An2tr4muvqYfp8LiYyx7M5ZF6qDa3fQo8K9xSD1b2tV+CLsJX6uGKdizQSz1cSbHnYdAdCEXqAQvq97uL6/UydeoBL+XDmzPlNa7y9ULHmyg8zF6H6PChM8e7Pg5XhR0uWsMl+IBXBhrQoEcDGvRoYGuQN1U/d2rLgBcyZQ2K17SuW/QHq6CqQV6PlxCmCfRKmhrkkVY5mhrUl3mEMOdLRQ1KYS0dZJmjp0EuJDBliFfS00C+pRLilfQ0WJwNgr1vPQ2kBOuuj76nB2oaSKeDdSeE0ny7/0BNg7t8h9XfoLuceCKoaWA5DrzTpOcV1R1BTQPL+cD3WR8mFc4IehpUYoO7+5+851WuCHoaiA8fPc8ERlNLRwQ9DaQPg+ejMJld2yMoaiAcCK3zP8wWGNYIihpk3/MI7idDizWWqeQ/1NQgq2ajcp4QhWWmJYKqBpN1k6m3HQX2CLoaZPfq50GxMbV7pSAmsJwTlDXo5ou3oqrKxnND1ZJAjqCuwSrWBGKEUzZwJJAinLGBM4EQ4YQNPAmWEc7XwJtgcYk8XYMVCeYRztZgVYJZBM0NiuUkYWWCaQTFDbqJ83zBsDrBJILeBs+1wzTChgTjCGobDMuncYRNCUYRtDZ4ryB/I2xM8HszUmmD0SL6FWFzAuUNJvcRfkayPYHuBrNH0P1QPkigusHiKfz9owSaGwhfRJjfaDx7g3DbW9Q2CLjDR2uDkJuclDYIus9LZ4OwW91UNgi8209jg9AbHhU2CL7nU1+Dj6aC52pg+V4aDWhAAxrQgAY0oAEN/vsG4WlrkDfBfwilGb7gqKZBRDSgQY8GNOjR4MgNXpOi2rNt6+8vVE+nTEfyns79eULo9v7/qQcsEDfzRWTZ6ZPUI/YBMHXAn4zLYtxNdyUI8nMS4bX7RTDubYIJffb9kk8SHPFkMLjVEZbMS/VBf1l48GiK2HwbxAAAAAAAAAAAAAAAAAAAAAAAAIBD+gcdMi0YuTIcVgAAAABJRU5ErkJggg=="} alt=""/>


        <ListGroup style={{width: "165px", marginTop:"30px"}}>
        <ListGroup.Item style={{border: "transparent"}}>브랜드명</ListGroup.Item>
        <input ref={brandName} type="text" style={{borderLeft: "transparent", borderRight: "transparent", borderColor: "#dbdbdb"}}/> 
        <ListGroup.Item style={{border: "transparent"}}>상품명</ListGroup.Item>
        <input ref={itemName} type="text" style={{borderLeft: "transparent", borderRight: "transparent", borderColor: "#dbdbdb"}}/> 
        </ListGroup>
        </Row>
      
        </>
     );
}

export default NewOpinion;