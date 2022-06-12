import { Navbar, Nav, Container, NavDropdown, Navigation, NavItem, MenuItem, Button,Offcanvas, Modal } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import AppContext from "../AppContext";
import styles from "../styles/Dashboard.module.css";
import React, {useState, useEffect} from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { RiDashboardFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaUsers, FaTruckMoving, FaUserMinus, FaBars, FaCalendarAlt } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { SiContactlesspayment } from "react-icons/si";
import { GiCoffeeCup } from "react-icons/gi";

import SideNavbarDesktop from "../components/SideNavbarDesktop";
import NavbarPanel from "../components/NavbarPanel";

import DatePicker from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';

import { format } from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";

import api from '../pages/api/api';

export default function SideBarMenu({ setSeller, setStartDate, setEndDate }) {
  const [show, setShow] = useState(false);
  const [sellers, setSellers] = useState([]);
  // const [seller, setSeller] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Ultimos 90 dias: new Date(new Date().setDate(new Date().getDate() - 90))

  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());

  const startDate = new Date();
  const endDate = new Date();

  const today = new Date();
  
  useEffect(() => {
    getSellers();
  }, []);

  async function getSellers(){
    const response = await api.get('seller/get-all');
    setSellers(response.data);
 }

 function filterPeriod(){
   setShowModal(false);
   setStartDate(startDate);
   setEndDate(endDate)
 }

 function filterSeller(idSeller){
   setSeller(idSeller)
 }

  return (
        <div className={styles.calendar}> 
          <div className={styles.filter}>
            <div style={{display: 'flex'}}>
              <strong style={{marginRight: '2px'}}>Data selecionada:</strong>
              
              {format(startDate, 'dd/MM/yyyy')} a {format(endDate, 'dd/MM/yyyy')}

              <FaCalendarAlt style={{cursor: 'pointer', color: '#007bff', marginTop: '5px', marginLeft: '5px'}} onClick={handleShowModal}></FaCalendarAlt>

              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title><h5>Selecione um período</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   
                    <label>Data inicial:</label>
                    <DatePicker dateFormat="dd/MM/yyyy" selectsStart locale={ptBR} selected={startDate} onChange={(date) => setStartDate(date)} />

                    <label style={{marginTop: '10px'}}>Data final:</label>
                    <DatePicker dateFormat="dd/MM/yyyy" selectsEnd locale={ptBR} selected={endDate} startDate={startDate} endDate={endDate} onChange={(date) => setEndDate(date)} />

                    <Button style={{marginTop: '10px'}} onClick={filterPeriod}>Filtrar</Button>
                </Modal.Body>
              </Modal>
            </div>

              <select id="select-seller" name="" onChange={(event)=>filterSeller(event.target.value)} className={styles.select}>
                <option value="">Selecione um vendedor </option>
                {sellers.map(seller => 
                    <option key={seller.id_seller} value={seller.id_seller}>{seller.name}</option>
                )}
              </select>
          </div>
      </div>    
  );
}