import React from 'react'
import { useState, useEffect } from 'react'
import Gender from '../../interfaces/Gender'
import { Link } from 'react-router-dom'
import styles from './NavigationBar.module.css'
import * as API from '../../services/api'


export default function NavigationBar() {
   const [listMenu, setListMenu] = useState<any[]>([]);
   const [gender, setGender] = useState<string>();
   // let urlPath: string = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');

   const handleClick = (gender: string) => {
      setGender(gender);
   }

   useEffect(() => {
      API.getGender()
         .then((res: any) => {
            let genderList: any[] = [];
            res.forEach((gender: Gender) => {
               genderList = [...genderList, gender]
            });
            setListMenu(genderList);
         });
   }, []);

   const getGender = listMenu.map((g: Gender) =>
      <Link key={g.id} onClick={() => handleClick(g.name)} className={g.name === gender ? styles.menu + " " + styles.menu_selected : styles.menu} to={`/${g.name.toLowerCase()}`}>{g.name}</Link>
   )
   return (
      <nav className={styles.container}>
         <div className={styles["logo-container"]}>
            <Link to={`/`}><img alt="logo" onClick={() => handleClick('')} className={styles.logo} src='/assets/img_nike_logo.png'></img></Link>
         </div>
         <div className={styles["menu-container"]}>
            {getGender}
         </div>
      </nav>
   );
}
