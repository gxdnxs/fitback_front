import BookMarkDep from "./BookMarkDep";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function BookMark() {

  const [check, setCheck] = useState(false)
  const [bookmarkList, setBookmarkList ] = useState([]);

  useEffect(()=> {
      axios.get('http://localhost:8080/bookmark/getall')
      .then(Response => {
          setBookmarkList(Response.data)
          console.log(Response.data)
      })        
  },[check])

    return (
    
    <>
        {/* 북마크 미리보기 */}
            <div style={{width : "300px", height : "100px"}}>
                <Container id="wrapper" style={{ display: "flex", flexDirection: "row"}}>
                        <Row >                            
                                {
                                    bookmarkList.slice(0, 2).map(book => (
                                        <Col style={{ width : "300px" , height : "115px"}}>
                                            <BookMarkDep
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
            
               
            </div> 
    </>
    );
}

export default BookMark;