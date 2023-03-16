const queryParameters1 = new URL(window.location.href)
// console.log(queryParameters.searchParams.get('id'))
let myId1 = queryParameters1.searchParams.get('id')
// console.log(myId)
let prod = []

fetch(`https://product-feedback-api-hry7.onrender.com/productRequests/${myId1}`)
.then(response=>response.json())
.then(data=>{

prod = data
editDetails(prod)

// console.log(prod)
// console.log(prod.comments[0].user.image)
// displayData(prod)
})



function editDetails(prod){

    const formDetails = document.getElementById('formA')
    formDetails.innerHTML=`
    <form class="edit" id="edit">
    
    <p class="h1 form-title">Editing '${prod.title}'</p>
    <div class="form-div">
        <p class="h4 dark-text">Feedback Title</p>
        <p class="body-2 light-text">Add a short,descriptive headline</p>
        <input class="input-box" name="title" value="${prod.title}">
        
    </div>
    <div class="form-div">
        <p class="h4 dark-text">Category</p>
        <p class="body-2 light-text ">Choose a category for your feedback</p>
        <div class="dropdown1" id="xyz">
        <p  class="dropbtn1 body-2 input-box svg-arrow1 dark-text" id="catSel1" >${prod.category}<svg class="myArrow" width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4 4 4-4" stroke="#4661E6" stroke-width="2" fill="none" fill-rule="evenodd"/></svg></p>
         <div id="myDropdown2" class="dropdown-content2  " >
           <a  class="sel-cat light-text " value="feature">Feature</a>
           <a  class="sel-cat light-text" value="ui">UI</a>
           <a  class="sel-cat light-text" value="ux">UX</a>
           <a  class="sel-cat light-text" value="enhancement">Enhancement</a>
           <a  class="sel-cat light-text" value="bug">Bug</a>
         </div>
       </div>
       <input type="hidden" name="category" id="form-cat1">
  
    </div>
    <div class="form-div">
        <p class="h4 dark-text">Update Status</p>
        <p class="body-2 light-text ">Change Feedback state</p>
        <div class="dropdown1" id="abc">
        <p  class="dropbtn1 body-2 input-box svg-arrow1 dark-text" id="catSel2" >${prod.status}<svg class="myArrow" width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4 4 4-4" stroke="#4661E6" stroke-width="2" fill="none" fill-rule="evenodd"/></svg></p>
         <div id="myDropdown1" class="dropdown-content1 " >
           <a  class="sel-stat light-text " value="suggestion">Suggestion</a>
           <a  class="sel-stat light-text" value="planned">Planned</a>
           <a class="sel-stat light-text" value="in-progress">In-Progress</a>
           <a  class="sel-stat light-text" value="live">Live</a>
         </div>
       </div>
       <input type="hidden" name="status" id="form-state">

    
    </div>
    <div class="form-div last-form-div">
        <p class="h4 dark-text">Feedback Detail</p>
        <p class="body-2 light-text ">Include any specific comments on what should be included,added etc</p>
        <input name="description" class="input-box-big" value="${prod.description}">
    </div>
    <div class="bttn-div">
    <button class="del-btn h4">Delete</button>
    <button class="cancel-btn h4">Cancel</button>
    <button class="save-changes-btn h4">Save Changes</button></div>
    </form>`
   
    console.log(prod)


 document.getElementById('abc').addEventListener('click',()=>{
  document.getElementById('catSel2').classList.add('blue-border')
  // console.log('hi')
  var cust = document.getElementsByClassName("dropdown-content1")
  for(const cus of cust){
    if(cus.classList.contains("show1")){
      cus.classList.remove("show1")
    } else{
      cus.classList.add("show1")
    }
  }

 })

const state1 =document.querySelectorAll('.sel-stat')
const stValue = document.getElementById('catSel2')
const editStatus = document.getElementById('form-state')

for(const stat of state1){
  stat.addEventListener('click',()=>{
    let v= stat.getAttribute("value")
    let q = stat.innerHTML
    switch(v){
      case 'suggestion':
      stValue.innerHTML=q
      console.log(q)
      break;
      case 'planned':
        stValue.innerHTML=q
        break;
     case 'in-progress':
        stValue.innerHTML=q
        break;
      case 'live':
         stValue.innerHTML=q
          break;


    }
    editStatus.setAttribute("value", v);
    var cust = document.getElementsByClassName("dropdown-content1")
    for(const cus of cust){
      if(cus.classList.contains("show1")){
        cus.classList.remove("show1")
      } else{
        cus.classList.add("show1")
      }
    }

  })
}

document.getElementById('xyz').addEventListener('click',()=>{
  document.getElementById('catSel1').classList.add('blue-border')
  // console.log('hi')
  var cust1 = document.getElementsByClassName("dropdown-content2")
  for(const cus1 of cust1){
    if(cus1.classList.contains("show2")){
      cus1.classList.remove("show2")
    } else{
      cus1.classList.add("show2")
    }
  }

 })

const state2 =document.querySelectorAll('.sel-cat')
const stValue1 = document.getElementById('catSel1')
let editCat = document.getElementById('form-cat1')

for(const stat1 of state2){
  stat1.addEventListener('click',()=>{
    let m= stat1.getAttribute("value")
    let n = stat1.innerHTML
    switch(m){
      case 'feature':
      stValue1.innerHTML=n
     
      break;
      case 'ui':
        stValue1.innerHTML=n
        break;
     case 'ux':
        stValue1.innerHTML=n
        break;
      case 'enhancement':
         stValue1.innerHTML=n
          break;
      case 'bug':
        stValue1.innerHTML=n
          break;


    }
    editCat.setAttribute("value", m);

    var cust1 = document.getElementsByClassName("dropdown-content2")
    for(const cus1 of cust1){
      if(cus1.classList.contains("show2")){
        cus1.classList.remove("show2")
      } else{
        cus1.classList.add("show2")
      }
    }

  })
}
     
       

  const formEd = document.querySelector('#edit');

  formEd.addEventListener('submit', editFeedback)


}


    

function editFeedback(e){
    e.preventDefault()
    // console.log(document.getElementById('edit'))  

    const formEdit = new FormData(document.getElementById('edit'));
    console.log(formEdit)
    const dataEdit = Object.fromEntries(formEdit)
    console.log(dataEdit)
    fetch(`https://product-feedback-api-hry7.onrender.com/productRequests/${myId1}`, { 
  method: "PATCH",
  headers: {
      "Content-Type" : "application/json"
    },
  body: JSON.stringify(dataEdit
  )
 })

 .then(()=>location.reload())


}