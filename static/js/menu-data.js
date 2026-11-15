// Coffee Line menu data.
// Each category has a list of items; "img" is the thumbnail and "banner" the large image on the right.
const MENU = {
    'Drinks': [
        { id: 'coke', name: 'Coca-Cola 600ml', price: 8.99, img: 'static/img/menu/coke.svg',
          info: 'Coca-Cola is a popular carbonated soft drink. Its usual ingredients are carbonated water, sugar (high-fructose corn syrup), caramel color, phosphoric acid, natural flavors and caffeine.' },
        { id: 'pepsi', name: 'Pepsi 600ml', price: 7.50, img: 'static/img/menu/pepsi.svg',
          info: 'Much like Coca-Cola, Pepsi is made of carbonated water, sugar, caramel color, phosphoric acid, caffeine and natural and artificial flavors. A refreshing alternative with its own flavor profile.' },
        { id: 'guarana', name: 'Guaraná Antarctica 350ml', price: 4.50, img: 'static/img/menu/guarana.svg',
          info: 'Guaraná Antarctica is made with carbonated water, sugar, guarana extract, citric acid and natural guarana flavor. The guarana gives it a distinct, energizing taste that Brazilians love.' },
        { id: 'fanta', name: 'Fanta 350ml', price: 4.50, img: 'static/img/menu/fanta.svg',
          info: 'Available in many flavors, Fanta usually contains carbonated water, sugar, fruit juice concentrate, citric acid, ascorbic acid, flavorings and colorings.' },
        { id: 'sprite', name: 'Sprite 350ml', price: 4.50, img: 'static/img/menu/sprite.svg',
          info: 'Sprite is a soda made of carbonated water, sugar, citric acid, ascorbic acid and flavorings. It has no caffeine and stands out for its crisp, citrusy taste.' },
        { id: 'coke-zero', name: 'Coca-Cola Zero 600ml', price: 7.50, img: 'static/img/menu/coke-zero.svg',
          info: 'Coca-Cola Zero tastes like the original with no sugar and no calories. It has carbonated water, caramel color, phosphoric acid, sweeteners (aspartame and acesulfame potassium), flavorings and caffeine.' },
        { id: 'del-valle', name: 'Del Valle 600ml', price: 8.50, img: 'static/img/menu/del-valle.svg',
          info: 'Del Valle juices contain fruit juice concentrate, water, sugar, citric acid, sodium citrate and preservatives. The recipe varies by flavor.' },
        { id: 'red-bull', name: 'Red Bull 250ml', price: 10.99, img: 'static/img/menu/red-bull.svg',
          info: 'Red Bull is an energy drink built around caffeine and taurine: caffeine gives an instant energy boost and taurine, a naturally occurring amino acid, rounds out the effect.' },
        { id: 'monster', name: 'Monster Energy 473ml', price: 11.99, img: 'static/img/menu/monster.svg',
          info: 'Monster Energy is also centered on caffeine and taurine, but stands out for its range of bold flavors and extras like ginseng, herbal extracts and vitamins.' }
    ],
    'Coffees': [
        { id: 'espresso', name: 'Classic Espresso', price: 6.50, img: 'static/img/menu/espresso.svg',
          info: 'Short, full-bodied, with a golden crema. Our house blend of 100% arabica beans from southern Minas Gerais, medium roast, pulled to order.' },
        { id: 'cappuccino', name: 'Kitty Cappuccino', price: 12.90, img: 'static/img/menu/cappuccino.svg',
          info: "Everyone's favorite: espresso, steamed milk and a creamy foam drawn into a cat by the barista. Dusted with cinnamon if you like." },
        { id: 'starry-night-latte', name: 'Starry Night Latte', price: 14.90, img: 'static/img/menu/starry-night-latte.svg',
          info: "Inspired by Van Gogh's painting: a vanilla latte with a touch of butterfly pea flower that turns the foam blue, finished with swirl latte art." },
        { id: 'mocha', name: 'Comic Book Mocha', price: 13.50, img: 'static/img/menu/mocha.svg',
          info: 'Espresso, dark chocolate and steamed milk, with chocolate syrup drawing comic book panels on the foam.' },
        { id: 'iced-coffee', name: 'Iced Coffee', price: 11.00, img: 'static/img/menu/iced-coffee.svg',
          info: 'Cold brew steeped for 16 hours, served over ice with milk and a drizzle of dulce de leche. Perfect for reading a whole volume of manga.' },
        { id: 'macchiato', name: 'Caramel Macchiato', price: 12.00, img: 'static/img/menu/macchiato.svg',
          info: 'Layers of milk, salted caramel sauce and espresso, built in the glass so you can see each part before stirring.' }
    ],
    'Savory': [
        { id: 'cheese-bread', name: 'Cheese Bread (3 pcs)', price: 7.50, img: 'static/img/menu/cheese-bread.svg',
          info: 'Pão de queijo the Minas Gerais way, with semi-aged canastra cheese: crispy on the outside and nice and chewy inside. Fresh out of the oven every hour.' },
        { id: 'coxinha', name: 'Chicken Coxinha', price: 7.00, img: 'static/img/menu/coxinha.svg',
          info: 'Potato dough filled with shredded chicken and catupiry cream cheese, coated in panko. A house classic since day one.' },
        { id: 'croissant', name: 'Ham and Cheese Croissant', price: 11.50, img: 'static/img/menu/croissant.svg',
          info: 'Buttery sourdough croissant, laminated in-house, filled with ham and cheese and warmed to order.' },
        { id: 'ham-cheese-toastie', name: 'Ham and Cheese Toastie', price: 10.00, img: 'static/img/menu/ham-cheese-toastie.svg',
          info: 'Artisan sandwich bread grilled with butter, ham and melted mozzarella. Simple, honest and perfect with an espresso.' },
        { id: 'chicken-pie', name: 'Chicken Pie', price: 7.50, img: 'static/img/menu/chicken-pie.svg',
          info: 'Melt-in-your-mouth shortcrust pastry with a chicken, olive and corn filling. A recipe by Daniel, our chef.' },
        { id: 'quiche', name: 'Leek Quiche', price: 12.00, img: 'static/img/menu/quiche.svg',
          info: 'A generous slice of quiche with leeks, cream and gruyère cheese on a buttery crust. Served with greens.' }
    ],
    'Sweets': [
        { id: 'brownie', name: 'Brownie', price: 9.00, img: 'static/img/menu/brownie.svg',
          info: '70% cocoa chocolate, a crackly top and a fudgy center. Ask for it warm with a scoop of ice cream for R$5.00 more.' },
        { id: 'carrot-cake', name: 'Carrot Cake', price: 8.50, img: 'static/img/menu/carrot-cake.svg',
          info: 'A slice of fluffy Brazilian carrot cake with chocolate brigadeiro frosting dripping down the sides. Tastes like grandma\'s house.' },
        { id: 'strawberry-cheesecake', name: 'Strawberry Cheesecake', price: 13.00, img: 'static/img/menu/strawberry-cheesecake.svg',
          info: 'Crunchy cookie base, baked cream cheese filling and a fresh strawberry sauce made in-house.' },
        { id: 'cookie', name: 'Chocolate Chip Cookie', price: 6.00, img: 'static/img/menu/cookie.svg',
          info: 'Crispy edges, a soft center and loads of dark chocolate chips. Goes with any coffee on the menu.' },
        { id: 'brigadeiro', name: 'Gourmet Brigadeiro', price: 3.50, img: 'static/img/menu/brigadeiro.svg',
          info: 'Made with Belgian chocolate and finished with chocolate sprinkles. Small in size, huge in flavor.' },
        { id: 'donut', name: 'Frosted Donut', price: 8.00, img: 'static/img/menu/donut.svg',
          info: 'Brioche dough fried to order, strawberry glaze and colorful sprinkles. Straight out of a comic book.' }
    ]
};
