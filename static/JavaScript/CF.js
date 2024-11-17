
function contatos(){
    const modal=document.getElementById('janela-contato')
    const li=document.getElementsByClassName('li-header')[3]
    if(modal.open){
        li.style.color='white'
        modal.close()

    }
    else{
        li.style.color='#adadad'
       modal.show()
    }
}
function reload(){
    window.location.reload()

}
function changeBackground(){
    //pegar elementos
    const catImage=document.getElementById('backGround-1');
    const hqImage=document.getElementById('backGround-2');
    const vanGoghImage=document.getElementById('backGround-3');
    //pegar estilos
    const estilos=[getComputedStyle(catImage),getComputedStyle(hqImage),getComputedStyle(vanGoghImage)]
    const dir1=estilos[0].getPropertyValue("right")
    const dir2=estilos[1].getPropertyValue("right")
    const dir3=estilos[2].getPropertyValue("right")
    // descobrir ordem (maior, meio,menor)
    let ar=[dir1,dir2,dir3]
    for(let i=0;i<ar.length-1;i++)
    {
        for(let j=i+1;j<ar.length;j++)
        {
            if(ar[j]<ar[i])
            {
                let tmp=ar[i]
                ar[i]=ar[j]
                ar[j]=tmp
            }
        }
    }

    //colocar os elementos em um array
    const imgs=[catImage,hqImage,vanGoghImage];

    //mudar a animação e ativar a animação de cada background
    setTimeout(() =>{
        for(let i=0;i<3;i++)
        {
            imgs[i].style.animation='slide-left 2.5s forwards'
        }
    },100)
    setTimeout(() =>{
        for (let i=0; i<3;i++)
        {

            imgs[i].style.animationPlayState='running';
        }
    },100)

    //esperar o tempo da animção para continuar
    setTimeout(() =>{
        for(let i=0; i<3;i++)
        {

            let stl=getComputedStyle(imgs[i]);
            let rPosition=stl.getPropertyValue("right");

            imgs[i].style.animation='none'

            if(rPosition==ar[2])
            {

                imgs[i].style.right=ar[1];


            }
            else if(rPosition==ar[0])
            {
                imgs[i].style.right=ar[2];
            }
            else if(rPosition==ar[1])
            {
                imgs[i].style.right=ar[0];
            }


        }


    },2500);
   return;
}setInterval(changeBackground,6000);

function changeClassOfFoods(event){
    let categorias=[
        'Bebidas','Cafés','Salgados','Doces'
    ]
    const botao=event.target
    const idButton=botao.id
    const categoria=document.getElementById("cardapio-escolha")
    let indice=0

    for(let i=0;i<categorias.length;i++)
    {
        if(categoria.innerText==categorias[i])
        {
            indice=categorias.indexOf(categorias[i])
            break
        }

    }
    if(idButton=='right')
        if(indice==categorias.length-1)
        {
            categoria.innerText=categorias[0]
        }else{
            categoria.innerText=categorias[indice+=1]
        }
    else{
        if(indice==0)
        {
            categoria.innerText=categorias[categorias.length-1]
        }else{
            categoria.innerText=categorias[indice-=1]
        }
    }

}
function changeImage(event){
        const categoria=document.getElementById("cardapio-escolha")
        if(categoria.innerText=='Bebidas'){
            const nomes={
                'coca':'Coca-Cola 600ml',
                'pepsi':"Pepsi 600ml",
                'guarana':"Guaraná Antarctica 350ml",
                'fanta':'Fanta 350ml',
                'sprite':'Sprite 350ml',
                'coca0':'Coca-Cola Zero 600ml',
                'dell':'Del Valle 600ml',
                'bull':'Red Bull 600ml',
                'monster':'Monster Energy 473ml'
            }
            const valores={
                'coca':'R$8,99',
                'pepsi':"R$7,50",
                'guarana':"R$4,50",
                'fanta':'R$4,50',
                'sprite':'R$4,50',
                'coca0':'R$7,50',
                'dell':'R$8,50',
                'monster':'R$11,99',
                'bull':'R$10,99'
            }
            const infos={
                'coca':'A Coca-Cola é uma bebida carbonatada popular. Seus ingredientes comuns incluem água carbonatada, açúcar (xarope de milho rico em frutose), corante caramelo, ácido fosfórico, sabores naturais e cafeína.',
                'pepsi':'A Pepsi, similar à Coca-Cola, é uma bebida carbonatada composta por água carbonatada, açúcar, corante caramelo, ácido fosfórico, cafeína e sabores naturais e artificiais. Esses ingredientes resultam em uma bebida refrescante com um perfil de sabor único, sendo uma alternativa popular à Coca-Cola.',
                'guarana':' O Guaraná Antarctica, por sua vez, destaca-se por ser uma bebida à base de água carbonatada, açúcar, extrato de guaraná, acidulante ácido cítrico, conservadores e aroma natural de guaraná. A presença do guaraná confere à bebida um sabor distinto e energético, muito apreciado no Brasil.',
                'fanta':'A Fanta, disponível em diversos sabores, geralmente contém água carbonatada, açúcar, concentrado de suco de frutas específicas para cada sabor, acidulante ácido cítrico, antioxidante ácido ascórbico, aroma natural e artificial, além de corantes artificiais.',
                'sprite':' A Sprite é uma bebida gaseificada composta por água carbonatada, açúcar, acidulante ácido cítrico, antioxidante ácido ascórbico, aroma natural e artificial. Ao contrário de algumas outras bebidas, a Sprite não contém cafeína, destacando-se por seu sabor cítrico e refrescante.',
                'coca0':'A Coca-Cola Zero é uma variação da Coca-Cola que oferece um sabor semelhante ao original, mas sem adição de açúcar e calorias. Seus principais ingredientes incluem água carbonatada, corante caramelo, ácido fosfórico, adoçantes artificiais (como aspartame e acesulfame de potássio), aroma natural e artificial, e cafeína.',
                'dell':'Os sucos Del Valle geralmente contêm suco concentrado da fruta específica para o sabor, água, açúcar, acidulante ácido cítrico, estabilizante citrato de sódio e conservadores. A composição pode variar dependendo do sabor do suco, mas esses ingredientes são comuns na maioria deles',
                'bull':'O Red Bull é uma bebida energética que se destaca por sua fórmula energizante, composta principalmente por cafeína e taurina. A cafeína oferece um impulso imediato de energia, enquanto a taurina, um aminoácido natural, contribui para a vigorosa resposta energética.',
                'monster':'A Monster Energy oferece uma experiência energética única, também centrada na cafeína e taurina para estimulação imediata. No entanto, destaca-se pela variedade de sabores intensos e pela inclusão de ingredientes como ginseng, extratos de ervas, BCAAs e suplementos vitamínicos. '
            }

            const botao=event.target
            const marca=botao.id
            const img=document.getElementById('comidas')
            const nome=document.getElementById('nome-produto')
            const valor=document.getElementById("preco-produto")
            const desc=document.getElementById('info-produto')

            img.style.backgroundImage=`url(static/img/banner-${marca}.jpeg)`
            nome.innerText=`${nomes[marca]}`
            valor.innerText=`${valores[marca]}`
            desc.innerText=`${infos[marca]}`


        }
}


