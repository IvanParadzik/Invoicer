import React from "react";


import './loginform.css'

export class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
  };
  handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };
  render() {
    return (
      <div className = 'login-panel'>
        <div className = 'login-text'>Log in</div>
          <form className = 'login-form'
            onSubmit={(e) => {
              this.props.handle_login(e, this.state);
            }}
          >
            <label className = 'label'>Username</label>
            <input
              type="username"
              name="username"
              value={this.state.username}
              onChange={this.handle_change}
              required={true}
              className="form-control input"
            ></input>
            <label className = 'label'>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handle_change}
              required={true}
              className="form-control input"
            ></input>
            <button className= 'button-login' type="submit">Log in</button>
            {this.props.isError && <h3 className= 'massage'> Invalid username or password. Please try again.</h3>}
          </form>
          
         
        </div>
    
    );
  }
}
