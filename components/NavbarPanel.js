import { Nav, Offcanvas } from "react-bootstrap";
import styles from "../styles/Dashboard.module.css";
import React, {useState} from 'react';
import { RiDashboardFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaUsers, FaTruckMoving, FaMoneyCheckAlt } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { GiCoffeeCup } from "react-icons/gi";
import { MdPendingActions } from "react-icons/md"

import { AiOutlineUserAdd } from "react-icons/ai";

export default function SideBarMenu() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const src = `http://cafeminaspuro.com.br/wp-content/uploads/2020/01/cropped-logoMinasCafe-2-140x83.png`;

return (
    
    <div className={styles.panelAdm}>
      <p style={{margin: '20px', color: '#007bff'}}>Painel administrativo</p>

      <GiCoffeeCup className={styles.iconSideBar} onClick={handleShow}></GiCoffeeCup>
      <div> 

<Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
    <Offcanvas.Body>
        <center><img alt="Logo" src={src}></img></center>

     <div style={{margin: '20px'}}>
         <Nav defaultActiveKey="/home" className="flex-column">
            <hr />
            <div className={styles.divLinks}>
            <Nav.Link href="/" className={styles.linkSidebar}><RiDashboardFill style={{ marginRight: '15px', fontSize: '20px'}}></RiDashboardFill>Dashboard</Nav.Link>
            </div>
            <hr />
            <div className={styles.divLinks}>
            <Nav.Link href="/clients" className={styles.linkSidebar}><FaUsers style={{ marginRight: '15px', fontSize: '20px'}}></FaUsers>Lista de clientes</Nav.Link>
            </div>
             <hr />
            <div className={styles.divLinks}>
            <Nav.Link href="/sales" className={styles.linkSidebar}><BsGraphUp style={{ marginRight: '15px', fontSize: '20px'}}></BsGraphUp>Vendas realizadas</Nav.Link>
            </div>
             <hr />
            <div className={styles.divLinks}>
            <Nav.Link href="/travel" className={styles.linkSidebar}><RiMoneyDollarCircleFill style={{ marginRight: '15px', fontSize: '20px'}}></RiMoneyDollarCircleFill>Gastos viagem</Nav.Link>
            </div>
             <hr />
            <div className={styles.divLinks}>
            <Nav.Link href="/charge" className={styles.linkSidebar}><FaTruckMoving style={{ marginRight: '15px', fontSize: '20px'}}></FaTruckMoving>Lista de cargas</Nav.Link>
            </div>
            <hr />
            <div className={styles.divLinks}>
            <Nav.Link href="/pending" className={styles.linkSidebar}><MdPendingActions style={{ marginRight: '15px', fontSize: '20px'}}></MdPendingActions>Pendências dos clientes</Nav.Link>
            </div>
             <hr />
            <div className={styles.divLinks}>
            <Nav.Link href="/month-closing" className={styles.linkSidebar}><FaMoneyCheckAlt style={{ marginRight: '15px', fontSize: '20px'}}></FaMoneyCheckAlt>Fechamento do mês</Nav.Link>
            </div>
             <hr />
            <div className={styles.divLinks}>
            <Nav.Link href="/new-product" className={styles.linkSidebar}><GiCoffeeCup style={{ marginRight: '15px', fontSize: '20px'}}></GiCoffeeCup>Cadastrar produto</Nav.Link>
            </div>
            <hr />
            <div className={styles.divLinks}>
            <Nav.Link href="/new-seller" className={styles.linkSidebar}><AiOutlineUserAdd style={{ marginRight: '15px', fontSize: '20px'}}></AiOutlineUserAdd>Cadastrar vendedor</Nav.Link>
            </div>
        </Nav>
      </div>
     </Offcanvas.Body>
    </Offcanvas>
   </div>
</div>
 


    
  );
}