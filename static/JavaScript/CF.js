const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------------- Contato (janela do cabeçalho) ---------------- */
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
// fecha a janela de contato ao clicar fora dela ou apertar Esc
document.addEventListener('click',(e)=>{
    const modal=document.getElementById('janela-contato')
    if(modal && modal.open && !e.target.closest('#item-contato')){
        contatos()
    }
})
document.addEventListener('keydown',(e)=>{
    const modal=document.getElementById('janela-contato')
    if(e.key==='Escape' && modal && modal.open) contatos()
})

function reload(){
    window.scrollTo({top:0,behavior:reduzirMovimento?'auto':'smooth'})
}

/* ---------------- Banner (slides do topo) ---------------- */
const slides=[
    document.getElementById('backGround-1'),
    document.getElementById('backGround-2'),
    document.getElementById('backGround-3')
]
const pontos=document.querySelectorAll('.ponto-slide')
let slideAtual=0
let timerSlide=null
let fimDaAnimacao=null

function posicionarSlides(animar){
    slides.forEach((slide,i)=>{
        // posição relativa ao slide atual: 0 = na tela, 1 = próximo, 2 = depois
        const pos=(i-slideAtual+slides.length)%slides.length
        const offset=pos===slides.length-1 && animar ? -100 : pos*100
        slide.style.transition=animar && !reduzirMovimento ? 'transform 1.4s ease-in-out' : 'none'
        slide.style.transform=`translateX(${offset}%)`
        slide.setAttribute('aria-hidden',pos!==0)
    })
    pontos.forEach((p,i)=>p.setAttribute('aria-current',i===slideAtual))
}

function irParaSlide(indice){
    slideAtual=(indice+slides.length)%slides.length
    posicionarSlides(true)
    // depois da animação, o slide que saiu pela esquerda vai pro fim da fila (sem animação)
    clearTimeout(fimDaAnimacao)
    fimDaAnimacao=setTimeout(()=>posicionarSlides(false),1450)
    reiniciarTimer()
}

function changeBackground(){
    irParaSlide(slideAtual+1)
}

function reiniciarTimer(){
    clearInterval(timerSlide)
    if(!reduzirMovimento) timerSlide=setInterval(changeBackground,6000)
}

pontos.forEach((p,i)=>p.addEventListener('click',()=>irParaSlide(i)))
posicionarSlides(false)
reiniciarTimer()

/* ---------------- Cardápio ---------------- */
const categorias=Object.keys(CARDAPIO)
let categoriaAtual=0
const formatarPreco=(v)=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})

function changeClassOfFoods(event){
    const direcao=event.currentTarget.id==='right' ? 1 : -1
    categoriaAtual=(categoriaAtual+direcao+categorias.length)%categorias.length
    montarCardapio()
}

function montarCardapio(){
    const nome=categorias[categoriaAtual]
    const itens=CARDAPIO[nome]
    document.getElementById('cardapio-escolha').innerText=nome

    const grade=document.getElementById('grade-iguarias')
    grade.innerHTML=''
    itens.forEach((item,i)=>{
        const botao=document.createElement('button')
        botao.type='button'
        botao.className='iguarias'
        botao.id=item.id
        botao.setAttribute('aria-label',`${item.nome}, ${formatarPreco(item.preco)}`)
        botao.addEventListener('click',()=>changeImage(i))

        const img=document.createElement('img')
        img.src=item.img
        img.alt=''
        img.loading='lazy'
        if(!item.banner) img.className='pixel'
        botao.appendChild(img)
        grade.appendChild(botao)
    })
    changeImage(0)
}

function changeImage(indice){
    const item=CARDAPIO[categorias[categoriaAtual]][indice]
    const banner=document.getElementById('comidas')

    document.querySelectorAll('.iguarias').forEach((b,i)=>b.setAttribute('aria-pressed',i===indice))

    if(item.banner){
        banner.classList.remove('banner-pixel')
        banner.style.backgroundImage=`url(${item.banner})`
    }else{
        // itens sem foto usam o sprite em pixel art sobre o fundo de rabiscos
        banner.classList.add('banner-pixel')
        banner.style.backgroundImage=`url(${item.img}), url(static/img/background-black.png)`
    }
    banner.setAttribute('aria-label',item.nome)

    document.getElementById('nome-produto').innerText=item.nome
    document.getElementById('preco-produto').innerText=formatarPreco(item.preco)
    document.getElementById('info-produto').innerText=item.info

    const info=document.querySelector('.infoIguaria')
    if(!reduzirMovimento){
        info.classList.remove('trocando')
        void info.offsetWidth
        info.classList.add('trocando')
    }
}

montarCardapio()

/* ---------------- Rodapé ---------------- */
document.getElementById('ano-atual').innerText=new Date().getFullYear()
