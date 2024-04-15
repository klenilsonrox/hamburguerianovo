'use client'
import React, { useContext, useEffect, useState } from 'react';
import { CartContext, dados } from '../contexts/CartContext';
import Produto from './Produto';


const Produtos = () => {
    const infos=useContext(CartContext)
    const [produtos,setProdutos]=useState([])

    useEffect(()=>{
        const filtrados = dados.filter(item=>item.categoria==="sanduiches")
        setProdutos(filtrados)
    },[])

    function selecionarFiltro(e){
        const allCateg= [...document.querySelectorAll(".categ")]
        allCateg.forEach(it=> it.classList.remove("ativo") )
        e.target.classList.add("ativo")
        const filtrados = dados.filter(produto=>produto.categoria===e.target.id)
        setProdutos(filtrados)
    }

  return (
    <div className="x-4 max-w-7xl mx-auto">

      <div className='flex gap-4 clear-start py-4 max-w-sm overflow-x-scroll lg:max-w-7xl lg:overflow-x-auto'>
        <button className='ativo categ' id='sanduiches' onClick={selecionarFiltro}>Sanduíches</button>
        <button className='categ' id='porcoes' onClick={selecionarFiltro}>Porções</button>
        <button className='categ' id='macarrao' onClick={selecionarFiltro}>Omeletes</button>
        <button className='categ' id='bebidas' onClick={selecionarFiltro}>Bebidas</button>
        <button className='categ' id='bomboniere' onClick={selecionarFiltro}>Bomboniere</button>
      </div>

   <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4'>
   {produtos.map(item=> (
    <Produto item={item}/>
   ) )}
   </div>
  
    </div>
  );
};

export default Produtos;