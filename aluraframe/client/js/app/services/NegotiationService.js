class NegotiationService{

    constructor(){
        this._http = new HttpService();
    }


    //Get negotiations
    getWeeksNegotiations(){


        return new Promise((resolve,reject)=> {
           
            this._http.get('negociacoes/semana')
                        .then(negociacoes => 
                            resolve(negociacoes.map(object => new Negociacao(new Date(object.data), object.quantidade, object.valor) ))
                        )
                        .catch(error => reject(error));
                       

        });

        
    }

    //From the last week
    getNegotiationsLastWeek(){


        return new Promise((resolve,reject)=> {
           
            this._http.get('negociacoes/anterior')
                        .then(negociacoes => 
                            resolve(negociacoes.map(object => new Negociacao(new Date(object.data), object.quantidade, object.valor) ))
                        )
                        .catch(error => reject(error));
                       

        });

       
    }

    //Get negotiations from the week before last week
    getNegotiationsTheWeekBeforeLast(){

        return new Promise((resolve,reject)=> {
           
            this._http.get('negociacoes/retrasada')
                        .then(negociacoes => 
                            resolve(negociacoes.map(object => new Negociacao(new Date(object.data), object.quantidade, object.valor) ))
                        )
                        .catch(error => reject(error));
                       

        });
        
        
    }


}