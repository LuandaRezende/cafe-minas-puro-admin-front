import { Form, Navbar, Nav, Container, NavDropdown, Navigation, NavItem, MenuItem, Button,Offcanvas, Table } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import AppContext from "../AppContext";
import styles from "../styles/SideBarMenu.module.css";
import React, {useState, ObjectRow} from 'react';

import { format, compareAsc } from 'date-fns'

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { RiDashboardFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaUsers, FaTruckMoving, FaUserMinus, FaBars } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { SiContactlesspayment } from "react-icons/si";
import { GiCoffeeCup } from "react-icons/gi";

import SideNavbarDesktop from "../components/SideNavbarDesktop";
import NavbarPanel from "../components/NavbarPanel";

export default function NewProduct() {
  const [nameProduct, setNameProduct] = useState('');
  const [date, setDate] = useState('');
  const [products, setProducts] = useState([]);


   function addNewProduct(){

    const today = format(new Date(), 'dd/MM/yyyy');
        
    let newProduct = {
        name: nameProduct,
        date: today,
    }

    products.push(newProduct)

    setNameProduct('')
    setDate('')
  }

  function deleteProduct(event, index){
    event.preventDefault()
    products.splice(index, 1);
    setProducts([...products])
}
  
  return (
    <div style={{display: 'flex'}}>
       <div className={styles.sidebar}>
        <SideNavbarDesktop></SideNavbarDesktop>
       </div> 
    
    <div style={{background: '#ededee', width: '100%'}}>
        <NavbarPanel></NavbarPanel>

      <div style={{background: '#fff', margin: '30px', padding: '25px'}}>
       <p style={{color: '#495057'}}><GiCoffeeCup style={{fontSize:'20px'}}></GiCoffeeCup><span style={{marginLeft:'5px'}}>CADASTRAR PRODUTO</span></p>

      <Form>
        <div style={{display: 'flex'}}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Produto:</Form.Label>
              <Form.Control type="text" value={nameProduct} onChange={e => setNameProduct(e.target.value)} placeholder="Nome do produto..." />
          </Form.Group>

          <Button onClick={addNewProduct}  variant="primary" style={{height: '38px', marginTop: '32px'}}>
              Adicionar
          </Button>
        </div>
      </Form>


        <br />

        <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Produto</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
        {products.map((product, index) => {
        return (
          <tr key={index}>
            <td>{index}</td>
            <td>{product.name}</td>
            <td>{product.date}</td>
            <td>
              <Button variant="danger" onClick={() => deleteProduct(event, index)}>Excluir</Button>
            </td>
          </tr>
        );
         })}
        </tbody>
    </Table> 



    {/* {products.map((employee, index) => {
        return (
          <div key={index}>
            <h2>name: {employee.name}</h2>
            <hr />
          </div>
        );
      })} */}


  </div>

     
  </div>

    </div>

    


    
  );
}