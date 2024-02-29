document.addEventListener('DOMContentLoaded', function(){
    const button = document.querySelector('.confirm-button')
    const checkbox = document.querySelector('.checkbox-db')
    checkbox.addEventListener('change', function(){
        if(checkbox.checked){
            if(button.classList.contains('disabled')){
                button.classList.remove('disabled')
            }
        }else if(!checkbox.checked){
            if(!button.classList.contains('disabled')){
                button.classList.add('disabled')
            }
        }
    })
    button.addEventListener('click', function(){

        window.location.href = '/api/clear_fields_database'

    })
})