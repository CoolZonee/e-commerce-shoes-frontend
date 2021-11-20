import React from 'react'
import { Link } from 'react-router-dom'
import Product from '../../interfaces/Product'
import styles from './ProductCard.module.css'

interface ProductCardProps {
    product: Product;
}

export default function ProductCard(props: ProductCardProps) {
    return (
        <Link key={props.product.upc} to={{ pathname: `/product/${props.product.upc}` }}>
            <div className={styles["product-card"]}>
                <img alt={props.product.name} className={styles["product-img"]} src={"/assets/" + props.product.image_path}></img>
                <div className={styles["product-details"]}>
                    <div>
                        <p>{props.product.name}</p>
                    </div>
                    <div>
                        <p>{"RM " + props.product.price}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
