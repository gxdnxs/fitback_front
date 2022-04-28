import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Row, Container, FormControl, InputGroup, Table, Badge, ListGroup } from "react-bootstrap";
import {FaArrowAltCircleUp, FaArrowAltCircleDown} from 'react-icons/fa';
import OpinionPhoto from "./OpinionPhoto";
import OpinionBrandName from "./OpinionBrandName";
import './Paging.css';
import OpinionItemName from "./OpinionItemName";
import OpinionFree from "./OpinionFree";
import Score from "./Score";

function Opinion() {

    const { id } = useParams();

  const [opinionList, setOpinionList] = useState({opinions: []});
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(1);

  const opinionUrl = `http://localhost:8080/dailyLook/${id}`;

  // 댓글 get 요청
  useEffect(() => {
      axios.get(opinionUrl)
      .then(response => {setOpinionList(response.data)});
      console.log("댓글" + opinionList); 
    }, []);

    console.log("댓글 수 " + opinionList.opinions.length);
    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = opinionList.opinions.slice(indexOfFirstPost, indexOfLastPost);

    console.log("indexOfFirstPost " + indexOfFirstPost);
    console.log("indexOfLastPost " + indexOfLastPost);

    const pageNumbers = [];

    console.log("total opinions " + opinionList.opinions.length);
    console.log("postsPerPage " + postsPerPage);
    
    for (let i = 1; i <= Math.ceil(opinionList.opinions.length / postsPerPage); i++) {
    pageNumbers.push(i);
    }

    //댓글 다음 페이지로 이동
    const upClick = () => {
      if(currentPage < pageNumbers.length){
        setCurrentPage(currentPage + 1);
      } else {
        alert("더 이상 댓글이 없어요.");
      };
    };

    //댓글 이전 페이지로 이동
    const downClick = () => {
      if(currentPage > 1){
        setCurrentPage(currentPage - 1);
      } else {
        alert("가장 최신 댓글이에요.");
      };
    };

    return ( 
        <>
    {/* <div style={{marginLeft: "10px", marginTop: "30px", position: "absolute"}}>점수: </div> */}
    <Score opinions={currentPosts}/>
    <div style={{marginLeft: "250px", marginTop: "30px", position: "absolute"}}>{currentPage} / {opinionList.opinions.length}</div>
    <FaArrowAltCircleUp onClick={upClick} style={{position: "absolute", marginTop: "30px", marginLeft: "140px"}}/>
    <FaArrowAltCircleDown onClick={downClick} style={{position: "absolute", marginTop: "30px", marginLeft: "120px"}}/>
    <InputGroup style={{marginTop: "70px"}}>
    <FormControl  value="1. 핏이 딱 맞나요?" aria-label="Text input with checkbox" />
    <InputGroup.Checkbox />
    </InputGroup>

    <InputGroup style={{marginTop: "5px"}}>
    <FormControl  value="2. 아이템의 컬러매치가 좋나요?" aria-label="Text input with checkbox" />
    <InputGroup.Checkbox />
    </InputGroup>

    <InputGroup style={{marginTop: "4px"}}>
    <FormControl value="3. 악세사리를 잘 활용했나요?" aria-label="Text input with checkbox" />
    <InputGroup.Checkbox />
    </InputGroup>

    <InputGroup style={{marginTop: "5px"}}>
    <FormControl value="4. 계절에 적절한 옷인가요?" aria-label="Text input with checkbox" />
    <InputGroup.Checkbox />
    </InputGroup>

    <InputGroup style={{marginTop: "5px"}}>
    <FormControl value="5. TPO에 알맞나요?" aria-label="Text input with checkbox" />
    <InputGroup.Checkbox />
    </InputGroup>

    <Badge style={{marginTop: "20px", height: "35px", fontSize: "large"}} bg="black">Free Opinion</Badge>
    {/* <FormControl style={{width: "295px", marginTop: "7px", height: "55px", borderLeft: "transparent", borderRight: "transparent"}}/> */}
        <OpinionFree opinions={currentPosts}/>

    <Badge style={{marginTop: "20px", height: "35px", fontSize: "large"}} bg="black">Recommended Item</Badge>
      
      <Row>
    {/* <img style={{width: "150px", marginTop: "45px", marginLeft: "0px"}} src="https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg" alt=""/> */}
        <OpinionPhoto opinions={currentPosts}/>

        <ListGroup style={{marginLeft: "150px", position: "absolute", width: "160px", marginTop:"10px"}}>
        <ListGroup.Item style={{border: "transparent"}}>브랜드명</ListGroup.Item>
        {/* <input type="text" style={{borderLeft: "transparent", borderRight: "transparent", borderColor: "#dbdbdb"}}/>  */}
        <OpinionBrandName opinions={currentPosts}/>
        <ListGroup.Item style={{border: "transparent"}}>상품명</ListGroup.Item>
        {/* <input type="text" style={{borderLeft: "transparent", borderRight: "transparent", borderColor: "#dbdbdb"}}/>  */}
        <OpinionItemName opinions={currentPosts}/>
        </ListGroup>
        </Row>
        
        </>
     );
}

export default Opinion;