/* ---------------- Contato ---------------- */
function contatos(){
    const modal=document.getElementById('janela-contato')
    const botao=document.getElementById('botao-contato')
    if(modal.open){
        modal.close()
        botao.setAttribute('aria-expanded','false')
    }
    else{
        modal.show()
        botao.setAttribute('aria-expanded','true')
    }
}
document.addEventListener('click',(e)=>{
    const modal=document.getElementById('janela-contato')
    if(modal.open && !e.target.closest('#item-contato')) contatos()
})
document.addEventListener('keydown',(e)=>{
    if(e.key==='Escape' && document.getElementById('janela-contato').open) contatos()
})

/* ---------------- Utilidades ---------------- */
const CUPONS={ 'HXW2':0.10, 'CAFE':0.15 }
const NOMES_PLANO={ comum:'Comum', premium:'Premium', vip:'VIP' }
const reais=(v)=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})
const soDigitos=(s)=>s.replace(/\D/g,'')

function mascaraCpf(v){
    return soDigitos(v).slice(0,11)
        .replace(/(\d{3})(\d)/,'$1.$2')
        .replace(/(\d{3})(\d)/,'$1.$2')
        .replace(/(\d{3})(\d{1,2})$/,'$1-$2')
}
function mascaraTelefone(v){
    const d=soDigitos(v).slice(0,11)
    if(d.length<=2) return d.length ? `(${d}` : ''
    if(d.length<=6) return `(${d.slice(0,2)}) ${d.slice(2)}`
    if(d.length<=10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`
    return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`
}
function cpfValido(v){
    const c=soDigitos(v)
    if(c.length!==11 || /^(\d)\1{10}$/.test(c)) return false
    for(const t of [9,10]){
        let soma=0
        for(let i=0;i<t;i++) soma+=Number(c[i])*(t+1-i)
        const dig=(soma*10)%11%10
        if(dig!==Number(c[t])) return false
    }
    return true
}
function idade(dataISO){
    const n=new Date(dataISO+'T00:00')
    const h=new Date()
    let a=h.getFullYear()-n.getFullYear()
    if(h.getMonth()<n.getMonth() || (h.getMonth()===n.getMonth() && h.getDate()<n.getDate())) a--
    return a
}

/* ---------------- Monta um formulário por plano ---------------- */
const modelo=document.getElementById('modelo-form')

document.querySelectorAll('.secao-cadastro').forEach((secao)=>{
    const plano=secao.dataset.plano
    const preco=Number(secao.dataset.preco)
    const copia=modelo.content.cloneNode(true)

    // ids únicos por plano (name -> name-comum) para os labels continuarem funcionando
    copia.querySelectorAll('[id]').forEach(el=>{
        el.id=el.id.endsWith('-erro') ? el.id.replace(/-erro$/,`-${plano}-erro`) : `${el.id}-${plano}`
    })
    copia.querySelectorAll('label[for]').forEach(el=>el.htmlFor=`${el.htmlFor}-${plano}`)
    copia.querySelectorAll('input:not([type=radio]):not([type=submit])').forEach(el=>{
        el.setAttribute('aria-describedby',`${el.id}-erro`)
    })
    copia.querySelector('input[type=submit]').value=`cadastrar no ${NOMES_PLANO[plano]}`

    secao.appendChild(copia)
    ligarFormulario(secao.querySelector('form'),plano,preco)
})

function ligarFormulario(form,plano,preco){
    const campo=(nome)=>form.elements[nome]
    const msg=(nome)=>form.querySelector(`#${campo(nome).id}-erro`)
    const total=form.querySelector('.total-plano')

    // não deixa escolher data no futuro
    campo('birth').max=new Date().toISOString().slice(0,10)

    function erro(nome,texto){
        const el=msg(nome)
        campo(nome).setAttribute('aria-invalid',texto ? 'true' : 'false')
        if(el){
            el.textContent=texto || (el.dataset.padrao ?? '')
            el.classList.toggle('erro',!!texto)
            el.classList.toggle('dica',!texto)
        }
        return !texto
    }
    form.querySelectorAll('small').forEach(s=>s.dataset.padrao=s.textContent)

    const regras={
        name:(v)=>v.trim().split(/\s+/).length<2 ? 'Digite nome e sobrenome.' : '',
        birth:(v)=>!v ? 'Informe sua data de nascimento.' : idade(v)<12 ? 'Cadastro a partir de 12 anos.' : idade(v)>120 ? 'Confira a data.' : '',
        cpf:(v)=>!cpfValido(v) ? 'CPF inválido. Confira os números.' : '',
        email:(v)=>!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? 'Email inválido. Ex.: nome@email.com' : '',
        senha:(v)=>v.length<6 ? 'A senha precisa de pelo menos 6 caracteres.' : '',
        senha2:(v)=>v!==campo('senha').value ? 'As senhas não são iguais.' : '',
        tel:(v)=>soDigitos(v).length<10 ? 'Telefone com DDD, ex.: (11) 98765-4321' : ''
    }
    const validar=(nome)=>erro(nome,regras[nome](campo(nome).value))

    // valida ao sair do campo; depois do primeiro erro, revalida enquanto digita
    Object.keys(regras).forEach(nome=>{
        campo(nome).addEventListener('blur',()=>{ if(campo(nome).value) validar(nome) })
        campo(nome).addEventListener('input',()=>{
            if(campo(nome).getAttribute('aria-invalid')==='true') validar(nome)
        })
    })
    campo('cpf').addEventListener('input',(e)=>{ e.target.value=mascaraCpf(e.target.value) })
    campo('tel').addEventListener('input',(e)=>{ e.target.value=mascaraTelefone(e.target.value) })

    function atualizarTotal(){
        const codigo=campo('cupom').value.trim().toUpperCase()
        campo('cupom').value=codigo
        const desconto=CUPONS[codigo]
        const aviso=msg('cupom')
        if(!codigo){
            aviso.textContent=''
            total.textContent=reais(preco)
        }else if(desconto){
            aviso.textContent=`Cupom aplicado: ${desconto*100}% de desconto`
            aviso.className='ok'
            total.innerHTML=`<s>${reais(preco)}</s> ${reais(preco*(1-desconto))}`
        }else{
            aviso.textContent=codigo.length===4 ? 'Cupom não encontrado.' : ''
            aviso.className='dica'
            total.textContent=reais(preco)
        }
    }
    campo('cupom').addEventListener('input',atualizarTotal)
    atualizarTotal()

    form.addEventListener('submit',async(e)=>{
        e.preventDefault()
        const resultados=Object.keys(regras).map(validar)
        if(resultados.includes(false)){
            form.querySelector('[aria-invalid="true"]').focus()
            return
        }
        const botao=form.querySelector('input[type=submit]')
        botao.disabled=true
        const dados=Object.fromEntries(new FormData(form))
        delete dados.senha2
        dados.plano=plano
        const r=await Auth.cadastrar(dados)
        botao.disabled=false
        if(!r.ok){
            erro('email',r.erro)
            campo('email').focus()
            return
        }
        mostrarAlerta(dados.email,plano)
    })
}

/* ---------------- Alerta de sucesso ---------------- */
function mostrarAlerta(email,plano){
    const alerta=document.getElementById('alert-email')
    document.getElementById('email-detalhe').textContent=
        `Plano ${NOMES_PLANO[plano]} cadastrado! Mandamos a confirmação para ${email}. Voltando para o site...`
    alerta.show()
    setTimeout(()=>{ window.location.href='index.html' },3500)
}
