import { useState } from "react";




export default function Loguin({handleChangeModal}) {
  const [ usuario, setUsuario ]= useState({
    email:'',
    password:''
  })

  function  handleChange(e){
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }


    const handleSubmit =(e)=>{
      e.preventDefault();
     
    }

  return (
    <div className="contLogin">
      <button className="close" onClick={handleChangeModal}>❌</button>
      <div className="contLogin-content">
      <h3>Login</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input 
                id="email"
                value={usuario.email}
                type="text" 
                name="email"
                onChange={(e)=>handleChange(e)}
                placeholder="Your email"/>
            <label htmlFor="password">password</label>
            <input 
                id="password" 
                type="password" 
                value={usuario.password}
                name="password"
                onChange={(e)=>handleChange(e)}
                placeholder="Your password"/>
            <button
            type="submit"
            className="buttonPrimary"
            >LOGIN</button>
            
        </form>
        <button
            type="submit"
            className="buttonSecondary"
            >LOGIN WITH GOOGLE</button>
      </div>
      
    </div>
  )
}
