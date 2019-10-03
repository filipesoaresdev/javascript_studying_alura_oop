class NegotiationService{
    //Get negotiations
    getWeeksNegotiations(callback){
        let xhr = new XMLHttpRequest();

        xhr.open('GET','negociacoes/semana');

        xhr.onreadystatechange = () => {
            
            //4: completed request
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    callback(null,
                    JSON.parse(xhr.responseText)
                        .map(object => new Negociacao(new Date(object.data), object.quantidade, object.valor) )
                    );
                    
                } else {
                  callback('It was not possible to get the response from the server');
                }
            }
        };


        xhr.send();
    }

    //From the last week
    getNegotiationsLastWeek(callback){
        let xhr = new XMLHttpRequest();

        xhr.open('GET','negociacoes/anterior'); //translation: negotiations/last

        xhr.onreadystatechange = () => {
            
            //4: completed request
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    callback(null,
                    JSON.parse(xhr.responseText)
                        .map(object => new Negociacao(new Date(object.data), object.quantidade, object.valor) )
                    );
                    
                } else {
                  callback('It was not possible to get the response from the server');
                }
            }
        };


        xhr.send();
    }

    //Get negotiations from the week before last week
    getNegotiationsTheWeekBeforeLast(callback){
        let xhr = new XMLHttpRequest();

        xhr.open('GET','negociacoes/retrasada'); 

        xhr.onreadystatechange = () => {
            
            //4: completed request
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    callback(null,
                    JSON.parse(xhr.responseText)
                        .map(object => new Negociacao(new Date(object.data), object.quantidade, object.valor) )
                    );
                    
                } else {
                  callback('It was not possible to get the response from the server');
                }
            }
        };


        xhr.send();
    }


}