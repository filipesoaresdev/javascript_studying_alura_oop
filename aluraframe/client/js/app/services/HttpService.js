
//Class HttpService to a reusable code
class HttpService{


    get(url){

        return new Promise((resolve,reject)=> {

            let xhr = new XMLHttpRequest();

            xhr.open('GET',url);
    
            xhr.onreadystatechange = () => {
                
                //4: completed request
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText));
                        
                    } else {
                      reject(xhr.responseText);
                    }
                }
            };
    
    
            xhr.send();

        });


    }

    post(url,data){


        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open('POST',url);
            xhr.setRequestHeader("Content-Type","application/json");
    
            xhr.onreadystatechange = () => {
                
                //4: completed request
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText));
                        
                    } else {
                      reject(xhr.responseText);
                    }
                }
            };
    
    
            xhr.send(JSON.stringify(data));

        });

    }

}