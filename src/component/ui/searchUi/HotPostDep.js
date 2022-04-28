import React, {useState} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios';


function HotPostDep({hotpost, setCheck}) {

    const checkState = () =>{        
        if(hotpost.bookmark === 0){       
            axios.post(`http://localhost:8080/bookmark/add`,{
                dailyLookId : hotpost.id,
                id : hotpost.id
            }).then(
                setCheck,   
                axios.put(`http://localhost:8080/dailyLook/put/${hotpost.id}`,{
                    id : hotpost.id,
                    dailyLookName : hotpost.dailyLookName,
                    style : hotpost.style,
                    filePath : hotpost.filePath,
                    fileName : hotpost.fileName,
                    fileOrigin : hotpost.fileOrigin,
                    category : hotpost.category,
                    description : hotpost.description,
                    bookmark : 1,
                    topBrand : hotpost.topBrand,
                    topName : hotpost.topName,
                    bottomBrand : hotpost.bottomBrand,
                    bottomName : hotpost.bottomName,
                    dressBrand : hotpost.dressBrand,
                    dressName : hotpost.dressName,
                    outerBrand : hotpost.outerBrand,
                    outerName : hotpost.outerName,
                    shoesBrand : hotpost.shoesBrand,
                    shoesName : hotpost.shoesName,
                    etcBrand : hotpost.etcBrand,
                    etcName : hotpost.etcName
     
                })
            )}
            
        else if(hotpost.bookmark === 1) {
            window.confirm("삭제하시겠습니까?")
            axios.delete(`http://localhost:8080/bookmark/delete/${hotpost.id}/`)                
            .then(
                setCheck,
                axios.put(`http://localhost:8080/dailyLook/put/${hotpost.id}`,{
                    id : hotpost.id,
                    dailyLookName : hotpost.dailyLookName,
                    style : hotpost.style,
                    filePath : hotpost.filePath,
                    fileName : hotpost.fileName,
                    fileOrigin : hotpost.fileOrigin,
                    category : hotpost.category,
                    description : hotpost.description,
                    bookmark : 0,
                    topBrand : hotpost.topBrand,
                    topName : hotpost.topName,
                    bottomBrand : hotpost.bottomBrand,
                    bottomName : hotpost.bottomName,
                    dressBrand : hotpost.dressBrand,
                    dressName : hotpost.dressName,
                    outerBrand : hotpost.outerBrand,
                    outerName : hotpost.outerName,
                    shoesBrand : hotpost.shoesBrand,
                    shoesName : hotpost.shoesName,
                    etcBrand : hotpost.etcBrand,
                    etcName : hotpost.etcName
 
     
                }),            
                Response =>{
                    console.log(Response)
                }
            )
        }}


    return (
        <>
            {/* 데일리룩 둘러보기 */}
            <Container style={{position : "relative"}}>
                <Row >
                    <Col>
                        <div id="u891" class="ax_default image">
                            <img src = {`http://localhost:8080/image/${hotpost.id}`} id="u891_img" class="img" />
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
                                <p><span>{hotpost.dailyLookName}</span></p>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div id="u894" class="ax_default heading_3">
                            <div id="u894_div" class=""></div>
                            <div id="u894_text" class="text ">
                                <p><span>{}</span></p>
                            </div>
                        </div>
                    </Col>
                    <Col>             
                        <div id="u894" style = {{left : "225px" }}class="ax_default heading_3">
                            <div id="u894_div" class=""></div>
                            <div id="u894_text" class="text ">
                                <p onClick={checkState} style={{ cursor : "pointer", marginTop : "-3px"}} >
                                    {hotpost.bookmark === 0 
                                        ? (<img src="images/bookmark/bookmark_del.png" style={{height : "20px"}} />)                                                  
                                        : (<img src="images/bookmark/bookmark_add.png" style={{height : "20px"}} />)}
                                </p>                                    
                            </div>
                        </div>             
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div id="u893" class="ax_default heading_3">
                            <div id="u893_div" class=""></div>
                            <div id="u893_text" class="text ">
                                <p><span>{hotpost.description} </span></p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>    
        </>
    );
}

export default HotPostDep;