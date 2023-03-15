const queryParameters = new URL(window.location.href)
let myId = queryParameters.searchParams.get('id')
let prod = []

fetch(`https://product-feedback-api-hry7.onrender.com/productRequests/${myId}`)
    .then(response => response.json())
    .then(data => {

        prod = data
        displayDetails(prod)

    })


document.getElementById('editRoute').addEventListener('click', (e) => {
    const queryParameters1 = new URL(window.location.href)

    let myId1 = queryParameters1.searchParams.get('id')
    window.location = `editFeedback.html?id=${myId1}`

})


function displayDetails(prod) {
    const pageDetails = document.getElementById('details-title')
    const replyDiv = document.getElementById('replies')
    const myDetailsInner = document.createElement('div')
   
    
    // var totalLength = prod.comments?.length + prod.comments.replies?.length 
    
    myDetailsInner.className = 'content-inner'
    myDetailsInner.innerHTML = `
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
                <p>${prod.comments ? prod.comments.length : 0}</p>
            </div>
        </div>
    `
    pageDetails.append(myDetailsInner)

    const detailsComments = document.getElementById('details-comments')
    let replyCount = 0;
    for (let i = 0; i < prod.comments.length; i++) {
        
        const myCommentsInner = document.createElement('div')
        if (prod.comments[i].replies) {
            var com = prod.comments?.length
            var rep = prod.comments[i].replies?.length
            console.log(com)
            console.log(rep)

            myCommentsInner.innerHTML = `
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
                        <div id='replies-${prod.comments[i].id}' class="replies"></div>
                        <div class='replyboxes' data-target='${prod.comments[i].id}' id="replybox"></div>
                    </div>
                </div>
            `
            detailsComments.append(myCommentsInner)

            for (let j = 0; j < prod.comments[i].replies.length; j++) {
                const myReply = document.createElement('div')
                myReply.className = 'content-inner'
                myReply.innerHTML = `
                    <div class="reply-div"> 
                        <div class="profile-reply">
                            <img class="profile-pic"src=${prod.comments[i].replies[j].user.image}>
                            <div class="profs">
                                <p class="prof-name h4 dark-text">${prod.comments[i].replies[j].user.name}</p>
                                <p class="prof-handle body-2 light-text">@${prod.comments[i].replies[j].user.username}</p>
                            </div>
                            <p class="reply flex-end body-3" id="reply-btn">Reply</p>
                        </div>
                        <div class="reply-content">
                            <p class="body-2 light-text "> 
                            <p class=" h4"><p id="replyTo">@${prod.comments[i].replies[j].replyingTo}</p></p>
                            ${prod.comments[i].replies[j].content}</p>
                            <div class='replyboxes' data-target='${prod.comments[i].id}' id="replybox"></div>
                        </div>
                    </div>
                `
                
                document.querySelector(`#replies-${prod.comments[i].id}`)?.append(myReply)
            }

            replyCount += prod.comments[i].replies.length
        } else {
            myCommentsInner.innerHTML = `  
                <div id='comments-${prod.comments[i].id}' class="details-comments">
                    <div class="profile" id="myProfile">
                        <img class="profile-pic"src=${prod.comments[i].user.image}>
                        <div class="profs">
                            <p class="prof-name h4 dark-text">${prod.comments[i].user.name}</p>
                            <p class="prof-handle body-2 light-text">@${prod.comments[i].user.username}</p>
                        </div>
                        <p class="reply flex-end body-3" data-id='${prod.comments[i].id}' id="reply-btn">Reply</p>
                    </div>
                    <div>
                        <p class="body-2 light-text">${prod.comments[i].content}</p>
                        <div class='replyboxes' data-target='${prod.comments[i].id}' id="replybox"></div>
                    </div>
                </div>
            `
            detailsComments.append(myCommentsInner)
        }

    }
    let totalCount = prod.comments.length + replyCount
    document.getElementById('tot-len').innerHTML=`${totalCount} comments`

    // console.log(detailsComments)


    const logReply = document.getElementById('comments-content')
    // console.log(logReply)
    const replyClick = document.getElementsByClassName('reply')
    for (let i = 0; i < replyClick.length; i++) {
        replyClick[i].addEventListener('click', () => {
            const id = replyClick[i].dataset.id;
            const Rbox = document.querySelector(`[data-target="${id}"]`)

            Rbox.innerHTML = `
                <input class="reply-input" name='reply-box-${id}' id="pst-reply">
                <button class="reply-btn h4" id="post-reply" data-comment='${id}' name='reply-box-${id}'>Post Reply</button>
            `

            const postReply = document.querySelector(`button[name="reply-box-${id}"]`)
            postReply?.addEventListener('click', AddReply)
        });
    }



}




const postComment = document.getElementById('post-comment')
postComment.addEventListener('click', AddComment)

function AddComment() {
    const newComment = document.getElementById('pst-comment').value

    fetch(`https://product-feedback-api-hry7.onrender.com/currentUser`)
        .then(response => response.json())
        .then((response) => {
            console.log(response.name)
            console.log(prod.comments)
            let comment = {
                // id:prod.comments.length
                content: newComment,
                user: response
            }

            let updated = prod.comments
            updated.push(comment)



            fetch(`https://product-feedback-api-hry7.onrender.com/productRequests/${myId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ comments: updated }
                )
            })
                .then(response => response.json())
                .then(c => {
                    prod = c
                    console.log(prod)
                    location.reload();

                }

                )

        })



}


function AddReply() {
    const newReply = document.querySelector(`input[name='${this.getAttribute('name')}']`).value
    const commentId = this.dataset.comment;

    fetch(`https://product-feedback-api-hry7.onrender.com/currentUser`)
        .then(response => response.json())
        .then((response) => {
            for (let i = 0; i < prod.comments.length; i++) {
                const comment = prod.comments[i];

                if (comment.id == commentId) {  
                    let reply = {
                        content: newReply,
                        user: response,
                        replyingTo: comment.user.username
                    }                  
                    if (Object.hasOwnProperty.call(comment, 'replies')) {
                        comment.replies.push(reply)

                    } else {
                        comment['replies'] = [reply]

                    }

                    prod.comments[i] = comment
                }
            }

            // let updatedReply = prod.comments.replies
            // updatedReply.push(reply)

            fetch(`https://product-feedback-api-hry7.onrender.com/productRequests/${myId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ comments: prod.comments }
                )
            })
                .then(response => response.json())
                .then(c => {
                    prod = c
                    console.log(prod)
                    location.reload();
                }
            )
        })
}


const postChar = document.getElementById('pst-comment')
postChar.addEventListener('keyup', displayChar)


function displayChar() {
    const charleft = document.getElementById('char-length')
    const userInput = document.getElementById('pst-comment').value
    const character = 250 - userInput.length


    charleft.innerHTML = `${character} characters left
    `



}





















