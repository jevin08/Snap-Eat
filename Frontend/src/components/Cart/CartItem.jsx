import React, { useState } from 'react';
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useCartContext } from "../../context/cartContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CartItem = ({ id, quantity, ...curElement }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { removefood, increse, decrese } = useCartContext();

  return (
    <>
      <tr key={id}>
        <td scope="col fs-5">{curElement.name}</td>
        <td scope="col fs-5">{curElement.price}</td>
        <td scope="col fs-5">
          <button className="btn btn-light" onClick={() => decrese(id)}><FaMinus size={10} /></button>
          &nbsp;
          <button className="btn btn-light">{quantity}</button>
          &nbsp;
          <button className="btn btn-light" onClick={() => increse(id)}><FaPlus size={10} /></button>
        </td>
        <td scope="col fs-5">{curElement.price * quantity}</td>
        <td scope="col fs-5">
          <button className="btn btn-light btn-outline-danger" onClick={handleShow}><FaTrashAlt /></button>
        </td>
      </tr>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Deleting Item from Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete the {curElement.name}?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={() => removefood(id)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  )
}

export default CartItem;

