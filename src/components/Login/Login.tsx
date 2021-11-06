import React from 'react'
import styles from './Login.module.css';

export default function Login() {
    return (
        <>
            <div className={styles.title}>
                <h1>Login</h1>
            </div>
            <div className={styles.form_container}>
                <form method="POST">

                    <div className={styles.input_container}>
                        <div>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div>
                            <input type="password" placeholder="Password" />
                        </div>
                    </div>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </>
    )
}
