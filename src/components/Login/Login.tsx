import React, { useState } from 'react'
import styles from './Login.module.css';

export default function Login() {
    const [username, setUsername] = useState<String>();
    const [password, setPassword] = useState<String>();

    async function loginUser(credentials) {
        axois.get("http://127.0.0.1:8000/")
    }

    return (
        <>
            <div className={styles.title}>
                <h1>Login</h1>
            </div>
            <div className={styles.form_container}>
                <form>
                    <div className={styles.input_container}>
                        <div>
                            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </>
    )
}
