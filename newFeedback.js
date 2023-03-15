//Add Feedback

const formEl = document.querySelector(".form");

formEl?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(formEl);
  // console.log(formData)

  const data = Object.fromEntries(formData);
  fetch("https://product-feedback-api-hry7.onrender.com/productRequests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(()=>location.reload())
  
});

//New Feedback drop down
function mySelect() {
  document.getElementById("catSel1").classList.toggle("show1");
}

// Close the dropdown menu if the user clicks outside of it

var tyr = document.querySelectorAll(".dropbtn1");
for (const ty of tyr) {
  ty.addEventListener("click", () => {
    var dropdowns = document.getElementsByClassName("dropdown-content1");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show1")) {
        openDropdown.classList.remove("show1");
      } else {
        openDropdown.classList.add("show1");
      }
    }
  });
}

const selN = document.querySelectorAll(".sel-cat");
for (const s of selN) {
  s.addEventListener("click", () => {
    let grabC = s.getAttribute("value");
    let myCategory = document.getElementById("form-cat");
    let Cat = s.innerHTML;
    let cat_sel = document.getElementById("catSel1");
    switch (grabC) {
      case "feature":
        cat_sel.innerHTML = Cat;
        console.log(grabC);

        break;
      case "ui":
        cat_sel.innerHTML = Cat;

        break;
      case "ux":
        cat_sel.innerHTML = Cat;

        break;
      case "enhancement":
        cat_sel.innerHTML = Cat;

        break;
      case "bug":
        cat_sel.innerHTML = Cat;

        break;
    }
    myCategory.setAttribute("value", grabC);


    var dropdowns = document.getElementsByClassName("dropdown-content1");
    var openDropdown = dropdowns[0];
    if (openDropdown.classList.contains("show1")) {
      openDropdown.classList.remove("show1");
    } else {
      openDropdown.classList.add("show1");
    }
  });
}
