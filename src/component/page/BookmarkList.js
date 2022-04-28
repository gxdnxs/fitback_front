import axios from "axios";
import React, { useEffect, useState } from "react";
import BookmarkListDep from "../ui/bookmarkUi/BookmarkListDep";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from "../ui/Pagination";

function BookmarkList() {

    const [page, setPage] = useState(1);
    const [check, setCheck] = useState(false)
    const [bookmarkList, setBookmarkList ] = useState([]);
    const limit = 5;
    const offset = (page - 1) * limit;

    useEffect(()=> {
        axios.get('http://localhost:8080/bookmark/getall')
        .then(Response => {
            setBookmarkList(Response.data)
            console.log(Response.data)
        })        
    },[check])

    return (
        <Container>  
            <Row style={{marginTop : "150px"}}>    
            {/* "나의 북마크" txt */}
          <p style={{fontWeight:"700", 
  fontStyle:"normal",
  fontSize:"28px"}}>나의 북마크</p>
                 
            </Row>  
            <Row> 
            <Container id="wrapper" style={{marginTop : "30px", display: "flex", flexDirection: "row"}}>
                <Row>                            
                        {
                            bookmarkList.slice(offset, offset + limit).map(book => (
                                <Col style={{padding : "0px", margin : "-15px"}}>
                                    <BookmarkListDep
                                        key = {book.id}
                                        book = {book}
                                        check = {check}
                                        setCheck = {setCheck}
                                    /> 
                                </Col>
                            ))
                        }       
                </Row>
            </Container>

            <Pagination
            total={bookmarkList.length}
            limit={limit}
            page={page}
            setPage={setPage}
            />
             </Row> 
        </Container>

    );
}

export default BookmarkList;