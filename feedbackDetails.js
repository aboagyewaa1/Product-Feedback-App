const queryParameters = new URL(window.location.href)
// console.log(queryParameters.searchParams.get('id'))
let myId = queryParameters.searchParams.get('id')
// console.log(myId)
let prod = []

fetch(`https://product-feedback-api-hry7.onrender.com/productRequests/${myId}`)
.then(response=>response.json())
.then(data=>{

prod = data
displayDetails(prod)
editDetails(prod)
// console.log(prod)
// console.log(prod.comments[0].user.image)
// displayData(prod)
})


function displayDetails(prod){

    const pageDetails = document.getElementById('details-title')
    const replyDiv = document.getElementById('replies')
    const myDetailsInner = document.createElement('div')
    myDetailsInner.className='content-inner'
   

    myDetailsInner.innerHTML=`
    <div class="inner-box-content">              
 <div class="upvotes">
    <img class="up-marg" src="assets/shared/icon-arrow-up.svg">
    <p class="up-text h4 dark-text">${prod.upvotes}</p>
</div>
<div class="content-mid">
<a href="feedbackDetails.html?id=${prod.id}">
    <p class="h3 marg-0 dark-text" id="title-A">${prod.title}</p></a>
    <p class="body-1 marg-0 light-text">${prod.description}</p>
    <p class="marg-0 tag body-3">${prod.category}</p>

</div>
<div class="comments flex-end">
    <img class="comments-svg" src="assets/shared/icon-comments.svg">
     <p>${prod.comments ? prod.comments.length:0}</p>
    </div>
</div>`

console.log(prod.comments.replies)

pageDetails.append(myDetailsInner)

for(let i=0; i<prod.comments.length;i++){
    // console.log(prod.comments[i])
    
    const detailsComments = document.getElementById('details-comments')
    const myCommentsInner = document.createElement('div')
    // myCommentsInner.className='details-comments'

    myCommentsInner.innerHTML=`  <div class="details-comments">
    <p class="dark-text h3">4 comments</p>
    <div class="profile" id="myProfile">
        <img class="profile-pic"src=${prod.comments[i].user.image}>
        <div class="profs">
        <p class="prof-name h4 dark-text">${prod.comments[i].user.name}</p>
        <p class="prof-handle body-2 light-text">@${prod.comments[i].user.username}</p>
       </div>
        <p class="reply flex-end body-3">Reply</p>
    </div>
    <div>
        <p class="body-2 light-text">${prod.comments[i].content}</p>
    </div>

    `
    
    if(prod.comments[i].replies){
        console.log(prod.comments[i].replies)
        for(let j=0;i<prod.comments[i].replies.length;i++){
            console.log(prod.comments[i].replies[j])
            const myReply = document.createElement('div')
           myReply.className='content-inner'
            myReply.innerHTML=` <div class="profile-reply">
        <img class="profile-pic"src=${prod.comments[i].replies[j].user.image}>
        <div class="profs">
        <p class="prof-name h4 dark-text">${prod.comments[i].user.name}</p>
        <p class="prof-handle body-2 light-text">@${prod.comments[i].user.username}</p>
       </div>
        <p class="reply flex-end body-3">Reply</p>
    </div>
    <div class="reply-content">
        <p class="body-2 light-text">${prod.comments[i].content}</p>
    </div>
</div>
</div>`
replyDiv.append(myReply)

        }
    }

    detailsComments.append(myCommentsInner)
}



}


// function editDetails(prod){

//     const formDetails = document.getElementById('formA')
//     formDetails.innerHTML=`<p class="h1 form-title">Editing 'Add a dark theme option'</p>
//     <div class="form-div">
//         <p class="h4 dark-text">Feedback Title</p>
//         <p class="body-2 light-text">Add a short,descriptive headline</p>
//         <input class="input-box">
        
//     </div>
//     <div class="form-div">
//         <p class="h4 dark-text">Category</p>
//         <p class="body-2 light-text ">Choose a category for your feedback</p>
//         <select class="svg-arrow input-box">
//             <option>Feature</option>
//             <option>UI</option>
//             <option>UX</option>
//             <option>Enhancement</option>
//             <option>Bug</option>
//         </select>
//     </div>
//     <div class="form-div">
//         <p class="h4 dark-text">Update Status</p>
//         <p class="body-2 light-text ">Change Feedback state</p>
//         <select class="svg-arrow input-box">
//             <option>Suggestion</option>
//             <option>Planned</option>
//             <option>In-Progress</option>
//             <option>Live</option>
//         </select>
//     </div>
//     <div class="form-div last-form-div">
//         <p class="h4 dark-text">Feedback Detail</p>
//         <p class="body-2 light-text ">Include any specific comments on what should be included,added etc</p>
//         <input class="input-box-big">
//     </div>

//     <button class="del-btn h4">Delete</button>
//     <button class="cancel-btn h4">Cancel</button>
//     <button class="save-changes-btn h4">Save Changes</button>`

//     console.log(prod)

// }