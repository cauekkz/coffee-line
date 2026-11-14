// Dados do cardápio da Coffe Line.
// Cada categoria tem uma lista de itens; "img" é a miniatura e "banner" a imagem grande da direita.
const CARDAPIO = {
    'Bebidas': [
        { id: 'coca', nome: 'Coca-Cola 600ml', preco: 8.99, img: 'static/img/cardapio/coca.svg',
          info: 'A Coca-Cola é uma bebida carbonatada popular. Seus ingredientes comuns incluem água carbonatada, açúcar (xarope de milho rico em frutose), corante caramelo, ácido fosfórico, sabores naturais e cafeína.' },
        { id: 'pepsi', nome: 'Pepsi 600ml', preco: 7.50, img: 'static/img/cardapio/pepsi.svg',
          info: 'A Pepsi, similar à Coca-Cola, é uma bebida carbonatada composta por água carbonatada, açúcar, corante caramelo, ácido fosfórico, cafeína e sabores naturais e artificiais. Uma alternativa refrescante com um perfil de sabor único.' },
        { id: 'guarana', nome: 'Guaraná Antarctica 350ml', preco: 4.50, img: 'static/img/cardapio/guarana.svg',
          info: 'O Guaraná Antarctica é feito com água carbonatada, açúcar, extrato de guaraná, ácido cítrico e aroma natural de guaraná. A presença do guaraná confere um sabor distinto e energético, muito apreciado no Brasil.' },
        { id: 'fanta', nome: 'Fanta 350ml', preco: 4.50, img: 'static/img/cardapio/fanta.svg',
          info: 'A Fanta, disponível em diversos sabores, geralmente contém água carbonatada, açúcar, concentrado de suco de frutas, ácido cítrico, ácido ascórbico, aromas e corantes.' },
        { id: 'sprite', nome: 'Sprite 350ml', preco: 4.50, img: 'static/img/cardapio/sprite.svg',
          info: 'A Sprite é uma bebida gaseificada de água carbonatada, açúcar, ácido cítrico, ácido ascórbico e aromas. Não contém cafeína e se destaca pelo sabor cítrico e refrescante.' },
        { id: 'coca0', nome: 'Coca-Cola Zero 600ml', preco: 7.50, img: 'static/img/cardapio/coca0.svg',
          info: 'A Coca-Cola Zero oferece um sabor semelhante ao original, sem açúcar e sem calorias. Leva água carbonatada, corante caramelo, ácido fosfórico, adoçantes (aspartame e acesulfame de potássio), aromas e cafeína.' },
        { id: 'dell', nome: 'Del Valle 600ml', preco: 8.50, img: 'static/img/cardapio/dell.svg',
          info: 'Os sucos Del Valle contêm suco concentrado da fruta, água, açúcar, ácido cítrico, citrato de sódio e conservadores. A composição varia de acordo com o sabor.' },
        { id: 'bull', nome: 'Red Bull 250ml', preco: 10.99, img: 'static/img/cardapio/bull.svg',
          info: 'O Red Bull é uma bebida energética com fórmula à base de cafeína e taurina: a cafeína dá um impulso imediato de energia e a taurina, um aminoácido natural, completa a resposta energética.' },
        { id: 'monster', nome: 'Monster Energy 473ml', preco: 11.99, img: 'static/img/cardapio/monster.svg',
          info: 'A Monster Energy também é centrada em cafeína e taurina, mas se destaca pela variedade de sabores intensos e por ingredientes como ginseng, extratos de ervas e vitaminas.' }
    ],
    'Cafés': [
        { id: 'espresso', nome: 'Espresso Clássico', preco: 6.50, img: 'static/img/cardapio/espresso.svg',
          info: 'Curto, encorpado e com crema dourada. Blend da casa de grãos 100% arábica do Sul de Minas, torra média, extraído na hora.' },
        { id: 'cappuccino', nome: 'Cappuccino Gatinho', preco: 12.90, img: 'static/img/cardapio/cappuccino.svg',
          info: 'O nosso queridinho: espresso, leite vaporizado e uma espuma cremosa desenhada em forma de gato pelo barista. Polvilhado com canela, se você quiser.' },
        { id: 'latte-estrelado', nome: 'Latte Noite Estrelada', preco: 14.90, img: 'static/img/cardapio/latte-estrelado.svg',
          info: 'Inspirado na tela de Van Gogh: latte com baunilha e um toque de flor de ervilha-borboleta que deixa a espuma azulada, finalizado com latte art em redemoinho.' },
        { id: 'mocha', nome: 'Mocha Quadrinho', preco: 13.50, img: 'static/img/cardapio/mocha.svg',
          info: 'Espresso, chocolate meio amargo e leite vaporizado, com calda de chocolate desenhando os quadros de uma HQ na espuma.' },
        { id: 'cafe-gelado', nome: 'Café Gelado', preco: 11.00, img: 'static/img/cardapio/cafe-gelado.svg',
          info: 'Cold brew extraído por 16 horas, servido com gelo, leite e um fio de doce de leite. Perfeito para ler um volume inteiro de mangá.' },
        { id: 'macchiato', nome: 'Macchiato Caramelo', preco: 12.00, img: 'static/img/cardapio/macchiato.svg',
          info: 'Camadas de leite, calda de caramelo salgado e espresso, montadas no copo para você ver cada parte antes de misturar.' }
    ],
    'Salgados': [
        { id: 'pao-de-queijo', nome: 'Pão de Queijo (3 un.)', preco: 7.50, img: 'static/img/cardapio/pao-de-queijo.svg',
          info: 'Receita mineira com queijo canastra meia-cura: casquinha crocante por fora e bem puxa-puxa por dentro. Sai do forno de hora em hora.' },
        { id: 'coxinha', nome: 'Coxinha de Frango', preco: 7.00, img: 'static/img/cardapio/coxinha.svg',
          info: 'Massa de batata, recheio de frango desfiado com catupiry e empanada na farinha panko. Clássico da casa desde o primeiro dia.' },
        { id: 'croissant', nome: 'Croissant Presunto e Queijo', preco: 11.50, img: 'static/img/cardapio/croissant.svg',
          info: 'Croissant amanteigado de fermentação natural, folhado na casa, recheado com presunto e queijo e aquecido na hora.' },
        { id: 'misto-quente', nome: 'Misto Quente', preco: 10.00, img: 'static/img/cardapio/misto-quente.svg',
          info: 'Pão de forma artesanal na chapa com manteiga, presunto e muçarela derretida. Simples, honesto e perfeito com um espresso.' },
        { id: 'empada', nome: 'Empada de Frango', preco: 7.50, img: 'static/img/cardapio/empada.svg',
          info: 'Massa podre que desmancha na boca, recheio de frango com azeitona e milho. Receita do Daniel, nosso chef.' },
        { id: 'quiche', nome: 'Quiche de Alho-poró', preco: 12.00, img: 'static/img/cardapio/quiche.svg',
          info: 'Fatia generosa de quiche com alho-poró, creme e queijo gruyère sobre massa amanteigada. Acompanha folhas verdes.' }
    ],
    'Doces': [
        { id: 'brownie', nome: 'Brownie', preco: 9.00, img: 'static/img/cardapio/brownie.svg',
          info: 'Chocolate 70% cacau, casquinha craquelada e miolo úmido. Peça quentinho com uma bola de sorvete por mais R$ 5,00.' },
        { id: 'bolo-cenoura', nome: 'Bolo de Cenoura', preco: 8.50, img: 'static/img/cardapio/bolo-cenoura.svg',
          info: 'Fatia de bolo de cenoura fofinho com cobertura de brigadeiro que escorre pela lateral. Gosto de casa de vó.' },
        { id: 'cheesecake-morango', nome: 'Cheesecake de Morango', preco: 13.00, img: 'static/img/cardapio/cheesecake-morango.svg',
          info: 'Base crocante de biscoito, creme de cream cheese assado e calda de morangos frescos feita na casa.' },
        { id: 'cookie', nome: 'Cookie Gotas de Chocolate', preco: 6.00, img: 'static/img/cardapio/cookie.svg',
          info: 'Bordas crocantes, centro macio e muitas gotas de chocolate meio amargo. Combina com qualquer café do cardápio.' },
        { id: 'brigadeiro', nome: 'Brigadeiro Gourmet', preco: 3.50, img: 'static/img/cardapio/brigadeiro.svg',
          info: 'Feito com chocolate belga e finalizado com granulado de chocolate. Pequeno no tamanho, gigante no sabor.' },
        { id: 'donut', nome: 'Donut Confeitado', preco: 8.00, img: 'static/img/cardapio/donut.svg',
          info: 'Massa brioche frita na hora, cobertura de morango e confeitos coloridos. Saído direto de um quadrinho.' }
    ]
};
