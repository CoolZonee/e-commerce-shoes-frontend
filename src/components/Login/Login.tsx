import axios from 'axios';
import styles from './Login.module.css';
import useToken from '../Global/useToken';
import { Redirect } from 'react-router';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Login({ setToken }: any) {
    const [username, setUsername] = useState<String>();
    const [password, setPassword] = useState<String>();
    const { token } = useToken();

    async function login(payload: any) {
        await axios.post("http://127.0.0.1:8000/login", payload).then((response: any) => {
            setToken(response.data.token);
        }).catch(e => {
            console.log("Login: " + e);
        });
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const payload = {
            email: username,
            password: password,
        };
        await login(payload);
    }

    if (token) {
        return <Redirect push to="/" />;
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
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
