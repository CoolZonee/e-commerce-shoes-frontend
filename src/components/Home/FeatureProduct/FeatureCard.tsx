import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Product from '../../../Interfaces/Product'
import styles from './FeatureCard.module.css'

export default function FeatureCard() {
    const [products, setProducts] = useState<any>([]);
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/product/")
            .then((res: any) => {
                let productList: any[] = [];
                res.data.forEach((product: Product) => {
                    productList = [...productList,
                    <Link key={product.upc} to={{ pathname: `/product/${product.upc}` }}>
                        <div className={styles["product-card"]}>
                            <img alt={product.name} className={styles["product-img"]} src={"/assets/" + product.image_path}></img>
                            <div className={styles["product-details"]}>
                                <div>
                                    <p>{product.name}</p>
                                </div>
                                <div>
                                    <p>{"RM " + product.price}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    ];
                });
                setProducts(productList);
            })
    }, [])
    return (
        <div className={styles['product-container']}>
            {products}
        </div>
    )
}
