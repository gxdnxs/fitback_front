import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./component/layout/Footer";
import Header from "./component/layout/Header";

import BookmarkList from "./component/page/BookmarkList";
import Login from "./component/page/Login";
import Register from "./component/page/Register";
import SearchResult from "./component/page/SearchResult";
import UserEdit from "./component/page/UserEdit";
import "bootstrap/dist/css/bootstrap.min.css";
import HotPost from "./component/ui/searchUi/HotPost";
import Home from "./component/page/Home";
import DailyLook from "./component/page/DailyLook";
import AllItems from "./component/page/AllItems";
import NewDailyLook from "./component/page/NewDailyLook";

function App() {
    return (



            <BrowserRouter>
            <header >
                    <Header />
                </header>
                <div id = "wrapper" style = {{display: "flex", flexDirection: "column", minWidth : "100vw",
        minHeight: "100vh"}} >
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dailyLook/:id" element={<DailyLook />} />
                        <Route path="/newDailyLook" element={<NewDailyLook />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/bookmarklist"
                            element={<BookmarkList />}
                        />
                        <Route path="/register" element={<Register />} />
                        <Route path="/search" element={<HotPost />} />
                        <Route
                            path="/searchresult"
                            element={<SearchResult />}
                        />
                        <Route path="/useredit" element={<UserEdit />} />
                        <Route path="/allitems" element={<AllItems />} />

                    </Routes>
                </main>
                </div>

                <footer style={{ marginTop: "auto" }}>
                    <Footer />
                </footer>
            </BrowserRouter>
        
     
    );
}

export default App;
