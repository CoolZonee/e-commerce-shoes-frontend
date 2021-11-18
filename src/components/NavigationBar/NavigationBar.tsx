import React from 'react'
import { useState, useEffect } from 'react'
import Gender from '../../interfaces/Gender'
import { Link } from 'react-router-dom'
import styles from './NavigationBar.module.css'
import * as API from '../../services/api'


export default function NavigationBar() {
   const [listMenu, setListMenu] = useState<any[]>([]);

   useEffect(() => {

      API.getGender()
         .then((res: any) => {
            let genderList: any[] = [];
            res.forEach((gender: Gender) => {
               genderList = [...genderList, <Link key={gender.id} className={styles.menu} to="#">{gender.name}</Link>]
            });
            setListMenu(genderList);
         });
   }, []);

   return (
      <nav className={styles.container}>
         <div className={styles["logo-container"]}>
            <Link to="/"><img alt="logo" className={styles.logo} src='/assets/img_nike_logo.png'></img></Link>
         </div>
         <div className={styles["menu-container"]}>
            {listMenu}
         </div>
      </nav>
   );
}
