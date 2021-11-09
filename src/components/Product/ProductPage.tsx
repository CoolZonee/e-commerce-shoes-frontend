import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Product from '../../Interfaces/Product';
import styles from './ProductPage.module.css';

export default function ProductPage() {
    let { upc } = useParams<{ upc: string }>()
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`http://127.0.0.1:8000/product/${upc}/`).then(
                async (res: any) => {
                    console.log(res.data);
                    let details: Product;
                    details = await res.data
                    setProduct(details);
                }
            );
        };
        fetchData();
    });
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
