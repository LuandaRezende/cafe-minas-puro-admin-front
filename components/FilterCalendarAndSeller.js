import { Navbar, Nav, Container, NavDropdown, Navigation, NavItem, MenuItem, Button,Offcanvas, Modal } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import AppContext from "../AppContext";
import styles from "../styles/Dashboard.module.css";
import React, {useState} from 'react';

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

export default function SideBarMenu() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Ultimos 90 dias: new Date(new Date().setDate(new Date().getDate() - 90))

  const today = new Date();
  
  const src = `http://cafeminaspuro.com.br/wp-content/uploads/2020/01/cropped-logoMinasCafe-2-140x83.png`;

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
                    <p>
                      Data inicial: <DatePicker dateFormat="dd/MM/yyyy" selectsStart locale={ptBR} selected={startDate} onChange={(date) => setStartDate(date)} />
                    </p>
                    
                    <p>
                     Data final: <DatePicker dateFormat="dd/MM/yyyy" selectsEnd locale={ptBR} selected={endDate} startDate={startDate} endDate={endDate} onChange={(date) => setEndDate(date)} />
                    </p>

                    <Button>Filtrar</Button>
                </Modal.Body>
              </Modal>
            </div>
          <select className={styles.select}>
            <option value="null">Selecione um vendedor</option>
            <option value="Mauro">Mauro</option>
            <option value="José">José</option>
            <option value="Andressa">Andressa</option>
          </select>
          </div>
      </div>    
  );
}