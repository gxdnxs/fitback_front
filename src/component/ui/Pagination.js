import React from 'react';


function Pagination({ total, limit, page, setPage }) {
    const numPages = Math.ceil(total / limit);

    return (
        <nav id="wrapper" style={{marginTop : "50px", display: "flex", flexDirection: "row", justifyContent : "center"}}>    
            <button id = "u910" onClick={() => setPage(page - 1)} disabled={page === 1}>
                &lt;
            </button>
            
            {Array(numPages)
                .fill()
                .map((_, i) => (
                <button  id = "u910"
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    aria-current={page === i + 1 ? "page" : null}
                >
                {i + 1}
                </button>
                ))
            }
            
            <button id = "u910" onClick={() => setPage(page + 1)} disabled={page === numPages}>
                &gt;
            </button>    
        </nav>
    );
}

  export default Pagination;