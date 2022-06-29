import styles from "../styles/Dashboard.module.css";
import React, {useState, useEffect} from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import SideNavbarDesktop from "../components/SideNavbarDesktop";
import NavbarPanel from "../components/NavbarPanel";

import FilterCalendarAndSeller from "../components/FilterCalendarAndSeller";

import api from '../pages/api/api';

import DatePicker from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';

import { format } from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";

export default function SideBarMenu() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(new Date());
  const [seller, setSeller] = useState(null);

  // Ultimos 90 dias: new Date(new Date().setDate(new Date().getDate() - 90))

  const [optionsGraphOne, setOptionsGraphOne] = useState(null);
  const [optionsPie, setOptionsPie] = useState(null);
  const [optionsGraphTwo, setOptionsGraphBar] = useState(null);
  const [optionsGraphThree, setOptionsGraphByDay] = useState(null);
  const [optionsGraphFour, setSaleByReal] = useState(null);

  const [amountSpend, setAmountSpend] = useState('');
  const [totalInput, setTotalInput] = useState('');
  const [totalSales, setTotalSales] = useState('');
  const [totalSalesMakeMoney, setSalesMakeMoney] = useState('');

  useEffect(() => {
    if(seller){
      getData();
    }
  }, [seller, startDate, endDate]);

  const today = new Date();

  async function getData(){
    const response = await api.get(`sale/data/dashboard/${seller}`);

    setAmountSpend(response.data.graphOne[0].totalGasto)
    setTotalInput(response.data.graphTwo[0].total)
    setTotalSales(response.data.dataGraphFour[0].quantitySale)
    setSalesMakeMoney(response.data.totalLastGraph)

    getDataGraphOne(response.data.graphOne)
    getDataGraphTwo(response.data.graphTwo)
    getDataGraphThree(response.data.graphThree)
    getDataGraphFour(response.data.dataGraphFour)
    getDataGraphFive(response.data.dataGraphFiveTreatment)

    console.log(response.data)
  }

  function getDataGraphFive(data){
    setSaleByReal({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Total de vendas realizadas no dia em real'
       },
       xAxis: {
          categories: [
            ''
          ],
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'R$'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          },
          dataLabels: {
            enabled: false           
         },
         showInLegend: true
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        x: 0,
        y: 0,
      },
      series: data
    })
  }

  function getDataGraphFour(data){
    setOptionsGraphByDay({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Quantidade de vendas no dia'
       },
       xAxis: {
          categories: [
            ''
          ],
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Quantidade'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          },
          dataLabels: {
            enabled: false           
         },
         showInLegend: true
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        x: 0,
        y: 0,
      },
      series: [{
          name: 'Quantidade de vendas no dia',
          data: [Number(data[0].quantitySale)],
          color: '#acd6fa',
      }]
    })
  }

  function getDataGraphThree(data){
    setOptionsGraphBar({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Entradas recebidas no dia em real (R$)'
       },
       xAxis: {
          categories: [
            ''
          ],
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'R$'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          },
          dataLabels: {
            enabled: false           
         },
         showInLegend: true
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        x: 0,
        y: 0,
      },
      series: [{
          name: 'Total em vendas à vista',
          data: [Number(data[0].vista)],
          color: '#acd6fa',
      }, {
          name: 'Total em vales pagos',
          data: [Number(data[0].vale)],
          color: '#fadf98'
      },{
        name: 'Total',
        data: [Number(data[0].total)],
        color: '#28a745'
      }]
    });
  }

  function getDataGraphTwo(data){

    setOptionsPie({
      chart: {
        type: 'pie'
    },
    title: {
        text: 'Entradas realizadas no mês'
    },
    subtitle:{
      text: ''
    },
    tooltip: {
        pointFormat: '{series.name}: <b>R${point.y}</b>'
    },
    plotOptions: {
        pie: {
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Valor',
        colorByPoint: true,
        data: [{
            name: 'Pagamentos de vales',
            y: data[0].vale,
            color: '#f7464a',
        },{
            name: 'Pagamentos a vista',
            y: data[0].vista,
            color: '#46bfbd',
        }, {
            name: 'Total',
            y: Number(data[0].total),
            color: '#ac64ad',
          }
        ]
      }]
    })
  }

  function getDataGraphOne(data){
    setOptionsGraphOne({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Total gasto no dia (R$)'
       },
       xAxis: {
          categories: [
              '',
          ],
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'R$'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          },
          dataLabels: {
            enabled: false           
         },
         showInLegend: true
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        x: 0,
        y: 0,
      },
      series: [{
          name: 'Gasto com gasolina',
          data: [Number(data[0].gasoline)],
          color: '#acd6fa',
      }, {
          name: 'Gasto com almoço',
          data: [Number(data[0].lunch)],
          color: '#fadf98'
      }, {
          name: 'Outros gastos',
          data: [Number(data[0].other)],
          color: '#faa4aa'
      },{
        name: 'Total',
        data: [Number(data[0].totalGasto)],
        color: '#28a745'
    }]
    });
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
{seller ? <div>
    <div className={styles.mainCards}>
    <div className={styles.cards}> 
      <p className={styles.titleCard}>Quantidade total gasta (R$)</p>
      <p className={styles.valueCard}>{amountSpend}</p>
      </div>

      <div className={styles.cards}> 
          <p className={styles.titleCard}>Quantidade total de entradas (R$)</p>
          <p className={styles.valueCard}>{totalInput}</p>
      </div>

      <div className={styles.cards}> 
        <p className={styles.titleCard}>Quantidade de vendas no dia</p>
        <p className={styles.valueCard}>{totalSales}</p>
      </div>

      <div className={styles.cards}> 
      <p className={styles.titleCard}>Total de vendas realizadas(R$)</p>
      <p className={styles.valueCard}>{totalSalesMakeMoney}</p>
      </div>
    </div>

    <div className={styles.mainGraph}>
      <div className={styles.graph}>
        <HighchartsReact
        highcharts={Highcharts}
         options={optionsGraphOne}
         />
      </div>

      <div className={styles.graph}>
      <HighchartsReact
        highcharts={Highcharts}
         options={optionsPie}
         />
      </div>      
    </div>

    <div className={styles.mainGraph}>
      <div className={styles.graphTwoColumn}>
        <HighchartsReact
        highcharts={Highcharts}
         options={optionsGraphTwo}
         />
      </div>

     <div className={styles.graphTwoColumn}>
        <HighchartsReact
        highcharts={Highcharts}
         options={optionsGraphThree}
         />
      </div>    
    </div>

    <div className={styles.mainGraph}>
      <div className={styles.graphThreeColumn}>
        <HighchartsReact
        highcharts={Highcharts}
         options={optionsGraphFour}
         />
      </div>  
    </div>

    </div> : <p style={{textAlign: 'center', margin: '30px', background: 'red', color: '#fff'}}>Selecione um vendedor!</p> } 
  </div> 

</div>    
);
}