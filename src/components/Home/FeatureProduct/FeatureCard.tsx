import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import Product from '../../../Interfaces/Product'
import './FeatureCard.css'

export default function FeatureCard() {
    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/product/")
            .then((res: any) => {
                let productList: any[] = [];
                res.data.forEach((product: Product) => {
                    productList = [...productList,
                        <a href="#">
                            <div className="product-card">
                                <img className="product-img" src={"/assets/" + product.image_path}></img>
                                <div className="product-details">
                                    <div>
                                        <p>{ product.name }</p>
                                    </div>
                                    <div>
                                        <p>{ "RM " + product.price }</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ];
                });
                setProducts(productList);
            })
    }, [])
    return (
        <div className="product-container">
            { products }
        </div>
    )
}
