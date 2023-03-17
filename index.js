import { menuArray } from "./data.js"
let orderArray =[]
let executed = false
let array = []
let sum =0
let orderDetailsHTML =''

document.addEventListener('click',(e)=>{
    if(e.target.dataset.addorder){
        handleAddClick(e.target.dataset.addorder)  //no camel case
        if(!executed){
            document.getElementById('orderDetails').classList.toggle('hidden')
            executed = true
        }
    }
    if(e.target.dataset.complete){
        document.getElementById('form').classList.toggle('hidden')
    }   
    // if(e.target.dataset.remove){
    //     handleRemoveClick(e.target.dataset.remove)
    // }
    if(e.target.dataset.pay){
        let name = document.getElementById('name').value
        let cardNumber = document.getElementById('cardNumber').value
        let cvv = document.getElementById('cvv').value
        if(!name || !cardNumber || !cvv){
            console.log("repeat");
        }
        else{
            let customer = []
            document.getElementById('form').classList.toggle('hidden')
            document.getElementById('orderDetails').classList.toggle('hidden')
            customer = [{customerName: `${name}`, customerCardNumber: `${cardNumber}`, customerCvv: `${cvv}`}]
            document.getElementById('greeting').innerHTML = `Thanks, ${customer[0].customerName}! Your order is on its way!`
            document.getElementById('greeting').classList.toggle('hidden')
        }
    }
})

// function handleRemoveClick(removeId){
//     console.log(removeId)
//     // const removeTraget = orderArray.filter(remove=>{
//     //     return remove.id == removeId
//     // })
//     // for(let i=0; i<orderArray.length;i++){
//     //     if(orderArray[i] === removeTraget[0]){
//     //         orderArray.shift(i)
//     //     }
//     // }
//     // console.log(orderArray);
//     // addingToArray()
// }

function handleAddClick(addId){
    const targetAddId = menuArray.filter(add=>{
        return add.id == addId
    })[0]
    orderArray.push(targetAddId)
    addingToArray()
}

function addingToArray(){
    orderDetailsHTML =''
    orderArray.forEach(order=>{
        orderDetailsHTML += `<div class="row" id='ordersAdding'> 
                                <span class="col-10" id="OrderName">${order.name}</span>
                                <span class="col-2 orderPrice" id="orderPrice">$${order.price}</span>
                            </div>`
    })
    for(let i=0; i<orderArray.length;i++){
        array[i] = orderArray[i].price
    }
    for(let i=0; i<array.length;i++){
        sum += array[i]
    }
    document.getElementById('total-price').textContent = `$${sum}`
    sum = 0 
    document.getElementById('orderList').innerHTML = orderDetailsHTML

}

function getInnerFeed(){
    let innerFeed = ''
    menuArray.forEach((menu)=>{
        innerFeed += `<div class="container">
                        <div class='row'>
                            <p class="emoji col-lg-2">${menu.emoji}</p>
                            <div class="contents col">
                                <p class="name">${menu.name}</p>
                                <p class="ingredients">${menu.ingredients}</p>
                                <p class="price">$${menu.price}</p>
                            </div>
                            <div class="col-2">
                                <i class="fa-solid fa-circle-plus add-icon" data-addOrder='${menu.id}'></i>
                            </div>
                        </div>
                    </div>
                    <center><div class="hr"></div></center>`
    })
    return innerFeed
} 

function render(){
    document.getElementById('feed').innerHTML = getInnerFeed()
}
render()
