import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import Product from '../../interfaces/Product';
import * as API from '../../services/api'
import ProductCard from '../Home/ProductCard';

export default function GenderProduct() {
    const [products, setProducts] = useState<any>([]);
    let gender: string = window.location.pathname.replace(/^\/([^]*).*$/, '$1');
    gender = gender[0].toUpperCase() + gender.substring(1);


    useEffect(() => {
        let unmounted: boolean = false;
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            await API.getProductByGender(`gender=${gender}`).then(
                async (res: any) => {
                    if (!unmounted) {
                        let productList: any[] = [];
                        res.forEach((product: Product) => {
                            productList = [...productList, product];
                        });
                        setProducts(productList);
                    }
                }
            );
        }
        fetchData();
        return () => {
            unmounted = true;
            source.cancel();
        }
    }, [gender])

    const getFeatureProduct = products.map((product: Product) =>
        <ProductCard key={product.upc} product={product} />
    );
    return (
        <div className='product-container'>
            {getFeatureProduct}
        </div>
    );
}
