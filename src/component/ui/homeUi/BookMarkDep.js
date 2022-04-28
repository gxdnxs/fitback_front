import React, { useEffect,useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'


function BookMarkDep({book, check, setCheck}) {

    const [bookList, setBookList] = useState([])

    useEffect(()=> {
        axios.get(`http://localhost:8080/dailyLook/${book.dailyLookId}`)
        .then(Response =>{
            setBookList(Response.data)

        })        
    },[book.dailyLookId])


    return ( 
    <Container style={{position : "relative"}}>
        <Row>
            <Col>
                <div >
                <img id="u243_img" className="img " src = {`http://localhost:8080/image/${book.id}`}   alt=""/>
                    <div id="u243_text" className="text " >
                        <p>{bookList.dailyLookName}</p>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>    
     );
}

export default BookMarkDep;