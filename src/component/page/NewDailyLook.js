import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Row, Container, FormControl, InputGroup, Table, Badge } from "react-bootstrap";


function NewDailyLook() {

  const orgFile = useRef(); 
  const [imageSrc, setImageSrc] = useState([]);
  const [previewImg, setPreviewImg] = useState(null);
  const dailyLookName = useRef();
  const style = useRef();
  const topBrand = useRef();
  const topName = useRef();
  const bottomBrand = useRef();
  const bottomName = useRef();
  const dressBrand = useRef();
  const dressName = useRef();
  const outerBrand = useRef();
  const outerName = useRef();
  const shoesBrand = useRef();
  const shoesName = useRef();
  const etcBrand = useRef();
  const etcName = useRef();
  const description = useRef();

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

  //파일 업로드 버튼
  const handleClick = () => {
    orgFile.current.click();
  };

  //이미지 post 요청
  const addDailyLook = (e) => {
      e.preventDefault();
      if(window.confirm('새 데일리룩을 등록합니다.')){
      const formData = new FormData();
      formData.append("dailyLookName", dailyLookName.current.value);
      formData.append("style", style.current.value);    
      formData.append("topBrand", topBrand.current.value);
      formData.append("orgFile", imageSrc[0].uploadedFile);
      formData.append("topName", topName.current.value);    
      formData.append("bottomBrand", bottomBrand.current.value);
      formData.append("bottomName", bottomName.current.value);
      formData.append("dressBrand", dressBrand.current.value);
      formData.append("dressName", dressName.current.value);
      formData.append("outerBrand", outerBrand.current.value);
      formData.append("outerName", outerName.current.value);
      formData.append("shoesBrand", shoesBrand.current.value);
      formData.append("shoesName", shoesName.current.value);
      formData.append("etcBrand", etcBrand.current.value);
      formData.append("etcName", etcName.current.value);
      formData.append("description", description.current.value);
  axios({
    method: "post",
    url:`http://localhost:8080/dailyLook/add`,
    data: formData,
    headers: { "Content-Type" : "multipart/form-data" }
  }).then((response) => console.log("등록 성공 "+ response))
    .catch((error) => console.log("등록 실패 "+ error));
    return window.location.href = `/`;  // 홈화면으로 이동
  }};

    return ( 
      <>
   <Container style={{margin: "auto", width: "100%", display: "flex"}}>    
   <h1 style={{marginTop:"100px", marginLeft: "550px", position:"absolute"}}>New DailyLook</h1>
    <Row>
    <Col>
          
    <Card style={{marginLeft:"50px", width: '20rem', marginTop: "200px", position: "absolute"}}>
        <Card.Img style={{height: "615px"}} variant="top" src={previewImg ? previewImg : "https://ualr.edu/elearning/files/2020/10/No-Photo-Available-924x1155.jpg"} />
        <Card.Body>
        <Button onClick={handleClick} variant="primary" style={{marginLeft: "175px", backgroundColor: "black", border: "black", color: "white"}}>사진 업로드</Button>
               <input 
                type="file"
                name="orgFile"
                accept="image/*"
                ref={orgFile}
                onChange={(e) => {insertImg(e);}}
                style={{display: 'none'}}
                />       
        </Card.Body>
    </Card>
    </Col>

    <Col>
    
    <InputGroup style={{width: "400px", marginLeft: "370px", marginTop: "200px", position: "absolute"}}>
        <FormControl value="데일리룩 제목" style={{border: "transparent"}}/>
        <FormControl  ref={dailyLookName} type="text" style={{borderLeft: "transparent", borderRight: "transparent"}}/>
    </InputGroup>
    <InputGroup style={{width: "400px", marginLeft: "370px", marginTop: "240px", position: "absolute"}}>
        <FormControl value="   카테고리" style={{border: "transparent", borderRight: "transparent"}}/>
        <select name="style" ref={style} style={{width: "200px"}}>
              <option className="u605_input_option" selected='selected'>스타일 선택</option>
              <option className="u605_input_option" value="1">걸리시</option>
              <option className="u605_input_option" value="2">댄디</option>
              <option className="u605_input_option" value="3">베이직</option>
              <option className="u605_input_option" value="4">보이쉬</option>
              <option className="u605_input_option" value="5">비즈니스 캐주얼</option>
              <option className="u605_input_option" value="6">스트리트</option>
              <option className="u605_input_option" value="7">아메카지</option>
              <option className="u605_input_option" value="8">캐주얼</option>
              <option className="u605_input_option" value="9">펑크</option>
              <option className="u605_input_option" value="10">페미닌</option>
            </select>
    </InputGroup>
    
    <h3 style={{position: "absolute", zIndex: "10"}}>
  <Badge style={{ lineHeight:"25px", marginLeft: "460px", marginTop: "293px", width:"230px", height:"40px"}} bg="black">Information</Badge>
    </h3>
    
    <Table id="table1" style={{textAlign: "center", marginTop: "335px", marginLeft: "330px", width:"65%"}} striped bordered hover>
  
  
  <thead>
    <tr >
      <th>분류</th>
      <th>브랜드명</th>
      <th>상품명</th>
    </tr>
  </thead>
  <tbody id="table1" >
    <tr>
      <td>상의</td>
      <td><input ref={topBrand} name="topBrand" type="text" style={{backgroundColor: "transparent",border: "black"}}/></td>
      <td><input ref={topName}  name="topName" type="text" style={{backgroundColor: "transparent",border: "black"}}/></td> 
    </tr>

    <tr>
    <td>하의</td>
      <td><input ref={bottomBrand} name="bottomBrand" type="text" style={{backgroundColor: "transparent",border: "black"}}/></td>
      <td><input ref={bottomName} name="bottomName" type="text"  style={{backgroundColor: "transparent",border: "black"}}/></td>
    </tr>

    <tr>
    <td>원피스</td>
      <td><input ref={dressBrand}  name="dressBrand" type="text" style={{backgroundColor: "transparent",border: "black"}}/></td>
      <td><input ref={dressName} name="dressName" type="text" style={{backgroundColor: "transparent",border: "black"}}/></td>
    </tr>

    <tr>
    <td>아우터</td>
      <td><input ref={outerBrand} name="outerBrand" type="text" style={{backgroundColor: "transparent",border: "black"}}/></td>
      <td><input ref={outerName} name="outerName" type="text" style={{backgroundColor: "transparent",border: "black"}}/></td>
    </tr>

    <tr>
    <td>신발</td>
      <td><input  ref={shoesBrand} name="shoesBrand" type="text" style={{backgroundColor: "transparent",border: "black"}}/></td>
      <td><input ref={shoesName} name="shoesName" type="text" style={{backgroundColor: "transparent",border: "black"}}/></td>
    </tr>

    <tr>
    <td>패션잡화</td>
      <td><input name="etcBrand" ref={etcBrand} type="text" style={{backgroundColor: "transparent",border: "black"}}/></td>
      <td><input name="etcName" ref={etcName} type="text" style={{backgroundColor: "transparent",border: "black"}}/></td>
    </tr>

  </tbody>
</Table>

<h3 style={{position: "absolute", zIndex: "10"}}>
  <Badge style={{ marginLeft: "490px", marginTop: "0px"}} bg="black">Daily Record</Badge>
</h3>

  <InputGroup style={{position:"absolute", marginTop: "35px", marginLeft: "328px", width: "500px", height: "195px", zIndex: "1"}}>
    <FormControl as="textarea" aria-label="With textarea" name="description" ref={description}/>
  </InputGroup>
  <button onClick={addDailyLook} style={{height: "33px", marginLeft: "473px", marginTop: "237px", backgroundColor: "black", color: "white", borderRadius: "5px"}}>오늘의 데일리룩 등록하기</button>
    </Col>

    
        <h3 style={{position: "absolute", zIndex: "10"}}>
  <Badge style={{ marginLeft: "930px", marginTop: "180px"}} bg="black">My Closet</Badge>
    </h3>
    </Row>

    <Row>
      <Card style={{height: "685px", width: "20rem", marginLeft: "90px", marginTop: "200px"}}>
        <Row>        
          <Card.Img src="closet (3).png" alt="" style={{width: "135px", marginTop: "130px"}}/> 
          <Card.Img src="closet (3).png" alt="" style={{width: "135px", marginTop: "130px", marginLeft: "30px"}}/> 
          <Card.Img src="closet (3).png" alt="" style={{width: "135px", marginTop: "130px"}}/> 
          <Card.Img src="closet (3).png" alt="" style={{width: "135px", marginTop: "130px", marginLeft: "30px"}}/> 
        </Row>
      </Card> 
    </Row>
   </Container>
     </>   
  );
}

export default NewDailyLook;