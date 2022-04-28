import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import { Button, Card, Col, Row, Container, FormControl, InputGroup, Table, Badge, ListGroup, CardGroup } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import '../../../node_modules/@fullcalendar/common/main.css';
import { Link } from "react-router-dom";
import BookMark from "../ui/homeUi/BookMark";

function Home() {

    const [event, setEvent] = useState();

    const dailyUrl = 'http://localhost:8080/dailyLook/list';

    //아이템 목록으로 이동
    const handleClick = () => {
        window.location.href="/allitems"
    }


    // 데일리룩 정보 요청
    useEffect(() => {
        axios.get(dailyUrl)
        .then((response) => {
            const arr = response.data;
            let datas = [];
            let imageUrl = 'http://localhost:8080/image/';
            arr.forEach(element => {
               datas.push({
                id: element.id,
                title: element.dailyLookName, 
                date: element.createDate, 
                url: 
                imageUrl + element.id
            });
            console.log("date:%s",element.createDate); 
            console.log("dailyName:%s", element.dailyLookName);
            console.log("photo:%s", element.filePath);
            });
           setEvent(datas);
        });
    },[]);

    // 달력에 이미지를 넣기 위한 렌더링 작업
    const renderPhoto = (eventInfo) => {
        return(
        <div >
            <p>{eventInfo.event.title}</p>
            <Link to={`/dailyLook/${eventInfo.event.id}`}>
                <img className="eventimage" src={eventInfo.event.url} style={{width: "100px", height:"150px"}} alt=""/>
            </Link>
        </div>
        );
    };

    return ( 
        <>
        <Container style={{marginTop: "100px"}}>
        <h1 style={{marginTop:"10px", marginLeft: "490px", position:"absolute"}}>Home</h1>
            <Row>
            <Link to='/newDailyLook'><button style={{color: "white", backgroundColor: "black", marginTop: "107px", marginLeft: "190px", position: "absolute", width: "200px"}}>오늘의 데일리룩 만들기</button></Link>
               <div style={{position: "absolute", marginTop: "165px", marginLeft:"860px"}}><img style={{width: "170px", height: "319px"}} src="https://image.musinsa.com/mfile_s01/_shopstaff/view.staff_6260b1fb6979e.jpg?20220421103004" alt=""/></div>
                <Card style={{padding: "0px", width: "225px", height: "320px",position: "absolute", marginTop: "165px", marginLeft:"1050px"}}>
                <FormControl value="내 정보" style={{textAlign: "center", marginLeft: "29px", marginTop: "20px", height: "25px", width: "150px", borderLeft: "transparent", borderRight: "transparent"}}/>
                <Card.Body>

                <InputGroup >
                    <FormControl style={{border: "transparent"}} value="성별"/>
                    <FormControl value="여" style={{marginTop: "4px", height: "25px", borderLeft: "transparent", borderRight: "transparent"}}/>
                </InputGroup>

                <InputGroup style={{marginTop: "5px", }}>
                    <FormControl style={{border: "transparent"}} value="키"/>
                    <FormControl value="167cm" style={{marginTop: "4px", height: "25px", borderLeft: "transparent", borderRight: "transparent"}}/>
                </InputGroup>

                <InputGroup style={{marginTop: "5px", }}>
                    <FormControl style={{border: "transparent"}} value="사이즈"/>
                    <FormControl value="55" style={{marginTop: "4px", height: "25px", borderLeft: "transparent", borderRight: "transparent"}}/>
                </InputGroup>

                <InputGroup style={{marginTop: "5px", }}>
                    <FormControl style={{border: "transparent", width: "100px"}} value="신발 사이즈"/>
                    <FormControl value="235" style={{marginTop: "6px", height: "25px", width: "77px", borderLeft: "transparent", borderRight: "transparent"}}/>
                </InputGroup>

                <InputGroup style={{marginTop: "5px", }}>
                    <FormControl style={{border: "transparent"}} value="기타 특징"/>
                </InputGroup>

                <InputGroup>
                    <FormControl value="오프숄더를 좋아함!" style={{height: "25px", borderLeft: "transparent", borderRight: "transparent"}}/>
                </InputGroup>
            <div style={{marginTop: "3px"}}>
            <Badge bg="black">대표 룩 수정</Badge>
            &nbsp;&nbsp;&nbsp;
            <Badge bg="black">내 정보 수정</Badge>
            </div>
                </Card.Body>
            </Card>

            <Card style={{position: "absolute", marginTop: "500px", marginLeft: "870px",width: "405px", height: "257px"}}>
            <FormControl value="전체 아이템 목록" style={{textAlign: "center", marginLeft: "29px", marginTop: "20px", height: "25px", width: "300px", borderLeft: "transparent", borderRight: "transparent"}}/>
                <Card.Body style={{marginLeft: "87px"}}>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ0AAACdCAMAAACZ+IrkAAAAYFBMVEX///8AAAD8/PxwcHD29vaGhoYvLy/g4OAfHx+wsLClpaVsbGwsLCyKiorLy8s3Nze5ubkKCgpmZmaenp5TU1OXl5dZWVnr6+vR0dE/Pz95eXlKSkoUFBSQkJDBwcFFRUXYWui9AAAEn0lEQVR4nO2d67ayKhSG0SwP5alS1Ezv/y63cjBskaIWzm9s3j9LljJ5BghMEAihQVFpQVBZIIlwvDcXU4sldO7eVIPcf5MuD4/r9aw7C95zg4Uwn6RLZG+ksrzOQrnJgj9J52+yvZ0umKOzm0Wl6ztjutUlG0a2Ap2/8B0O7RHdBiXzdM55oc0Yf4vuYH+f7uJ+jc5Ro6tPaqr/0qUxvUWuL6Mn0xlLqnQHW0ko/EsXI3or665PLuKP9g1Z7ny05FwX0UkekEhKR3WjdEyE7u68xx9k6Azd/4EuGNEhQvfZqi66S5MQVd21FyRcbRcs/eRNDc9NXXTL9ABNZx1B09XFDnR1nRLVKQnSQDq+R4OxrZMufvZ2qoiJ+Ak+C1wIT8tCzJEMdNK1bp8nXkT/c+yN5vw+G843NIRpiMTX195RB/FWYDchQyyLD+5tNp4/4VeCnc62TjqWqlcymIrf5nTWc0TX56XGvqKphUppXQfPfqCzohFd6mjtyRoBTuhcX3TtiK7LS639rFNRkPQuDt8JXU6qRsYTzMmDka3XC3CT4JkF0cgrIXRnkrF9JJLgrffwuyG6Zh9FIpp3Qyvj0kw8kT8HKHQuqTQJpyN56V2g0FGEFmNKZx945YBBRxxlK2R0yPVA0SHS+1qNxypvAIsOEU/BqhkdymHROYOvRehoXoKhQ1Eq0pEBHCS6ckTXAKJzmlwsWRyUcEq2yC7WS8+iGq4B0HkiWxdb8LYA0HG1YZMKwWWziz+ma33MxxW9rlEOhq48ukOCnQ/4yByk2b/7THf1sZBgWpG5FN1zUJ/o8sE0SZAOgODQjRPMDJ2hM3SGztAZOkNn6AydoVtI52ShC5eu7MapLlQ6ErWBSlfQqBvoyFR3prhKawPd1Pq7ckSHRTpcxUf8e7o6v38UWXk5hB4iHbKdPs1f0y1UNjZo6BbojeTndPyrv4KsOHgzuGedndeO7d2kkqyBS9cvsFBdM6udzu5TrRTXzGqnA9DPGjoJHd9eAJMOxUre5150+HjolxMBpWOCT7euJ9O2KjW4rVGph26DDB1sutNljTR9nz1hd4WK/b/PTgjA99kJmb5ChU5ueVc6fKwGPWWbd/eks0d7rh+SLSp70kWjBciy1PekwycRzgOWd6i5Prjas2xP+7511sGDpBujoLQochk6Q2foDN2/R7dutK3LN7bmp9ql0++a6NbL0IGmq8/XNdK0r2flt57990RNyLTGhs7QgaJzb69zkgJwMxW52CXkEuNmpuLjTMW4A5YU7a7vXVS+dI8kD+xcZ18zFVLTpkUxdIZuG52i0ee36BaNZ+/vhw/J1Vz/0vEzjZbJfyygWyL9YzKwdHY1beKPHl872VBhlRYq2kUmPeGMkW10D1fhzEqEoyUSTZGvx8Wi6IL6MpinW68taxepZt+79WJ0WyxM03mKh1VKRbYW8zMr18mbpAMhQ7deH+ny8Ni/PeXKc3bXi6Y6c/qyT4/JUfVRvibio1RzLUrC5vkU/buvyWF002dDs5Ldh262ZJn2oZutFWDpxLPwQ81wdITCJD0LX/gdgcPnI1d/pZfTK/6OwH+/TLhj+FTcXQAAAABJRU5ErkJggg=="
                alt=""
                type="button"
                onClick={handleClick}
                />
                </Card.Body>
            </Card>

            {/* <Card style={{position: "absolute", marginTop: "500px", marginLeft: "870px",width: "405px", height: "257px"}}>
            <FormControl value="대표 옷장" style={{textAlign: "center", marginLeft: "29px", marginTop: "20px", height: "25px", width: "300px", borderLeft: "transparent", borderRight: "transparent"}}/>
                <Card.Body>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ0AAACdCAMAAACZ+IrkAAAAYFBMVEX///8AAAD8/PxwcHD29vaGhoYvLy/g4OAfHx+wsLClpaVsbGwsLCyKiorLy8s3Nze5ubkKCgpmZmaenp5TU1OXl5dZWVnr6+vR0dE/Pz95eXlKSkoUFBSQkJDBwcFFRUXYWui9AAAEn0lEQVR4nO2d67ayKhSG0SwP5alS1Ezv/y63cjBskaIWzm9s3j9LljJ5BghMEAihQVFpQVBZIIlwvDcXU4sldO7eVIPcf5MuD4/r9aw7C95zg4Uwn6RLZG+ksrzOQrnJgj9J52+yvZ0umKOzm0Wl6ztjutUlG0a2Ap2/8B0O7RHdBiXzdM55oc0Yf4vuYH+f7uJ+jc5Ro6tPaqr/0qUxvUWuL6Mn0xlLqnQHW0ko/EsXI3or665PLuKP9g1Z7ny05FwX0UkekEhKR3WjdEyE7u68xx9k6Azd/4EuGNEhQvfZqi66S5MQVd21FyRcbRcs/eRNDc9NXXTL9ABNZx1B09XFDnR1nRLVKQnSQDq+R4OxrZMufvZ2qoiJ+Ak+C1wIT8tCzJEMdNK1bp8nXkT/c+yN5vw+G843NIRpiMTX195RB/FWYDchQyyLD+5tNp4/4VeCnc62TjqWqlcymIrf5nTWc0TX56XGvqKphUppXQfPfqCzohFd6mjtyRoBTuhcX3TtiK7LS639rFNRkPQuDt8JXU6qRsYTzMmDka3XC3CT4JkF0cgrIXRnkrF9JJLgrffwuyG6Zh9FIpp3Qyvj0kw8kT8HKHQuqTQJpyN56V2g0FGEFmNKZx945YBBRxxlK2R0yPVA0SHS+1qNxypvAIsOEU/BqhkdymHROYOvRehoXoKhQ1Eq0pEBHCS6ckTXAKJzmlwsWRyUcEq2yC7WS8+iGq4B0HkiWxdb8LYA0HG1YZMKwWWziz+ma33MxxW9rlEOhq48ukOCnQ/4yByk2b/7THf1sZBgWpG5FN1zUJ/o8sE0SZAOgODQjRPMDJ2hM3SGztAZOkNn6AydoVtI52ShC5eu7MapLlQ6ErWBSlfQqBvoyFR3prhKawPd1Pq7ckSHRTpcxUf8e7o6v38UWXk5hB4iHbKdPs1f0y1UNjZo6BbojeTndPyrv4KsOHgzuGedndeO7d2kkqyBS9cvsFBdM6udzu5TrRTXzGqnA9DPGjoJHd9eAJMOxUre5150+HjolxMBpWOCT7euJ9O2KjW4rVGph26DDB1sutNljTR9nz1hd4WK/b/PTgjA99kJmb5ChU5ueVc6fKwGPWWbd/eks0d7rh+SLSp70kWjBciy1PekwycRzgOWd6i5Prjas2xP+7511sGDpBujoLQochk6Q2foDN2/R7dutK3LN7bmp9ql0++a6NbL0IGmq8/XNdK0r2flt57990RNyLTGhs7QgaJzb69zkgJwMxW52CXkEuNmpuLjTMW4A5YU7a7vXVS+dI8kD+xcZ18zFVLTpkUxdIZuG52i0ee36BaNZ+/vhw/J1Vz/0vEzjZbJfyygWyL9YzKwdHY1beKPHl872VBhlRYq2kUmPeGMkW10D1fhzEqEoyUSTZGvx8Wi6IL6MpinW68taxepZt+79WJ0WyxM03mKh1VKRbYW8zMr18mbpAMhQ7deH+ny8Ni/PeXKc3bXi6Y6c/qyT4/JUfVRvibio1RzLUrC5vkU/buvyWF002dDs5Ldh262ZJn2oZutFWDpxLPwQ81wdITCJD0LX/gdgcPnI1d/pZfTK/6OwH+/TLhj+FTcXQAAAABJRU5ErkJggg==" alt="" />
                <Badge bg="black" style={{marginTop: "30px", marginLeft: "75px", position: "absolute"}}>여름용</Badge>
                <Badge bg="black" style={{maarginTop: "250px", marginLeft: "50px"}}>대표 옷장 바꾸기</Badge>
                </Card.Body>
            </Card> */}


            <Col>
            {/* 달력 */}
            <div style={{width: "800px", marginTop: "100px", marginLeft: "50px"}}>
            <FullCalendar 
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                eventContent={renderPhoto}
                events={event}
                />
            </div>  

            
            <Row>
            {/* 북마크 */}
            <Card style={{width: "390px", height: "320px",marginLeft: "65px", marginTop: "10px"}}>
            <FormControl value="북마크" style={{textAlign: "center", marginLeft: "29px", marginTop: "20px", height: "25px", width: "300px", borderLeft: "transparent", borderRight: "transparent"}}/>
            <Card.Body style={{marginLeft: "-7px"}}>
            <BookMark/>
               {/* 북마크페이지 바로가기 */}
               
               <div  className="ax_default button">
                        <Link to = 'bookmarklist' >
                        <div style={{margin : ""}}>
                           <button style={{marginTop : "115px", backgroundColor : "black", padding : "3px 50px"  }}> <p style={{color : "white",textDecoration : "none", padding : "0px", margin : "0px" }}><span >자세히 보기</span></p></button>
                        </div></Link>
                    </div>
            </Card.Body>
            </Card> 

            {/* 북마크
            <Card style={{width: "390px", height: "320px",marginLeft: "65px", marginTop: "10px"}}>
            <FormControl value="북마크" style={{textAlign: "center", marginLeft: "29px", marginTop: "20px", height: "25px", width: "300px", borderLeft: "transparent", borderRight: "transparent"}}/>
            <Card.Body style={{marginLeft: "20px"}}>
                <img style={{width: "130px"}} src="" alt="" />
                <img alt="" />
                <img alt="" />
                <img alt="" />
                <img alt="" />
            </Card.Body>
            </Card>  */}

            {/* 내게 달린 댓글 모음 */}
            <Card style={{marginLeft: "470px", marginTop: "10px", position: "absolute", width: "390px", height: "320px"}}>
            <FormControl value="내게 달린 댓글 모음" style={{textAlign: "center", marginLeft: "29px", marginTop: "20px", height: "25px", width: "300px", borderLeft: "transparent", borderRight: "transparent"}}/>
            <Card.Body>
            <InputGroup style={{width: ""}}>
            <InputGroup.Text>
               100점/fidback
            </InputGroup.Text><FormControl typeof="readOnly" value="핏 너무 예뻐요! 정보 잘 보고 갑니다~"/>
             </InputGroup>

             <InputGroup style={{marginTop: "10px"}}>
            <InputGroup.Text>
                80점/fidback
            </InputGroup.Text><FormControl typeof="readOnly" value="요즘 날씨가 더워서 이런 옷이 좋네요"/>
             </InputGroup>

             <InputGroup style={{marginTop: "10px"}}>
            <InputGroup.Text>
                80점/fidback
            </InputGroup.Text><FormControl typeof="readOnly" value="니트 질이 좋아보여요!"/>
             </InputGroup>

             <InputGroup style={{marginTop: "10px"}}>
            <InputGroup.Text>
                100점 / fidback
            </InputGroup.Text><FormControl typeof="readOnly" value="역시 후드는 모자가 커야 핏이 사네"/>
             </InputGroup>
            </Card.Body>
            </Card> 

        {/* 내가 쓴 댓글 모음 */}
        <Card style={{height: "320px", width: "405px", marginLeft: "870px", marginTop: "10px", position: "absolute"}}>
        <FormControl value="내가 쓴 댓글 모음" style={{textAlign: "center", marginLeft: "29px", marginTop: "20px", height: "25px", width: "300px", borderLeft: "transparent", borderRight: "transparent"}}/>
            <Card.Body>
            <InputGroup>
            <InputGroup.Text>
                100점/fidback
            </InputGroup.Text><FormControl typeof="readOnly" value="정보 잘 보고 갑니다~"/>
             </InputGroup>

             <InputGroup style={{marginTop: "10px"}}>
            <InputGroup.Text>
                60점/fidback
            </InputGroup.Text><FormControl typeof="readOnly" value="신발이 너무 커보여요"/>
             </InputGroup>

             <InputGroup style={{marginTop: "10px"}}>
            <InputGroup.Text>
                80점/fidback
            </InputGroup.Text><FormControl typeof="readOnly" value="나팔바지 핏이 너무 좋네요!"/>
             </InputGroup>

             <InputGroup style={{marginTop: "10px"}}>
            <InputGroup.Text>
                80점/fidback
            </InputGroup.Text><FormControl typeof="readOnly" value="흠 저도 이런 가죽자켓 살까 고민중"/>
             </InputGroup>
            </Card.Body>
            </Card> 
        </Row>
        </Col>
       
        </Row>
         
        </Container>          
        </>
     );
}

export default Home;