document.addEventListener('DOMContentLoaded', function(){
    approveBtn = document.querySelector('.approve')
    deleteBtn = document.querySelector('.delete')

    approveBtn.addEventListener('click', function(){
        window.location.href = '/approve'
    })
    deleteBtn.addEventListener('click', function(){
        window.location.href = '/dbclear'
    })
})