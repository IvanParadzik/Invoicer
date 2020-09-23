import React from 'react'

import {loadUserProfile, loadUserInfo, editUserInfo, editUserProfile} from '../ApiLookUps/lookUps'


import _ from 'lodash';
import { Redirect, Link } from 'react-router-dom';

import './usersettings.css'

export class UserSettings extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            username: '',
            company_name : '',
            email : '',
            OIB : '',
            address : '',
            first_name: '',
            last_name: '',
            phone: '',
            isEdited: false,
            saveButton: 'Save Changes'
            
        }
        this.handlebuttonText = this.handlebuttonText.bind(this)
    }


    componentDidMount(){
        const MycallbackUser = (response,status)=>{
            if(status === 200){
                this.setState({
                    username : response.username,
                    first_name : response.first_name,
                    last_name : response.last_name,
                    email : response.email,

                })
            }
        }
        loadUserInfo(MycallbackUser)
        const MycallbackProfile = (response,status)=>{
          
            if(status ===200){
                this.setState({
                    company_name : response.company_name,
                    OIB : response.OIB,
                    address : response.address,
                    phone: response.phone,
                })
            }
        }
        loadUserProfile(MycallbackProfile)
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
        let UserData = _.pick(data, ['username', 'first_name','last_name', 'email'])
        let ProfileData = _.pick(data, ['OIB', 'address','company_name', 'phone'])
        editUserInfo(UserData, (response, status) => {
            if (status === 201) {
            }
          });
          editUserProfile(ProfileData, (response, status) => {
            if (status === 201) {
              
            }
          });
        this.setState({
            isEdited: true
        })
   
    }
    
    render(){
        if(this.state.isEdited){
            return <Redirect to = '/' />
        }

        return    (
        <div className="user-settings-panel">
          <div className = 'settings-text'>User Account </div>
            <form
              className="user-settings-form"
              onSubmit={(e) => {
                this.save_changes(e, this.state);
              }}
            >
              <label className="label-settings">First Name </label>
              <input
                type="first_name"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handle_change}
                className="form-control input-setting"
              ></input>
              <label className="label-settings">Last Name </label>
              <input
                type="last_name"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handle_change}
                className="form-control input-setting"
              ></input>
              <label className="label-settings">Email *</label>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handle_change}
                required={true}
                className="form-control input-setting"
              ></input>
              <label className="label-settings"> Company Name *</label>
              <input
                type="text"
                name="company_name"
                value={this.state.company_name}
                onChange={this.handle_change}
                required={true}
                className="form-control input-setting"
              ></input>
              <label className="label-settings"> OIB </label>
              <input
                type="OIB"
                name="OIB"
                value={this.state.OIB}
                onChange={this.handle_change}
                className="form-control input-setting"
              ></input>
              <label className="label-settings"> Address </label>
              <input
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handle_change}
                className="form-control input-setting"
              ></input>
              <label className="label-settings"> Phone/Mobile </label>
              <input
                type="text"
                name="phone"
                value={this.state.phone}
                onChange={this.handle_change}
                className="form-control input-setting"
              ></input>
              <button className="button-save" type="submit">
               {this.state.saveButton}
              </button>
              <Link to="/">
              <button className="button-back"> Back</button>
            </Link>
            </form>
           
          </div>
        );
      }

}