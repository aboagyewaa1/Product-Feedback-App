let prod = []

fetch('data/data.json')
.then(response=>response.json())
.then(data=>{
    prod = data.productRequests
   filterStatus(prod)
})



function filterStatus (prod){
    let planned =[]
let progress =[]
let live =[]

planned = prod.filter(stat=>stat.status==='planned')
progress = prod.filter(stat=>stat.status==='in-progress')
live = prod.filter(stat=>stat.status==='live')

console.log(planned)
console.log(progress)
console.log(live)

const plannedList = document.getElementById('planned')
const progressList = document.getElementById('in-progress')
const liveList = document.getElementById('live-1')


for(let i=0;i<planned.length;i++){
    const planbox = document.createElement('div')
    planbox.className='plan-box-1'
    planbox.innerHTML=` <div class="inner-plan-box">
    <div>
    <p class="round road-rnd" id="plan"></p><p id="spc" class="line-p light-text">Planned</p>
    </div>
<p class="h3 dark-text">${planned[i].title}</p>
<p class="body-1 light-text">${planned[i].description}</p>

<p class="nav-btn body-3">${planned[i].category}</p>
<div class="last-row">
    <div>
        <img src="assets/shared/icon-arrow-up.svg">
        <p class="road-rnd">${planned[i].upvotes}</p>

    </div>
    <div  class="flex-end">
        <img class="comments-svg" src="assets/shared/icon-comments.svg">
        <p>${planned[i].comments?planned[i].comments.length:0}</p>

    </div>


</div>
</div>`


plannedList.append(planbox)

}

for(let i=0;i<live.length;i++){
    const livebox = document.createElement('div')
    livebox.className='plan-box-1'
    livebox.innerHTML=` <div class="inner-plan-box">
    <div>
    <p class="round road-rnd" id="live"></p><p id="spc" class="line-p light-text">Live</p>
    </div>
<p class="h3 dark-text">${live[i].title}</p>
<p class="body-1 light-text">${live[i].description}</p>

<p class="nav-btn body-3">${live[i].category}</p>
<div class="last-row">
    <div>
        <img src="assets/shared/icon-arrow-up.svg">
        <p class="road-rnd">${live[i].upvotes}</p>

    </div>
    <div  class="flex-end">
        <img class="comments-svg" src="assets/shared/icon-comments.svg">
        <p>${live[i].comments?live[i].comments.length:0}</p>

    </div>


</div>
</div>`


liveList.append(livebox)

}
for(let i=0;i<progress.length;i++){
    const progressbox = document.createElement('div')
    progressbox.className='plan-box-1'
    progressbox.innerHTML=` <div class="inner-plan-box">
    <div>
    <p class="round road-rnd" id="progress"></p><p id="spc" class="line-p light-text">In-Progress</p>
    </div>
<p class="h3 dark-text">${progress[i].title}</p>
<p class="body-1 light-text">${progress[i].description}</p>

<p class="nav-btn body-3">${progress[i].category}</p>
<div class="last-row">
    <div>
        <img  class="svg"src="assets/shared/icon-arrow-up.svg">
        <p class="road-rnd">${progress[i].upvotes}</p>

    </div>
    <div  class="flex-end">
        <img class="comments-svg" src="assets/shared/icon-comments.svg">
        <p>${progress[i].comments?progress[i].comments.length:0}</p>

    </div>


</div>
</div>`


progressList.append(progressbox)

}

}

