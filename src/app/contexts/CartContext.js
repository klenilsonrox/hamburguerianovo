const { createContext, useState, useEffect } = require("react");

export const dados = [
    {
      id: 1,
      urlImage: "/images/xburger.png",
      produto: "X-Burguer",
      descricao:
        "pao, molho especial, ham bovino, mussarela, alface, tomate, batata palha e milho.",
      preco: "14.00",
      categoria: "sanduiches",
    },
    {
      id: 2,
      urlImage: "/images/misto.png",
      produto: "Misto especial",
      descricao:
        "Pão, molho especial, ovo, 2 mussarelas, 2 presuntos, alface, tomate , batata palha e milho.",
      preco: "12.00",
      categoria: "sanduiches",
    },
    {
      id: 3,
      urlImage: "/images/eggburger.png",
      produto: "X-Egg Burguer",
      descricao:
        "Pão, molho especial, ham bovino, ovo, mussarela, alface, tomate, batata palha e milho.",
      preco: "16.00",
      categoria: "sanduiches",
    },
    {
      id: 4,
      urlImage: "/images/popular.png",
      produto: "X-Popular",
      descricao:
        "Pão, molho especial, ham bovino, ovo, 2 mussarelas, 2 presuntos, alface, tomate, batata palha e milho.",
      preco: "20.00",
      categoria: "sanduiches",
    },
    {
      id: 5,
      urlImage: "/images/xbacon.png",
      produto: "X-Bacon",
      descricao:
        "Pão, molho especial, ham bovino, mussarela, bacon, alface, tomate, batata palha e milho.",
      preco: "20.00",
      categoria: "sanduiches",
    },
    {
      id: 6,
      urlImage: "/images/egbacon.jpg",
      produto: "X-Egg Bacon",
      descricao:
        "Pão, molho especial, ham bovino, ovo, mussarela, bacon, alface, tomate, batata palha e milho.",
      preco: "22.00",
      categoria: "sanduiches",
    },
    {
      id: 7,
      urlImage: "/images/xcatupiry.png",
      produto: "X-Catupiry",
      descricao:
        "Pão, molho especial, ham bovino, ovo, presunto, frango desfiado, catupiri, bacon, alface, tomate, batata palha e milho.",
      preco: "23.00",
      categoria: "sanduiches",
    },
    {
      id: 8,
      urlImage: "/images/xtudo.png",
      produto: "X-tudo",
      descricao:
        "Pão, molho especial, ham bovino, ovo, presunto, Mussarela, frango desfiado, catupiri, bacon, alface, tomate, batata palha e milho.",
      preco: "25.00",
      categoria: "sanduiches",
    },
    {
      id: 9,
      urlImage: "/images/matafome.jpg",
      produto: "Mata Fome",
      descricao:
        "Pão, molho especial, 2 ham bovinos, 2 ovos , 2 presuntos, 2 queijos, frango desfiado, catupiri, bacon, alface, tomate, batata palha e milho.",
      preco: "28.00",
      categoria: "sanduiches",
    },
    {
      id: 10,
      urlImage: "/images/macarrao.png",
      produto: "Macarrão na Chapa",
      descricao:
        "Bacon, Frango desfiado, presunto, cebola, pimentão,tomate, cenoura, repolho, milho, molho de alho, molho shoyu",
      preco: "25.00",
      categoria: "macarrao",
    },
    {
      id: 11,
      urlImage: "/images/omelete.png",
      produto: "Omelete Especial",
      descricao:
        "4 ovos, bacon, frango desfiado, catupiry, presunto, mussarela, cebola, pimentão, tomate e milho",
      preco: "25.00",
      categoria: "omeletes",
    },
    {
      id: 12,
      urlImage: "/images/coca1l.png",
      produto: "Coca cola 1 Litro",
      descricao: "Coca cola 1 litro",
      preco: "10.00",
      categoria: "bebidas",
    },
    {
      id: 13,
      urlImage: "/images/coca2l.png",
      produto: "Coca cola 2 litros",
      descricao: "Coca cola 2 litros",
      preco: "13.00",
      categoria: "bebidas",
    },
    {
      id: 14,
      urlImage: "/images/cocalata.png",
      produto: "Coca cola Lata",
      descricao: "Coca cola Lata",
      preco: "5.50",
      categoria: "bebidas",
    },
    {
      id: 15,
      urlImage: "/images/fanta2l.png",
      produto: "Fanta 2 litros",
      descricao: "Fanta 2 litros",
      preco: "12.00",
      categoria: "bebidas",
    },
    {
      id: 16,
      urlImage: "/images/fantalata.png",
      produto: "Fanta lata",
      descricao: "Fanta lata",
      preco: "5.50",
      categoria: "bebidas",
    },
    {
      id: 17,
      urlImage: "/images/guarana2l.png",
      produto: "Guaraná 2 litros",
      descricao: "Guaraná 2 litros",
      preco: "12.00",
      categoria: "bebidas",
    },
    {
      id: 18,
      urlImage: "/images/guaranalata.png",
      produto: "Guaraná lata",
      descricao: "Guaraná lata",
      preco: "5.50",
      categoria: "bebidas",
    },
    {
      id: 19,
      urlImage: "/images/kuat2l.png",
      produto: "Kuat 2 litros",
      descricao: "Kuat 2 litros",
      preco: "12.00",
      categoria: "bebidas",
    },
    {
      id: 20,
      urlImage: "/images/delvale.png",
      produto: "Suco Dell Vale lata",
      descricao: "Suco Dell Vale lata",
      preco: "6.00",
      categoria: "bebidas",
    },
    {
      id: 21,
      urlImage: "/images/sukita2l.jpg",
      produto: "Sukita 2 litros",
      descricao: "Sukita 2 litros",
      preco: "12.00",
      categoria: "bebidas",
    },
    {
      id: 22,
      urlImage: "/images/guarana1l.jpg",
      produto: "Guaraná 1 Litro",
      descricao: "Guaraná 1 Litro",
      preco: "8.00",
      categoria: "bebidas",
    },
    {
      id: 23,
      urlImage: "/images/pepsi2l.png",
      produto: "Pepsi 2 litros",
      descricao: "Pepsi 2 litros",
      preco: "12.00",
      categoria: "bebidas",
    },
    {
      id: 24,
      urlImage: "/images/fritascatbacon.png",
      produto: "Fritas com Catupiry e Bacon",
      descricao: "Fritas com catupiry e Bacon",
      preco: "30.00",
      categoria: "porcoes",
    },
    {
      id: 25,
      urlImage: "/images/fritasqueijoebacon.png",
      produto: "Fritas com Queijo e Bacon",
      descricao: "Fritas com Queijo e Bacon",
      preco: "30.00",
      categoria: "porcoes",
    },
    {
      id: 26,
      urlImage: "/images/fritaspura.png",
      produto: "Fritas Pura",
      descricao: "Fritas Pura",
      preco: "20.00",
      categoria: "porcoes",
    },
    {
      id: 27,
      urlImage: "/images/bala.png",
      produto: "Bala",
      descricao: "Bala",
      preco: "0.10",
      categoria: "bomboniere",
    },
    {
      id: 28,
      urlImage: "/images/balagoma.jpg",
      produto: "Bala de Goma",
      descricao: "Bala de Goma",
      preco: "2.00",
      categoria: "bomboniere",
    },
    {
      id: 29,
      urlImage: "/images/bombomouro.png",
      produto: "Bombom ouro branco",
      descricao: "Bombom ouro branco",
      preco: "2.00",
      categoria: "bomboniere",
    },
    {
      id: 30,
      urlImage: "/images/freegels.png",
      produto: "Fregells",
      descricao: "Fregells",
      preco: "1.50",
      categoria: "bomboniere",
    },
    {
      id: 31,
      urlImage: "/images/halls.jpeg",
      produto: "Halls",
      descricao: "Halls",
      preco: "2.00",
      categoria: "bomboniere",
    },
    {
      id: 32,
      urlImage: "/images/pacoca.png",
      produto: "Paçoca",
      descricao: "Paçoca",
      preco: "1.00",
      categoria: "bomboniere",
    },
    {
      id: 33,
      urlImage: "/images/pirulito.png",
      produto: "Pirulito",
      descricao: "Pirulito",
      preco: "1.00",
      categoria: "bomboniere",
    },
  ];

  export const CartContext = createContext()

  const CartProvider=({children})=>{

const [cart,setCart]=useState([])
const [itemModal,setItem]=useState("")
const [observacao,setObservacao]=useState("")
const [cartOpen,setCartOpen]=useState(false)


function addItemToCart(item){
    setItem({item,observacao})
    setCart(prev => {
        const updatedCart = [...prev, item];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
    });
}




useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
        setCart(storedCart);
    }
}, []);

function removeItemFromCart(itemToRemove) {
  setCart(prev => {
      const updatedCart = prev.filter(item => item !== itemToRemove);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
  });
}



    return (
        <CartContext.Provider value={{cart,addItemToCart,dados,cartOpen,setCartOpen,removeItemFromCart}}>
            {children}
        </CartContext.Provider>
    )
  }



  export default CartProvider