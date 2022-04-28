import React, {useEffect, useState} from 'react';
import HotPostDep from './HotPostDep';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from '../Pagination';
import { Link } from 'react-router-dom';
import _ from 'lodash'


function HotPost() {

    const [hotpostList, sethotpostList] = useState([]);
    const [check, setCheck] = useState(false)  
    const [page, setPage] = useState(1);
    const limit = 10;
    const offset = (page - 1) * limit;

    const [keyword, setKeyword] = useState('')
    const debounce = _.debounce((e) => {
        setKeyword(e.target.value);
    	console.log("", e.target.value);
    }, 300);	
    

    useEffect(() =>{
        axios.get('http://localhost:8080/dailyLook/list')
        .then(Response =>{
            sethotpostList(Response.data)
            console.log(Response.data)        
        })
    }, [check])


    return ( 
        <Container style={{height : "1300px"}}>
            <Row style={{padding : "180px 150px 50px 150px" }}>
                <Col style={{width : "600px", display: "flex", justifyContent : "center"}}>
                  
                    <div style={{display : "flex", flexDirection: "row"}}>

    
            <div >
                <input style={{height : "30px", width : "500px" }} onChange={debounce}  type="text" name="keyword"/>
            </div>
   
            {/* BUTTON */}
            <div>
               <button style={{backgroundColor : "white", borderColor : "white" , margin : "0px", height : "30px"}} >
                <Link to='/searchresult' state={{ keyword: keyword}} style={{color : "black", textDecoration : "none" , padding : "0 10px"}}> 검색</Link></button>
            </div>
            </div>
            </Col>
            
            </Row>
            <Row>
            {/* "최신글" txt */}
            <div>
                    <p style={{fontSize:"13px"}}><span style={{fontSize:"20px"}}>최신글 </span></p> 
              
            </div>
            </Row>
            <Row>
            {/* <Container style={{marginTop : "200px"}}> */}
            <Container id="wrapper" style={{ marginTop : "30px", display: "flex", flexDirection: "row"}}>
                <Row>               
                    {
                        hotpostList.slice(offset, offset + limit).map(hotpost => (
                        <Col style={{padding : "0px", margin : "-15px"}}>
                            <HotPostDep
                                key = {hotpost.id}
                                hotpost = {hotpost}
                                setCheck = {setCheck}
                            /> 
                        </Col>
                        ))
                    }       
                </Row>
            </Container>

            <Pagination
                total={hotpostList.length}
                limit={limit}
                page={page}
                setPage={setPage} />
        </Row>
        </Container>

    );
}

export default HotPost;