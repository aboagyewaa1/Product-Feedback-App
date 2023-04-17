const queryParameters1 = new URL(window.location.href);
// console.log(queryParameters.searchParams.get('id'))
let myId1 = queryParameters1.searchParams.get("id");
// console.log(myId)
let prod = [];

fetch(`https://product-feedback-api-hry7.onrender.com/productRequests/${myId1}`)
  .then((response) => response.json())
  .then((data) => {
    prod = data;
    editDetails(prod);

    // console.log(prod)
    // console.log(prod.comments[0].user.image)
    // displayData(prod)
  });

function editDetails(prod) {
  const formDetails = document.getElementById("formA");
  formDetails.innerHTML = `
<img id="edit-img" src="assets/shared/icon-edit-feedback.svg">
<form class="edit" id="edit">
  <p class="h1 form-title">Editing '${prod.title}'</p>
  <div class="form-div">
    <p class="h4 dark-text">Feedback Title</p>
    <p class="body-2 light-text">Add a short,descriptive headline</p>
    <input class="input-box" name="title" value="${prod.title}">

  </div>
  <div class="form-div">
    <p class="h4 dark-text">Category</p>
    <p class="body-2 light-text ">Choose a category for your feedback</p>
    <div class="dropdown1" id="xyz">
      <div class="dropbtn1 body-2 input-box input svg-arrow1 dark-text" id="catSel1">
        <span>${prod.category}</span>
        <div class="svg-wrap">
          <svg class=" noShow dropArr show-1" width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1l4 4 4-4" stroke="#4661E6" stroke-width="2" fill="none" fill-rule="evenodd" /></svg>
          <svg class=" noShow dropArr" width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6l4-4 4 4" stroke="#4661E6" stroke-width="2" fill="none" fill-rule="evenodd" /></svg>
        </div>
      </div>

      <div id="myDropdown2" class="dropdown-content2  ">
        <a class="sel-cat light-text item " id="c1" value="feature">Feature
          <svg class="noShow cl ${
                prod.category == "feature" ? "show-1" : "" }" xmlns="http://www.w3.org/2000/svg" width="13"
            height="11">
            <path fill="none" stroke="#AD1FEA" stroke-width="2" d="M1 5.233L4.522 9 12 1" /></svg>
        </a>
        <a class="sel-cat light-text item" id="c2" value="ui">UI
          <svg class="noShow cl ${
                prod.category == "ui" ? "show-1" : "" }" xmlns="http://www.w3.org/2000/svg" width="13" height="11">
            <path fill="none" stroke="#AD1FEA" stroke-width="2" d="M1 5.233L4.522 9 12 1" /></svg>
        </a>
        <a class="sel-cat light-text item" id="c3" value="ux">UX
          <svg class="noShow cl ${
                prod.category == "ux" ? "show-1" : "" }" xmlns="http://www.w3.org/2000/svg" width="13" height="11">
            <path fill="none" stroke="#AD1FEA" stroke-width="2" d="M1 5.233L4.522 9 12 1" /></svg>
        </a>
        <a class="sel-cat light-text item " id="c4" value="enhancement">Enhancement
          <svg class="noShow cl ${
                prod.category == "enhancement" ? "show-1" : "" }" xmlns="http://www.w3.org/2000/svg" width="13"
            height="11">
            <path fill="none" stroke="#AD1FEA" stroke-width="2" d="M1 5.233L4.522 9 12 1" /></svg>
        </a>
        <a class="sel-cat light-text item" id="c5" value="bug">Bug
          <svg class="noShow cl ${
                prod.category == "bug" ? "show-1" : "" }" xmlns="http://www.w3.org/2000/svg" width="13" height="11">
            <path fill="none" stroke="#AD1FEA" stroke-width="2" d="M1 5.233L4.522 9 12 1" /></svg>
        </a>
      </div>
    </div>
    <input type="hidden" name="category" id="form-cat1" value = ${prod.category}>

  </div>
  <div class="form-div">
    <p class="h4 dark-text">Update Status</p>
    <p class="body-2 light-text ">Change Feedback state</p>
    <div class="dropdown1" id="abc">
      <div class="dropbtn1 body-2 input-box input svg-arrow1 dark-text" id="catSel2">
        <span>${prod.status}</span>
        <div class="svg-wrap">
          <svg class="myArrow noShow dropArr show-1" width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1l4 4 4-4" stroke="#4661E6" stroke-width="2" fill="none" fill-rule="evenodd" /></svg>
          <svg class="myArrow noShow dropArr" width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6l4-4 4 4" stroke="#4661E6" stroke-width="2" fill="none" fill-rule="evenodd" /></svg>
        </div>
      </div>
      <div id="myDropdown1" class="dropdown-content1 ">
        <a class=" light-text item" id="s1"><span class="sel-stat" value="suggestion">Suggestion</span>
          <svg class="noShow cp ${
                prod.status == "suggestion" ? "show-1" : "" }" xmlns="http://www.w3.org/2000/svg" width="13"
            height="11">
            <path fill="none" stroke="#AD1FEA" stroke-width="2" d="M1 5.233L4.522 9 12 1" /></svg>
        </a>
        <a class=" light-text item" id="s2"><span class="sel-stat" value="planned">Planned</span>
          <svg class="noShow flex-end cp ${
                prod.status == "planned" ? "show-1" : "" }" xmlns="http://www.w3.org/2000/svg" width="13" height="11">
            <path fill="none" stroke="#AD1FEA" stroke-width="2" d="M1 5.233L4.522 9 12 1" /></svg>
        </a>
        <a class=" light-text item" id="s3"><span class="sel-stat" value="in-progress">In-Progress</span>
          <svg class="noShow cp ${
                prod.status == "in-progress" ? "show-1" : "" }" xmlns="http://www.w3.org/2000/svg" width="13"
            height="11">
            <path fill="none" stroke="#AD1FEA" stroke-width="2" d="M1 5.233L4.522 9 12 1" /></svg>
        </a>
        <a class=" light-text item" id="s4"><span class="sel-stat" value="live">Live</span>
          <svg class="noShow cp ${
                prod.status == "live" ? "show-1" : "" }" xmlns="http://www.w3.org/2000/svg" width="13" height="11">
            <path fill="none" stroke="#AD1FEA" stroke-width="2" d="M1 5.233L4.522 9 12 1" /></svg>
        </a>
      </div>
    </div>
    <input type="hidden" name="status" id="form-state" value = ${prod.status}>

  </div>
  <div class="form-div last-form-div">
    <p class="h4 dark-text">Feedback Detail</p>
    <p class="body-2 light-text ">Include any specific comments on what should be included,added etc</p>
    <textarea name="description" class="input-box-big input" id="tt">${
      prod.description
    }</textarea>
  </div>
  <div class="bttn-div">
    <button class="del-btn h4">Delete</button>
    <button class="cancel-btn h4">Cancel</button>
    <button class="save-changes-btn h4">Save Changes</button></div>
</form>
    
  `;

  document.getElementById("abc").addEventListener("click", () => {
    document.getElementById("catSel2").classList.add("blue-border");

    var cust = document.getElementsByClassName("dropdown-content1");
    for (const cus of cust) {
      if (cus.classList.contains("show1")) {
        cus.classList.remove("show1");
      } else {
        cus.classList.add("show1");
      }
    }
    for (const arr3 of document.getElementsByClassName("dropArr")) {
      arr3.classList.toggle("show-1");
    }
  });

  const s1 = document.getElementById("s1");
  const s2 = document.getElementById("s2");
  const s3 = document.getElementById("s3");
  const s4 = document.getElementById("s4");
  // console.log(textarea.value)
 const xx =  document.getElementById('tt')
 console.log(xx.value)

  const state1 = document.querySelectorAll(".sel-stat");
  const stValue = document.getElementById("catSel2");
  const editStatus = document.getElementById("form-state");

  for (const stat of state1) {
    stat.addEventListener("click", () => {
      const dropped1 = document.querySelector("#myDropdown1 a svg.cp.show-1");
      for (const arr2 of document.getElementsByClassName("dropArr")) {
        arr2.classList.toggle("show-1");
      }
      let v = stat.getAttribute("value");
      let q = stat.innerHTML;
      switch (v) {
        case "suggestion":
          stValue.getElementsByTagName('span')[0].innerHTML = q;
          dropped1.classList.remove("show-1");
          s1.querySelector("svg").classList.add("show-1");

          break;
        case "planned":
          stValue.getElementsByTagName('span')[0].innerHTML = q;
          dropped1.classList.remove("show-1");
          s2.querySelector("svg").classList.add("show-1");
          break;
        case "in-progress":
          stValue.getElementsByTagName('span')[0].innerHTML = q;
          dropped1.classList.remove("show-1");
          s3.querySelector("svg").classList.add("show-1");
          break;
        case "live":
          stValue.getElementsByTagName('span')[0].innerHTML = q;
          dropped1.classList.remove("show-1");
          s4.querySelector("svg").classList.add("show-1");
          break;
      }
      editStatus.setAttribute("value", v);
      var cust = document.getElementsByClassName("dropdown-content1");
      for (const cus of cust) {
        if (cus.classList.contains("show1")) {
          cus.classList.remove("show1");
        } else {
          cus.classList.add("show1");
        }
      }
    });
  }

  // category

  document.getElementById("xyz").addEventListener("click", () => {
    document.getElementById("catSel1").classList.add("blue-border");
    // console.log('hi')
    var cust1 = document.getElementsByClassName("dropdown-content2");
    for (const cus1 of cust1) {
      if (cus1.classList.contains("show2")) {
        cus1.classList.remove("show2");
      } else {
        cus1.classList.add("show2");
      }
    }
    for (const arr2 of document.getElementsByClassName("dropArr")) {
      arr2.classList.toggle("show-1");
    }
  });

  const c1 = document.getElementById("c1");
  const c2 = document.getElementById("c2");
  const c3 = document.getElementById("c3");
  const c4 = document.getElementById("c4");

  const state2 = document.querySelectorAll(".sel-cat");
  const stValue1 = document.getElementById("catSel1");
  let editCat = document.getElementById("form-cat1");

  for (const stat1 of state2) {
    stat1.addEventListener("click", () => {
      const dropped = document.querySelector("#myDropdown2 a svg.cl.show-1");
      for (const arr2 of document.getElementsByClassName("dropArr")) {
        arr2.classList.toggle("show-1");
      }

      let m = stat1.getAttribute("value");
      let n = stat1.innerHTML;
      switch (m) {
        case "feature":
          stValue1.getElementsByTagName('span')[0].innerHTML = n;
          dropped.classList.remove("show-1");
          c1.querySelector("svg").classList.add("show-1");

          break;
        case "ui":
          stValue1.getElementsByTagName('span')[0].innerHTML = n;
          dropped.classList.remove("show-1");
          c2.querySelector("svg").classList.add("show-1");
          break;
        case "ux":
          stValue1.getElementsByTagName('span')[0].innerHTML = n;
          dropped.classList.remove("show-1");
          c3.querySelector("svg").classList.add("show-1");
          break;
        case "enhancement":
          stValue1.getElementsByTagName('span')[0].innerHTML = n;
          dropped.classList.remove("show-1");
          c4.querySelector("svg").classList.add("show-1");
          break;
        case "bug":
          stValue1.getElementsByTagName('span')[0].innerHTML = n;
          dropped.classList.remove("show-1");
          c5.querySelector("svg").classList.add("show-1");
          break;
      }
      editCat.setAttribute("value", m);

      var cust1 = document.getElementsByClassName("dropdown-content2");
      for (const cus1 of cust1) {
        if (cus1.classList.contains("show2")) {
          cus1.classList.remove("show2");
        } else {
          cus1.classList.add("show2");
        }
      }
    });
  }

  const formEd = document.querySelector("#edit");

  formEd.addEventListener("submit", editFeedback);
}

function editFeedback(e) {
  e.preventDefault();
  // console.log(document.getElementById('edit'))

  const formEdit = new FormData(document.getElementById("edit"));
  console.log(formEdit);
  // console.log(formEdit)
  const dataEdit = Object.fromEntries(formEdit);
  console.log(dataEdit)
  fetch(
    `https://product-feedback-api-hry7.onrender.com/productRequests/${myId1}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataEdit),
    }
  )
  .then(() => location.reload());
}
