import PropTypes from 'prop-types';
import React from 'react';


import './singupform.css'

export class SignupForm extends React.Component {
    state = {
      username: '',
      password: '',
      email: '',
      company_name: '',
      OIB : '',
      address : '',
      phone : '',
      first_name : '',
      last_name : '',
        };
  
    handle_change = e => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState(prevstate => {
        const newState = { ...prevstate };
        newState[name] = value;
        return newState;
      });
    };
  
    render() {

      
      return (
        <div className="singup-panel">
          <div className="singup-text">Sign up</div>
          <form
            className="singup-form"
            onSubmit={(e) => {
              this.props.handle_signup(e, this.state);
            }}
          >
            <label className="label">Username *</label>
            <input
              type="userame"
              name="username"
              value={this.state.username}
              onChange={this.handle_change}
              required={true}
              className="form-control input"
            ></input>
            <label className="label">Password *</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handle_change}
              required={true}
              className="form-control input"
            ></input>
            <label className="label">Email *</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handle_change}
              required={true}
              className="form-control input"
            ></input>
            <label className="label"> Company Name *</label>
            <input
              type="text"
              name="company_name"
              value={this.state.company_name}
              onChange={this.handle_change}
              required={true}
              className="form-control input"
            ></input>
            <label className="label">First Name </label>
            <input
              type="first_name"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handle_change}
              className="form-control input"
            ></input>
            <label className="label">Last Name </label>
            <input
              type="last_name"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handle_change}
              className="form-control input"
            ></input>
            <label className="label"> OIB </label>
            <input
              type="OIB"
              name="OIB"
              value={this.state.OIB}
              onChange={this.handle_change}
              className="form-control input"
            ></input>
            <label className="label"> Address </label>
            <input
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.handle_change}
              className="form-control input"
            ></input>
            <label className="label"> Phone/Mobile </label>
            <input
              type="text"
              name="phone"
              value={this.state.phone}
              onChange={this.handle_change}
              className="form-control input"
            ></input>
            <button className="button-singup" type="submit">
              {" "}
              Sign up
            </button>
            {this.props.badUsername && <h3 className= 'massage'>Username already taken. Please insert new username.</h3>}
          </form>
        </div>
      );
    }
  }
  
SignupForm.propTypes = {
   
    handle_signup: PropTypes.func.isRequired
  };