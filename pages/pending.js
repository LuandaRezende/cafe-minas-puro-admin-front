import { Navbar, Tooltip, OverlayTrigger, Popover, Nav, Container, NavDropdown, Navigation, NavItem, MenuItem, Button,Offcanvas, Table } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import AppContext from "../AppContext";
import styles from "../styles/SideBarMenu.module.css";
import React, {useState} from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { RiDashboardFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaUsers, FaTruckMoving, FaUserMinus, FaBars } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { SiContactlesspayment } from "react-icons/si";
import { GiCoffeeCup } from "react-icons/gi";
import { MdPendingActions } from "react-icons/md"
import { FcInfo } from "react-icons/fc";

import SideNavbarDesktop from "../components/SideNavbarDesktop";
import NavbarPanel from "../components/NavbarPanel";

export default function Clients() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <tr>
            <td>1</td>
            <td>Café Artesan</td>
            <td>Jaguariúna-SP</td>
            <td>R$12</td>
            <td>0</td>
            <td><span style={{color: 'red'}}>R$12</span></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Supermercado Alvorada</td>
            <td>Santa Rita do Sapucaí-MG</td>
            <td>R$50</td>
            <td>0</td>
            <td><span style={{color: 'red'}}>R$50</span></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Supermercado Unissul</td>
            <td>Alfenas-MG</td>
            <td>R$15,22</td>
            <td>0</td>
            <td><span style={{color: 'red'}}>R$12,25</span></td>
          </tr>         
        </tbody>
    </Table> 

      </div>

     
  </div>

    </div>

    


    
  );
}