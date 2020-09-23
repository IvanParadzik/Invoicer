import React from 'react';

import {ClientsListView} from './ClientListView';

import {CreateNewClient} from './CommonComponents/CreateNewClient';

import {ClientDetailView} from './ClientDetailView';

import {ClientInfoView} from './ClientInfoView';

import {UserSettings} from './UserSettingsView';

import {CompanyName} from './UserCompanyName';

import {InvoiceListView} from './InvoiceListView';

import {InvoiceSettings} from './InvoiceSettings'
 
import {
  Switch,
  Route,
  Redirect,
  useParams,
} from "react-router-dom";

import { InvoiceDetailView } from './InvoiceDetailView';







//passing Client ID to component
function ClientDetail(props){
  let {clientID} = useParams();
  return (<><CompanyName />
  <ClientDetailView clientID = {clientID}/></>)
}

function ClientInfo(props){
  let {clientID} = useParams();
  return (<><CompanyName />
  <ClientInfoView clientID = {clientID}/></>)
}



function InvoiceDetail(props){
  let {InvoiceID} = useParams();
  return(<><CompanyName />
  <InvoiceDetailView InvoiceID = {InvoiceID}/></>)
}

export function InvoicerAppRouter(props) {
  // Check if company name is changed
 
  
  return (
    <>
    
    <Switch>
    
     
      <Route path = '/user-settings'>
      <CompanyName />
        <UserSettings/>
      </Route>
      <Route path = '/invoice-settings' >
      <CompanyName />
      <InvoiceSettings/>
      
      </Route>

      <Route path = "/client-invoice/:InvoiceID"  children ={<InvoiceDetail/>}/>
      <Route path = "/create-client">
      <CompanyName />
        <CreateNewClient/>
      </Route>

      <Route path = "/client-info/:clientID" children = {<ClientInfo/>}/>

      <Route path="/client/:clientID" children={<ClientDetail/>} />
      <Route path = '/invoices'>
      <CompanyName />
        <InvoiceListView/>
      </Route>
      
      <Route path="/">
        <Redirect to="/clients" />
        <CompanyName />
        <ClientsListView />
      </Route>
    </Switch>
    </>
  );
}





