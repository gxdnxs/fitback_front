import React, { useState } from "react";
// import Pagination from "react-js-pagination";
// import './Paing.css';

function Paging({ postsPerPage, totalPosts, paginate }) {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
    }

    // const handlePageChange = (page) => { 
    //     setPage(page); 
    // };

    return (

        <div>
        <nav>
          <ul >
            {pageNumbers.map((number) => (
              <li key={number} >
                <span onClick={() => paginate(number)} >
                  {number}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </div>

        // <Pagination 
        // activePage={page} 
        // itemsCountPerPage={1} 
        // totalItemsCount={count} 
        // pageRangeDisplayed={5} 
        // prevPageText={"<"} 
        // nextPageText={">"} 
        // onChange={handlePageChange}
        // />
    );
}
export default Paging;