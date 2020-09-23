import './createnewclient.css'

import {createClient} from '../../ApiLookUps/lookUps'
//import _ from 'lodash';
import React from 'react'
import {Link,Redirect} from 'react-router-dom'


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
      clientID : '',
      isSubmit : false

        };
  }
 
  // let withoutClinetID = _.pick(newState ,[  'email','company_name','OIB','address',  'phone', 'first_name', 'last_name'])
  // withoutClinetID[name] = value;
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
            this.setState({
              clientID : response.id,
              isSubmit : true
            })
          }
        })

    }
  
    render() {
      if (this.state.isSubmit) {
        return <Redirect to={`/client/${this.state.clientID}`} />;
      }
      return (
        <div className="create-client-panel">
          <div className="new-client-text">Creating New Client</div>
          <form
            className="create-client-form"
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
            
    
            <Link to = '/clients'>
            <button
              className="cancel-button"
            >
              Cancel
            </button>
            </Link>
          </form>
        
        
        </div>
      );
    }
  }
  