import React from 'react'
import { Link } from 'react-router-dom'

export default function GenericNotFound() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1>404 Not Found!</h1>
            <Link to="/">Click here to back to Home.</Link>
        </div>
    )
}
