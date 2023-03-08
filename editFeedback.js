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

document.getElementById('editRoute').addEventListener('click', (e)=>{
    const queryParameters1 = new URL(window.location.href)

let myId1 = queryParameters1.searchParams.get('id')
window.location=`editFeedback.html?id=${myId1}`
    
})


function editDetails(prod){

    const formDetails = document.getElementById('formA')
    formDetails.innerHTML=`<p class="h1 form-title">Editing '${prod.title}'</p>
    <div class="form-div">
        <p class="h4 dark-text">Feedback Title</p>
        <p class="body-2 light-text">Add a short,descriptive headline</p>
        <input class="input-box" placeholder=${prod.description}>
        
    </div>
    <div class="form-div">
        <p class="h4 dark-text">Category</p>
        <p class="body-2 light-text ">Choose a category for your feedback</p>
        <select class="svg-arrow input-box">
            <option>Feature</option>
            <option>UI</option>
            <option>UX</option>
            <option>Enhancement</option>
            <option>Bug</option>
        </select>
    </div>
    <div class="form-div">
        <p class="h4 dark-text">Update Status</p>
        <p class="body-2 light-text ">Change Feedback state</p>
        <select class="svg-arrow input-box" placeholder=${prod.category}>
            <option>Suggestion</option>
            <option>Planned</option>
            <option>In-Progress</option>
            <option>Live</option>
        </select>
    </div>
    <div class="form-div last-form-div">
        <p class="h4 dark-text">Feedback Detail</p>
        <p class="body-2 light-text ">Include any specific comments on what should be included,added etc</p>
        <input class="input-box-big">
    </div>

    <button class="del-btn h4">Delete</button>
    <button class="cancel-btn h4">Cancel</button>
    <button class="save-changes-btn h4">Save Changes</button>`

    console.log(prod)

}