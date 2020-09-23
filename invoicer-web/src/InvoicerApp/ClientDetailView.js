
import React from "react";
import { loadClientInvocies, createInvoice,loadClients, loadInvoiceInfo} from "../ApiLookUps/lookUps";

import {ClientInvoicesSum} from './CommonComponents/ClientInvoicesSum'
import {Link,Redirect} from 'react-router-dom'


import './clientdetailview.css'




//import {ClientName, InvoiceValue} from '../InvoicesListView/InovicesView'


//import {ClientInfo} from './ClientInfoRemoveComp'
//import {CreateNewInvoice} from './CreateNewInvoice'



export class ClientDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: [],
      clientID: '',
      buttonText: 'New Invoice'
    }; 
    this.handlebuttonText = this.handlebuttonText.bind(this)
}
  componentDidMount() {
    const MyCallBack = (response, status) => {
      if (status === 200) {
        this.setState({
          invoices: response,
          isCreatingInvoice : false,
          invoiceID : '',
          clientID : this.props.clientID
        });
      }
    };
    loadClientInvocies(MyCallBack, this.props.clientID);
    window.addEventListener('resize', this.handlebuttonText)
    if(window.innerWidth <600){
      this.setState({
        buttonText : '+'
      })
    }
   
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.handlebuttonText)
  
  }




  handleCreateInvoice =()=>{
    var InvoiceDict = {
        client : this.state.clientID,
    }
     createInvoice(InvoiceDict, (response, status) => {
     if (status === 201) {
         this.setState({
             isCreatingInvoice : true,
             invoiceID : response.id
         })
     }
   });
  }
   handlebuttonText(){
      if(window.innerWidth <600){
        this.setState({
          buttonText : '+'
        })
      }
      else{
        this.setState({
          buttonText:  'New Invoice'
        }) 
      }
   }


  render() {

   

    if(this.state.isCreatingInvoice){
      return <Redirect to = {`/client-invoice/${this.state.invoiceID}`}/>
  }


    const renderInvoices = this.state.invoices.map((invoice, index) => {
      let date = new Intl.DateTimeFormat("en-GB").format(
        Date.parse(invoice.timestamp)
      );
      return (
        <div className="invoice-panel" key={index}>
          <Link to={`/client-invoice/${invoice.id}`}>
            <button className="client-invoice" id = 'client-invoice'>
              
              {date} {"|   "} <InvoiceInfo InvoiceID = {invoice.id}/>
            </button>{" "}
          </Link>
        </div>
      );
    });
 

    return (
      <>
        <ClientInformation clientID={this.props.clientID} />
        <div className="navbar-client-invoice">
        <Link to="/clients">
          <button
            className="back-button-nav"
          >
           Back
          </button>
          </Link>
          <button  className = 'create-button' onClick={(event) => this.handleCreateInvoice(event)}>{this.state.buttonText}</button>
        </div>
        {renderInvoices}
      </>
    );
  }
}





export class InvoiceInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Sum: [],
  
      currency: "",
      company_name : ''
    };
  }
 
 
  componentDidMount() {
    const CallbackInfo = (response, status) => {
      if (status === 200) {
      
        this.setState({
      
          currency: response.currency,
          Sum : response.total_with_tax,
          company_name : response.company_name

        });
      
      }
    };
    loadInvoiceInfo(this.props.InvoiceID,CallbackInfo);  
  
  }

  render() {
    return (
      <>
        {this.state.Sum}
        {"  "}
        {this.state.currency}
      
      </>
    );
  }
}






export class ClientInformation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        client: [],
      };
    }
    componentDidMount() {
      const myCallback = (response, status) => {
        if (status === 200) {
          var clientInfo = response.filter((client) => {
            return this.props.clientID === `${client.id}`;
          });
          this.setState({
            client: clientInfo[0]
          });
        }
     
      };
      loadClients(myCallback);
    }
    render() {
  
      return (
        <div className="client-info">
          <div>{this.state.client.company_name}</div>
           <ClientInvoicesSum clientID = {this.props.clientID}/>
          <Link to={`/client-info/${this.props.clientID}`}>
            <button className="client-info-button"> About Client </button>
          </Link>
        </div>
      );
    }
  }