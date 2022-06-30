import { OverlayTrigger, Popover, Button,Table } from "react-bootstrap";
import styles from "../styles/Dashboard.module.css";
import React, {useState, useEffect} from 'react';

import { FaMoneyCheckAlt } from "react-icons/fa";

import { FcInfo } from "react-icons/fc";

import FilterCalendarAndSeller from "../components/FilterCalendarAndSeller";

import { format } from 'date-fns';

import api from '../pages/api/api';

import Form from 'react-bootstrap/Form';

import SideNavbarDesktop from "../components/SideNavbarDesktop";
import NavbarPanel from "../components/NavbarPanel";

export default function Travel() {
  const [show, setShow] = useState(false);
  // const [dataTable, setDataTable] = useState(
    // [
    //   { id: 1, date: "05/03/2022", paidVoucher: 320, cashSales: 220, total: 540, kg: '200', travelExpenses: 200, totalCommission: 0  },
    //   { id: 2, date: "06/03/2022", paidVoucher: 322, cashSales: 150, total: 472, kg: '150', travelExpenses: 100, totalCommission: 0 },
    //   { id: 3, date: "07/03/2022", paidVoucher: 280, cashSales: 410, total: 690.52, kg: '800', travelExpenses: 50, totalCommission: 0  },
    // ]
  // );

  const [dataTable, setDataTable] = useState([]);

  const [totalComission, setTotalComission] = useState(0);

  const [seller, setSeller] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if(seller){
      getData();
    }
  }, [seller, startDate, endDate]);

  async function getData(){
    const response = await api.get(`closure/${seller}`, {
      params: {
        startDate: format(new Date(startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(endDate), 'yyyy-MM-dd'),
        idSeller: seller,
      }
    });

    setDataTable(response.data)
    calcTotalComission(response.data);
  }


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

    _tempData[id].percentual = porcentage;
    _tempData[id].comission = _tempData[id].totalCommission;

    calcTotalComission();

    setDataTable(_tempData);
  }

  function calcTotalComission(array){
    let data;
    if(array && array.length > 0){
      data = array;
    }else{
      data = dataTable;
    }

    let total = 0;
    for(let i=0; i < data.length; i++){
      let comission = data[i].comission ? data[i].comission : 0;

      total = total + Number(comission);
    }

    setTotalComission(total.toFixed(2))
  }

  async function saveComission(){
    const res = await api.put('closure/update', { dataTable });
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

    
    <div style={{background: '#ededee', width: '100%', height: 'auto'}}>
       <NavbarPanel></NavbarPanel>
       
       <FilterCalendarAndSeller
         setSeller={setSeller} 
         setStartDate={setStartDate} 
         setEndDate={setEndDate}
       ></FilterCalendarAndSeller>

    {seller ?
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
            {/* <th>Kg vendido</th>
            <th>Gasto de viagem</th> */}
            <th>Selecione a % de comissão</th>
            <th>Comissão</th>
          </tr>
        </thead>
        <tbody>
          {
            dataTable.map((value, key) => {
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{format(new Date(value.date), 'dd-MM-yyyy')}</td>
                  <td>R${value.amountPaid}</td>
                  <td>R${value.inCash}</td>
                  <td>R${value.total}</td>
                  {/* <td>{value.kg}</td>
                  <td>R${value.travelExpenses}</td> */}
                  <td>
                    <Form.Select value={value.percentual} onChange={(e) => calcComission(e.target.value, key)}>
                      <option>-</option>
                      <option value="1">1%</option>
                      <option value="1.5">1.5%</option>
                      <option value="3">3%</option>
                     </Form.Select>
                  </td>
                  <td>R${value.comission}</td>
                </tr>
              )
            })
          }
        </tbody>
    </Table> 
    {dataTable && dataTable.length > 0 && 
          <div>
            <p className={styles.totalComission}>Total de comissão: R$ {totalComission} </p>
         
           <Button style={{float:'right', marginTop: '-33px'}} onClick={saveComission} variant="primary">
            Salvar comissão
          </Button>
          </div>
      }
      </div> : 
      <div style={{background: '#fff', margin: '30px', padding: '25px'}}>
        <p>Selecione um vendedor!</p>
      </div>
   }

      

     
  </div>

    </div>

    


    
  );
}