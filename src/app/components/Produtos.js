'use client'
import React, { useContext, useEffect, useState } from 'react';
import { CartContext, dados } from '../contexts/CartContext';
import Produto from './Produto';
import { FaTrash } from "react-icons/fa";


const Produtos = () => {
    const infos=useContext(CartContext)
    const [produtos,setProdutos]=useState([])
    const [carrinho,setCarrinho]=useState([])
    const [total,setTotal]=useState(0)
   

    useEffect(()=>{
        const filtrados = dados.filter(item=>item.categoria==="sanduiches")
        setProdutos(filtrados)
    },[])

    useEffect(()=>{
        const valorTotal = infos.cart.reduce((acc,it)=>acc + Number(it.preco),0)
        setTotal(valorTotal)
    },[infos.cart])

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
</div>

<div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4 my-16'>
{produtos.map(item=> (
<Produto item={item}/>
) )}
</div>

</div>


{/* inicio do carrinho */}
{infos.cartOpen && <div className='fixed inset-0 bg-black flex bg-opacity-20 backdrop-blur-sm z-50' id='cart' onClick={closeCartModal}>
<div className='bg-white w-full max-w-md absolute right-0 bottom-0 h-screen flex flex-col justify-between'>
    <div className='flex justify-between px-4 border-b py-4'>
        <h1 className='font-semibold'>Seu carrinho</h1>
        <button className='font-medium text-xl text-red-600' onClick={()=>infos.setCartOpen(false)}>X</button>
    </div>
    {infos.cart.length < 1 && <div className='mx-auto'>
        <img src="/images/cartvazio.png" alt="" />
        <div className='flex items-center justify-center my-4'>
        <a href="/">Adicionar itens</a>
        </div>
    </div> }
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
                <FaTrash className='text-red-600 cursor-pointer' onClick={()=>infos.removeItemFromCart(item)}/>
            </div>
        ) )}
    </div>
    {infos.cart.length > 0 && <div>
        <h1 className='px-4 font-bold text-xl'>Total R$ {Number(total).toFixed(2)}</h1>
        <div className='flex justify-between p-4 border-t'>
       <button className='bg-green-600 px-6 py-2 rounded-md font-medium text-white'>Continuar</button>
       <button onClick={()=>infos.setCartOpen(false)}>← Voltar</button>
    </div>
    </div> }
</div>
</div>}
{/* final do carrinho */}

<div className='flex items-center fixed bottom-0 right-0 left-0 border-t px-4 py-2 z-10 bg-white'>
<div className='max-w-7xl mx-auto flex w-full items-center justify-between'>
        <div>
            <p>{infos.cart.length} {infos.cart.length >1 ? "itens":"item"}</p>
            <p className='font-medium'>R$ {Number(total).toFixed(2)}</p>
        </div>
        <button className='bg-red-600 px-10 py-2 rounded-md text-white font-medium' onClick={()=>infos.setCartOpen(true)}>Ver meu carrinho</button>
</div>
</div>


{/* inicio form dados */}

<div className='inset-0 fixed bg-black flex justify-center z-10'>
        <div className='max-w-md w-full bg-white'>
            ola
        </div>
</div>

{/* final form dados */}

</>
  );
};

export default Produtos;