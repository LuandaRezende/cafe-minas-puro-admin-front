import { Form, Button, Table } from "react-bootstrap";
import styles from "../styles/Dashboard.module.css";
import React, {useState, useEffect} from 'react';

import { format } from 'date-fns'

import { GiCoffeeCup } from "react-icons/gi";

import SideNavbarDesktop from "../components/SideNavbarDesktop";
import NavbarPanel from "../components/NavbarPanel";

import api from '../pages/api/api';

export default function NewSeller() {
  const [nameSeller, setNameSeller] = useState('');
  const [date, setDate] = useState('');
  const [sellers, setSellers] = useState([]);

   useEffect(() => {
    getSellers();
  }, []);

  async function getSellers(){
    const response = await api.get('seller/get-all');
      
    setSellers(response.data)
  }

   async function addNewSeller(){

    const today = format(new Date(), 'yyyy-MM-dd HH:mm.sss');
        
    let newSeller = {
        name: nameSeller,
        created_at: today,
    }

    // sellers.push(newSeller)

    const response = await api.post('seller/create', newSeller);

    getSellers();

    setNameSeller('')
    setDate('')
  }

  async function deleteProduct(event, index, id){
    event.preventDefault();

    await api.delete(`seller/delete/${id}`);

    getSellers();
}
  
  return (
    <div style={{display: 'flex'}}>
       <div className={styles.sidebar}>
        <SideNavbarDesktop></SideNavbarDesktop>
       </div> 
    
    <div style={{background: '#ededee', width: '100%'}}>
        <NavbarPanel></NavbarPanel>

      <div style={{background: '#fff', margin: '30px', padding: '25px'}}>
       <p style={{color: '#495057'}}><GiCoffeeCup style={{fontSize:'20px'}}></GiCoffeeCup><span style={{marginLeft:'5px'}}>CADASTRAR VENDEDOR</span></p>

      <Form>
        <div style={{display: 'flex'}}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome do vendedor:</Form.Label>
              <Form.Control type="text" value={nameSeller} onChange={e => setNameSeller(e.target.value)} placeholder="Nome do vendedor..." />
          </Form.Group>

          <Button onClick={addNewSeller}  variant="primary" style={{height: '38px', marginTop: '32px'}}>
              Adicionar
          </Button>
        </div>
      </Form>


        <br />

        <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Vendedor</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
        {sellers.map((seller, index) => {
        return (
          <tr key={index}>
            <td>{index}</td>
            <td>{seller.name}</td>
            <td>{seller.created_at}</td>
            <td>
              <Button variant="danger" onClick={() => deleteProduct(event, index, seller.id_seller)}>Excluir</Button>
            </td>
          </tr>
        );
         })}
        </tbody>
    </Table> 


  </div>

     
  </div>

    </div>
    
  );
}