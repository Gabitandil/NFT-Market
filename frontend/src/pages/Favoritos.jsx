import React, { useEffect } from 'react'
import NavBar from '../componentes/home/NavBar'
import { Link } from 'react-router-dom'
import FavNFTS from '../componentes/favoritos/FavNFTS'
import { useDispatch, useSelector } from 'react-redux'
import {usuarioActual} from '../../redux/actions/actionUSER'
import io from "socket.io-client";

let socket;
export default function Favoritos() {
    const params = window.location.href;
    const miUser = useSelector(state => state.usuario)
    const favoritos = miUser.favoritos
    const dispatch = useDispatch()
  
   useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("Actualizar", params);
   }, [])
   useEffect(() => {
    //recibir la respuesta del back
    socket.on("favUpade", () => {
     dispatch(usuarioActual())
      
    });
  });
   
    
    
    return (
        <div>
           
            <NavBar usuario={miUser} />

            
            <div className='contFavoritos'>

            <h1 style={{color: 'white'}}>favoritos</h1>
            {favoritos ? favoritos.map(fav => {
                return (
                    <FavNFTS 
                    image={fav.image} id={fav.id} 
                    colection={fav.colection} avaliable={fav.avaliable}
                    creatorId={fav.creatorId} ownerId={fav.ownerId}
                    _id={fav._id} priceBase={fav.priceBase} price={fav.price}
                    />
                )
            })


              

                : <p>no hay favoritos </p>

            }

            

            {/* ACA SE TIENEN QUE RENDERIZAR LOS NFT QUE ESTEN AGREGADOS A FAVORITOS  */}
            <Link to='/home/usuario/portfolio'> <button className='back-button' >VOLVER AL PORTFOLIO </button></Link>
            </div>
        </div>
    )
}
