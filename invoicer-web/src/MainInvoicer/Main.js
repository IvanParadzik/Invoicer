
import React from 'react';
import _ from 'lodash';

import {
    Switch,
    Route,
    
  } from "react-router-dom";

import {createUserProfile} from '../ApiLookUps/lookUps'
import {Home} from './Home'
import {LoginForm} from './LoginForm'
import {MainNavbar} from './Navbar'
import {SignupForm} from './SingupForm'

import {InvoicerAppRouter} from '../InvoicerApp/InvoicerAppRouter'



export class MainInvoicer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      
        logged_in: localStorage.getItem('token') ? true : false,
        username: '',
    
        isError: false,
        badUsername: false,
        

      };
    }

   


    componentDidMount() {
      if (this.state.logged_in) {
        fetch('http://178.62.11.88/api/current_user/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        })
          .then(res => {
            if(res.status === 401){
              this.setState({
                logged_in: false,
                username: ''
              });  
              alert('You need to log in again!')
            }
            else{
              res.json()
              .then(json => {     
                this.setState({ username: json.username ,
                                });
              });
            }
          })    
      }
    }
  
    handle_login = (e, data) => { 
      e.preventDefault();
    
      fetch('http://178.62.11.88/token-auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',     
        },
        body: JSON.stringify(data)
      })
      
        .then(res => res.json())
        .then(json => {
          try {
            localStorage.setItem('token', json.token);
            this.setState({
              logged_in: true,
              username: json.user.username, 
              isError:false,  
            });
          } catch (error) {
             this.setState({
               isError : true
             }) 
          }
        });
    };
 
  
    handle_signup = (e, data) => {
      let userData = _.pick(data, ['username', 'password', 'email', 'first_name', 'last_name'])
      //let company_name = _.pick(data, ['company_name'])
  

      e.preventDefault();
      fetch('http://178.62.11.88/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      .then(res => {
        if(res.status === 400){
          this.setState({
            badUsername : true,
          })
        
        }
        else {
          res.json()
          .then(json => {

            localStorage.setItem('token', json.token);
            this.setState({
              logged_in: true,
              username: json.username,
              badUsername : false,
            });
            let profileData = _.pick(data, ['address', 'OIB', 'company_name', 'phone']) 
            profileData.user = json.id
            createUserProfile(profileData ,(response,status)=>{
            })
        })}})

    };

    handle_logout = () => {
      localStorage.removeItem('token');
      this.setState({ logged_in: false, username: '' });
    };

    render() {
  
      const publicSwitch =(
           <Switch>
            <Route path="/login">
              <LoginForm
                handle_login={this.handle_login}
                isError = {this.state.isError}
              />
            </Route>
            <Route path="/signup">
              <SignupForm
                handle_signup={this.handle_signup}
                badUsername = {this.state.badUsername}
              />
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
      )
      const privateSwitch = (
        //this part is in InvoiceApp Folder
           <InvoicerAppRouter  company_name = {this.state.company_name}/>
      )
      return (
        
        <>
       
          <MainNavbar
            className = 'main-navbar'
            logged_in={this.state.logged_in}
            handle_logout={this.handle_logout}
          />
        
          {!this.state.logged_in && publicSwitch}
          {this.state.logged_in && privateSwitch}
        </>
      );
    }
  }

