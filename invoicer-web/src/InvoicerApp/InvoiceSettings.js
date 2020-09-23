import React from 'react'



import {loadInvoiceSettings, editInvoiceSettings} from '../ApiLookUps/lookUps'
import { Redirect, Link } from 'react-router-dom'



import './invoicesettings.css'
import _ from 'lodash'


export class InvoiceSettings extends React.Component{
     constructor(props){
       super(props);
       this.state = {
        tax :  '',
        currency : '',
        quantity: '',
        isEditing: false,
        saveButton : 'Save Changes'
        

      }
    this.handlebuttonText = this.handlebuttonText.bind(this)
    }
 
    componentDidMount(){
        const MyCallback = (response, status) =>{
            if(status === 200){
             
                this.setState({
                    tax : response.tax,
                    currency : response.currency,
                    quantity : response.quantity
                })
            }
        }
        loadInvoiceSettings(MyCallback)
        window.addEventListener('resize', this.handlebuttonText)
        if(window.innerWidth <600){
          this.setState({
            saveButton : 'Save'
          })
        }
    }
      
  componentWillUnmount(){
    window.removeEventListener('resize', this.handlebuttonText)
  }
  handlebuttonText(){
    if(window.innerWidth <600){
      this.setState({
        saveButton : 'Save'
      })
    }
    else{
      this.setState({
        saveButton:  'Save Changes'
      }) 
    }
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


    save_changes = (event, data) =>{
   
        event.preventDefault()
        let newData = _.pick(data, ['tax', 'currency', 'quantity'])
        editInvoiceSettings(newData, (response, status) =>{
                if(status === 201){
                }
            })
        this.setState({
                isEditing : true,
            })
    }



    render(){
        if(this.state.isEditing){
            return <Redirect to = '/'/>
        }
        return  (<div className="invoice-settings-panel">
          <div className = 'settings-text-invoice'>Invoice Settings</div>
          <div className="invoice-settings-form">
            <form
              onSubmit={(e) => {
                this.save_changes(e, this.state);
              }}
            >
              <label className="label-settings-invoice"> Tax(%)</label>
              <input
                type="text"
                name="tax"
                value={this.state.tax}
                onChange={this.handle_change}
                required={true}
                className="form-control input-settings-invoice"
              ></input>
              <label className="label-settings-invoice">Currency </label>
              <input
                type="text"
                name="currency"
                value={this.state.currency}
                onChange={this.handle_change}
                required={true}
                className="form-control input-settings-invoice"
              ></input>
              <label className="label-settings-invoice">Quantity </label>
              <input
                type="text"
                name="quantity"
                value={this.state.quantity}
                onChange={this.handle_change}
                required={true}
                className="form-control input-settings-invoice"
              ></input>
              <button className="button-save-invoice" type="submit">
                {this.state.saveButton}
              </button>
             
            </form>
     
          
            <Link to="">
              <button className="button-back-invoice">
                Back
              </button>
            </Link>
          </div>
        </div>);
    }
}