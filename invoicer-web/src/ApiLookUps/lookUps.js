import {lookUp} from './mainfunction'

//GET ALL USERS


// USER INFORMATION (DJANGO MODEL USER)

//loading user informations
export function loadUserInfo(callback){
  let endpoint = '/user-info/'
  lookUp('GET', endpoint, callback)
}

//edit user informations
export function editUserInfo(data,callback){
  let endpoint = '/user-info/'
  lookUp('PUT', endpoint, callback, data)
}


// USER PROFILE LOOKUPS

// creating user profile (adding additional informations about user)
export function createUserProfile(data,callback){
    let endpoint = '/user-profile/'
    lookUp('POST', endpoint, callback,data)
  }


//loading user profile informations
export function loadUserProfile(callback){
  let endpoint = '/user-profile/'
  lookUp('GET', endpoint, callback)
}

//editing user profile infromations
export function editUserProfile(data,callback){
  let endpoint = '/user-profile/'
  lookUp('PUT', endpoint, callback,data)
}



//INVOICE SETTINGS LOOKUPS

//loading invoice setttings
export function loadInvoiceSettings(callback){
  let endpoint = '/invoice-settings/'
  lookUp('GET', endpoint, callback)
}

//editing invoice setttings
export function editInvoiceSettings(data,callback){
  let endpoint = '/invoice-settings/'
  lookUp('PUT', endpoint, callback,data)
}





//CLIENTS LOOKUPS

// loading all user Clients
export function loadClients(callback){
  let endpoint = '/user-clients/'
  lookUp('GET', endpoint, callback)
}

//create New Client
export function createClient(data, callback){
  let endpoint = '/user-clients/'
  lookUp('POST',endpoint,callback, data)
}




//load ClientInvocesSum 

export function loadClinetInvocesSum(clientID,callback){
  let endpoint = `/client-invoices-sum/${clientID}`
  lookUp('GET', endpoint,callback)

}


//INVOICE LOOKUPS

//load Client Invoices
export function loadClientInvocies(callback, clientID){
  let endpoint = `/client-invoices/${clientID}`
  lookUp('GET', endpoint, callback)
}

//creating Client Invoice
export function createInvoice(data, callback){
  let endpoint = '/user-invoices/'
  lookUp('POST', endpoint, callback, data)
}

//load User Invocies 
export function loadUserInvoices(callback){
  let endpoint = "/user-invoices/"
  lookUp('GET', endpoint, callback)
}

//remove inovice
export function deleteInvoice(invoiceID, callback){
  let endpoint = `/delete-invoice/${invoiceID}`
  lookUp('DELETE', endpoint, callback)

}



//CLIENT INFO LOOKUPS  

//load Client Info 
export function loadClientInfo(callback,clientID){
  let endpoint = `/client-detail/${clientID}`
  lookUp('GET', endpoint, callback)
}

//edit Client Info
export function editClientInfo(clientID, data, callback){
  let endpoint = `/client-detail/${clientID}`
  lookUp('PUT', endpoint, callback,data)
}

//delete Client
export function deleteClient( clientID,callback){
  let endpoint = `/client-detail/${clientID}`
  lookUp('DELETE', endpoint, callback)
}


// ADDITIONAL LOOKUPS
//load Invoice Sum (one invoice)
export function loadInvoiceInfo(invoiceID, callback){
  let endpoint = `/invoice-sum-client/${invoiceID}`
  lookUp('GET', endpoint, callback)
}



//ITEMS LOOKUPS

//load invoice items
export function loadItems(invoiceID, callback){
  let endpoint = `/invoice-items/${invoiceID}`
  lookUp('GET',endpoint, callback)
}


// create Item
export function removeItem(item_id,callback){
  let endpoint =  `/item-detail/${item_id}`
  lookUp('DELETE', endpoint,callback )
}


export function editItem(data,item_id,callback){
  let endpoint =  `/item-detail/${item_id}`
  lookUp('PUT', endpoint,callback,data )
}

export function  createItem(data, callback){
  let endpoint = `/create-item/`
  lookUp('POST', endpoint,callback,data)
}