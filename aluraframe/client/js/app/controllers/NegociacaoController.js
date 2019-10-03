class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        /*Arrow Function is lexical - It's not needed to pass the context, which would be the case if it was a function,
                but it was disabled because it's not recommended keeping this in the model.*/
        //// this._listaNegociacoes = new ListaNegociacoes( model => this._negociacoesView.update(model));
        
        // Now, let's implement a proxy pattern to solve this problem


        this._listaNegociacoes = new Bind(new ListaNegociacoes(),  
                                        new NegociacoesView($('#negociacoesView')), 
                                        'add','clear');
        
        this._mensagem = new Bind(new Mensagem(), 
                                new MensagemView($('#mensagemView')), 
                                'texto' );

        this._relogio = new Relogio();
        
    }
    
    add(event) {
        
        event.preventDefault();
        this._listaNegociacoes.add(this._criaNegociacao());
        this._mensagem.texto = 'Negociation added success';
        this._limpaFormulario();   
    }

    importNegociacoes(){

        /**
         * This importation uses 3 differents endpoints only for didatic purpose.
         * They are included in the same list the objects from this week, from the last week and from the week before the last.
         * They are included together in cascade to avoid asynchronous calls (pyramid of doom)
         * Next commit will solve this
         */
        let service = new NegotiationService();

        service.getWeeksNegotiations( (error, negotiations) => {
            if(error){
                this._mensagem.texto = error;
                return;
            }

            negotiations.forEach(negotiation => this._listaNegociacoes.add(negotiation));

            service.getNegotiationsLastWeek( (error,negotiations) => {
                if(error){
                    this._mensagem.texto = error;
                    return;
                }
    
                negotiations.forEach(negotiation => this._listaNegociacoes.add(negotiation));

                service.getNegotiationsTheWeekBeforeLast( (error,negotiations) => {
                    if(error){
                        this._mensagem.texto = error;
                        return;
                    }
        
                    negotiations.forEach(negotiation => this._listaNegociacoes.add(negotiation));
        
                    this._mensagem.texto = 'Negotiations successfully imported';
        
                });
    
            });

        } );

        

        

    }

    apaga(){

        this._listaNegociacoes.clear();
        this._mensagem.texto="Negotiations Erased";

    }
    
    _criaNegociacao() {
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);    
    }
    
    _limpaFormulario() {
     
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }
}