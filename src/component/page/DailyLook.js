import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Row, Container, FormControl, InputGroup, Table, Badge, ListGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NewOpinion from "../ui/opinionUi/NewOpinion";
import Opinion from "../ui/opinionUi/Opinion";

function DailyLook() {

  const { id } = useParams();
	const [refreash, setRefreash] = useState(false);
  const findDailyLook = `http://localhost:8080/dailyLook/${id}`;
  const navigate = useNavigate();
  const [list, setList] = useState({});
  const [imageSrc, setImageSrc] = useState([]);
  const [previewImg, setPreviewImg] = useState(null);
  const orgFile = useRef();

   //데일리룩 아이디별 get 요청
   useEffect(() => {
    axios.get(findDailyLook).then(response => {setList(response.data)})
  }, []);

console.log("데일리룩 게시글 아이디 " + id);

const photo = `http://localhost:8080/image/${id}`;

//사진 정보 콘솔에 보이기
console.log("사진 " + photo);

//댓글 선택 인덱스
const [index, setIndex] = useState("0"); 

const [inputs, setInputs] = useState({
  dailyLookName: '',
  style:'',
  orgFile:'',
  topBrand: '',
  topName: '',
  bottomBrand: '',
  bottomName: '',
  dressBrand: '',
  dressName: '',
  outerBrand: '',
  outerName: '',
  shoesBrand: '',
  shoesName: '',
  etcBrand: '',
  etcName: '',
  description: '',
});

//여러개의 인풋값 관리
const onChange = (e) => {
  const {name, value} = e.target;
      setInputs({
          ...inputs,
          [name]:value
      });
    };

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
    
console.log("프리뷰이미지 " + previewImg);
 console.log("수정할 이미지 " + imageSrc[0]);

//기존 데이터베이스에 저장된 정보를 위에서 정의한 inputs에 담아 데이터 뿌리기
useEffect(() => {
  if(list) {
    setInputs({
    dailyLookName: list.dailyLookName,
    style: list.style,
    filePath: photo,
    topBrand: list.topBrand,
    topName: list.topName,
    bottomBrand: list.bottomBrand,
    bottomName: list.bottomName,
    dressBrand: list.dressBrand,
    dressName: list.dressName,
    outerBrand: list.outerBrand,
    outerName: list.outerName,
    shoesBrand: list.shoesBrand,
    shoesName: list.shoesName,
    etcBrand: list.etcBrand,
    etcName: list.etcName,
    description: list.description
  });
}
},[list]);

// 의견 선택(드롭박스 index 0: 댓글 쓰기, 1: 댓글 보기)
const onSelect = (e) => {
  setIndex(e.target.value);
};

// 사진 선택 버튼
const handleClick = () => {
  orgFile.current.click();
};
 
//수정 요청
const editDailyLook = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("dailyLookName", inputs.dailyLookName);
  formData.append("style", inputs.style);    
  formData.append("topBrand", inputs.topBrand);
  formData.append("orgFile", imageSrc[0].uploadedFile);
  formData.append("topName", inputs.topName);    
  formData.append("bottomBrand", inputs.bottomBrand);
  formData.append("bottomName", inputs.bottomName);
  formData.append("dressBrand", inputs.dressBrand);
  formData.append("dressName", inputs.dressName);
  formData.append("outerBrand", inputs.outerBrand);
  formData.append("outerName", inputs.outerName);
  formData.append("shoesBrand", inputs.shoesBrand);
  formData.append("shoesName", inputs.shoesName);
  formData.append("etcBrand", inputs.etcBrand);
  formData.append("etcName", inputs.etcName);
  formData.append("description", inputs.description);
  axios({
    method: "put",
    url:`http://localhost:8080/dailyLook/edit/${id}`,
    data: formData,
    headers: { "Content-Type" : "multipart/form-data" }
  }).then((response) => console.log("수정 성공 "+ response))
    .catch((error) => console.log("수정 실패 "+ error));
    return window.location.href = `/dailyLook/${id}`;  // 수정한 데일리룩으로 이동
  };

//삭제 요청
const deleteDailyLook = (e) => {
  e.preventDefault();
  if(window.confirm("이 데일리룩을 삭제할까요?")){
  axios.delete(`http://localhost:8080/dailyLook/remove/${id}`)
  .then((response) => console.log("삭제 성공 "+ response))
  .then(navigate('/'))  // 홈화면으로 이동
  .catch((error) => console.log(error));
}} 

    return ( 
    <>
    <Container style={{margin: "auto", width: "100%", display: "flex"}}>    
     <h1 style={{marginTop:"100px", marginLeft: "600px", position:"absolute"}}>DailyLook</h1>
    <Row>
      
    <Col>
         
    <Card style={{ marginLeft:"150px", width: '20rem', marginTop: "200px", position: "absolute"}}>
        <Card.Img style={{height: "615px"}} variant="top" src={previewImg ? previewImg : photo} />
        <Card.Body>
        <Button variant="primary" style={{marginLeft: "175px", backgroundColor: "black", border: "black", color: "white"} } onClick={handleClick}>사진 업로드</Button>
        <input 
              type="file"
              name="orgFile"
              accept="image/*"
              multiple
              ref={orgFile}
              onChange={(e) => {insertImg(e, e.target.files[0])}}
              style={{display: 'none'}}
              />
        </Card.Body>
    </Card>
    </Col>

    <Col>
    
    <InputGroup style={{width: "400px", marginLeft: "370px", marginTop: "200px", position: "absolute"}}>
        <FormControl value="데일리룩 제목" style={{border: "transparent"}}/>
        <FormControl name="dailyLookName"  type="text" style={{borderLeft: "transparent", borderRight: "transparent"}} onChange={onChange} value={inputs.dailyLookName}/>
    </InputGroup>
    <InputGroup style={{width: "400px", marginLeft: "370px", marginTop: "240px", position: "absolute"}}>
        <FormControl value="   카테고리" name="style" style={{border: "transparent", borderRight: "transparent"}}  />
        <select name="style" style={{width: "200px"}} onChange={onChange} value={inputs.style}>
              <option  selected='selected'>스타일 선택</option>
              <option  value="1">걸리시</option>
              <option  value="2">댄디</option>
              <option  value="3">베이직</option>
              <option  value="4">보이쉬</option>
              <option  value="5">비즈니스 캐주얼</option>
              <option  value="6">스트리트</option>
              <option  value="7">아메카지</option>
              <option  value="8">캐주얼</option>
              <option  value="9">펑크</option>
              <option  value="10">페미닌</option>
            </select>
    </InputGroup>
    
    <h3 style={{position: "absolute", zIndex: "10"}}>
  <Badge style={{ lineHeight:"25px", marginLeft: "460px", marginTop: "293px", width:"230px", height:"40px"}} bg="black">Information</Badge>
    </h3>
    
    <Table style={{textAlign: "center", marginTop: "335px", marginLeft: "330px", width:"65%"}} striped bordered hover>
  
  
  <thead>
    <tr >
      <th>분류</th>
      <th>브랜드</th>
      <th>상품명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>상의</td>
      <td><input  type="text" style={{backgroundColor: "transparent", border: "black"}}  name="topBrand" onChange={onChange} value={inputs.topBrand}/></td>
      <td><input  type="text" style={{backgroundColor: "transparent",  border: "black"}} name="topName" onChange={onChange} value={inputs.topName}/></td> 
    </tr>

    <tr>
    <td>하의</td>
      <td><input  type="text" style={{backgroundColor: "transparent", border: "black"}} name="bottomBrand" onChange={onChange} value={inputs.bottomBrand}/></td>
      <td><input  type="text" style={{backgroundColor: "transparent", border: "black"}} name="bottomName" onChange={onChange} value={inputs.bottomName}/></td>
    </tr>

    <tr>
    <td>원피스</td>
      <td><input  type="text" style={{backgroundColor: "transparent", border: "black"}} name="dressBrand" onChange={onChange} value={inputs.dressBrand}/></td>
      <td><input  type="text" style={{backgroundColor: "transparent", border: "black"}} name="dressName" onChange={onChange} value={inputs.dressName}/></td>
    </tr>

    <tr>
    <td>아우터</td>
      <td><input  type="text" style={{backgroundColor: "transparent", border: "black"}} name="outerBrand" onChange={onChange} value={inputs.outerBrand}/></td>
      <td><input  type="text" style={{backgroundColor: "transparent", border: "black"}} name="outerName" onChange={onChange} value={inputs.outerName}/></td>
    </tr>

    <tr>
    <td>신발</td>
      <td><input  type="text" style={{backgroundColor: "transparent", border: "black"}} name="shoesBrand" onChange={onChange} value={inputs.shoesBrand}/></td>
      <td><input  type="text" style={{backgroundColor: "transparent", border: "black"}} name="shoesName" onChange={onChange} value={inputs.shoesName}/></td>
    </tr>

    <tr>
    <td>패션잡화</td>
      <td><input  type="text" style={{backgroundColor: "transparent", border: "black"}} name="etcBrand" onChange={onChange} value={inputs.etcBrand}/></td>
      <td><input  type="text" style={{backgroundColor: "transparent", border: "black"}} name="etcName" onChange={onChange} value={inputs.etcName}/></td>
    </tr>

  </tbody>
</Table>

<h3 style={{position: "absolute", zIndex: "10"}}>
  <Badge style={{ position: "absolute", marginLeft: "490px", marginTop: "                                                                                                                                                                                                                                 0px"}} bg="black">Daily Record</Badge>
</h3>

  <InputGroup style={{position:"absolute", marginTop: "35px", marginLeft: "328px", width: "500px", height: "150px", zIndex: "1"}}>
    <FormControl as="textarea" aria-label="With textarea" name="description" type="text" onChange={onChange} value={inputs.description}/>
  </InputGroup>

        <div style={{float: "left"}}>
            <Button onClick={editDailyLook} style={{backgroundColor: "black", border: "black", color: "white", marginLeft: "400px", marginTop: "190px"}}>수정하기</Button>        
            <Button onClick={deleteDailyLook} style={{backgroundColor: "black", border: "black", color: "white", marginLeft: "650px", marginTop: "-65px"}}>삭제하기</Button>        
        </div>

    </Col>
    </Row>
    <h3 style={{position: "absolute", zIndex: "10"}}>
     <Badge style={{ marginLeft: "1100px", marginTop: "180px"}} bg="black">Opinion</Badge>
    </h3>

    <Row>
      <Card style={{height: "685px", width: "20rem", marginLeft: "90px", marginTop: "200px"}}>
         <select value={index} onChange={onSelect} style={{position: "absolute", marginLeft: "205px"}}>
          <option value="0">댓글 쓰기</option>
          <option value="1">댓글 보기</option>
        </select>
          {index === "0" ? <NewOpinion listId={list.id} setRefreash={setRefreash}/> : null}
          {index === "1" ? <Opinion /> : null}
      </Card> 
    </Row>
         <Row>


         </Row>
   </Container>

    </> 
    );
}

export default DailyLook;