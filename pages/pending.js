import { Navbar, Tooltip, OverlayTrigger, Popover, Nav, Container, NavDropdown, Navigation, NavItem, MenuItem, Button,Offcanvas, Table } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import AppContext from "../AppContext";
import styles from "../styles/Dashboard.module.css";
import React, {useState, useEffect} from 'react';

import { MdPendingActions } from "react-icons/md"
import { FcInfo } from "react-icons/fc";

import SideNavbarDesktop from "../components/SideNavbarDesktop";
import NavbarPanel from "../components/NavbarPanel";

import api from '../pages/api/api';

export default function Clients() {
  const [show, setShow] = useState(false);
  const [listPending, setListPending] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData(){
    const response = await api.get('clients/get/pending-customer');
    setListPending(response.data)
  }

  const src = `http://cafeminaspuro.com.br/wp-content/uploads/2020/01/cropped-logoMinasCafe-2-140x83.png`;

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Informativo</Popover.Header>
      <Popover.Body>
         Abaixo é listado apenas os clientes que possuem pendência menor que 0. Os clientes que não possuem mais nenhuma pendência não são listados.
      </Popover.Body>
    </Popover>
  );

  return (
   <div style={{display: 'flex'}}>
      <div className={styles.sidebar}>
        <SideNavbarDesktop></SideNavbarDesktop>
      </div> 
    
    <div style={{background: '#ededee', width: '100%'}}>
      <NavbarPanel></NavbarPanel>

      <div style={{background: '#fff', margin: '30px', padding: '25px'}}>
      <p style={{color: '#495057'}}><MdPendingActions style={{fontSize:'20px'}}></MdPendingActions>
         <span style={{marginLeft:'5px'}}>PENDÊNCIA DOS CLIENTES</span>
         <OverlayTrigger placement="right" overlay={popover}>
            <button style={{background:'#fff', border:'none', cursor: 'default'}}><FcInfo></FcInfo></button>
        </OverlayTrigger>
      </p>

      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <td><b>Cliente</b></td>
            <td><b>Cidade</b></td>
            <td><b>Valor do Débito</b></td>
            <td><b>Valor Pago</b></td>
            <td><b>Pendência</b></td>
          </tr>
        </thead>
        <tbody>
        { listPending.map( (client, index) => <tr key = {index }> 
                  <td> { index } </td>
                  <td> { client.corporate_name } </td>
                  <td> { client.city } </td>
                  <td> { client.debit_amount } </td>
                  <td> { client.amount_paid } </td>
                  <td style={{color: 'red'}}> { client.pendency } </td>
                </tr>) 
        }         
        </tbody>
    </Table> 

      </div>

     
  </div>

    </div>

    


    
  );
}