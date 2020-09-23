import React from 'react'

import {loadItems, createItem, editItem,removeItem,loadInvoiceInfo,deleteInvoice} from '../ApiLookUps/lookUps'

import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'
import {Redirect, Link} from 'react-router-dom'

import './invoice-detail.css'



function currencyFormat(num) {
  const numfloat = parseFloat(num)
  return   numfloat.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


export class InvoiceDetailView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            showModal : false, 
            inModal : '',
            isChange: false,
            item : [],
            tax : '',
            total: '',
            total_with_tax :'',
            currency: '',
            quantity: '',
            tax_value : '',
            clientID : '',
            isRemoved: false,
            textButton : {
              addButton: 'Add Item',
              finishButton: 'Finish Invoice',
              deleteButton: 'Delete Invoice'
            }

        }
        this.handlebuttonText = this.handlebuttonText.bind(this)
    }


    
   
  

    componentDidMount(){
        const MyCallbackItems = (response,status) =>{
            if(status === 200){
                this.setState({
                    items : response
                })
            }
        }
        loadItems(this.props.InvoiceID, MyCallbackItems)

        const MyCallback = (response,status)=>{
            if( status ===200){
                this.setState({
                    total : response.total,
                    total_with_tax: response.total_with_tax,
                    currency : response.currency,
                    tax : response.tax,
                    tax_value : response.tax_value,
                    clientID : response.clientID,
                    quantity: response.quantity,
                })
            }
        }
        loadInvoiceInfo(this.props.InvoiceID,MyCallback)


        window.addEventListener('resize', this.handlebuttonText)
        if(window.innerWidth <600){
          this.setState({
            textButton : {
              addButton: '+',
              finishButton: 'Finish',
              deleteButton: 'Delete'
            }    
        })     
    }
  }


  handlebuttonText(){
    if(window.innerWidth <600){
      this.setState({
        textButton : {
          addButton: '+',
          finishButton: 'Finish',
          deleteButton: 'Delete'
        }    
    })
    }
    else{
      this.setState({
        textButton : {
          addButton: 'Add Item',
          finishButton: 'Finish Invoice',
          deleteButton: 'Delete Invoice'
        }    
    }) 
    }
 }  


  
  


    componentWillUnmount(){
      window.removeEventListener('resize', this.handlebuttonText)
    }

    componentDidUpdate(){
        if(this.state.isChange){
            const MyCallbackItems = (response,status) =>{
                if(status === 200){
                    this.setState({
                        items : response,
                        isChange : false
                    })
                }
            }
            loadItems(this.props.InvoiceID, MyCallbackItems)

            const MyCallback = (response,status)=>{
                if( status ===200){
                    this.setState({
                        total : response.total,
                        total_with_tax: response.total_with_tax,
                        tax_value : response.tax_value
                    })
                }
            }
            loadInvoiceInfo(this.props.InvoiceID,MyCallback)
            this.setState({
              
              isChange : false
          })
        }
      
    }
    handleRemoveInvoice = () =>{
        deleteInvoice(this.props.InvoiceID,(response,status)=>{})
        this.setState({
            isRemoved : true
        })
    }


    handleRemoveItem = (itemID) =>{
        removeItem(itemID, (response,status)=>{})
        this.setState({
            isChange: true,
        })
    }
    handleChanges = () =>{
        this.setState({
            isChange : true,
        })
    }
    handleCloseModal = ()=>{
        this.setState({
            showModal: false
        })
    }

    handleModalCreate = ()=>{
        this.setState({
            inModal : 'creating',
            showModal : true
        })
    }
    handleModalEdit = (item) =>(
        this.setState({
            inModal : 'editing',
            showModal : true,
            item : item,
        })
    )

    

    render(){
        if(this.state.isRemoved){
            return <Redirect   to={`/client/${this.state.clientID}`}/>
        }
        const renderItems = this.state.items.map((item, index) => {
          return (
            
            <tbody className = '' key={index}>
                <tr>
              <td className= 'table-slice'>{item.product_name.toUpperCase()}</td>
              <td className= 'table-slice'>{currencyFormat(item.price)}</td>
              <td className= 'table-slice'>{item.quantity}</td>
              <td className= 'table-slice'>{currencyFormat(item.quantity * item.price)}</td>
             <td> <Button className = 'button-edit' id = 'button-edit'onClick={() => {this.handleModalEdit(item)}}> Edit </Button></td>
           <td>  <Button className = 'button-remove' id = 'button-remove' onClick={() => {this.handleRemoveItem(item.id)}}> X </Button></td>
  
              </tr>
              
            </tbody>
          );
        });

        return (
          <div className="item-panel">
            <div className="item-navbar">
              <Button
                className="button-add"
                id="button-add"
                onClick={this.handleModalCreate}
              >
                {this.state.textButton.addButton}
              </Button>
            </div>

            <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title className="item-text">
                  {" "}
                  {this.state.inModal === "creating" && "Creating item"}
                  {this.state.inModal === "editing" && "Editing item"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {this.state.inModal === "creating" && (
                  <CreateItem
                    InvoiceID={this.props.InvoiceID}
                    handleCloseModal={this.handleCloseModal}
                    handleChanges={this.handleChanges}
                    currency={this.state.currency}
                    quantity={this.state.quantity}
                  />
                )}
                {this.state.inModal === "editing" && (
                  <EditItem
                    InvoiceID={this.props.InvoiceID}
                    handleCloseModal={this.handleCloseModal}
                    handleChanges={this.handleChanges}
                    item={this.state.item}
                    currency={this.state.currency}
                    quantity={this.state.quantity}
                  />
                )}
              </Modal.Body>
            </Modal>
            <table className="table-items">
              <thead>
                <tr className="table-label">
                  <th className="one-label">Product Name</th>
                  <th className="one-label">Price ({this.state.currency}) </th>
                  <th className="one-label">
                    Quantity ({this.state.quantity})
                  </th>
                  <th className="one-label">Value ({this.state.currency})</th>
                </tr>
              </thead>

              {renderItems}
            </table>

            <table id="table-info">
              <thead>
                <tr className="table-label">
                  <th className="one-label-info">
                    {" "}
                    SubTotal ({this.state.currency})
                  </th>
                  <th className="one-label-info">
                    {" "}
                    TAX ({this.state.tax} % {this.state.currency}){" "}
                  </th>
                  <th className="one-label-info">
                    Total ({this.state.currency} )
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-info-label" id='table-info-label"'>
                  <td className="info-label">{this.state.total}</td>
                  <td className="info-label">{this.state.tax_value}</td>
                  <td className="info-label">{this.state.total_with_tax}</td>
                </tr>
              </tbody>
            </table>

            <Link to={`/client/${this.state.clientID}`}>
              <Button className="button-finish" id="button-finish">
                {this.state.textButton.finishButton}
              </Button>
            </Link>
            <div>
              <Button
                className="button-remove-invoice"
                id="button-remove-invoice"
                onClick={this.handleRemoveInvoice}
              >
                {this.state.textButton.deleteButton}
              </Button>
            </div>
          </div>
        );
    }
}



class CreateItem extends React.Component{
    state ={
        product_name : '',
        price : '',
        quantity : '',
        invoice : this.props.InvoiceID
    }
    handle_change = e =>{
        const name = e.target.name;
        const value = e.target.value;

        this.setState(prevstate => {
          const newState = { ...prevstate };
          newState[name] = value;
          return newState;
        });
    }
    handleCreate = (e, data) =>{
        e.preventDefault()     

        createItem(data, (response,status)=>{
          this.props.handleChanges()
        })
               

    }
    render(){
            return (
              <div className="modal-form">
                <form
                  onSubmit={(e) => {
                    this.handleCreate(e, this.state);
                  }}
                >
                  <label className="label">Product Name </label>
                  <input
                    type="text"
                    name="product_name"
                    value={this.state.product_name}
                    onChange={this.handle_change}
                    className="form-control input"
                  ></input>
                  <label className="label">Price ({this.props.currency})</label>
                  <input
                    type="number"
                    name="price"
                  
                    value={this.state.price}
                    onChange={this.handle_change}
                    className="form-control input"
                  ></input>
                  <label className="label">Quantity ({this.props.quantity})</label>
                  <input
                    type="number"
                    name="quantity"
                    value={this.state.quantity}
                    onChange={this.handle_change}
                    required={true}
                    className="form-control input"
                  ></input>
                  <Button
                  className = 'modal-button'
                  id = 'modal-button'  
                    onClick={() => {
                      this.props.handleCloseModal();
                    }}
                    type="submit"
                  >
                    {" "}
                    Create Item
                  </Button>
                </form>
              </div>
            );
    }
}


class EditItem extends React.Component{
    state ={
        product_name : this.props.item.product_name,
        price : this.props.item.price,
        quantity : this.props.item.quantity,
        invoice : this.props.InvoiceID
    }
    handle_change = e =>{
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
          const newState = { ...prevstate };
          newState[name] = value;
          return newState;
        });
    }
    handleEdit = (e, data) =>{
        e.preventDefault()
        editItem(data, this.props.item.id,(response,status)=>{
          this.props.handleChanges()
        })
      
    }
    render(){
            return (
              <div className="modal-form">
                <form
                  onSubmit={(e) => {
                    this.handleEdit(e, this.state);
                  }}
                >
                  <label className="label">Product Name </label>
                  <input
                    type="text"
                    name="product_name"
                    value={this.state.product_name}
                    onChange={this.handle_change}
                    className="form-control input"
                  ></input>
                  <label className="label">Price ({this.props.currency})</label>
                  <input
                    type="number"
                    name="price"
                    
                    value={this.state.price}
                    onChange={this.handle_change}
                    className="form-control input"
                  ></input>
                  <label className="label">Quantity ({this.props.quantity}) </label>
                  <input
                    type="number"
                    name="quantity"
                  
                    value={this.state.quantity}
                    onChange={this.handle_change}
                    required={true}
                    className="form-control input"
                  ></input>
                  <Button
                   className ='modal-button'
                   id = 'modal-button'  
                    onClick={() => {
                      this.props.handleCloseModal();
                    }}
                    type="submit"
                  >
                    {" "}
                    Edit Item
                  </Button>
                </form>
              </div>
            );
    }
}



