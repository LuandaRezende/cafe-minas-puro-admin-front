import { Navbar, Nav, Container, NavDropdown, Navigation, NavItem, MenuItem, Button,Offcanvas, Modal } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import AppContext from "../AppContext";
import styles from "../styles/SideBarMenu.module.css";
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

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(new Date());

  // Ultimos 90 dias: new Date(new Date().setDate(new Date().getDate() - 90))

  const last3Months = 'Últimos 3 meses';

  const options = {
    chart: {
      type: 'column'
    },
    title: '',
     xAxis: {
        categories: [
            'Março',
            'Abril',
            'Maio',
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Quantidade'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        },
        dataLabels: {
          enabled: false           
       },
       showInLegend: true
    },
    legend: {
      align: 'center',
      verticalAlign: 'top',
      layout: 'horizontal',
      x: 0,
      y: 0,
    },
    series: [{
        name: 'Quantidade de clientes',
        data: [49.9, 71.5, 106.4],
        color: '#acd6fa',
    }, {
        name: 'Quantidade de vendas',
        data: [83.6, 78.8, 98.5],
        color: '#fadf98'
    }, {
        name: 'Quantidade de gastos',
        data: [48.9, 38.8, 39.3],
        color: '#faa4aa'
    }]
  };

  const optionsPie = {
    chart: {
      type: 'pie'
  },
  title: {
      text: 'Quantidade de vendas'
  },
  subtitle:{
    text: '(Últimos 3 meses)'
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
      pie: {
          cursor: 'pointer',
          dataLabels: {
              enabled: false
          },
          showInLegend: true
      }
  },
  series: [{
      name: 'Quantidade de vendas',
      colorByPoint: true,
      data: [{
          name: 'Dezembro',
          y: 81.40,
          color: '#f7464a',
      },{
          name: 'Janeiro',
          y: 61.41,
          color: '#46bfbd',
      }, {
          name: 'Fevereiro',
          y: 11.84,
          color: '#ac64ad',
      }]
      // }, {
      //     name: 'Março',
      //     y: 10.85,
      //     color: '#4d5360',
      // },{
      //     name: 'Abril',
      //     y: 25.50,
      //     color: '#949fb1',
      // },
      // {
      //     name: 'Maio',
      //     y: 11.10,
      //     color: '#e5e5e5',
      // }]
  }]
  };

  const src = `http://cafeminaspuro.com.br/wp-content/uploads/2020/01/cropped-logoMinasCafe-2-140x83.png`;

  return (
    <div style={{display: 'flex'}}>
    
      <div className={styles.sidebar}>
        <SideNavbarDesktop></SideNavbarDesktop>
      </div>  
    
    <div style={{background: '#ededee', width: '100%'}}>
      <NavbarPanel></NavbarPanel>

      <div className={styles.calendar}> 
          <div className={styles.filter}>
            <div style={{display: 'flex'}}>
              <strong style={{marginRight: '2px'}}>Data selecionada:</strong>

              {startDate ? format(startDate, 'dd/MM/yyyy') : last3Months}
              
              {/* {format(startDate, 'dd/MM/yyyy')} a {format(endDate, 'dd/MM/yyyy')} */}

              <FaCalendarAlt style={{cursor: 'pointer', color: '#007bff', marginTop: '5px', marginLeft: '5px'}} onClick={handleShowModal}></FaCalendarAlt>

              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Selecione uma data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                      Data: <DatePicker dateFormat="dd/MM/yyyy" selectsStart locale={ptBR} selected={startDate} onChange={(date) => setStartDate(date)} />
                    </p>
                    
                    {/* <p>
                     Período final: <DatePicker dateFormat="dd/MM/yyyy" selectsEnd locale={ptBR} selected={endDate} startDate={startDate} endDate={endDate} onChange={(date) => setEndDate(date)} />
                    </p> */}
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



    <div className={styles.mainCards}>
      <div className={styles.cards}> 
          <p className={styles.titleCard}>Quantidade de clientes cadastrados</p>
          <p className={styles.valueCard}>5</p>
      </div>

      <div className={styles.cards}> 
      <p className={styles.titleCard}>Quantidade de vendas</p>
      <p className={styles.valueCard}>200</p>
      </div>

      <div className={styles.cards}> 
        <p className={styles.titleCard}>Quantidade de clientes que pagaram</p>
        <p className={styles.valueCard}>5</p>
      </div>

      <div className={styles.cards}> 
      <p className={styles.titleCard}>Quantidade de gastos do vendedor</p>
      <p className={styles.valueCard}>350</p>
      </div>
    </div>

    <div className={styles.mainGraph}>
      <div className={styles.graph}>
        <HighchartsReact
        highcharts={Highcharts}
         options={options}
         />
      </div>

      <div className={styles.graph}>
      <HighchartsReact
        highcharts={Highcharts}
         options={optionsPie}
         />
        </div>      
    </div>

    
  </div>

    </div>

    


    
  );
}