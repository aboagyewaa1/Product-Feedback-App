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

const planbox = document.getElementById('planned')
for(let i=0;i<planned.length;i++){
    planbox.innerHTML=` <div class="inner-plan-box">
    <div>
    <p class="round road-rnd" id="plan"></p><p id="spc" class="line-p light-text">Planned</p>
    </div>
<p class="h3 dark-text">More comprehensive reports</p>
<p class="body-1 light-text">It would be great to see a more detailed breakdown of solutions</p>

<p class="nav-btn body-3">Feature</p>
<div class="last-row">
    <div>
        <img src="assets/shared/icon-arrow-up.svg">
        <p class="road-rnd">123</p>

    </div>
    <div  class="flex-end">
        <img>
        <p>2</p>

    </div>


</div>
</div>`

}

}

