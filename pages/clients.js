import { Navbar, Nav, Container, NavDropdown, Navigation, NavItem, MenuItem, Button,Offcanvas, Table } from "react-bootstrap";
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
import { GiCoffeeCup } from "react-icons/gi";

import SideNavbarDesktop from "../components/SideNavbarDesktop";
import NavbarPanel from "../components/NavbarPanel";

export default function Clients() {
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
   <div style={{display: 'flex'}}>
      <div className={styles.sidebar}>
        <SideNavbarDesktop></SideNavbarDesktop>
      </div> 
    
    <div style={{background: '#ededee', width: '100%'}}>
      <NavbarPanel></NavbarPanel>

      <div style={{background: '#fff', margin: '30px', padding: '25px'}}>
      <p style={{color: '#495057'}}><FaUsers style={{fontSize:'20px'}}></FaUsers><span style={{marginLeft:'5px'}}>LISTA DE CLIENTES</span></p>

      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <td><b>Cliente</b></td>
            {/* <th>Vendedor que cadastrou</th> */}
            <td><b>CNPJ</b></td>
            <td><b>Cidade</b></td>
            <td><b>Telefone</b></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Supermercado Alvorada</td>
            <td>17.833.301/0001-07</td>
            <td>Santa Rita do Sapucaí-MG</td>
            <td>(35) 3471-2633</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Supermercado EPA</td>
            <td>08.277.805/0001-99</td>
            <td>Santa Rita do Sapucaí-MG</td>
            <td>(35) 3297-302</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Supermercado Unissul</td>
            <td>06.311.489/0001-07</td>
            <td>Alfenas-MG</td>
            <td>(35) 3292-7025</td>
          </tr>         
        </tbody>
    </Table> 

      </div>

     
  </div>

    </div>

    


    
  );
}