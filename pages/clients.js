import { Table } from "react-bootstrap";
import styles from "../styles/Dashboard.module.css";
import React, {useState, useEffect} from 'react';
import { FaUsers } from "react-icons/fa";
import SideNavbarDesktop from "../components/SideNavbarDesktop";
import NavbarPanel from "../components/NavbarPanel";
import api from '../pages/api/api';

export default function Clients() {
  const [clients, setClients]= useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData(){
    const response = await api.get('clients/get-all');

    setClients(response.data);
  }

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
            <td><b>CNPJ</b></td>
            <td><b>Cidade</b></td>
            <td><b>Telefone</b></td>
          </tr>
        </thead>
        <tbody>
            { clients.map( (client, index) => 
                 <tr key = {index }> 
                  <td> { index } </td>
                  <td> { client.corporate_name } </td>
                  <td> { client.cnpj } </td>
                  <td> { client.city } </td>
                  <td> { client.phone } </td>
                </tr>) 
            }   
        </tbody>
    </Table> 
   </div>  
  </div>
</div>);
}