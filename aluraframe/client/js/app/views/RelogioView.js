class RelogioView extends View{

    template(model) {
       
        return model ? `<p class="alert alert-info">${model}</p>` : '<p></p>';
    }

}