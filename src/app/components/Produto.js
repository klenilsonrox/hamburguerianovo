'use client'
import React, { useContext, useRef, useState } from 'react';
import { CartContext } from '../contexts/CartContext';


const Produto = ({item}) => {
    const infos = useContext(CartContext)
    const [modalItem,setModalItem]=useState(false)
    const [observacao,setObservacao]=useState("")
    const [sucess,setSucess]=useState(false)
    const refSucess= useRef()

 
 
    function openModalItem(){
   setModalItem(true)
    }

    function addItemAoCarrinho(){
        clearTimeout(refSucess.current)
        const itemToCart = {
            produto:item.produto,
            id:item.id,
            preco:item.preco,
            image:item.urlImage,
            observacao
        }
        
        setSucess(`1 ${itemToCart.produto} foi adicionado ao carrinho 😆`)
        setTimeout(()=>{
            setSucess("")
        },2000)

        infos.addItemToCart(itemToCart)
        setTimeout(()=>{
            setModalItem(false)
            setObservacao("")
        },500)
    }

   
  return (
    <>
    <div key={item.id} className=' py-2 flex gap-2 cursor-pointer items-center justify-between  md:items-start border-b' onClick={()=>openModalItem(item)}>
     <img src={item.urlImage} alt={`imagem do ${item.produto}`} className='max-w-[90px] max-h-[90px] lg:max-w-[110px] lg:max-h-[110px]  rounded-md order-2 lg:order-none'/>
     <div className='flex flex-col justify-between gap-2'>
        <h1>{item.produto}</h1>
        <p className="text-[14px] text-gray-500 text-truncate-2-line">{item.descricao}</p>
        <p className='font-medium'>R$ {Number(item.preco).toFixed(2)}</p>
     </div>
    
 </div>
 {modalItem && <div className="fixed inset-0 flex bg-black bg-opacity-10 backdrop-blur-sm justify-center z-30 h-screen overflow-y-scroll">
      <div className='w-full bg-white max-w-md relative rounded-md '>

        <div className='relative'>
            <img src={item.urlImage} alt={`imagem do ${item.produto}`} className='w-full'/>
            <button className='absolute top-2 right-2 bg-red-600 rounded-full w-8 h-8 text-white' id='btnfechar' onClick={()=>setModalItem(false)}>X</button>
        </div>
        
        <div className='p-2 '>
            <div>
            <h1 className='text-xl font-bold'>{item.produto}</h1>
            <p className='mt-2 font-medium'>R$ {Number(item.preco).toFixed(2)}</p>
            <p>{item.descricao}</p>
            </div>
            {item.categoria!=="bebidas" && item.categoria!=="bomboniere" && <div className='py-4'>
                <p className='font-medium'>Alguma observação sobre o seu pedido?</p>
                <textarea name="" id="" cols="30" rows="2" className='bg-slate-200 w-full mt-2 rounded-md p-2' placeholder='ex: sem milho, sem salada' value={observacao} onChange={({target})=>setObservacao(target.value)}></textarea>
            </div>}
        </div>
        <div className='absolute bottom-4 right-4 '>
           <button className='bg-red-600 text-white rounded-full py-2 px-6 font-medium' onClick={addItemAoCarrinho}>Adicionar ao carrinho</button>
        </div>
      </div>
    </div>}

{ sucess && <div className='bg-white fixed inset-0 h-[70px] flex items-center justify-center border-b-[4px]  border-green-600 anima max-w-sm mx-auto'>
    <p>{sucess}</p>
</div> }

 </>
  );
};

export default Produto;