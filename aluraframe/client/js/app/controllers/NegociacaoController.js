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


        this._listaNegociacoes = ProxyFactory.create(new ListaNegociacoes(), ['add','clear'], model => this._negociacoesView.update(model)  );

        
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);

        
        this._mensagem = ProxyFactory.create(new Mensagem(),['texto'], model => this._mensagemView.update(model) );
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);

        this._relogio = new Relogio();
        
    }
    
    add(event) {
        
        event.preventDefault();
        this._listaNegociacoes.add(this._criaNegociacao());
        this._mensagem.texto = 'Negociação added com sucesso';
        this._limpaFormulario();   
    }

    apaga(){

        this._listaNegociacoes.clear();
        this._mensagem.texto="Negociações Apagadas";

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