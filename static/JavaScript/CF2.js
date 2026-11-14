/* ---------------- Login ---------------- */
const dialogLogin=document.getElementById('dialog-form')
const formLogin=document.getElementById('form-login')
const erroLogin=document.getElementById('erro-login')

function abrirForm(){
    erroLogin.innerText=''
    dialogLogin.showModal()
    document.getElementById('contact').focus()
}
function fecharForm(){
    dialogLogin.close()
}

// clicar no fundo escuro fora do formulário fecha o login
dialogLogin.addEventListener('click',(e)=>{
    if(e.target===dialogLogin) fecharForm()
})

formLogin.addEventListener('submit',async (e)=>{
    e.preventDefault()
    const email=document.getElementById('contact').value
    const senha=document.getElementById('senha').value
    if(!email || !senha){
        erroLogin.innerText='Preencha email e senha.'
        return
    }
    const botao=document.getElementById('button-logar')
    botao.disabled=true
    const r=await Auth.entrar(email,senha)
    botao.disabled=false
    if(!r.ok){
        erroLogin.innerText=r.erro
        document.getElementById('senha').select()
        return
    }
    formLogin.reset()
    fecharForm()
    atualizarUsuario()
})

document.querySelectorAll('.imgform').forEach(b=>b.addEventListener('click',()=>{
    erroLogin.innerText='Login social chegando em breve! Por enquanto, use email e senha.'
}))

/* ---------------- Usuário logado no cabeçalho ---------------- */
function atualizarUsuario(){
    const usuario=Auth.usuarioAtual()
    const botaoEntrar=document.getElementById('botao-entrar')
    const saudacao=document.getElementById('saudacao')
    if(usuario){
        const primeiroNome=(usuario.nome||'').split(' ')[0]
        saudacao.hidden=false
        saudacao.querySelector('span').innerText=`Olá, ${primeiroNome}`
        botaoEntrar.hidden=true
    }else{
        saudacao.hidden=true
        botaoEntrar.hidden=false
    }
}
function sair(){
    Auth.sair()
    atualizarUsuario()
}

atualizarUsuario()
