let prod = []


function nextPage(){

}


//Add Feedback

const formEl = document.querySelector('.form');

formEl?.addEventListener('submit',event=>{
    event.preventDefault();


    const formData = new FormData(formEl);
    // console.log(formData)


    const data = Object.fromEntries(formData)
    fetch('https://product-feedback-api-hry7.onrender.com/productRequests',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
        
    })//.then(res => res.json())
    // .then(data=>console.log(data))
    // console.log(data)
})

//Add/Remove active class from nav btn

function toggleActive(event) {
    if( !document.getElementById('icon-open').classList.contains('active1')) {
        document.getElementById('icon-open').classList.add('active1')
        document.getElementById('mobile-sidebar').classList.remove('active1')
        document.getElementById('icon-close').classList.remove('active1')
    }

    var target = event.target || event.srcElement;
    var buttonList = document.querySelectorAll(".nav-btn");
    buttonList.forEach(function(button) {
        if (button === target && !button.classList.contains("active")) {
            return button.classList.add("active");
        }
        
      return button.classList.remove("active");
    });
  }

  //fetch data on page

fetch('https://product-feedback-api-hry7.onrender.com/productRequests')
.then(response=>response.json())
.then(data=>{
    // console.log(data)
    prod = data
    // console.log(prod)
    displayData(prod)
})

const suggNo = document.getElementById('sugg-no')
   
const myAdd = document.getElementById('content1')
//display data on page
  function displayData(prod){
     
    console.log(prod)

    let planned =[]
    let progress =[]
    let live =[]
    
    planned = prod.filter(stat=>stat.status==='planned')
    progress = prod.filter(stat=>stat.status==='in-progress')
    live = prod.filter(stat=>stat.status==='live')

    const planL1 = document.getElementById('len-plan')
    const progL1 = document.getElementById('len-prog')
    const liveL1 = document.getElementById('len-live')

    const planL2 = document.getElementById('len-plan1')
    const progL2 = document.getElementById('len-prog1')
    const liveL2 = document.getElementById('len-live1')

planL1.innerHTML=planned.length
progL1.innerHTML=progress.length
liveL1.innerHTML=live.length

planL2.innerHTML=planned.length
progL2.innerHTML=progress.length
liveL2.innerHTML=live.length
    
    suggNo.innerHTML=`${prod.length} Suggestions`
    myAdd.innerHTML=''
    if(prod.length>1){
        document.getElementById('view-text').classList.remove('opacity-view')
        document.getElementById('view-text').setAttribute("href","roadmap.html")
    for(let i=0;i<prod.length;i++){
        
        const myContentInner = document.createElement('div')
        myContentInner.className='content-inner'
        myContentInner.innerHTML=` 
        <div class="inner-box-content">              
         <div class="upvotes">
            <svg class="up-marg"  width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 6l4-4 4 4" stroke="#4661E6" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>
            <p class="up-text h4">${prod[i].upvotes?prod[i].upvotes:0}</p>
        </div>
        <div class="content-mid">
        <a href="feedbackDetails.html?id=${prod[i].id}">
            <p class="h3 marg-0 dark-text" id="title-A">${prod[i].title}</p></a>
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
    document.getElementById('view-text').classList.add('opacity-view')
    document.getElementById('view-text').removeAttribute("href")
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
//   console.log(navBtns[i].innerHTML)

 
 
}
// radiobutton = document.getElementById("all-btn");
// radiobutton.clicked= true;


function filterTag(e){
    toggleActive(e)
    let value = e.target.innerHTML.trim()
    let result = value.toLowerCase()
    // console.log(result)
    // console.log(prod)
    let newValue=[]
   
    // event.target.style.backgroundColor='#4661E6';
    // event.target.style.color='white';
    if(value==='All'){
        // console.log(`${value}--`)
        newValue=prod
        // console.log(prod)
        // console.log(newValue)
        displayData(newValue)

    }
    else if(value==='Bug'){
        
        newValue= prod.filter(category=>category.category.toLowerCase()==='bug')
        displayData(newValue)

    }
    else if(value==='Enhancement'){
        newValue= prod.filter(category=>category.category.toLowerCase()==='enhancement')
        displayData(newValue)

    }
    else if(value==='UI'){
        newValue= prod.filter(category=>category.category.toLowerCase()==='ui')
        displayData(newValue)

    }
    else if(value==='UX'){
        newValue= prod.filter(category=>category.category.toLowerCase()==='ux')
        displayData(newValue)

    }
    else if(value==='Feature'){
        newValue= prod.filter(category=>category.category.toLowerCase()==='feature')
        displayData(newValue)

    }
   


}


    const icons = document.querySelectorAll('.hamburger')
    for (const icon of icons) {
        icon.addEventListener('click', () => {
            const id = icon.getAttribute('id')
            icon.classList.remove('active1')
            if(id == 'icon-open') {
                document.getElementById('icon-close').classList.add('active1')
                document.getElementById('mobile-sidebar').classList.add('active1')
            } else {
                document.getElementById('icon-open').classList.add('active1')
                document.getElementById('mobile-sidebar').classList.remove('active1')
            }
        })
    }
    const sorty = document.querySelectorAll('.sort-acc')
    for (const sel of sorty) {
        sel.addEventListener('click', () => {
            let grab = sel.getAttribute('value')
            let innGrab = sel.innerHTML
            let dis_sel = document.getElementById('display-sel')
            switch(grab){
                case 'most-upvotes':
                    dis_sel.innerHTML= innGrab
                    displayData([...prod].sort((prev, next) => {
                        return prev.upvotes > next.upvotes ? -1 : 1;
                    }))
                    break;
              case 'least-upvotes':
                dis_sel.innerHTML = innGrab
                    displayData([...prod].sort((prev, next) => {
                        return prev.upvotes < next.upvotes ? -1 : 1;
                    }))
                    break;
                case 'most-comments':
                    dis_sel.innerHTML = innGrab
                    displayData([...prod].sort((prev, next) => {
                        return (prev.comments?.length ?? 0) > (next.comments?.length ?? 0) ? -1 : 1;
                    }))
                    break;
                case 'least-comments':
                    dis_sel.innerHTML = innGrab
                    displayData([...prod].sort((prev, next) => {
                        return (prev.comments?.length ?? 0) < (next.comments?.length ?? 0) ? -1 : 1;
                    }))
                    break;

            }
         
        })
    }


        // document.getElementById('sort1').addEventListener('change',()=>{
        //     switch(document.getElementById('sort1').value){
        //         case 'most-upvotes':
        //             displayData([...prod].sort((prev, next) => {
        //                 return prev.upvotes > next.upvotes ? -1 : 1;
        //             }))
        //             break;

        //         case 'least-upvotes':
        //             displayData([...prod].sort((prev, next) => {
        //                 return prev.upvotes < next.upvotes ? -1 : 1;
        //             }))
        //             break;
        //         case 'most-comments':
        //             displayData([...prod].sort((prev, next) => {
        //                 return (prev.comments?.length ?? 0) > (next.comments?.length ?? 0) ? -1 : 1;
        //             }))
        //             break;
        //         case 'least-comments':
        //             displayData([...prod].sort((prev, next) => {
        //                 return (prev.comments?.length ?? 0) < (next.comments?.length ?? 0) ? -1 : 1;
        //             }))
        //             break;
        //     }
        // })




/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }