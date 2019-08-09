
//This class has the purpose to train and learn about lexical attribute of the arrow function
class Relogio{
    constructor(){
        this._segundos=0;

        this._relogioView = new RelogioView(document.querySelector('#relogio'));
        console.log(this);
        
       // setInterval(() => {
       //     this._relogioView.update(++this._segundos);
       // }, 1000);       
    }
}