import { Form, Button, Table } from "react-bootstrap";
import styles from "../styles/Dashboard.module.css";
import React, {useState, useEffect} from 'react';
import { format } from 'date-fns'
import { GiCoffeeCup } from "react-icons/gi";
import SideNavbarDesktop from "../components/SideNavbarDesktop";
import NavbarPanel from "../components/NavbarPanel";
import api from '../pages/api/api';

export default function NewProduct() {
  const [nameProduct, setNameProduct] = useState('');
  const [date, setDate] = useState('');
  const [products, setProducts] = useState([]);

   useEffect(() => {
    getProducts();
  }, []);

  async function getProducts(){
    const response = await api.get('product/get-all');
    setProducts(response.data)
  }

   async function addNewProduct(){

    const today = format(new Date(), 'yyyy-MM-dd HH:mm.sss');
        
    let newProduct = {
        name: nameProduct,
        created_at: today,
    }

    const response = await api.post('product/create', newProduct);

    getProducts();

    setNameProduct('')
    setDate('')
  }

  async function deleteProduct(event, index, id){
    event.preventDefault()
    products.splice(index, 1);
    setProducts([...products])

    await api.delete(`product/delete/${id}`);

    getProducts();
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
                <td>{product.created_at}</td>
                <td>
                  <Button variant="danger" onClick={() => deleteProduct(event, index, product.id_product)}>Excluir</Button>
                </td>
              </tr>
            );
            })}
       </tbody>
    </Table> 
   </div> 
 </div>
</div>);
}