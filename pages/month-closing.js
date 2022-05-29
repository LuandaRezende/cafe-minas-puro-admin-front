import { Navbar, Nav, Container, NavDropdown, OverlayTrigger, Popover, Navigation, NavItem, MenuItem, Button,Offcanvas, Table } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import AppContext from "../AppContext";
import styles from "../styles/Dashboard.module.css";
import React, {useState} from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { RiDashboardFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaUsers, FaTruckMoving, FaUserMinus, FaBars, FaMoneyCheckAlt } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { SiContactlesspayment } from "react-icons/si";
import { GiCoffeeCup } from "react-icons/gi";

import { FcInfo } from "react-icons/fc";

import FilterCalendarAndSeller from "../components/FilterCalendarAndSeller";

import Form from 'react-bootstrap/Form';

import SideNavbarDesktop from "../components/SideNavbarDesktop";
import NavbarPanel from "../components/NavbarPanel";

export default function Travel() {
  const [show, setShow] = useState(false);
  const [dataTable, setDataTable] = useState(
    [
      { id: 1, date: "05/03/2022", paidVoucher: 320, cashSales: 220, total: 540, kg: '200', travelExpenses: 200, totalCommission: 0  },
      { id: 2, date: "06/03/2022", paidVoucher: 322, cashSales: 150, total: 472, kg: '150', travelExpenses: 100, totalCommission: 0 },
      { id: 3, date: "07/03/2022", paidVoucher: 280, cashSales: 410, total: 690.52, kg: '800', travelExpenses: 50, totalCommission: 0  },
    ]
  );
  const [totalComission, setTotalComission] = useState(0);

  function calcComission(porcentage, id){
    const _tempData = [...dataTable];

    if(porcentage === "1"){
      _tempData[id].totalCommission = (_tempData[id].total * (( 1 / 100))).toFixed(2);
    }else if(porcentage === "1.5"){
      _tempData[id].totalCommission = (_tempData[id].total * (( 1.5 / 100))).toFixed(2);
    }else if(porcentage === "3"){
      _tempData[id].totalCommission = (_tempData[id].total * (( 3 / 100))).toFixed(2);
    }else{
      _tempData[id].totalCommission = 0;
    }

    calcTotalComission();

    setDataTable(_tempData);
  }

  function calcTotalComission(){
    let total = 0;
    for(let i=0; i < dataTable.length; i++){
      total = total + Number(dataTable[i].totalCommission);
    }

    setTotalComission(total.toFixed(2))
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Informativo</Popover.Header>
      <Popover.Body>
         A comissão é calculada pelo total de vendas * ( porcentagem / 100);
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
       
       <FilterCalendarAndSeller></FilterCalendarAndSeller>

      <div style={{background: '#fff', margin: '30px', padding: '25px'}}>
       <p style={{color: '#495057'}}><FaMoneyCheckAlt style={{fontSize:'20px'}}></FaMoneyCheckAlt>
        <span style={{marginLeft:'5px'}}>FECHAMENTO DO MÊS</span>
        <OverlayTrigger placement="right" overlay={popover}>
            <button style={{background:'#fff', border:'none', cursor: 'default'}}><FcInfo></FcInfo></button>
        </OverlayTrigger>
       </p>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Data</th>
            <th>Vale Pago</th>
            <th>Vendas a vista</th>
            <th>Total de vendas</th>
            <th>Kg vendido</th>
            <th>Gasto de viagem</th>
            <th>Selecione a % de comissão</th>
            <th>Comissão</th>
          </tr>
        </thead>
        <tbody>
          {
            dataTable.map((value, key) => {
              return (
                <tr key={key}>
                  <td>{value.id}</td>
                  <td>{value.date}</td>
                  <td>R${value.paidVoucher}</td>
                  <td>R${value.cashSales}</td>
                  <td>R${value.total}</td>
                  <td>{value.kg}</td>
                  <td>R${value.travelExpenses}</td>
                  <td>
                    <Form.Select onChange={(e) => calcComission(e.target.value, key)}>
                      <option>-</option>
                      <option value="1">1%</option>
                      <option value="1.5">1.5%</option>
                      <option value="3">3%</option>
                     </Form.Select>
                  </td>
                  <td>R${value.totalCommission}</td>
                </tr>
              )
            })
          }
        </tbody>
    </Table> 

    <p>Total de comissão: R$ {totalComission} </p>
         <Button style={{float:'right', marginTop: '-33px'}} variant="primary">
            Salvar comissão
         </Button>


      </div>

     
  </div>

    </div>

    


    
  );
}