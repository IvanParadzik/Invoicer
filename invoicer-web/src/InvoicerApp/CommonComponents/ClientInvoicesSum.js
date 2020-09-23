import React from "react";
import {loadClinetInvocesSum} from '../../ApiLookUps/lookUps'





export class ClientInvoicesSum extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      sum : 0,
      currency: ''
    }
  }
  componentDidMount(){
    const MyCallBack = (response, status)=>{
      if (status === 200){
          this.setState({
            sum: response.sum,
            currency: response.currency
          })
        
      }
    }
    loadClinetInvocesSum(this.props.clientID, MyCallBack)
  }
  render(){
    return <><h3 className = {this.props.className}>Total: {this.state.sum} {this.state.currency}</h3>
    </>
  }
}
