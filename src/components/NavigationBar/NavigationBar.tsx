import React from 'react'
import { useState, useEffect } from 'react'
import Gender from '../../interfaces/Gender'
import { Link } from 'react-router-dom'
import styles from './NavigationBar.module.css'
import * as API from '../../services/api'
import { AuthProp } from '../../interfaces/AuthProp'


export default function NavigationBar({ setAuthenticated, authenticated }: AuthProp, props: any) {
   const [listMenu, setListMenu] = useState<any[]>([]);
   const [gender, setGender] = useState<string>();
   const [rightComponent, setRightComponent] = useState<any>();
   const handleClick = (gender: string) => {
      setGender(gender);
   }

   const logOut = () => {
      setAuthenticated(false);
      API.logOut().then((resp) => {
         console.log(resp)
      }).catch((error: any) => {
         console.log(error.response);
      });
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

   useEffect(() => {
      if (!authenticated) {
         setRightComponent(
            <div>
               <Link
                  className={styles.sign_in}
                  to={{ pathname: '/login' }}

               >Sign In</Link>
            </div>
         )
      }
      else {
         setRightComponent(
            <div>
               <Link className="fa fa-user" to={{ pathname: '/profile' }} />
               <Link className="fa fa-shopping-cart" to={{ pathname: '/cart' }} />
               <button className="fa fa-sign-out" onClick={() => logOut()}></button>
            </div>
         )
      }
   }, [authenticated])

   const getGender = listMenu.map((g: Gender) =>
      <Link
         key={g.id}
         onClick={() => handleClick(g.name)}
         className={g.name === gender ? styles.menu + " " + styles.menu_selected : styles.menu}
         to={`/${g.name.toLowerCase()}`}>
         {g.name}
      </Link>
   )

   const haha = () => {
      API.refreshToken().then((resp: any) => {
         console.log(resp)
      }).catch((error) => console.log(error.response))
   }
   return (
      <nav className={styles.container}>
         <div className={styles["logo-container"]}>
            <Link to={`/`}><img alt="logo" onClick={() => handleClick('')} className={styles.logo} src='/assets/img_nike_logo.png'></img></Link>
         </div>
         <div className={styles["menu-container"]}>
            {getGender}
         </div>
         <div className={styles["right-container"]}>
            {rightComponent}
         </div>
         <button onClick={() => haha()}></button>
      </nav>
   );
}
