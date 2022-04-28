import axios from 'axios';
import React, { useEffect,useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

function BookmarkListDep ({book, check, setCheck}) {

    const [bookList, setBookList] = useState([])

    useEffect(()=> {
        axios.get(`http://localhost:8080/dailyLook/${book.dailyLookId}`)
        .then(Response =>{
            setBookList(Response.data)
            console.log(Response.data) 
        })        
    },[book.dailyLookId])

    const handleDelete = () => {
        if(window.confirm("삭제하시겠습니까?")){
            axios.delete(`http://localhost:8080/bookmark/delete/${book.dailyLookId}`)
            .then(
                // eslint-disable-next-line no-restricted-globals
                location.reload(),
                axios.put(`http://localhost:8080/dailyLook/put/${bookList.id}`,{
                    id : bookList.id,
                    dailyLookName : bookList.dailyLookName,
                    style : bookList.style,
                    filePath : bookList.filePath,
                    fileName : bookList.fileName,
                    fileOrigin : bookList.fileOrigin,
                    category : bookList.category,
                    description : bookList.description,
                    bookmark : 0,
                    topBrand : bookList.topBrand,
                    topName : bookList.topName,
                    bottomBrand : bookList.bottomBrand,
                    bottomName : bookList.bottomName,
                    dressBrand : bookList.dressBrand,
                    dressName : bookList.dressName,
                    outerBrand : bookList.outerBrand,
                    outerName : bookList.outerName,
                    shoesBrand : bookList.shoesBrand,
                    shoesName : bookList.shoesName,
                    etcBrand : bookList.etcBrand,
                    etcName : bookList.etcName
                }),
                console.log(bookList)
            )
        }else{
            window.alert("취소")
        }
    }

    return (
        <>
        {/* 북마크 조회 */}
        <Container style={{position : "relative"}}>
            <Row>
                <Col>
                    <div id="u891" class="ax_default image">
                        <img src = {`http://localhost:8080/image/${bookList.id}`} id="u891_img" class="img" alt=""/>
                            <div id="u891_text" class="text " >
                                <p></p>
                            </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div id="u892" class="ax_default heading_3">
                        <div id="u892_div" class=""></div>
                        <div id="u892_text" class="text ">
                            <p><span>{bookList.dailyLookName}</span></p>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div id="u894" class="ax_default heading_3">
                        <div id="u894_div" class=""></div>
                        <div id="u894_text" class="text ">
                            <p><span>{ }</span></p>
                        </div>
                    </div>
                </Col>
                <Col>             
                    <div id="u894" style = {{left : "225px" }}class="ax_default heading_3">
                        <div id="u894_div" class=""></div>
                        <div id="u894_text" class="text ">
                            <p  style={{ cursor : "pointer", marginTop : "-3px"}} 
                               onClick={handleDelete} ><img src="images/bookmark/bookmark_add.png" style={{height : "20px"}} alt=""/></p>
                        </div>
                    </div>             
                </Col>
            </Row>
            <Row>
                <Col>
                    <div id="u893" class="ax_default heading_3">
                        <div id="u893_div" class=""></div>
                        <div id="u893_text" class="text ">
                            <p><span>{bookList.description} </span></p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>    
        </>
     );
}

export default BookmarkListDep ;