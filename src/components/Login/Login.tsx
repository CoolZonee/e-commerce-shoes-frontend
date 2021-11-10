import styles from './Login.module.css';
import useToken from '../Global/useToken';
import { Redirect } from 'react-router';
import { useState } from 'react';
import PropTypes from 'prop-types';
import * as API from '../../api/api';

export default function Login({ setToken }: any) {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [errMsg, setErrMsg] = useState<string>();
    const { token } = useToken();

    async function login(payload: any) {
        API.login(payload)
            .then((resp: any) => {
                setToken(resp.token);
            })
            .catch(e => {
                if (e.response) {
                    setErrMsg(e.response.data.detail);
                    setPassword("");
                }
            });
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setErrMsg("Please fill in the form!");
        } else {
            const payload = {
                email: email,
                password: password,
            };
            await login(payload);
        }
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
                <form onSubmit={handleSubmit}>
                    <div className={styles.input_container}>
                        <div>
                            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>
                        {errMsg && <p>{errMsg}</p>}
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



