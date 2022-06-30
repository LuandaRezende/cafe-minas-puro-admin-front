import { Table } from "react-bootstrap";
import styles from "../styles/Dashboard.module.css";
import React, {useState, useEffect} from 'react';

import { RiMoneyDollarCircleFill } from "react-icons/ri";

import FilterCalendarAndSeller from "../components/FilterCalendarAndSeller";

import SideNavbarDesktop from "../components/SideNavbarDesktop";
import NavbarPanel from "../components/NavbarPanel";

import { format } from 'date-fns';

import api from '../pages/api/api';

export default function Travel() {
  const [seller, setSeller] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [travelExpenses, setTravelExpenses]= useState([]);

  async function updateData(){
    const response = await api.get(`travel/get-seller/${seller}`,{
    params: {
      startDate: format(new Date(startDate), 'yyyy-MM-dd'),
      endDate: format(new Date(endDate), 'yyyy-MM-dd'),
      idSeller: seller,
     }
    });
    setTravelExpenses(response.data)
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    updateData();
  }, [seller, startDate, endDate]);

  async function getData(){
    const response = await api.get('travel/get-all');
    
    setTravelExpenses(response.data);
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

    {seller &&
      <div style={{background: '#fff', margin: '30px', padding: '25px'}}>
       <p style={{color: '#495057'}}><RiMoneyDollarCircleFill style={{fontSize:'20px'}}></RiMoneyDollarCircleFill><span style={{marginLeft:'5px'}}>GASTOS VIAGEM</span></p>
     
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Vendedor</th>
            <th>Gasolina</th>
            <th>Almoço</th>
            <th>Outros</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>          
                { travelExpenses.map( (expense, index) => <tr key = {index }> 
                  <td>{ index }</td>
                  <td>{ expense.name }</td>
                  <td>R$ { expense.gasoline }</td>
                  <td>R$ { expense.lunch }</td>
                  <td>R$ { expense.other }</td>
                  <td>{ expense.created_at.substring(0,10) }</td>
                </tr>) }
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