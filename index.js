let prod = []


function toggleActive(event) {
    var target = event.target || event.srcElement;
    var buttonList = document.querySelectorAll(".nav-btn");
    buttonList.forEach(function(button) {
        if (button === target && !button.classList.contains("active")) {
            return button.classList.add("active");
        }
        
      return button.classList.remove("active");
    });
  }

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
    if(prod.length>1){
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
} else{
    myAdd.innerHTML=`  <div class="content-1">
    <div class="no-content">
     <center><img src="assets/suggestions//illustration-empty.svg">
     <p class="h1 no-yet">There is no feedback yet</p>
     <p class="body-1">Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app</p>
     <button onclick="location.href='newFeedback.html'" class="add-btn add-btn-top h4"><img class="arrow-plus" id="pad-20" src="assets/shared/icon-plus.svg">Add Feedback</button>
 </center>

    </div>

 </div>`

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
    toggleActive(e)
    let value = e.target.innerHTML
    let result = value.toLowerCase()
    console.log(value)
    let newValue=[]
    console.log(prod)

    // event.target.style.backgroundColor='#4661E6';
    // event.target.style.color='white';
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