const queryParameters = new URL(window.location.href)
let myId = queryParameters.searchParams.get('id')
let prod = []

fetch(`https://product-feedback-api-hry7.onrender.com/productRequests/${myId}`)
.then(response=>response.json())
.then(data=>{

prod = data
displayDetails(prod)

})


document.getElementById('editRoute').addEventListener('click', (e)=>{
    const queryParameters1 = new URL(window.location.href)

let myId1 = queryParameters1.searchParams.get('id')
window.location=`editFeedback.html?id=${myId1}`
    
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
pageDetails.append(myDetailsInner)
   console.log(prod.comments)



   const detailsComments = document.getElementById('details-comments')
   const myCommentsInner = document.createElement('div')

   for(let i =0; i<prod.comments.length;i++){
    if(prod.comments[i].replies){
            myCommentsInner.innerHTML=`
            <div class="details-comments">
        <div class="profile" id="myProfile">
            <img class="profile-pic"src=${prod.comments[i].user.image}>
            <div class="profs">
            <p class="prof-name h4 dark-text">${prod.comments[i].user.name}</p>
            <p class="prof-handle body-2 light-text">@${prod.comments[i].user.username}</p>
           </div>
            <p class="reply flex-end body-3" id="reply-btn">Reply</p>
        </div>
        <div id="comments-content">
            <p class="body-2 light-text">${prod.comments[i].content}</p>
        </div>
    
        ` 
    
            for(let j=0;j<prod.comments[i].replies.length;j++){
                console.log(prod.comments[i].replies[j].user.image)
                const myReply = document.createElement('div')
               myReply.className='content-inner'
                myReply.innerHTML=` <div class="profile-reply">
            <img class="profile-pic"src=${prod.comments[i].replies[j].user.image}>
            <div class="profs">
            <p class="prof-name h4 dark-text">${prod.comments[i].replies[j].user.name}</p>
            <p class="prof-handle body-2 light-text">@${prod.comments[i].replies[j].user.username}</p>
           </div>
            <p class="reply flex-end body-3" id="reply-btn">Reply</p>
        </div>
        <div class="reply-content">
            <p class="body-2 light-text">${prod.comments[i].replies[j].content}</p>
        </div>
    </div>
    </div>`
    replyDiv?.append(myReply)
    detailsComments.append(myCommentsInner)
    
    
            }
       
        }  




          else{
    

    myCommentsInner.innerHTML=`  <div class="details-comments">
   
    <div class="profile" id="myProfile">
        <img class="profile-pic"src=${prod.comments[i].user.image}>
        <div class="profs">
        <p class="prof-name h4 dark-text">${prod.comments[i].user.name}</p>
        <p class="prof-handle body-2 light-text">@${prod.comments[i].user.username}</p>
       </div>
        <p class="reply flex-end body-3" id="reply-btn">Reply</p>
    </div>
    <div>
        <p class="body-2 light-text">${prod.comments[i].content}</p>
    </div>

    ` 
    detailsComments.append(myCommentsInner)

    
    }
    }
    const logReply = document.getElementById('comments-content')
    console.log(logReply)
    const replyClick = document.getElementsByClassName('reply')
    for(let i=0; i<replyClick.length;i++){
        replyClick[i].addEventListener('click', ()=>{
            const Rbox = document.getElementById('replybox')
            Rbox.innerHTML=`<input class="reply-input">
            <button class="reply-btn h4" id="post-reply">Post Reply</button>`

            logReply.append(replyClick)

        });
    }
    // replyClick.forEach(btn => {

    //     btn.addEventListener('click', replyComment);
     
    //  });
    // replyClick.addEventListener('click',replyComment)
  
   }


  

   function replyComment(){
    // const Rbox = document.getElementById('replybox')

    // Rbox.innerHTML=`<input class="reply-input">
    // <button class="reply-btn h4" id="post-reply">Post Reply</button>`

    // if(Rbox.style.display==='none'){
    //     Rbox.style.display==='block'
    // }
   }

   const postComment = document.getElementById('post-comment')

   postComment.addEventListener('click',AddComment)

   function AddComment(){
    const newComment = document.getElementById('pst-comment').value

    fetch(`https://product-feedback-api-hry7.onrender.com/currentUser`)
    .then(response=>response.json())
    .then((response)=>{
        console.log(response.name)
        console.log(prod.comments)
        let comment = {
            // id:prod.comments.length
            content:newComment,
            user:response
        }

        let updated = prod.comments
        // console.log(prod.comments)
        updated.push(comment)
        // console.log(prod.comments)


        fetch(`https://product-feedback-api-hry7.onrender.com/productRequests/${myId}`, { 
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
              },
              body: JSON.stringify({comments:updated}
              )
            })
        .then(response=>response.json())
       .then(c=>{
        prod=c
        console.log(prod)
        location.reload();
    
       }
    
       )

    })
 
   }


   const postReply = document.getElementById('post-reply')
   console.log(postReply)

   postReply.addEventListener('click',AddReply)

   function AddReply(){
    console.log(prod.comments.replies)
    console.log('hi')
   }

      
  
   
   

    
 













