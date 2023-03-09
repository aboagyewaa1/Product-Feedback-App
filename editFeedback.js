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
        <input class="input-box" value="${prod.title}">
        
    </div>
    <div class="form-div">
        <p class="h4 dark-text">Category</p>
        <p class="body-2 light-text ">Choose a category for your feedback</p>
        <select class="svg-arrow input-box" id="input-cat">
            <option value="feature">Feature</option>
            <option value="ui">UI</option>
            <option value="ux">UX</option>
            <option value="enhancement">Enhancement</option>
            <option value="bug">Bug</option>
        </select>
    </div>
    <div class="form-div">
        <p class="h4 dark-text">Update Status</p>
        <p class="body-2 light-text ">Change Feedback state</p>
        <select class="svg-arrow input-box"  id="input-state">
            <option value="suggestion">Suggestion</option>
            <option value="planned">Planned</option>
            <option value="in-progress">In-Progress</option>
            <option value="live">Live</option>
        </select>
    </div>
    <div class="form-div last-form-div">
        <p class="h4 dark-text">Feedback Detail</p>
        <p class="body-2 light-text ">Include any specific comments on what should be included,added etc</p>
        <input class="input-box-big" value="${prod.description}">
    </div>

    <button class="del-btn h4">Delete</button>
    <button class="cancel-btn h4">Cancel</button>
    <button class="save-changes-btn h4">Save Changes</button>
    </form>`
   
    console.log(prod)


    // const $categoryInput= document.querySelector('#input-cat')

    // console.log($categoryInput)
    // console.log(prod.category)
     
       
    const $select = document.querySelector('#input-cat');
  const $options = Array.from($select.options);


  for(let i =0;i<$options.length;i++){
    if($options[i].value===prod.category){
        $options[i].selected=true;
    }

  }
  const $select1 = document.querySelector('#input-state');
  const $options1 = Array.from($select1.options);


  for(let i =0;i<$options1.length;i++){
    if($options1[i].value===prod.status){
        $options1[i].selected=true;
    }

  }
  const formEd = document.querySelector('#edit');

  formEd.addEventListener('submit', editFeedback)

}


    

function editFeedback(e){
    e.preventDefault()
    console.log(myId1)

    const formEdit = new FormData(document.getElementById('edit'));
    console.log(formEdit.values)
    const dataEdit = Object.fromEntries(formEdit)
    console.log(dataEdit)
    fetch(`https://product-feedback-api-hry7.onrender.com/productRequests/${myId1}`, { 
  method: "PATCH",
  headers: {
      "Content-Type" : "application/json"
    },
  body: JSON.stringify(
    {
      "likes": 5           // we are changing the "likes" value to 5
    }
  )
})

}