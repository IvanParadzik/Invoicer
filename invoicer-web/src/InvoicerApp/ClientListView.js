import React from "react";
import { loadClients ,createInvoice} from "../ApiLookUps/lookUps";

import {ClientInvoicesSum} from './CommonComponents/ClientInvoicesSum'
import {Link, Redirect} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'




import './clientlistview.css'

export class ClientsListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentClients: [],
      Clients: [],
      invoiceID : '',
      isCreatingInvoice : false,
    };
    this.filterInput = React.createRef();
    
  }

  handleFilterClient = (event, clients) => {
    event.preventDefault();
    var filter = [];
    for (let i = 0; i < clients.length; i++) {
      if (
        clients[i].company_name
          .toLowerCase()
          .substring(0, this.filterInput.current.value.length)
          .includes(this.filterInput.current.value.toLowerCase())
      ) {
        filter.push(clients[i]);
      }
    }
    this.setState({
      currentClients: filter,
    });
  };

  handleCreateInvoice(event, clientID){
    event.preventDefault();
    var InvoiceDict = {
        client :clientID ,
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


  componentDidMount() {
    const MyCallBack = (response, status) => {
      if (status === 200) {
        this.setState({
          currentClients: response,
          Clients: response,
        });
      }
    };
    loadClients(MyCallBack);
    
  }

  

  render() {

    if(this.state.isCreatingInvoice){
      return <Redirect to = {`/client-invoice/${this.state.invoiceID}`}/>
  }
  
    const renderClients = this.state.currentClients.map((client, index) => {
      return <div className = 'client' key = {index}> <Client  key = {index} client= {client}/>
             <button className = 'create-invoice-button' onClick = {(event) =>{this.handleCreateInvoice(event,client.id)}} >  +</button>
      </div>;
    });
    return (
      <>
        <NavbarClients
          Clients={this.state.Clients}
          handleFilterClient={this.handleFilterClient}
          filterInput={this.filterInput}
        />
        {renderClients}
      </>
    );
  }
}




export function Client(props) {
  const { client } = props;
  return (
    <>
      
      <Link to = {`client/${client.id}`}>
      <Button 
        className="client-button"
        id="client-button"
      >
        <h1 className = 'company-text'>{client.company_name}</h1>  
        <ClientInvoicesSum className = 'sum-text' clientID = {client.id}/>
      </Button>
      </Link> 
 </>
  );
}


export class NavbarClients extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      buttonText : 'New Client'
    }
    this.handlebuttonText = this.handlebuttonText.bind(this)


  }

  componentDidMount(){
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

  handlebuttonText(){
    if(window.innerWidth <600){
      this.setState({
        buttonText : '+'
      })
    }
    else{
      this.setState({
        buttonText:  'New Client'
      }) 
    }
 }  



  render(){
  
  return (
    <div className="navbar-clients">
      <ButtonGroup className="button-group-clients">
        <Link
          to="/create-client"
          id="button-create-client"
          className="button-create-client"
        >
          {this.state.buttonText}
        </Link>
        <DropdownButton
          className="dropdown-clients"
          id="dropdown-clients"
          title="Clients"
        >
          <Dropdown.Item as={Link} to="/invoices/" id = "item-invoice" className="item-invoice">
            Invoices
          </Dropdown.Item>
        </DropdownButton>
        <input  
          placeholder="Search"
          className="searchFiled"
          ref={this.props.filterInput}
          onChange={(event) => {
            this.props.handleFilterClient(event, this.props.Clients);
          }}
        ></input>
      </ButtonGroup>
    </div>
  );
        }
}
