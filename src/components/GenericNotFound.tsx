import React from 'react'
import { Link } from 'react-router-dom'

export default function GenericNotFound() {
    return (
        <div>
            <h1>404 Not Found!</h1>
            <Link to="/">Click here to back to Home.</Link>
        </div>
    )
}
