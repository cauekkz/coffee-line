
function contatos(){
    const modal=document.getElementById('janela-contato')
    const li=document.getElementsByClassName('li-header')[1]
    if(modal.open){
        li.style.color='white'
        modal.close()

    }
    else{
        li.style.color='#adadad'
       modal.show()
    }
}
