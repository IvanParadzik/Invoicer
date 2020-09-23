import React from 'react'

import {loadClientInfo, editClientInfo, deleteClient} from '../ApiLookUps/lookUps'

import './CommonComponents/createnewclient.css'
import './clientinfoview.css'


import _ from 'lodash'
import { Redirect, Link } from 'react-router-dom';




export class ClientInfoView extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            company_name : '',
            email : '',
            OIB : '',
            address : '',
            first_name: '',
            last_name: '',
            phone: '',
            isEdited: false,
            isDeleted : false,  
            saveButton : 'Save Changes'       
        }
        this.handlebuttonText = this.handlebuttonText.bind(this)
    }
    componentDidMount(){
        const Mycallback = (response,status)=>{
            if(status === 200){
          
                this.setState({
                    first_name : response.first_name,
                    last_name : response.last_name,
                    email : response.email,
                    OIB : response.OIB,
                    address: response.address,
                    phone : response.phone,
                    company_name : response.company_name,
                })
            }
        }
        loadClientInfo( Mycallback,this.props.clientID)  
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

    save_changes =(e, data) =>{
        e.preventDefault()
        let newData = _.pick(data,['first_name', 'last_name', 'phone', 'company_name', 'email', 'OIB', 'address'])
        editClientInfo(this.props.clientID, newData , (response,status) =>{
            if(status === 200){
            }
        }
        )
        this.setState({
            isEdited: true
        })
    }
    handleDeleteClient = () => {
        deleteClient(this.props.clientID, (response, status) => {
          if (status === 204) {
              this.setState({
                  isDeleted : true,
              })
          }
        });
      };
    
    render(){
        if(this.state.isEdited){
            return <Redirect to = {`/client/${this.props.clientID}`}/>
        }
        if(this.state.isDeleted){
            return <Redirect to = '/'/>
        }
        return    (
        <div className="create-client-panel">
          <div className = 'new-client-text'> Client Informations  </div>
          <div className="create-client-form">
            <form
              onSubmit={(e) => {
                this.save_changes(e, this.state);
              }}
            >
              <label className="label-create"> Company Name *</label>
              <input
                type="text"
                name="company_name"
                value={this.state.company_name}
                onChange={this.handle_change}
                required={true}
                className="form-control input-create"
              ></input>
              <label className="label-create">First Name </label>
              <input
                type="first_name"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handle_change}
                className="form-control input-create"
              ></input>
              <label className="label-create">Last Name </label>
              <input
                type="last_name"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handle_change}
                className="form-control input-create"
              ></input>
              <label className="label-create">Email </label>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handle_change}
                className="form-control input-create"
              ></input>
              <label className="label-create"> OIB </label>
              <input
                type="OIB"
                name="OIB"
                value={this.state.OIB}
                onChange={this.handle_change}
                className="form-control input-create"
              ></input>
              <label className="label-create"> Address </label>
              <input
                type="text"
                name="address"
                value={this.state.address}
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
              <button className="button-save-changes" type="submit">
                {this.state.saveButton}
              </button>
            </form>
            <div>
            <Link to={`/client/${this.props.clientID}`}>
              <button className="button-back-info"> Back</button>
            </Link>
            </div>
            <div>
            <button className="delete-button" onClick={() => {
            this.handleDeleteClient();
        }} > Delete Client</button>
            </div>
          </div>
        </div>
        );
      }  
}