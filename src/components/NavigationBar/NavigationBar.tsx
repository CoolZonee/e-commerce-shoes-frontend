import React from 'react'
import './NavigationBar.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Gender from '../../Interfaces/Gender'


export default function NavigationBar() {
   const [listMenu, setListMenu] = useState<any[]>([]);

   useEffect(() => {
      axios.get("http://127.0.0.1:8000/gender/")
         .then((res: any) => {
            let genderList: any[] = [];
            res.data.forEach((gender: Gender) => {
               genderList = [...genderList, <a className="menu" href="#">{ gender.name }</a>]
            });
            setListMenu(genderList);
         })
   }, []);

   return (
         <nav className="container">
            <div className="logo-container">
            <a href="#"><img className="logo" src='/assets/img_nike_logo.png' alt="logo"></img></a>
            </div>
            <div className="menu-container">
               {listMenu}
            </div>
         </nav>
   );
}
