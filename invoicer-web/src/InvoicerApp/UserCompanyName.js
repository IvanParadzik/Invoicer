
import React from 'react'

import {loadUserProfile} from '../ApiLookUps/lookUps'

import './usercompanyname.css'

export class CompanyName extends  React.Component{
    constructor(props){
        super(props);
        this.state = {
            company_name : ''
        } 
    }
    componentDidMount(){
        const MyCallback = (response, status) =>{
            if(status === 200){
                if(response.company_name !==null){
                     this.setState({
                    company_name : response.company_name
                })}
            }
        }
        loadUserProfile(MyCallback)
    }   
  
    
  

    render(){
        
        return <div className = 'company-name'>  {this.state.company_name}   </div>
    }
}