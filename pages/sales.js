import { Modal, Button,Offcanvas, Table } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import AppContext from "../AppContext";
import styles from "../styles/Dashboard.module.css";
import React, {useState} from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { RiDashboardFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaUsers, FaTruckMoving, FaUserMinus, FaBars } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { SiContactlesspayment } from "react-icons/si";
import { FaSearch, FaTrash } from "react-icons/fa";
import { GiCoffeeCup } from "react-icons/gi";

import FilterCalendarAndSeller from "../components/FilterCalendarAndSeller";

import SideNavbarDesktop from "../components/SideNavbarDesktop";
import NavbarPanel from "../components/NavbarPanel";

export default function Sales() {
  const [show, setShow] = useState(false);
  const [day, setDay] = useState('');
  const [products, setProducts] = useState([])
  const [seller, setSeller] = useState('');

  const [showModalTrash, setShowModalTrash] = useState(false);

  const handleCloseTrash = () => setShowModalTrash(false);
  const handleShowTrash = () => setShowModalTrash(true);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    if(id === 1){
      setSeller('José')
      setDay('15/04/2022')
      setProducts(['Café Minas Puro tradicional 250g', 'Café Minas Puro extra forte 500g'])
    }

    if(id === 2){
      setSeller('Maria')
      setDay('10/02/2022')
      setProducts(['Café Minas Puro tradicional 500g', 'Café dozinha 500g'])
    }

    if(id === 3){
      setSeller('Natan')
      setDay('09/03/2022')
      setProducts(['Café Minas Puro expresso 1Kg', 'Café Minas Puro 1Kg'])
    }
    console.log(id)
    setShow(true)
  };

  const src = `http://cafeminaspuro.com.br/wp-content/uploads/2020/01/cropped-logoMinasCafe-2-140x83.png`;

  return (
    
    <div style={{display: 'flex'}}>

         <div className={styles.sidebar}>
            <SideNavbarDesktop></SideNavbarDesktop>
          </div> 
    
    <div style={{background: '#ededee', width: '100%'}}>
      <NavbarPanel></NavbarPanel>
    
      <FilterCalendarAndSeller></FilterCalendarAndSeller>

      <div style={{background: '#fff', margin: '30px', padding: '25px'}}>
       <p style={{color: '#495057'}}><BsGraphUp style={{fontSize:'20px'}}></BsGraphUp><span style={{marginLeft:'5px'}}>VENDAS REALIZADAS</span></p>

      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Vendedor</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Supermercado Alvorada</td>
            <td>José</td>
            <td>
              <FaSearch style={{color: '#007bff', cursor: 'pointer', margin: '5px'}} onClick={() => handleShow(1)}></FaSearch>
              <FaTrash style={{color: 'red', cursor: 'pointer', margin: '5px'}} onClick={() => handleShowTrash(2)}></FaTrash>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Supermercado Unissul</td>
            <td>Maria</td>
            <td>
              <FaSearch style={{color: '#007bff', cursor: 'pointer', margin: '5px'}} onClick={() => handleShow(2)}></FaSearch>
              <FaTrash style={{color: 'red', cursor: 'pointer', margin: '5px'}} onClick={() => handleShowTrash(2)}></FaTrash>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Supermercado Baronesa</td>
            <td>Natan</td>
            <td>
              <FaSearch style={{color: '#007bff', cursor: 'pointer', margin: '5px'}} onClick={() => handleShow(3)}></FaSearch>
              <FaTrash style={{color: 'red', cursor: 'pointer', margin: '5px'}} onClick={() => handleShowTrash(2)}></FaTrash>
            </td> 
         </tr>         
        </tbody>
    </Table> 

    <Modal show={showModalTrash} onHide={handleCloseTrash}>
        <Modal.Header closeButton>
          <Modal.Title><h5>Cancelar venda</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>Deseja cancelar esta venda?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTrash}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCloseTrash}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>Produtos vendidos por {seller}</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Dia: {day}</p>
          Lista de produtos:
            <ul>
              <li>{products[0]} - 200 unidades</li>
              <li>{products[1]} - 301 unidades</li>
            </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      </div>

     
  </div>

    </div>

    


    
  );
}