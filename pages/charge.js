import { Table } from "react-bootstrap";
import styles from "../styles/Dashboard.module.css";
import React, {useState, useEffect} from 'react';

import { FaTruckMoving } from "react-icons/fa";

import { format } from 'date-fns'

import FilterCalendarAndSeller from "../components/FilterCalendarAndSeller";

import SideNavbarDesktop from "../components/SideNavbarDesktop";
import NavbarPanel from "../components/NavbarPanel";

import api from '../pages/api/api';

export default function Charge() {
  const [show, setShow] = useState(false);
  const [charges, setCharges]= useState([]);
  const [seller, setSeller] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    updateData();
  }, [seller, startDate, endDate]);

  async function updateData(){
    const response = await api.get(`loads/get-seller/${seller}`, {
      params: {
        startDate: format(new Date(startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(endDate), 'yyyy-MM-dd'),
        idSeller: seller,
      }
    });
    setCharges(response.data)
  }

  async function getData(){
    const response = await api.get('loads/get-all');
    
    setCharges(response.data);
  }

  return (
      <div style={{display: 'flex'}}>

        <div className={styles.sidebar}>
          <SideNavbarDesktop></SideNavbarDesktop>
        </div> 

    
    <div style={{background: '#ededee', width: '100%'}}>
      <NavbarPanel></NavbarPanel>

     <FilterCalendarAndSeller 
        setSeller={setSeller} 
        setStartDate={setStartDate} 
        setEndDate={setEndDate}>
      </FilterCalendarAndSeller>

    { seller &&
      <div style={{background: '#fff', margin: '30px', padding: '25px'}}>
      <p style={{color: '#495057'}}><FaTruckMoving style={{fontSize:'20px'}}></FaTruckMoving><span style={{marginLeft:'5px'}}>LISTA DE CARGAS</span></p>

      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Vendedor</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
        { charges.map( (charge, index) => <tr key = {index }> 
                  <td> { index } </td>
                  <td> { charge.name } </td>
                  <td> { charge.product } </td>
                  <td> { charge.quantity } </td>
                  <td> { charge.created_at.substring(0,10) } </td>
                </tr>) 
        }         
        </tbody>
    </Table> 

      </div>
  }

    { !seller && <div style={{background: '#fff', margin: '30px', padding: '25px'}}>
        <p>Selecione um vendedor!</p>
      </div>}

     
  </div>

    </div>

    


    
  );
}