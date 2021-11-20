import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import Product from '../../../interfaces/Product'
import ProductCard from '../ProductCard';
import * as API from '../../../services/api';

export default function FeatureCard() {
    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        let unmounted: boolean = false;
        const source = axios.CancelToken.source();
        const fetchData = async () => {
            await API.getProductList()
                .then((res: any) => {
                    if (!unmounted) {
                        let productList: any[] = [];
                        res.forEach((product: Product) => {
                            productList = [...productList, product];
                        });
                        setProducts(productList);
                    }
                }).catch(error => {
                    if (axios.isCancel(error)) {
                        console.log('feature error');
                    } else {
                        console.log(error);
                    }
                });
        }
        fetchData();

        return () => {
            unmounted = true;
            source.cancel();
        }
    }, [])

    const getFeatureProduct = products.map((product: Product) =>
        <ProductCard key={product.upc} product={product} />
    );

    return (
        <div className="product-container">
            {getFeatureProduct}
        </div>
    )
}
