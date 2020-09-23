



export function lookUp(method, endpoint, callback,data){
    let jsonData;
  
    if(data){
      jsonData = JSON.stringify(data)
    }
   
    const xhr = new XMLHttpRequest()  
  
    const url = `http://207.154.218.15/api${endpoint}`
  
    xhr.responseType = "json"
    xhr.open(method, url)
    
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xhr.setRequestHeader("Authorization", "JWT " + localStorage.getItem('token'))

  
    xhr.onload = function(){
      callback(xhr.response, xhr.status)
      console.log(xhr.response)
    }
    xhr.onerror = function(e){
      console.log(e)
      callback({"message": "The request was an error"}, 400)
    }
    xhr.send(jsonData)
  
  }
    