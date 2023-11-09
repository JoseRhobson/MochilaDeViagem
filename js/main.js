const form = document.getElementById('novoItem')
const lista = document.getElementById('lista')
const itens = JSON.parse(localStorage.getItem('itens')) || []

//console.log(itens)
//console.log(lista)

itens.forEach( (elemento) =>{
    criaElemento(elemento)
   
    
})


form.addEventListener('submit' ,(evento)=>{
    evento.preventDefault()
    nome = evento.target.elements['nome']
    quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value ) 
     //console.log(existe)
    const itemAtual = {
        'nome':nome.value,
        'quantidade':quantidade.value
    } 
        
        if(existe){ 
         
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento =>elemento.id === existe.id)] = itemAtual
    
        }
       else if(!nome.value =='' && !quantidade.value ==''){
        
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id +1 : 0 
       
        criaElemento(itemAtual) 
        
        itens.push(itemAtual)
    }
       


    localStorage.setItem('itens',JSON.stringify(itens))

    nome.value = ''
    quantidade.value = ''

        

})




    
    function criaElemento(item){
// console.log(nome)
// console.log(quantidade)
//console.log(item)

  
    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numeroIten = document.createElement('strong')
    numeroIten.innerHTML = item.quantidade
    numeroIten.dataset.id = item.id
    novoItem.appendChild(numeroIten)

    novoItem.innerHTML += item.nome
    
    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML= item.quantidade
}

function botaoDeleta(id){
    const elementoBotao = document.createElement('button')
    elementoBotao.innerText = 'X'

    elementoBotao.addEventListener('click',function(){
        deletaElemento(this.parentNode, id )
    })
    return elementoBotao
}
function deletaElemento(tag,id){
    tag.remove()

itens.splice(itens.findIndex(elemento => elemento.id == id),1)

localStorage.setItem('itens',JSON.stringify(itens))
}