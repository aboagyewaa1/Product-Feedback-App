let prod = []

fetch('data/data.json')
.then(response=>response.json())
.then(data=>{
    prod = data.productRequests
    displayData(prod)
})

const suggNo = document.getElementById('sugg-no')
   
const myAdd = document.getElementById('content1')
  function displayData(prod){
     
    console.log(prod)
    
    suggNo.innerHTML=`${prod.length} Suggestions`
    myAdd.innerHTML=''
    for(let i=0;i<prod.length;i++){
        
        const myContentInner = document.createElement('div')
        myContentInner.className='content-inner'
        myContentInner.innerHTML=` 
        <div class="inner-box-content">              
         <div class="upvotes">
            <img class="up-marg" src="assets/shared/icon-arrow-up.svg">
            <p class="up-text h4">${prod[i].upvotes}</p>
        </div>
        <div class="content-mid">
            <p class="h3 marg-0 dark-text" id="title-A">${prod[i].title}</p>
            <p class="body-1 marg-0 light-text">${prod[i].description}</p>
            <p class="marg-0 tag body-3">${prod[i].category}</p>

        </div>
        <div class="comments flex-end">
            <img class="comments-svg" src="assets/shared/icon-comments.svg">
             <p>${prod[i].comments ? prod[i].comments.length:0}</p>
            </div>
        </div>`
        // console.log(prod[i].comments?comments.length:0)
        myAdd.append(myContentInner)
      
 
}  
}
const navBtns = document.getElementsByClassName('nav-btn');


for (let i = 0; i < navBtns.length; i++) {
  navBtns[i].addEventListener('click', filterTag);
  console.log(navBtns[i].innerHTML)

 
 
}
radiobutton = document.getElementById("all-btn");
radiobutton.clicked= true;


function filterTag(e){
    console.log(e.target)
    let value = e.target.innerHTML
    let result = value.toLowerCase()
    console.log(value)
    let newValue=[]
    console.log(prod)

    event.target.style.backgroundColor='#4661E6';
    event.target.style.color='white';
    if(value==='All'){
        newValue=prod
        displayData(newValue)

    }
    else if(value==='Bug'){
        newValue= prod.filter(category=>category.category==='bug')
        displayData(newValue)

    }
    else if(value==='Enhancement'){
        newValue= prod.filter(category=>category.category==='enhancement')
        displayData(newValue)

    }
    else if(value==='UI'){
        newValue= prod.filter(category=>category.category==='ui')
        displayData(newValue)

    }
    else if(value==='UX'){
        newValue= prod.filter(category=>category.category==='ux')
        displayData(newValue)

    }
    else if(value==='Feature'){
        newValue= prod.filter(category=>category.category==='feature')
        displayData(newValue)

    }
   


}