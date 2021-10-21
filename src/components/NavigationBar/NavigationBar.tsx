import React from 'react'
import './NavigationBar.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Gender from '../../Interfaces/Gender'
import { Link } from 'react-router-dom'


export default function NavigationBar() {
   const [listMenu, setListMenu] = useState<any[]>([]);

   useEffect(() => {
      axios.get("http://127.0.0.1:8000/gender/")
         .then((res: any) => {
            let genderList: any[] = [];
            res.data.forEach((gender: Gender) => {
               genderList = [...genderList, <Link className="menu" to="#">{gender.name}</Link>]
            });
            setListMenu(genderList);
         })
   }, []);

   return (
      <nav className="container">
         <div className="logo-container">
            <Link to="/"><img alt="logo" className="logo" src='/assets/img_nike_logo.png'></img></Link>
         </div>
         <div className="menu-container">
            {listMenu}
         </div>
      </nav>
   );
}
