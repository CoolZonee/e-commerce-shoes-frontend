import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import useToken from '../Global/useToken'
import FeatureCard from './FeatureProduct/FeatureCard'
import styles from './Home.module.css';

export default function Home() {
    // check if token is valid
    const { token } = useToken();
    let history = useHistory();

    useEffect(() => {
        if (!token) {
            history.push('/login');
        }
    }, [token, history]);

    return (
        <>
            <div >
                <header className={styles.title}>Most Wanted Footwear</header>
            </div>
            <FeatureCard />
        </>
    )
}
