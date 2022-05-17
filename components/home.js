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

import FilterCalendarAndSeller from "../components/FilterCalendarAndSeller";

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

  const today = new Date();

  const optionsGraphOne = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Total gasto no dia (R$)'
     },
     xAxis: {
        categories: [
            '',
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'R$'
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
      verticalAlign: 'bottom',
      layout: 'horizontal',
      x: 0,
      y: 0,
    },
    series: [{
        name: 'Gasto com gasolina',
        data: [49.9],
        color: '#acd6fa',
    }, {
        name: 'Gasto com almoço',
        data: [10],
        color: '#fadf98'
    }, {
        name: 'Outros gastos',
        data: [39.3],
        color: '#faa4aa'
    },{
      name: 'Total',
      data: [99.20],
      color: '#28a745'
  }]
  };

  const optionsGraphTwo = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Entradas recebidas no dia em real (R$)'
     },
     xAxis: {
        categories: [
          ''
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'R$'
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
      verticalAlign: 'bottom',
      layout: 'horizontal',
      x: 0,
      y: 0,
    },
    series: [{
        name: 'Total em vendas à vista',
        data: [28.9],
        color: '#acd6fa',
    }, {
        name: 'Total em vales pagos',
        data: [20.6],
        color: '#fadf98'
    },{
      name: 'Total',
      data: [49.5],
      color: '#28a745'
  }]
  };

  const optionsGraphThree = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Quantidade de vendas no dia'
     },
     xAxis: {
        categories: [
          ''
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'R$'
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
      verticalAlign: 'bottom',
      layout: 'horizontal',
      x: 0,
      y: 0,
    },
    series: [{
        name: 'Quantidade de vendas no dia',
        data: [200],
        color: '#acd6fa',
    }]
  };

  const optionsGraphFour = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Total de vendas realizadas no dia em real'
     },
     xAxis: {
        categories: [
          ''
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'R$'
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
      verticalAlign: 'bottom',
      layout: 'horizontal',
      x: 0,
      y: 0,
    },
    series: [{
        name: 'Boleto',
        data: [30.9],
        color: '#acd6fa',
    }, {
        name: 'Cheque',
        data: [10.2],
        color: '#fadf98'
    },{
      name: 'Dinheiro',
      data: [50.5],
      color: '#28a745'
  },{
    name: 'Pix',
    data: [200],
    color: '#f7464a'
  },{
    name: 'Vales',
    data: [100.25],
    color: '#faa4aa'
  },{
    name: 'Total',
    data: [392.10],
    color: '#ac64ad'
  }]
  };

  const optionsPie = {
    chart: {
      type: 'pie'
  },
  title: {
      text: 'Entradas realizadas no mês'
  },
  subtitle:{
    text: ''
  },
  tooltip: {
      pointFormat: '{series.name}: <b>R${point.y}</b>'
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
      name: 'Valor',
      colorByPoint: true,
      data: [{
          name: 'Pagamentos de vales',
          y: 81.40,
          color: '#f7464a',
      },{
          name: 'Pagamentos a vista',
          y: 61.41,
          color: '#46bfbd',
      }, {
          name: 'Total',
          y: 142.81,
          color: '#ac64ad',
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

      <FilterCalendarAndSeller></FilterCalendarAndSeller>

    <div className={styles.mainCards}>
    <div className={styles.cards}> 
      <p className={styles.titleCard}>Quantidade total gasta (R$)</p>
      <p className={styles.valueCard}>200</p>
      </div>

      <div className={styles.cards}> 
          <p className={styles.titleCard}>Quantidade total de entradas (R$)</p>
          <p className={styles.valueCard}>142.81</p>
      </div>

      <div className={styles.cards}> 
        <p className={styles.titleCard}>Quantidade de vendas no dia</p>
        <p className={styles.valueCard}>200</p>
      </div>

      <div className={styles.cards}> 
      <p className={styles.titleCard}>Total de vendas realizadas(R$)</p>
      <p className={styles.valueCard}>392.10</p>
      </div>
    </div>

    <div className={styles.mainGraph}>
      <div className={styles.graph}>
        <HighchartsReact
        highcharts={Highcharts}
         options={optionsGraphOne}
         />
      </div>

      <div className={styles.graph}>
      <HighchartsReact
        highcharts={Highcharts}
         options={optionsPie}
         />
      </div>      
    </div>

    <div className={styles.mainGraph}>
      <div className={styles.graphTwoColumn}>
        <HighchartsReact
        highcharts={Highcharts}
         options={optionsGraphTwo}
         />
      </div>

     <div className={styles.graphTwoColumn}>
        <HighchartsReact
        highcharts={Highcharts}
         options={optionsGraphThree}
         />
      </div>    
    </div>

    <div className={styles.mainGraph}>
      <div className={styles.graphThreeColumn}>
        <HighchartsReact
        highcharts={Highcharts}
         options={optionsGraphFour}
         />
      </div>  
    </div>

    
  </div>

    </div>

    


    
  );
}