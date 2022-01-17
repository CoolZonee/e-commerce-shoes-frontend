import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import FeatureCard from './FeatureProduct/FeatureProduct'
import styles from './Home.module.css';
import { AuthProp } from '../../interfaces/AuthProp'


export default function Home({ authenticated }: AuthProp) {

    return (
        <div>
            <div >
                <header className={styles.title}>Most Wanted Footwear</header>
            </div>
            <FeatureCard />
        </div>
    )
}
