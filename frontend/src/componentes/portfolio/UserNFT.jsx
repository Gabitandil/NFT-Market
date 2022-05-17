
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit_NFT, venta, Gift_NFT } from '../../../redux/actions/actionNFT'
import Modal from 'react-modal'
import { useNavigate } from 'react-router'
import formateoPrecio from "../../middleware/formateoPrecio";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0'
  },
};

export default function ComponentNFT(props) {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  
  const { id, _id, image, colection, avaliable, price, creatorId, ownerId } =
    props;

  function handleSell() {
    dispatch(venta({_id, avaliable, id}));
  }

  function showModal() {
    setOpenModal(true)
  }
  function closeModal() {
    setOpenModal(false)
  }

  function changeInput(e) {
    setInput(e.target.value)

  }

  function editValue() {
    if (isNaN(input)) {
      setInput('')
      alert('only numbers')
    } else if (input.length == 0){
      alert('put a value ')
    } else {
      dispatch(Edit_NFT(_id, input))
     toast.success('Precio Editado Correctamente')
      setOpenModal(false)
    }
  }
  function gift_nft(){
    dispatch(Gift_NFT('628177ab83679fd44d2d39d0',id,colection))
  }

  return (
    <div className="contNFT">
      <div className="venta">
        { avaliable ? <small className="textVenta">Quitar del mercado</small>: <small className="textVenta">Poner en venta</small>}
        <div
          className={avaliable ? "enVenta" : "noVenta"}
          onClick={() => handleSell()}
        ></div>
      </div>
      <div className="contImg">
      <img src={image.url} alt="NFT IMAGE" height='280px' />
      </div>
      <div className="contNFTinfo">
        <h2>{`${colection}  ${id}`}</h2>
        <p>{`creator:  ${creatorId}`}</p>
        <p>owner: <small> {ownerId}</small></p>
        <div className="contPrice"><p>price:</p>  <span> {formateoPrecio(price)}</span></div>
      </div>
      <div className="contButtons">
        <button onClick={showModal} className="w-50 buttonPrimary">EDIT</button>
        <button className="w-50 buttonTrade" onClick={()=> gift_nft()}>GIFT</button>

      
        <Modal isOpen={openModal}
          style={customStyles}
        >
          <div className="heigth">
            <div className="contLogin">
              <button className="close" onClick={closeModal}>X</button>
              <div className="contInput">
                <span>Update price:</span>
                <input className="input" type="text" placeholder="insert the new value" value={input} onChange={(e) => changeInput(e)} />
              </div>

              {
                <button className="buttonPrimary" onClick={() => editValue()}>ok</button>
              }
            </div>

          </div>
        </Modal>
      </div>
    </div>
  );
}
