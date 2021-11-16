import styles from './Login.module.css';
import useToken from '../Global/useToken';
import { Redirect } from 'react-router';
import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types';
import * as API from '../../services/api';

const googleClientID: string = (process.env.REACT_APP_GOOGLE_CLIENT_ID as string);
const fbAppID: string = (process.env.REACT_APP_FACEBOOK_APP_ID as string);

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
        console.log("submitted");
        console.log(googleClientID);
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

    const responseFacebook = (response: any) => {
        console.log("fb launched");
        console.log(response);

    }

    const handleGoogleLogin = (res: any) => {
        console.log("google launched");
        console.log(res);
    }

    if (token) {
        return <Redirect push to="/" />;
    }

    const fbBtnStyle = {
        border: "none",
        outline: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: "50px",
        fontSize: "medium",
        width: "95%",
        height: "45px",
        margin: "20px auto",
        backgroundColor: "#3B5998",
        color: "white",
    };

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
                    <GoogleLogin
                        clientId={googleClientID}
                        buttonText="Sign In with Google"
                        render={renderProps => (
                            <div>
                                <button onClick={renderProps.onClick} className={styles.google_btn}><img alt="" src="assets/Google__G__Logo.svg"></img>Sign in with Google</button>
                            </div>
                        )}
                        onSuccess={handleGoogleLogin}
                        onFailure={handleGoogleLogin}
                        cookiePolicy={'single_host_origin'} />
                    <FacebookLogin
                        appId={fbAppID}
                        fields="name,email,picture"
                        scope="public_profile,user_friends"
                        callback={responseFacebook}
                        textButton="Sign in with Facebook"
                        cssClass="fb_btn"
                        buttonStyle={fbBtnStyle}
                        icon={<img className={styles.fb_logo} alt="" src="assets/FB__Logo.svg"></img>} />
                </form>
            </div>
        </>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}



