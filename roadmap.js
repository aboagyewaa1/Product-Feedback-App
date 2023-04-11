let prod = []

fetch("https://product-feedback-api-hry7.onrender.com/productRequests")
.then(response=>response.json())
.then(data=>{
    prod = data
    console.log(prod)
   filterStatus(prod)

})


const myNavs=document.querySelectorAll('.nav-l')

for(const my of myNavs){
    my.addEventListener('click',()=>{
        const id1 = my.getAttribute('id')
       my.classList.remove('d-none')
        if(id1 == 'plan-div') {
            document.getElementById('planned').classList.add('d-block')
            document.getElementById('in-progress').classList.remove('d-block')
            document.getElementById('in-progress').classList.add('d-none')
            document.getElementById('live-1').classList.remove('d-block')

            //border-bottom
            document.getElementById('plan-div').classList.add('planD')
            document.getElementById('prog-div').classList.remove('progD')
            document.getElementById('live-div').classList.remove('livenD')
            //top
            document.getElementById('plan-top').classList.add('d-block')
            document.getElementById('prog-top').classList.remove('d-block')
            document.getElementById('prog-top').classList.add('d-none')
            document.getElementById('live-top').classList.remove('d-block')

            //opacity
            document.getElementById('plan-div').classList.remove('opace')
            document.getElementById('prog-div').classList.add('opace')
            document.getElementById('live-div').classList.add('opace')
        }
        else if(id1 == 'prog-div'){
            document.getElementById('in-progress').classList.add('d-block')
            document.getElementById('planned').classList.remove('d-block')
            document.getElementById('live-1').classList.remove('d-block')
              //border-bottom
              document.getElementById('plan-div').classList.remove('planD')
              document.getElementById('prog-div').classList.add('progD')
            document.getElementById('live-div').classList.remove('liveD')
              //top
              document.getElementById('plan-top').classList.remove('d-block')
              document.getElementById('prog-top').classList.add('d-block')
              document.getElementById('live-top').classList.remove('d-block')

                          //opacity
            document.getElementById('plan-div').classList.add('opace')
            document.getElementById('prog-div').classList.remove('opace')
            document.getElementById('live-div').classList.add('opace')
          
        }
         else if(id1=='live-div') {
            document.getElementById('live-1').classList.add('d-block')
            document.getElementById('planned').classList.remove('d-block')
            document.getElementById('in-progress').classList.add('d-none')
            document.getElementById('in-progress').classList.remove('d-block')
                //border-bottom
                document.getElementById('plan-div').classList.remove('planD')
                document.getElementById('prog-div').classList.remove('progD')
              document.getElementById('live-div').classList.add('liveD')

                          //top
           document.getElementById('plan-top').classList.remove('d-block')
         document.getElementById('prog-top').classList.remove('d-block')
         document.getElementById('prog-top').classList.add('d-none')
        document.getElementById('live-top').classList.add('d-block')

                    //opacity
                    document.getElementById('plan-div').classList.add('opace')
                    document.getElementById('prog-div').classList.add('opace')
                    document.getElementById('live-div').classList.remove('opace')
          
        }
    })
}



function filterStatus (prod){
    let planned =[]
let progress =[]
let live =[]

planned = prod.filter(stat=>stat.status==='planned')
progress = prod.filter(stat=>stat.status==='in-progress')
live = prod.filter(stat=>stat.status==='live')
console.log(prod)

console.log(planned)
console.log(progress)
console.log(live)

const plannedList = document.getElementById('planned')
const progressList = document.getElementById('in-progress')
const liveList = document.getElementById('live-1')
const planL = document.getElementById('plan-title-len')
const progL = document.getElementById('prog-title-len')
const liveL = document.getElementById('live-title-len')

planL.innerHTML=`Planned (${planned.length})`
progL.innerHTML=`In-Progress (${progress.length})`
liveL.innerHTML=`Live (${live.length})`
console.log(planned.length)


for(let i=0;i<planned.length;i++){
    const planbox = document.createElement('div')
    planbox.className='plan-box-1'
    planbox.setAttribute('id','planned-box')
    planbox.innerHTML=` <div class="inner-plan-box ">
    <div>
    <p class="round road-rnd" id="plan"></p><p id="spc" class="line-p light-text">Planned</p>
    </div>
<p class="h3 dark-text">${planned[i].title}</p>
<p class="body-1 light-text">${planned[i].description}</p>

<p class="nav-btn body-3 tag-1">${planned[i].category}</p>
<div class="last-row">
    <div class="upvotes-1">
        <img class="up-marg" src="assets/shared/icon-arrow-up.svg">
        <p class="up-text-1 body-3 dark-text">${planned[i].upvotes}</p>

    </div>
    <div  class="flex-end comments row-1">
        <img class="comments-svg-1" src="assets/shared/icon-comments.svg">
        <p class="end-text body-1 dark-text">${planned[i].comments?planned[i].comments.length:0}</p>

    </div>


</div>
</div>`


plannedList.append(planbox)

}

for(let i=0;i<live.length;i++){
    const livebox = document.createElement('div')
    livebox.className='plan-box-1'
    livebox.setAttribute('id','live-box')
    livebox.innerHTML=` <div class="inner-plan-box ">
    <div>
    <p class="round road-rnd" id="live"></p><p id="spc" class="line-p light-text">Live</p>
    </div>
<p class="h3 dark-text">${live[i].title}</p>
<p class="body-1 light-text">${live[i].description}</p>

<p class="nav-btn body-3 tag-1">${live[i].category}</p>
<div class="last-row">
    <div class="upvotes-1">
        <img class="up-marg" src="assets/shared/icon-arrow-up.svg">
        <p class="up-text-1 body-3 dark-text">${live[i].upvotes}</p>

    </div>
    <div  class="flex-end comments">
        <img class="comments-svg-1" src="assets/shared/icon-comments.svg">
        <p class="end-text body-1 dark-text">${live[i].comments?live[i].comments.length:0}</p>

    </div>


</div>
</div>`


liveList.append(livebox)

}
for(let i=0;i<progress.length;i++){
    const progressbox = document.createElement('div')
    progressbox.className='plan-box-1'
    progressbox.setAttribute('id','progress-box')
    progressbox.innerHTML=` <div class="inner-plan-box progress-box">
    <div>
    <p class="round road-rnd" id="progress"></p><p id="spc" class="line-p light-text">In-Progress</p>
    </div>
<p class="h3 dark-text">${progress[i].title}</p>
<p class="body-1 light-text">${progress[i].description}</p>

<p class="nav-btn body-3 tag-1">${progress[i].category}</p>
<div class="last-row">
    <div class="upvotes-1">
        <img class="up-marg" src="assets/shared/icon-arrow-up.svg">
        <p class="up-text-1 body-3 dark-text">${progress[i].upvotes}</p>

    </div>
    <div  class="flex-end comments">
        <img class="comments-svg-1"  src="assets/shared/icon-comments.svg">
        <p class="end-text body-1 dark-text" id="#blk-2">${progress[i].comments?progress[i].comments.length:0}</p>

    </div>


</div>
</div>`


progressList.append(progressbox)

}

}




