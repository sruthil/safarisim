//https://www.jqueryscript.net/form/jQuery-International-Telephone-Input-With-Flags-Dial-Codes.html

//https://www.twilio.com/blog/international-phone-number-input-html-javascript

// function getIp(callback) {
//  fetch('ipinfo.io/140.82.183.34?token=66e2f39b20a2bd', { headers: { 'Accept': 'application/json' }})
//    .then((resp) => resp.json())
//    .catch(() => {
//      return {
//        country: 'au',
//      };
//    })
//    .then((resp) => callback(resp.country));
// }

window.onscroll = function () {
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
        if (window.pageYOffset > 200) {
            mainNav.classList.add("scrolled");
        } else {
            mainNav.classList.remove("scrolled");
        }
    }
}

 const phoneInputField = document.querySelector("#phone");
   const phoneInput = window.intlTelInput(phoneInputField, {
     utilsScript:
       "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
       preferredCountries: ["in", "co", "us", "de"]
   });

const info = document.querySelector(".alert-info");

function process(event) {
 event.preventDefault();

 const phoneNumber = phoneInput.getNumber();

 info.style.display = "";
//  info.innerHTML = `Phone number in E.164 format: <strong>${phoneNumber}</strong>`;
}

document.getElementById("viewCountriesBtn").addEventListener('click', ()=>{
  document.getElementById("countries").classList.add("active");
  document.getElementById("viewCountriesBtn").classList.add("d-none");
})

var kl = 0;

let pdata = fetch('js/pricing.json')
    .then(response => response.json())
    .then(data=>{
    kl = data;
});

let countryNames = [];

setTimeout(() => {
  kl.forEach((element, index) => {
    countryNames[index] = element.title;
  });
}, 1000);

function currencyPopulate(cntry){
  fetch('js/pricing.json')
    .then(response => response.json())
    .then(data => {
        const countryList = document.querySelector("#countries");
        data.forEach(item => {
            const countryItem = document.createElement("div");
            countryItem.className = "col-lg-4 col-md-6";
            let money = item[cntry];
            countryItem.innerHTML = `
                        <div class="countryName">
                            <img src="img/countries/${item.image}.png" alt="${item.title}"/>
                            <h6>${item.title}</h6>
                        </div>
                        <div class="gbPrice">${money}</div>
            `;
            
            countryList.appendChild(countryItem);
        });
    })
    .catch(error => console.error("Error loading pricing data:", error));
}

currencyPopulate("USD");

document.getElementById("currency").addEventListener("change", (e)=>{
  document.getElementById("countries").classList.remove("active");
  document.getElementById("countries").innerHTML="";
  document.getElementById("viewCountriesBtn").classList.remove("d-none");
  currencyPopulate(e.target.value);
})

document.querySelector(".searchInput").addEventListener("input", (e) => {
    document.getElementById("countries").classList.add("active");
    document.getElementById("viewCountriesBtn").classList.add("d-none");

    const searchValue = e.target.value.toLowerCase();
    const countryCards = document.querySelectorAll("#countries .col-lg-4");

    countryCards.forEach(card => {
        const countryName = card.querySelector(".countryName h6").innerText.toLowerCase();
        if (countryName.includes(searchValue)) {
            card.style.display = "flex"; // Show matching results
        } else {
            card.style.display = "none"; // Hide non-matching results
        }
    });
});


document.querySelectorAll(".tabBtn").forEach(element => {
  element.addEventListener("click", ()=>{
    let tab = element.getAttribute("tab");
    document.querySelector(".tabBtn.active").classList.remove("active");
    document.querySelector(".tabBtn[tab="+tab+"]").classList.add("active");
    document.querySelector(".tab.active").classList.remove("active");
    document.getElementById(tab).classList.add("active");
  })
});

document.querySelectorAll(".faqtabBtn").forEach(element => {
  element.addEventListener("click", ()=>{
    let tab = element.getAttribute("tab");
    document.querySelector(".faqtabBtn.active").classList.remove("active");
    document.querySelector(".faqtabBtn[tab="+tab+"]").classList.add("active");
    document.querySelector(".faqtab.active").classList.remove("active");
    document.getElementById(tab).classList.add("active");
  })
});

document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelectorAll('.navCollapse')[0];
    const openBtn = document.querySelectorAll('.navbutton')[0];

    openBtn.addEventListener('click', function () {
        sidebar.classList.toggle("active");
        // openBtn.classList.toggle("active");
    });

    document.addEventListener('click', function (event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickInsideOpenBtn = openBtn.contains(event.target);

        if (!isClickInsideSidebar && !isClickInsideOpenBtn) {
            sidebar.classList.remove("active");
            // openBtn.classList.remove("active");
        }
    });
  });

document.querySelectorAll(".navClose")[0].addEventListener("click", ()=>{
    document.querySelector(".navCollapse").classList.remove("active");
})
document.querySelectorAll(".navLink").forEach(element => {
    element.addEventListener("click", ()=>{
        document.querySelector(".navCollapse").classList.remove("active");
    })
});