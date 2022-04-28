import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return ( 


<div style = {{display : "flex", justifyContent : "left" , backgroundColor : "black", width : "100vw"}}>
<nav class="navbar navbar-expand-sm navbar-light bg-black">
<Link to='/' style={{textDecoration : "none"}}><a class="navbar-brand" style={{color : "white", fontSize : "20pt"}} href="#">　FitBack　　</a></Link>

  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link to='/' style={{textDecoration : "none"}}><a class="nav-link" href="#" style={{color : "white"}}>My DailyLook <span class="sr-only"></span></a></Link>
      </li>
      <li class="nav-item">
      <Link to='/search' style={{textDecoration : "none"}}><a class="nav-link" href="#"style={{color : "white"}}>Look Around</a></Link>
      </li>

    </ul>
    <span class="navbar-text">
    
    </span>
  </div>
</nav>
</div>


     
    );
}

export default Header;