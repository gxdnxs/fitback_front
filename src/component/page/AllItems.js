import axios from "axios";
import React, {useEffect, useState } from "react";
import AllItemsList from "../ui/AllItemsUi/AllItemsList";

function AllItems() {
    const [product, setProduct] = useState("");
    const [del, setDel] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/item/getAll").then((Response) => {
            setProduct(Response.data);
            // console.log(Response.data);
        });
    }, []);



    return (
        <div className="getData">
            {/* 맨 윗 부분 (어느 옷장인지 표시) */}
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">아이템</h1>
                        <p className="lead text-muted">
                            현재 보유 중인 모든 아이템
                        </p>
                    </div>
                </div>
            </section>

            {/* <AllItemsUi key={item.id} item={item} /> */}
            <>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {product &&
                                product.map((item) => (
                                    <>
                                    <AllItemsList 
                                    key={item.id}
                                    product={product}
                                    setProduct={setProduct}
                                    item={item}
                                    del={del}
                                    setDel={setDel}/>
                                    </>
                                ))}
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
}

export default AllItems;
