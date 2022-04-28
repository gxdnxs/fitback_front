import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SearchResultPostDep from '../ui/searchResultUi/SearchResultPostDep';
import _ from 'lodash'
import Pagination from '../ui/Pagination';


function SearchResult() {

    const [searchList, setSearchList] = useState([]);
    const [check, setCheck] = useState(false);
    const [keyword2, setKeyword] = useState('')
    const [page, setPage] = useState(1);
    const location = useLocation();
    const limit =5;
    const offset = (page - 1) * limit;
    const debounce = _.debounce((e) => {
        setKeyword(e.target.value);
        console.log("", e.target.value);
    }, 300);	

    useEffect(() =>{
        axios.get(`http://localhost:8080/dailyLook/searchresult?keyword=${location.state.keyword}`)
        .then(Response =>{
            setSearchList(Response.data)
            console.log(Response.data)
            })
    }, [check])

    const buttonClick = () =>{
        axios.get(`http://localhost:8080/dailyLook/searchresult?keyword=${keyword2}`)
        .then(Response =>{
            setSearchList(Response.data)
            console.log(Response.data)
        })
    }

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
               <button style={{backgroundColor : "white", borderColor : "white" , margin : "0px", height : "30px"}} onClick = {buttonClick} >
               <p style={{color : "black", textDecoration : "none" , padding : "0 10px"}}>검색</p></button>
            </div>
            </div>
            </Col>
            </Row>
            <Row>

            {/* TXT */}
         
           
                    <p style={{fontSize:"13px"}}><span style={{fontSize:"20px"}}>검색결과 </span></p> 
       
         
            </Row>
            <Row>

            <Container id="wrapper" style={{marginTop : "30px", display: "flex", flexDirection: "row"}}>
                <Row>                  
                {
                    searchList.slice(offset, offset + limit).map(searchResult => (
                    <Col style={{padding : "0px", margin : "-15px"}}>
                        <SearchResultPostDep
                            key = {searchResult.id}
                            searchResult = {searchResult}                      
                            setCheck = {setCheck}
                        /> 
                    </Col>
                    ))
                }       
                </Row>
            </Container>

            <Pagination
                total={searchList.length}
                limit={limit}
                page={page}
                setPage={setPage}
                />
            </Row>
        </Container>
    );
}

export default SearchResult;














