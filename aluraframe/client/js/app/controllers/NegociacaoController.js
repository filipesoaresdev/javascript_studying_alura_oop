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

        let self = this;

        this._listaNegociacoes = new Proxy(new ListaNegociacoes(),{

            get(target, prop, receiver){

                if(['add','clear'].includes(prop) && typeof(target[prop]) == typeof(Function) ){

                    return function() {
                        Reflect.apply(target[prop],target, arguments);
                        self._negociacoesView.update(target);
                    }
                }

                return Reflect.get(target,prop,receiver);

            }
        });

        
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);

        
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);

        this._relogio = new Relogio();
        
    }
    
    add(event) {
        
        event.preventDefault();
        this._listaNegociacoes.add(this._criaNegociacao());
        
        this._mensagem.texto = 'Negociação addda com sucesso';
        this._mensagemView.update(this._mensagem);
        
        this._limpaFormulario();   
    }

    apaga(){

        this._listaNegociacoes.clear();

        this._mensagem.texto="Negociações Apagadas";
        this._mensagemView.update(this._mensagem);
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