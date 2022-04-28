import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios';



function SearchResultPostDep({searchResult, setCheck}) {

    const checkState = () =>{
        if(searchResult.bookmark === 0){       
            axios.post(`http://localhost:8080/bookmark/add`,{
                dailyLookId : searchResult.id,
                id : searchResult.id
            }).then(
                setCheck,
                axios.put(`http://localhost:8080/dailyLook/put/${searchResult.id}`,{
                    id : searchResult.id,
                    dailyLookName : searchResult.dailyLookName,
                    style : searchResult.style,
                    filePath : searchResult.filePath,
                    fileName : searchResult.fileName,
                    fileOrigin : searchResult.fileOrigin,
                    category : searchResult.category,
                    description : searchResult.description,
                    bookmark : 1,
                    topBrand : searchResult.topBrand,
                    topName : searchResult.topName,
                    bottomBrand : searchResult.bottomBrand,
                    bottomName : searchResult.bottomName,
                    dressBrand : searchResult.dressBrand,
                    dressName : searchResult.dressName,
                    outerBrand : searchResult.outerBrand,
                    outerName : searchResult.outerName,
                    shoesBrand : searchResult.shoesBrand,
                    shoesName : searchResult.shoesName,
                    etcBrand : searchResult.etcBrand,
                    etcName : searchResult.etcName
                }),            
                Response =>{
                    console.log(Response)
                }
            )}

        else if(searchResult.bookmark === 1) {            
            window.confirm("삭제하시겠습니까?")
            axios.delete(`http://localhost:8080/bookmark/delete/${searchResult.id}/`)                
            .then(
                setCheck,
                axios.put(`http://localhost:8080/dailyLook/put/${searchResult.id}`,{
                    bookmark : 0,                    
                    id : searchResult.id,
                    dailyLookName : searchResult.dailyLookName,
                    description : searchResult.description,
                    fileName : searchResult.fileName,
                    filePath : searchResult.filePath,
                    createDate : searchResult.createDate
                }),            
                Response =>{
                    console.log(Response)
                }
            )
        }}
        
    return (       
        <Container style={{position : "relative"}}>
            <Row>
                <Col>
                    <div id="u914" class="ax_default image">
                        <img src = {`http://localhost:8080/image/${searchResult.id}`} id="u914_img" class="img " />
                            <div id="u914_text" class="text " >
                                <p></p>
                            </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div id="u916" class="ax_default heading_3">
                        <div id="u916_div" class=""></div>
                        <div id="u916_text" class="text ">
                            <p><span>{searchResult.dailyLookName}</span></p>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div id="u918" class="ax_default heading_3">
                        <div id="u918_div" class=""></div>
                        <div id="u918_text" class="text ">
                            <p><span>{ }</span></p>
                        </div>
                    </div>
                </Col>
                <Col>             
                    <div id="u918" style = {{left : "225px" }}class="ax_default heading_3">
                        <div id="u918_div" class=""></div>
                        <div id="u918_text" class="text ">
                            <p onClick={checkState} style={{ cursor : "pointer", marginTop : "-3px"}} >
                                {searchResult.bookmark === 0 
                                    ? (<img src="images/bookmark/bookmark_del.png" style={{height : "20px"}} />) 
                                    : (<img src="images/bookmark/bookmark_add.png" style={{height : "20px"}} />)
                                }
                            </p>      
                        </div>
                    </div>             
                </Col>        
            </Row>
            <Row>
                <Col>
                    <div id="u917" class="ax_default heading_3">
                        <div id="u917_div" class=""></div>
                        <div id="u917_text" class="text ">
                            <p><span>{searchResult.description} </span></p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>    
    );
}

export default SearchResultPostDep;