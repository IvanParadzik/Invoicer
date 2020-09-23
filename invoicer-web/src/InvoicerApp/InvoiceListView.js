import React from 'react'



import {
    loadUserInvoices, 
    loadInvoiceInfo, 
    loadClients,
    createClient,
    createInvoice, 
} from '../ApiLookUps/lookUps'



import ButtonGroup from 'react-bootstrap/ButtonGroup'

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Modal from 'react-bootstrap/Modal'
import {Redirect,Link} from 'react-router-dom'

import './invoicelistview.css'

export class InvoiceListView extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          showCreate : false,
      }
      this.handleShowPick = this.handleShowPick.bind(this)
      this.handleClose = this.handleClose.bind(this)
  }
  handleShowPick(){
      this.setState({
          showCreate : true
      })
  }
  handleClose(){
      this.setState({
          showCreate : false
      })
  }

  render(){
      return (
        <>
          <NavbarInvoice handleShowPick={this.handleShowPick} />
          <PickCreateClientModal
            showCreate={this.state.showCreate}
            handleClose={this.handleClose}
          />
          
          <InvoicesList/>
        </>
      );
  }
}





export class NavbarInvoice extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          isInvoices : true,
          buttonText : 'New Invoice'
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
            buttonText:  'New Invoice'
          }) 
        }
     }  

      handleChange(event){
        event.preventDefault()
        this.setState({
            isInvoices : false
        });
      }
    render(){
        if(!this.state.isInvoices){  
            return <Redirect to ='/clients/'/>
          }
        return (
          <div className="navbar-invoices">
            <ButtonGroup className="button-group-invoices">
              <button  id="button-create-invoice" className="button-create-invoice" onClick = { this.props.handleShowPick} >
                {this.state.buttonText}
              </button>
              <DropdownButton
                className="dropdown-invoices"
                id="dropdown-invoices"
                title="Invoices"
              >
                <Dropdown.Item className = 'item-client' onClick={(event) => this.handleChange(event)}>
                  Clients
                </Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
          </div>
        );  

    }
}




class PickCreateClientModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      company_name: "Select Client",
      clientID: [],
      invoiceID : 0,
      isCreatingClient: false,
      isCreatingInvoice: false,
      isBadSelect : false,
    
    };
    this.handlePick = this.handlePick.bind(this);
    this.handleShowCreate = this.handleShowCreate.bind(this);
    this.handleHideCreate = this.handleHideCreate.bind(this)
    this.handleCreateInvoice = this.handleCreateInvoice.bind(this)
  }

  componentDidMount() {
    const MyCallback = (response, status) => {
      if (status === 200) {
         this.setState({
          clients: response,
        });
      }
    };
    loadClients(MyCallback);
  }
  
   handleCreateInvoice(){
       var InvoiceDict = {
           client : this.state.clientID,
       }
        createInvoice(InvoiceDict, (response, status) => {
        if (status === 201) {
            this.setState({
                isCreatingInvoice : true,
                invoiceID : response.id,
                isBadSelect : false,
            })    
        }
        else if(status === 400){
          this.setState({
            isBadSelect : true,
            
        })   
        }
      
      });
   
}

  handleShowCreate(){

      this.setState({
          isCreatingClient : true,
      })
  }
  handleHideCreate(){
   
      this.setState({
          isCreatingClient: false,
      })
  }

  handlePick(name, id) {

    this.setState({
      company_name: name,
      clientID: id,
    });
  }

 handleClose = ()=>{
  this.setState({
    isBadSelect: false,
  });
 }

  render() {
     
    const renderClients = this.state.clients.map((client, index) => {
      return (
        <div key={index}>
          <Dropdown.Item
            key={index}
            onClick={() =>
              this.handlePick(client.company_name, client.id)
            }
          >
            {client.company_name}
          </Dropdown.Item>
        </div>
      );
    });

    if(this.state.isCreatingInvoice){
        return <Redirect to = {`/client-invoice/${this.state.invoiceID}`}/>
    }
    
    return (
      <>
        <Modal
       
          show={this.props.showCreate}
          onHide={this.props.handleClose}
          animation={false}
        >
          <Modal.Header closeButton onClick ={this.handleClose}>
            <Modal.Title className = 'title-modal'>Select or create client to continue</Modal.Title>
          </Modal.Header>
          <Modal.Body  >
            <Dropdown>
              <Dropdown.Toggle className= 'pick-client-button' id = 'pick-client-button' >
                {this.state.company_name}
              </Dropdown.Toggle>
              <div>
              {!this.state.isCreatingClient && (
                <button
                  onClick={(event) => this.handleShowCreate(event)}
                  className ='create-client-modal'
                >
              
                  Create Client
                </button>
              )}
              {this.state.isCreatingClient && (
                <CreateNewClient
               
                  handleHideCreate={this.handleHideCreate}
                  handlePick = {this.handlePick}
                />
              )}
              {this.state.isBadSelect && <h3 className = 'alert-select'>Please select or create client</h3>}
              </div>
              <Dropdown.Menu>{renderClients}</Dropdown.Menu>
            </Dropdown>
          </Modal.Body>
          <Modal.Footer>
            <button className = 'create-invoice-modal' onClick={this.handleCreateInvoice}>
             Continue
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}





export class CreateNewClient extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      company_name: '',
      OIB : '',
      address : '',
      phone : '',
      first_name : '',
      last_name : '',
        };
  }
 
    handle_change = e => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState(prevstate => {
        const newState = { ...prevstate };
        
        newState[name] = value;
        return newState;
      });
    };
    handleCreate(event, data){
        event.preventDefault()
        createClient(data, (response,status)=>{
          if(status === 201){
            this.props.handlePick(response.company_name, response.id)
            this.props.handleHideCreate()
          
          }
        })

    }
  
    render() {
      return (
        <div className="create-client-panel-modal">
          <div className="new-client-text">Creating New Client</div>
          <form
          
            onSubmit={(event) => {
              this.handleCreate(event, this.state);
            }}
          >
            <label className="label-create">Company Name *</label>
            <input
              type="text"
              name="company_name"
              value={this.state.company_name}
              onChange={this.handle_change}
              required={true}
              className="form-control input-create"
            ></input>
            <label className="label-create">First Name</label>
            <input
              type="text"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handle_change}
              className="form-control input-create"
            ></input>
            <label className="label-create">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handle_change}
              className="form-control input-create"
            ></input>
            <label className="label-create"> Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handle_change}
              className="form-control input-create"
            ></input>
            <label className="label-create">Address </label>
            <input
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.handle_change}
              className="form-control input-create"
            ></input>
            <label className="label-create">OIB </label>
            <input
              type="text"
              name="OIB"
              value={this.state.OIB}
              onChange={this.handle_change}
              className="form-control input-create"
            ></input>
            <label className="label-create"> Phone/Mobile </label>
            <input
              type="text"
              name="phone"
              value={this.state.phone}
              onChange={this.handle_change}
              className="form-control input-create"
            ></input>
          
            <button className="button-create-new-client" type="submit">
              {" "}
              Create Client
            </button>
            
    
     
            <button
              className="cancel-button"
              onClick = {this.props.handleHideCreate}
            >
              Cancel
            </button>
       
          </form>
        
        
        </div>
      );
    }
  }
  



export class InvoicesList extends React.Component{  
    constructor(props){
        super(props);
        this.state = {
            invoices: []
           
        }
    }
    componentDidMount(){
        const MyCallback = (response, status) =>{
            if( status === 200){
                this.setState({
                    invoices : response
                })
            }
        }
        loadUserInvoices(MyCallback)

    }
    render(){
        const renderInvoices = this.state.invoices.map((invoice, index) => {
          let date = new Intl.DateTimeFormat("en-GB").format(
            Date.parse(invoice.timestamp)
          );

          return (
            
            <div className = 'invoice-panel' key = {index}>
              <Link to = {`/client-invoice/${invoice.id}`}>
              <button className = 'invoice'>
              {date}  
              {' | '}
               
               <InvoiceInfo  InvoiceID={invoice.id} />
               </button>
               </Link>
               </div>
           
          );
        });
        return <>
     
        {renderInvoices}
       
       
     
        
        </>
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
     {this.state.company_name}{'  |  '}
        {this.state.Sum} {this.state.currency}
       
      </>
    );
  }
}










