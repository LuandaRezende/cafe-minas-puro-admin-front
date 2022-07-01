import { Modal, Button, Table } from "react-bootstrap";
import styles from "../styles/Dashboard.module.css";
import React, {useState, useEffect} from 'react';
import { BsGraphUp } from "react-icons/bs";
import { FaSearch, FaTrash } from "react-icons/fa";
import swal from 'sweetalert';
import FilterCalendarAndSeller from "../components/FilterCalendarAndSeller";
import { format } from 'date-fns'
import SideNavbarDesktop from "../components/SideNavbarDesktop";
import NavbarPanel from "../components/NavbarPanel";
import api from '../pages/api/api';

export default function Sales() {
  const [show, setShow] = useState(false);
  const [day, setDay] = useState('');
  const [products, setProducts] = useState([])
  const [seller, setSeller] = useState(null);
  const [client, setClient] = useState(null);
  const [allList, setAllList] = useState([]);
  const [sellerBy, setSellerBy] = useState([]);
  const [idSale, setIdSale] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showModalTrash, setShowModalTrash] = useState(false);
  const handleCloseTrash = () => setShowModalTrash(false);
  
  function handleShowTrash(idSale) {
    setShowModalTrash(true); 
    setIdSale(idSale)
  };

  const handleClose = () => setShow(false);
  const handleShow = (idSeller, idClient) => {
    if(!idSeller){
      idSeller = 1;
    }

    for(let i=0; i < allList.length;i++){
      if(allList[i].id_seller === idSeller){
        setSellerBy(allList[i].name)
      }
    }

    getProducts(idSeller, idClient)
   
    setShow(true)
  };

  async function getProducts(idSeller, idClient){
    const response = await api.get(`sale/products/sale-made/${idClient}/${idSeller}`);

    const data = response.data;

    setProducts(data)
  };

  useEffect(() => {
    getAllList();
  }, []);

  useEffect(() => {
    updateData();
  }, [seller, startDate, endDate]);

  async function handleTrash(){
    const response = await api.delete(`sale/delete/${idSale}`);

    if(response.data){
      swal("Sucesso!", "A venda e todos produtos referente a essa venda foram excluídos com sucesso!", "success");
    }

    updateData();

    setShowModalTrash(false); 
  }

  async function getAllList(){
    const response = await api.get('sale/all/sale-made');
    setAllList(response.data)
  }

  async function updateData(){
    const response = await api.get(`sale/sale-made/${seller}`, {
      params: {
        startDate: format(new Date(startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(endDate), 'yyyy-MM-dd'),
        idSeller: seller,
      }
    });

    setAllList(response.data)
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
            setEndDate={setEndDate}
            ></FilterCalendarAndSeller>

              {seller &&
                <div style={{background: '#fff', margin: '30px', padding: '25px'}}>
                    <p style={{color: '#495057'}}><BsGraphUp style={{fontSize:'20px'}}></BsGraphUp><span style={{marginLeft:'5px'}}>VENDAS REALIZADAS</span></p>
                    <Table responsive striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Cliente</th>
                          <th>Vendedor</th>
                          <th>Total (R$)</th>
                          <th>Opções</th>
                        </tr>
                      </thead>
                      <tbody>
                      { allList.map( (seller, index) => <tr key = {index }> 
                                <td> { index } </td>
                                <td> { seller.corporate_name } </td>
                                <td> { seller.name } </td>
                                <td> { seller.total } </td>
                                <td>
                                <FaSearch style={{color: '#007bff', cursor: 'pointer', margin: '5px'}} onClick={() => handleShow(seller.id_seller, seller.id_client)}></FaSearch>
                                <FaTrash style={{color: 'red', cursor: 'pointer', margin: '5px'}} onClick={() => handleShowTrash(seller.id_sale)}></FaTrash>
                              </td>
                        </tr>) 
                      }         
                      </tbody>
                  </Table> 
                  
                  <Modal centered show={showModalTrash} onHide={handleCloseTrash}>
                      <Modal.Header closeButton>
                        <Modal.Title><h5>Cancelar venda</h5></Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>Deseja cancelar esta venda?</p>
                        <span style={{fontSize: 10, fontWeight: 'bold', color: 'red'}}>Obs: Ao cancelar a venda, ela será retirada da base de dados assim como os produtos a ela relacionado.</span>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseTrash}>
                          Cancelar
                        </Button>
                        <Button variant="primary" onClick={handleTrash}>
                          Sim
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <Modal centered show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title><h5>Produtos vendidos por {sellerBy}</h5></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        {Object.keys(products).map((item,key)=>
                              <tr key = {key}> 
                                <td>
                                Data: { format(new Date(products[item][0].date), 'dd-MM-yyyy') }

                                    { products[item].map( (product, index) => 
                                          <tr key = {index }> 
                                            <td> 
                                              <li>{ product.name } - {product.quantity} unidades</li> 
                                            </td>
                                            </tr>) 
                                      } 
                                </td>
                              </tr>       
                          )}
                      </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
          </Modal>
    </div>
}
{
  !seller && 
    <div style={{background: '#fff', margin: '30px', padding: '25px'}}>
      <p>Selecione um vendedor!</p>
    </div>
}
   </div>
</div>);
}