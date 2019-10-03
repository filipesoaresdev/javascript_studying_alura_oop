class NegotiationService{
    //Get negotiations
    getWeeksNegotiations(){


        return new Promise((resolve,reject)=> {
            let xhr = new XMLHttpRequest();

            xhr.open('GET','negociacoes/semana');
    
            xhr.onreadystatechange = () => {
                
                //4: completed request
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(
                        JSON.parse(xhr.responseText)
                            .map(object => new Negociacao(new Date(object.data), object.quantidade, object.valor) )
                        );
                        
                    } else {
                      reject('It was not possible to get the negotiations from the server');
                    }
                }
            };
    
    
            xhr.send();

        });

        
    }

    //From the last week
    getNegotiationsLastWeek(){

        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();

            xhr.open('GET','negociacoes/anterior'); //translation: negotiations/last
    
            xhr.onreadystatechange = () => {
                
                //4: completed request
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(
                        JSON.parse(xhr.responseText)
                            .map(object => new Negociacao(new Date(object.data), object.quantidade, object.valor) )
                        );
                        
                    } else {
                        reject('It was not possible to get the last week negotiations from the server');
                    }
                }
            };
    
    
            xhr.send();


        });
       
    }

    //Get negotiations from the week before last week
    getNegotiationsTheWeekBeforeLast(){

        return new Promise((resolve,reject)=>{
            let xhr = new XMLHttpRequest();

            xhr.open('GET','negociacoes/retrasada'); 

            xhr.onreadystatechange = () => {
                
                //4: completed request
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(
                        JSON.parse(xhr.responseText)
                            .map(object => new Negociacao(new Date(object.data), object.quantidade, object.valor) )
                        );
                        
                    } else {
                        reject('It was not possible to get the negotiations of the week before the last week');
                    }
                }
            };


            xhr.send();
        });
        
        
    }


}