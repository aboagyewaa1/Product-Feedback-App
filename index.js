let prod = [];

function nextPage() {}


//Add/Remove active class from nav btn

function toggleActive(event) {
  if (!document.getElementById("icon-open").classList.contains("active1")) {
    document.getElementById("icon-open").classList.add("active1");
    document.getElementById("mobile-sidebar").classList.remove("active1");
    document.getElementById("icon-close").classList.remove("active1");
  }

  var target = event.target || event.srcElement;
  var buttonList = document.querySelectorAll(".nav-btn");
  buttonList.forEach(function (button) {
    if (button === target && !button.classList.contains("active")) {
      return button.classList.add("active");
    }

    return button.classList.remove("active");
  });
}

//fetch data on page

fetch("https://product-feedback-api-hry7.onrender.com/productRequests")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data)
    prod = data;
    // console.log(prod)
    displayData(prod);
  });

const suggNo = document.getElementById("sugg-no");

const myAdd = document.getElementById("content1");
//display data on page
function displayData(prod) {
  // window.location.reload()
  // console.log(prod);

  let planned = [];
  let progress = [];
  let live = [];

  planned = prod.filter((stat) => stat.status === "planned");
  progress = prod.filter((stat) => stat.status === "in-progress");
  live = prod.filter((stat) => stat.status === "live");

  const planL1 = document.getElementById("len-plan");
  const progL1 = document.getElementById("len-prog");
  const liveL1 = document.getElementById("len-live");

  const planL2 = document.getElementById("len-plan1");
  const progL2 = document.getElementById("len-prog1");
  const liveL2 = document.getElementById("len-live1");


    planL1.innerHTML = planned.length;
    progL1.innerHTML = progress.length;
    liveL1.innerHTML = live.length;
  

    planL2.innerHTML = planned.length;
    progL2.innerHTML = progress.length;
    liveL2.innerHTML = live.length;
  




    suggNo.innerHTML = `${prod.length} Suggestions`;



  
  myAdd.innerHTML = "";
  if (prod.length > 0) {
    const ids = JSON.parse(localStorage.getItem('votes') ?? '[]')
    document.getElementById("view-text").classList.remove("opacity-view");
    document.getElementById("view-text").setAttribute("href", "roadmap.html");
    for (let i = 0; i < prod.length; i++) {
      const myContentInner = document.createElement("div");
      myContentInner.className = "content-inner";
      console.log(prod[i].id)
      myContentInner.innerHTML = ` 
        <div class="inner-box-content">              
         <div class="upvotes ${ids.includes(`${prod[i].id}`) ? 'active2' : ''}" data-id="${prod[i].id}">
            <svg class="up-marg"  width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 6l4-4 4 4" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>
            <p class="up-text h4 " id="up-1">${
              prod[i].upvotes ? prod[i].upvotes : 0
            }</p>
        </div>
        <div class="content-mid">
        <a href="feedbackDetails.html?id=${prod[i].id}">
            <p class="h3 marg-0 dark-text" id="title-A">${prod[i].title}</p></a>
            <p class="body-1 marg-0 light-text">${prod[i].description}</p>
            <p class="marg-0 tag body-3">${prod[i].category}</p>

        </div>
        <div class="comments flex-end">
            <img class="comments-svg" src="assets/shared/icon-comments.svg">
             <p class="p-tag h4">${prod[i].comments ? prod[i].comments.length : 0}</p>
            </div>
        </div>`;
      // console.log(prod[i].comments?comments.length:0)
      myAdd.append(myContentInner);
    }
  } else {
    document.getElementById("view-text").classList.add("opacity-view");
    document.getElementById('sort1').style.opacity='0.5'
    document.getElementById("view-text").removeAttribute("href");
    myAdd.innerHTML = `  <div class="content-1">
    <div class="no-content">
     <center><img src="assets/suggestions//illustration-empty.svg">
     <p class="h1 no-yet">There is no feedback yet</p>
     <p class="body-1 light-text">Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app</p>
     <button onclick="location.href='newFeedback.html'" class="add-btn add-btn-top h4">+ Add Feedback</button>
 </center>

    </div>

 </div>`;
  }

  const up = document.querySelectorAll(".upvotes");
  const uptext = document.querySelectorAll('.up-text')
  for (const u of up) {
    u.addEventListener("click", () => {
      const id = u.dataset.id;
      let upvote = prod.find((value) => value.id == id).upvotes;

      const ids = JSON.parse(localStorage.getItem('votes') ?? '[]')
      if (!u.classList.contains("active2")) {
       
        upvote += 1;
        u.classList.add("active2");

        if(!ids.includes(id)) {
            ids.push(id)
        }
      } else {
        upvote -= 1;
        u.classList.remove("active2");

        if(ids.includes(id)) {
            ids.pop(id)
        }
      }

      fetch(
        `https://product-feedback-api-hry7.onrender.com/productRequests/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            upvotes: upvote,
          }),
        }
      ).then((response) => {
        fetch("https://product-feedback-api-hry7.onrender.com/productRequests")
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
          prod = data;
          // // console.log(prod)
          // displayData(prod);
          localStorage.setItem('votes', JSON.stringify(ids))
          u.querySelector(".up-text").innerHTML = upvote
        });
        // window.location.reload();
      });
    });
  }
}

const navBtns = document.getElementsByClassName("nav-btn");

for (let i = 0; i < navBtns.length; i++) {
  navBtns[i].addEventListener("click", filterTag);
 
}


function filterTag(e) {
  toggleActive(e);
  let value = e.target.innerHTML.trim();

  let newValue = [];
  if (value === "All") {

    newValue = prod;

    displayData(newValue);
  } else if (value === "Bug") {
    newValue = prod.filter(
      (category) => category.category.toLowerCase() === "bug"
    );
    displayData(newValue);
  } else if (value === "Enhancement") {
    newValue = prod.filter(
      (category) => category.category.toLowerCase() === "enhancement"
    );
    displayData(newValue);
  } else if (value === "UI") {
    newValue = prod.filter(
      (category) => category.category.toLowerCase() === "ui"
    );
    displayData(newValue);
  } else if (value === "UX") {
    newValue = prod.filter(
      (category) => category.category.toLowerCase() === "ux"
    );
    displayData(newValue);
  } else if (value === "Feature") {
    newValue = prod.filter(
      (category) => category.category.toLowerCase() === "feature"
    );
    displayData(newValue);
  }
  // console.log(newValue)
  const sorty = document.querySelectorAll(".sort-acc");
for (const sel of sorty) {
  sel.addEventListener("click", () => {
    
    for(const arrow of document.getElementsByClassName('arrow-down')) {
      arrow.classList.toggle('show')
    }
    // console.log(newValue)

    const m1 = document.getElementById('most1')
    const l1 = document.getElementById('least1')
    const m2 = document.getElementById('most2')
    const l2 = document.getElementById('least2')

    let grab = sel.getAttribute("value");
    let innGrab = sel.innerHTML;
    let dis_sel = document.getElementById("display-sel");

    const shown = document.querySelector('#myDropdown a svg.show-1');

    switch (grab) {
      case "most-upvotes":
        dis_sel.innerHTML = innGrab;

        shown.classList.remove('show-1')
        m1.querySelector('svg').classList.add('show-1');

        displayData(
          [...newValue].sort((prev, next) => {
            return prev.upvotes > next.upvotes ? -1 : 1;
          })
        );
        break;
      case "least-upvotes":
        dis_sel.innerHTML = innGrab;

        shown.classList.remove('show-1')
        l1.querySelector('svg').classList.add('show-1');

        displayData(
          [...newValue].sort((prev, next) => {
            return prev.upvotes < next.upvotes ? -1 : 1;
          })
        );
        break;
      case "most-comments":
        dis_sel.innerHTML = innGrab;

        shown.classList.remove('show-1')
        m2.querySelector('svg').classList.add('show-1');

        displayData(
          [...newValue].sort((prev, next) => {
            return (prev.comments?.length ?? 0) > (next.comments?.length ?? 0)
              ? -1
              : 1;
          })
        );
        break;
      case "least-comments":
        dis_sel.innerHTML = innGrab;

        shown.classList.remove('show-1')
        l2.querySelector('svg').classList.add('show-1');

        displayData(
          [...newValue].sort((prev, next) => {
            return (prev.comments?.length ?? 0) < (next.comments?.length ?? 0)
              ? -1
              : 1;
          })
        );
        break;
    }
  });
}
}

const icons = document.querySelectorAll(".hamburger");
for (const icon of icons) {
  icon.addEventListener("click", () => {
    const id = icon.getAttribute("id");
    icon.classList.remove("active1");
    if (id == "icon-open") {
      document.getElementById("icon-close").classList.add("active1");
      document.getElementById("mobile-sidebar").classList.add("active1");
    } else {
      document.getElementById("icon-open").classList.add("active1");
      document.getElementById("mobile-sidebar").classList.remove("active1");
    }
  });
}
// const sorty = document.querySelectorAll(".sort-acc");
// for (const sel of sorty) {
//   sel.addEventListener("click", () => {
    
//     for(const arrow of document.getElementsByClassName('arrow-down')) {
//       arrow.classList.toggle('show')
//     }

//     const m1 = document.getElementById('most1')
//     const l1 = document.getElementById('least1')
//     const m2 = document.getElementById('most2')
//     const l2 = document.getElementById('least2')

//     let grab = sel.getAttribute("value");
//     let innGrab = sel.innerHTML;
//     let dis_sel = document.getElementById("display-sel");

//     const shown = document.querySelector('#myDropdown a svg.show-1');

//     switch (grab) {
//       case "most-upvotes":
//         dis_sel.innerHTML = innGrab;

//         shown.classList.remove('show-1')
//         m1.querySelector('svg').classList.add('show-1');

//         displayData(
//           [...prod].sort((prev, next) => {
//             return prev.upvotes > next.upvotes ? -1 : 1;
//           })
//         );
//         break;
//       case "least-upvotes":
//         dis_sel.innerHTML = innGrab;

//         shown.classList.remove('show-1')
//         l1.querySelector('svg').classList.add('show-1');

//         displayData(
//           [...prod].sort((prev, next) => {
//             return prev.upvotes < next.upvotes ? -1 : 1;
//           })
//         );
//         break;
//       case "most-comments":
//         dis_sel.innerHTML = innGrab;

//         shown.classList.remove('show-1')
//         m2.querySelector('svg').classList.add('show-1');

//         displayData(
//           [...prod].sort((prev, next) => {
//             return (prev.comments?.length ?? 0) > (next.comments?.length ?? 0)
//               ? -1
//               : 1;
//           })
//         );
//         break;
//       case "least-comments":
//         dis_sel.innerHTML = innGrab;

//         shown.classList.remove('show-1')
//         l2.querySelector('svg').classList.add('show-1');

//         displayData(
//           [...prod].sort((prev, next) => {
//             return (prev.comments?.length ?? 0) < (next.comments?.length ?? 0)
//               ? -1
//               : 1;
//           })
//         );
//         break;
//     }
//   });
// }

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
  for(const arrow of document.getElementsByClassName('arrow-down')) {
    arrow.classList.toggle('show')
  } 
}




// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    document.getElementById('arr-up').classList.remove("show")
  


    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};


