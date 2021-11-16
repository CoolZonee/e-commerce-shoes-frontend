import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Product from '../../interfaces/Product';
import styles from './ProductPage.module.css';
import * as API from '../../services/api'

export default function ProductPage() {
    let { upc } = useParams<{ upc: string }>()
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        let unmounted: boolean = false;
        const source = axios.CancelToken.source();
        const fetchData = async () => {
            API.getProductByUPC(upc).then(
                async (res: any) => {
                    if (!unmounted) {
                        let details: Product;
                        details = res
                        setProduct(details);
                    }
                }
            ).catch(error => {
                if (axios.isCancel(error)) {
                } else {
                    console.log(error);
                }
            });
        };

        fetchData();

        return () => {
            unmounted = true;
            source.cancel();
        }
    }, [upc]);

    if (product != null) {
        return (
            <div className={styles.container}>
                <div className={styles.left_container}>
                    <img className={styles.product_img} alt={product.name} src={"/assets/" + product.image_path}></img>
                </div>
                <div className={styles.right_container}>
                    <h1>{product.brand.name}</h1>
                    <h1>{product.name}</h1>
                    <p>{product.desc}</p>
                    <h2>{"RM " + product.price}</h2>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.center}>
                out of stock
            </div>
        )
    }
}
