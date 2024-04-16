'use client'
import React, { useContext, useEffect, useState } from 'react';
import { CartContext, dados } from '../contexts/CartContext';
import Produto from './Produto';
import { FaTrash } from "react-icons/fa";


const Produtos = () => {
    const infos=useContext(CartContext)
    const [produtos,setProdutos]=useState([])
    const [carrinho,setCarrinho]=useState([])
   

    useEffect(()=>{
        const filtrados = dados.filter(item=>item.categoria==="sanduiches")
        setProdutos(filtrados)
    },[])

    

    useEffect(()=>{
        const dadosExist = localStorage.getItem("cart")
        if(dadosExist){
            setCarrinho(JSON.parse(dadosExist))
        }
    },[])

    function selecionarFiltro(e){
        const allCateg= [...document.querySelectorAll(".categ")]
        allCateg.forEach(it=> it.classList.remove("ativo") )
        e.target.classList.add("ativo")
        const filtrados = dados.filter(produto=>produto.categoria===e.target.id)
        setProdutos(filtrados)
    }

    function closeCartModal(e){
        if(e.target.id==="cart"){
            infos.setCartOpen(false)
        }
    }

  return (
    <>
    <div className="x-4 max-w-7xl mx-auto">

<div className='flex gap-4 clear-start py-4 max-w-sm overflow-x-scroll lg:max-w-7xl lg:overflow-x-auto'>
  <button className='ativo categ' id='sanduiches' onClick={selecionarFiltro}>Sanduíches</button>
  <button className='categ' id='porcoes' onClick={selecionarFiltro}>Porções</button>
  <button className='categ' id='macarrao' onClick={selecionarFiltro}>Omeletes</button>
  <button className='categ' id='bebidas' onClick={selecionarFiltro}>Bebidas</button>
  <button className='categ' id='bomboniere' onClick={selecionarFiltro}>Bomboniere</button>
  <button onClick={()=>infos.setCartOpen(true)}>carrinho</button>
</div>

<div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4'>
{produtos.map(item=> (
<Produto item={item}/>
) )}
</div>

</div>


{/* inicio do carrinho */}
{infos.cartOpen && <div className='fixed inset-0 bg-black flex bg-opacity-20 backdrop-blur-sm' id='cart' onClick={closeCartModal}>
<div className='bg-white w-full max-w-md absolute right-0 bottom-0 h-screen flex flex-col justify-between'>
    <div className='flex justify-between px-4 border-b py-4'>
        <h1 className='font-semibold'>Seu carrinho</h1>
        <button className='font-medium text-xl text-red-600' onClick={()=>infos.setCartOpen(false)}>X</button>
    </div>
    <div className='flex-1 px-4 max-h-[700px] overflow-y-scroll'>
        {infos.cart && infos.cart.map(item=> (
            <div className='border-b py-4 flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <img src={item.image} alt={`imagem do ${item.produto}`} className='max-w-[70px] rounded-md' />
                    <div>
                        <p>( <span className='text-red-600 font-medium'>1x</span> ) {item.produto}</p>
                        <p className='font-medium'>R$ {Number(item.preco).toFixed(2)}</p>
                        {item.observacao && <p>{item.observacao}</p>}
                    </div>
                </div>
                <FaTrash className='text-red-600 cursor-pointer'/>
            </div>
        ) )}
    </div>
    <div className='flex justify-between p-4 border-t'>
       <button className='bg-green-600 px-6 py-2 rounded-md font-medium text-white'>Continuar</button>
       <button>← Voltar</button>
    </div>
</div>
</div>}
{/* final do carrinho */}

</>
  );
};

export default Produtos;