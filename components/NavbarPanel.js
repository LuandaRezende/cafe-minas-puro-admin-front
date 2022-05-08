import { Navbar, Nav, Container, NavDropdown, Navigation, NavItem, MenuItem, Button,Offcanvas } from "react-bootstrap";
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

export default function SideBarMenu() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    text: '(Últimos 6 meses)'
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
      }, {
          name: 'Março',
          y: 10.85,
          color: '#4d5360',
      },{
          name: 'Abril',
          y: 25.50,
          color: '#949fb1',
      },
      {
          name: 'Maio',
          y: 11.10,
          color: '#e5e5e5',
      }]
  }]
  };

  const src = `http://cafeminaspuro.com.br/wp-content/uploads/2020/01/cropped-logoMinasCafe-2-140x83.png`;

  return (
    
    <div className={styles.panelAdm}>
      <p style={{margin: '20px', color: '#007bff'}} onClick={handleShow}>Painel administrativo</p>

      <GiCoffeeCup className={styles.iconSideBar} onClick={handleShow}></GiCoffeeCup>
      <div> 


      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <center><img alt="Logo" src={src}></img></center>

        <div style={{margin: '20px'}}>
    <Nav defaultActiveKey="/home" className="flex-column">
      <hr />

      <div className={styles.divLinks}>
      <Nav.Link href="/" className={styles.linkSidebar}><RiDashboardFill style={{ marginRight: '15px', fontSize: '20px'}}></RiDashboardFill>Dashboard</Nav.Link>
      </div>

      <hr />

      <div className={styles.divLinks}>
      <Nav.Link href="/clients" className={styles.linkSidebar}><FaUsers style={{ marginRight: '15px', fontSize: '20px'}}></FaUsers>Lista de clientes</Nav.Link>
      </div>

      <hr />

      <div className={styles.divLinks}>
      <Nav.Link href="/sales" className={styles.linkSidebar}><BsGraphUp style={{ marginRight: '15px', fontSize: '20px'}}></BsGraphUp>Vendas realizadas</Nav.Link>
      </div>

      <hr />

      <div className={styles.divLinks}>
      <Nav.Link href="/travel" className={styles.linkSidebar}><RiMoneyDollarCircleFill style={{ marginRight: '15px', fontSize: '20px'}}></RiMoneyDollarCircleFill>Gastos viagem</Nav.Link>
      </div>

      <hr />

      <div className={styles.divLinks}>
      <Nav.Link href="/charge" className={styles.linkSidebar}><FaTruckMoving style={{ marginRight: '15px', fontSize: '20px'}}></FaTruckMoving>Lista de cargas</Nav.Link>
      </div>

      <hr />

      <div className={styles.divLinks}>
      <Nav.Link href="/newproduct" className={styles.linkSidebar}><GiCoffeeCup style={{ marginRight: '15px', fontSize: '20px'}}></GiCoffeeCup>Cadastrar produto</Nav.Link>
      </div>

    </Nav>
    </div>
        </Offcanvas.Body>
      </Offcanvas>
      </div>
    </div>
 


    
  );
}