import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Product from '../../interfaces/Product';
import ProductDetails from '../../interfaces/ProductDetails';
import styles from './ProductPage.module.css';
import * as API from '../../services/api'

export default function ProductPage() {
    let { upc } = useParams<{ upc: string }>()
    const [product, setProduct] = useState<Product>();
    const [size, setSize] = useState<any>([]);
    const [activeKey, setActiveKey] = useState<string>();
    const [quantity, setQuantity] = useState<number>(1);

    // select size option
    const btnOnClick = (key: string) => {
        setActiveKey(key);
    };

    // modify quantity
    const handlePlus = () => {
        setQuantity(quantity + 1);
    };

    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const quantityOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input: number = parseInt(e.target.value);
        setQuantity(input);
    }

    useEffect(() => {
        let unmounted: boolean = false;
        const source = axios.CancelToken.source();
        const fetchData = async () => {
            await API.getProductByUPC(upc).then(
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

            await API.getProductDetails(upc).then(
                async (res: any) => {
                    if (!unmounted) {
                        console.log(res);
                        setSize(res);
                    }
                }
            )
        };

        fetchData();

        return () => {
            unmounted = true;
            source.cancel();
        }
    }, [upc]);

    const getSizeOption = size.map((d: ProductDetails) =>
        <button
            key={d.product.upc + d.size}
            type="button"
            className={activeKey === (d.product.upc + d.size) ? styles.option + " " + styles.clicked_option : styles.option}
            onClick={() => { btnOnClick(d.product.upc + d.size) }}>{d.size}</button>
    );

    if (product != null) {
        return (
            <div className={styles.container}>
                <div className={styles.left_container}>
                    <img className={styles.product_img} alt={product.name} src={"/assets/" + product.image_path}></img>
                </div>
                <div className={styles.right_container}>
                    <div className={styles.product_main}>
                        <h1>{product.brand.name}</h1>
                        <h1>{product.name}</h1>
                        <p>{product.desc}</p>
                        <h2>{"RM " + product.price}</h2>
                    </div>
                    <div className={styles.size_container}>
                        <div>
                            Choose UK size in stock
                        </div>
                        <div className={styles.option_container}>
                            {getSizeOption}
                        </div>
                    </div>
                    <div className={styles.quantity_container}>
                        <div>
                            Quantity
                        </div>
                        <div className={styles.quantity_input_container}>
                            <input type="number" value={quantity} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { quantityOnChange(e) }}></input>
                            <div className={styles.quantity_plus_minus}>
                                <i className="fa fa-plus" onClick={() => { handlePlus() }} />
                                <i className="fa fa-minus" onClick={() => { handleMinus() }} />
                            </div>
                            <button type="button">Add to cart</button>
                        </div>
                    </div>
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
