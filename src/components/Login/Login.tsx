import styles from './Login.module.css';
import useToken from '../Global/useToken';
import { Redirect } from 'react-router';
import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types';
import * as API from '../../api/api';

const clientID = "625587685571-dfvugbak7tj20tb77kbt2gb3a3efptjv.apps.googleusercontent.com";

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

    const handleGoogleLogin = (res: any) => {
        console.log(res.profileObj);
    }

    if (token) {
        return <Redirect push to="/" />;
    }

    return (
        <>
            <script src="https://apis.google.com/js/platform.js" async defer></script>
            <header className={styles.title}>
                <h1>Login</h1>
            </header>
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
                    <button type="submit" className={styles.signin_btn}>Sign In</button>
                    <GoogleLogin clientId={clientID} buttonText="Sign In with Google"
                        render={renderProps => (
                            <div>
                                <button onClick={renderProps.onClick} className={styles.google_btn}><img alt="" src="assets/Google__G__Logo.svg"></img>Sign in with Google</button>
                            </div>
                        )}
                        onSuccess={handleGoogleLogin}
                        onFailure={handleSubmit}
                        cookiePolicy={'single_host_origin'} />
                </form>
            </div>
        </>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}



