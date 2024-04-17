'use client'
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CartContext, dados } from '../contexts/CartContext';
import Produto from './Produto';
import { FaTrash } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";





const Produtos = () => {
    const infos=useContext(CartContext)
    const [produtos,setProdutos]=useState([])
    const [carrinho,setCarrinho]=useState([])
    const [total,setTotal]=useState(0)
    const [ nome,setNome]=useState("")
    const [modalDados,setModalDados]=useState(false)
    const [modalEndereco,setModalEndereco]=useState(false)
    const [modalResumo,setModalResumo]=useState(false)
    const [erro,setErro]=useState(false)
    const [rua,setRua]=useState("")
    const [numero,setNumero]=useState("")
    const [bairro,setBairro]=useState("")
    const [complemento,setComplemento]=useState("")
    const [referencia,setReferencia]=useState("")
    const [openResumo,setOpenResumo]=useState(false)
    const [pagamento, setPagamento] = useState('');
    const [troco,setTroco]=useState("")
    const refErro = useRef()


    const handlePagamentoChange = (event) => {
        setPagamento(event.target.value);
      };

      useEffect(()=>{
        const dadosExist = localStorage.getItem("dados")
        if(dadosExist){
            const user = JSON.parse(dadosExist)
            setNome(user.nome)
            setRua(user.rua)
            setComplemento(user.complemento)
            setBairro(user.bairro)
            setReferencia(user.referencia)
            setNumero(user.numero)
        }
      },[])
   

    useEffect(()=>{
        const filtrados = dados.filter(item=>item.categoria==="sanduiches")
        setProdutos(filtrados)
    },[])

    function closeModalDados(e){
        if(e.target.id==="modalDados"){
            setModalDados(false)
        }
    }

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

    function openModalEndereço(){
        clearTimeout(refErro.current)
        if(nome.trim()===""){
            setErro("O Nome é obrigatório")
            refErro.current = setTimeout(()=>{
                setErro("")
            },1500)

        } else{
            setModalEndereco(true)
        }
    }


    function openModalResumo(){
        clearTimeout(refErro.current)
        if(rua.trim()===""){
            setErro("O Nome da rua é obrigatório")
            refErro.current=setTimeout(()=>{
                setErro("")
            },1500)
        }
       else if(bairro.trim()===""){
            setErro("O Nome do bairro é obrigatório")
            refErro.current=setTimeout(()=>{
                setErro("")
            },1500)
        }
        else if(numero.trim()===""){
            setErro("O Número da casa é obrigatório")
            refErro.current=setTimeout(()=>{
                setErro("")
            },1500)
        }
        else{
            setModalResumo(true)
        }
    }

    function finalizarDelivery(){
        clearTimeout(refErro.current)
        if(pagamento.trim()===""){
            setErro("Selecione a forma de pagamento")
            refErro.current=setTimeout(()=>{
                setErro("")
            },1500)
        }
  
        else if(pagamento==="dinheiro" && troco.trim()===""){
            setErro("Coloque pra quanto voce precisa de troco, caso nao precise , coloque o valor que vc tem trocado")
            refErro.current=setTimeout(()=>{
                setErro("")
            },3000)
        } else{
            const hora = new Date().getHours()
            const minutos = new Date().getMinutes()
      
            const horaCerta = `⏰${hora > 10 ? `${hora}`:`0${hora}`}`+":"+`${minutos > 10 ? `${minutos}`:`0${minutos}`} `
       
const msg = `*Pedido:*
`
const dadosCliente=`
*Cliente:* ${nome}
*Horário do pedido*:${horaCerta}
*Tipo de serviço:* Delivery
*Rua*: ${rua}
*Número*: ${numero}
*Bairro*: ${bairro}
${complemento ? `*Complemento*: ${complemento}`: `` }
${referencia ? `*Ponto de referência*: ${referencia}`: `` }
*Forma de pagamento*: ${pagamento}
${troco ? `*Troco para*: ${troco}`:""}
----------------------------------------------
`    
const custos=`
----------------------------------------------
*Custos*
*Preço dos Produtos:* R$ ${Number(total).toFixed(2)}
*Preço da Entrega:* R$ 3.00
*Total a pagar:* R$ ${Number(total + 3).toFixed(2)}
      
Após enviar o pedido, aguarde que já iremos lhe atender.
      `
      
const cartItens= infos.cart.map((item)=>{
return (
`1x - ${item.produto} 
${item.observacao}
`)})
      
const dadosClient=encodeURIComponent(dadosCliente)
const msgResumo= encodeURIComponent(msg)
const precos= encodeURIComponent(custos)
const carrinho = encodeURIComponent(cartItens)
const phone = "+5531992311170"
      
      
      const dados= {
        nome,
        rua,
        bairro,
        numero,
        complemento,
        referencia
      }
      
      localStorage.setItem("dados", JSON.stringify(dados))

      const carroVazio = []
      
      window.location.href=`https://wa.me/${phone}?text=${dadosClient}${msgResumo}${carrinho}${precos}`
      localStorage.setItem("cart", carroVazio)
            router.push("/")
        }
    }

  return (
    <>
    <div className="x-4 max-w-7xl mx-auto">

<div className='flex gap-4 clear-start py-4 max-w-sm  lg:max-w-7xl overflow-x-auto scrollbar-thin scrollbar-thumb-white'>
  <button className='ativo categ' id='sanduiches' onClick={selecionarFiltro}>Sanduíches</button>
  <button className='categ' id='porcoes' onClick={selecionarFiltro}>Porções</button>
  <button className='categ' id='omeletes' onClick={selecionarFiltro}>Omeletes</button>
  <button className='categ' id='macarrao' onClick={selecionarFiltro}>Macarrão</button>
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
{infos.cartOpen && <div className='fixed inset-0 bg-black flex overflow-hidden bg-opacity-20 backdrop-blur-sm z-20 ' id='cart' onClick={closeCartModal}>
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
       <button className='bg-green-600 px-6 py-3 rounded-md font-medium text-white' onClick={()=>setModalDados(true)}>Continuar</button>
       <button onClick={()=>infos.setCartOpen(false)}>← Voltar</button>
    </div>
    </div> }
</div>
</div>}
{/* final do carrinho */}

{infos.cart.length > 0 && <div className='flex items-center fixed bottom-0 right-0 left-0 border-t px-4 py-3 z-10 bg-white'>
<div className='max-w-7xl mx-auto flex w-full items-center justify-between'>
        <div>
            <p>{infos.cart.length} {infos.cart.length > 1 ? "itens":"item"}</p>
            <p className='font-medium'>R$ {Number(total).toFixed(2)}</p>
        </div>
        <button className='bg-red-600 px-10 py-3 rounded-md text-white font-medium' onClick={()=>infos.setCartOpen(true)}>Ver meu carrinho</button>
</div>
</div>}


{/* inicio form dados */}

{modalDados && <div className='inset-0 fixed bg-black flex justify-center z-30 backdrop-blur-sm overflow-hidden bg-opacity-20' id='modalDados' onClick={closeModalDados}>

<div className='max-w-md w-full bg-white flex flex-col '>

    <div className='flex items-center justify-between px-2 bg-slate-200 py-3'>
    <IoIosArrowBack className='text-2xl cursor-pointer' onClick={()=>setModalDados(false)}/>
    <p className='font-medium'>Seus Dados</p>
    <button className='text-xl font-bold text-red-600' onClick={()=>setModalDados(false)}>X</button>
    </div>

    <div>
       <form className='max-w-md w-full px-2'>
        <div className='w-full flex flex-col mt-10'>
            <label htmlFor="name">Nome</label>
            <input type="text" value={nome} onChange={({target})=>setNome(target.value)} className='bg-slate-200 py-3 pl-2 rounded-md outline-none' placeholder='Digite seu nome...'/>
        </div>
       </form>
    </div>

    <div className='flex-1 items-end flex'>
        <div className='flex justify-between px-4 bg-slate-200 py-3 flex-1 items-end'>
        <button className='bg-green-600 text-white px-8 py-3 rounded-md font-medium'  onClick={openModalEndereço}>Continuar</button>
        <button className='py-3' onClick={()=>setModalDados(false)}>← voltar</button>
        </div>
    </div>

</div>

</div>}

{/* final form dados */}


{/* inicio form endereço */}

{modalEndereco && <div className='inset-0 fixed bg-black flex justify-center z-30 backdrop-blur-sm overflow-hidden bg-opacity-20' id='modalDados' onClick={closeModalDados}>

<div className='max-w-md w-full bg-white flex flex-col '>

    <div className='flex items-center justify-between px-2 bg-slate-200 py-3'>
    <IoIosArrowBack className='text-2xl cursor-pointer' onClick={()=>setModalEndereco(false)}/>
    <p className='font-medium'>Seu Endereço</p>
    <button className='text-xl font-bold text-red-600' onClick={()=>setModalEndereco(false)}>X</button>
    </div>

    <div>
       <form className='max-w-md w-full px-2'>

        <div className='w-full flex flex-col mt-10'>
            <label htmlFor="rua">Rua</label>
            <input type="text" value={rua} onChange={({target})=>setRua(target.value)} className='bg-slate-200 py-3 pl-2 rounded-md outline-none'/>
        </div>

        <div className='w-full flex mt-3 justify-between gap-4'>

            <div className='flex flex-col flex-1'>
            <label htmlFor="bairro">Bairro</label>
            <input type="text" value={bairro} onChange={({target})=>setBairro(target.value)} className='bg-slate-200 py-3 pl-2 rounded-md outline-none'/>
            </div>

           <div className='flex flex-col max-w-[100px]'>
           <label htmlFor="numero">Número</label>
            <input type="text" value={numero} onChange={({target})=>setNumero(target.value)} className='bg-slate-200 py-3 pl-2 rounded-md outline-none'/>
           </div>

        </div>

        <div className='w-full flex flex-col mt-3'>
            <label htmlFor="complemento">Complemento (opcional)</label>
            <input type="text" value={complemento} onChange={({target})=>setComplemento(target.value)} className='bg-slate-200 py-3 pl-2 rounded-md outline-none'/>
        </div>

        <div className='w-full flex flex-col mt-3'>
            <label htmlFor="referencia">Referência (opcional)</label>
            <input type="text" value={referencia} onChange={({target})=>setReferencia(target.value)} className='bg-slate-200 py-3 pl-2 rounded-md outline-none'/>
        </div>

       </form>
    </div>

    <div className='flex-1 items-end flex'>
        <div className='flex justify-between px-4 bg-slate-200 py-3 flex-1 items-end'>
        <button className='bg-green-600 text-white px-8 py-3 rounded-md font-medium' onClick={openModalResumo}>Continuar</button>
        <button className='py-3' onClick={()=>setModalEndereco(false)}>← voltar</button>
        </div>
    </div>

</div>

</div>}

{/* final modal endereço */}

{/* inicio modal erro */}
{erro && <div className='inset-0 fixed bg-white flex justify-center items-start backdrop-blur-sm max-w-md mx-auto z-50 anima h-14'>
<p className='border-b-4 border-red-600 p-2 text-center font-medium'>{erro}</p>
</div>}
{/* final modal erro */}

{/* inicio modal resume */}
{modalResumo && <div className='inset-0 fixed bg-black flex justify-center backdrop-blur-sm overflow-hidden bg-opacity-20 z-40'>
    <div className='max-w-md w-full bg-white relative flex flex-col'>

       <div className='flex justify-between items-center bg-green-200 py-3 px-2'>
        <IoIosArrowBack onClick={()=>setModalResumo(false)} className='text-xl font-bold cursor-pointer'/>
        <p className='text-green-900 font-medium'>Falta apenas 1 clique</p>
        <button className='text-red-600 font-bold text-xl' onClick={()=>setModalResumo(false)}>X</button>
       </div>

        <div className=' flex-1 overflow-y-scroll px-4'>
            <div className='my-2 flex flex-col items-start'>
              <label htmlFor="pagamentoSelect" className='py-1 font-bold'>Escolha o método de pagamento:</label>
      <select id="pagamentoSelect" value={pagamento} onChange={handlePagamentoChange} className='bg-green-200 p-2 rounded-md'>
        <option value="">Selecione...</option>
        <option value="cartao">Cartão</option>
        <option value="dinheiro">Dinheiro</option>
        <option value="pix">Pix</option>
      </select>      
            </div>

            {pagamento==="dinheiro" && <div className='w-full flex flex-col mt-3 mb-4'>
            <label htmlFor="referencia" className='font-bold'>Com quanto você vai pagar? </label>
            <input type="text" value={troco} onChange={({target})=>setTroco(target.value)} className='bg-slate-200 py-3 pl-2 rounded-md outline-none' placeholder='50'/>
        </div>}
            
            <div className='rounded-md px-2 pb-3 border'>
               <div className='flex items-center mt-2 justify-center' onClick={()=>setOpenResumo(resume=>!resume)}>
               <h1 className='font-bold'>Resumo do pedido</h1>
                
                {openResumo ? <IoIosArrowDown />:<IoIosArrowForward />}
               </div>
               
               {openResumo && <div className=' overflow-hidden anima'>
                <div className='border-b'>
                    <p className='font-medium text-center text-xl'>Dados do Cliente:</p>
                    <div>
                        <p><strong>Forma de pagamento:</strong> {pagamento}</p>
                        {pagamento==="dinheiro" && <p><strong>Troco para:</strong> {troco}</p>}
                        <p><strong>Nome:</strong> {nome}</p>
                        <p><strong>Rua:</strong> {rua}</p>
                        <p><strong>Bairro:</strong> {bairro}</p>
                        <p><strong>Número:</strong> {numero}</p>
                        {complemento && <p><strong>Complemento:</strong> {complemento}</p>}
                        {referencia && <p><strong>Referência:</strong> {referencia}</p>}
                    </div>
                </div>
                <div className='mt-2'>
                    <p className='font-medium text-center text-xl'>Items do pedido:</p>
                    <div>
                        {infos.cart.map(item=> (
                            <div className='flex justify-between px-2'>
                                <div>
                                <p>( <span className='text-red-600 font-medium'>1x</span> ) - {item.produto}</p>
                                {item.observacao && <p>{item.observacao}</p> }
                                </div>
                                    <FaTrash className='text-red-600 cursor-pointer' onClick={()=>infos.removeItemFromCart(item)}/>
                                
                            </div>
                        ) )}
                    </div>
                </div>
                <div className='px-2 border-t mt-2'>
                    <p className='font-bold'>Subtotal : R$ {Number(total).toFixed(2)}</p>
                    <p className='font-bold'>Taxa de entrega: R$ 3,00</p>
                    <p className='font-bold'>Total R$ {Number(total + 3).toFixed(2)}</p>
                </div>
               </div>}
            </div>
        </div>

        <div className='py-3 bg-white h-24'>
            <p className='text-center'>valor a pagar <strong>R$ {Number(total + 3).toFixed(2)}</strong></p>
            <button className='fixed bottom-0 right-0 left-0 bg-green-600 text-white max-w-sm mx-auto my-2 py-3 rounded-md font-medium' onClick={finalizarDelivery}>Confirmar</button>
        </div>

    </div>
</div>}
{/* final modal resume */}

{/* inicio modal checkout */}

{/* <div className='inset-0 fixed bg-black flex justify-center backdrop-blur-sm overflow-hidden bg-opacity-20 z-50'>

</div> */}

{/* final modal checkout */}

</>
  );
};

export default Produtos;