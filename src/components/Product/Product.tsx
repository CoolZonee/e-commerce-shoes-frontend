import React from 'react'
import { useParams } from 'react-router'

export default function Product() {
    let { upc } = useParams<{ upc: string }>();

    return (
        <div>
            <p>{upc}</p>
        </div>
    )
}
