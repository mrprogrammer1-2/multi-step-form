backBtn = document.querySelector(".back")
nextBtn = document.querySelector(".next")
const steps = document.querySelectorAll(".step");
let summaryPlan = document.querySelector("#step-4 .summary-plan");
let summaryPrice = document.querySelector("#step-4 .summary-price");
let services = document.querySelector("#step-4 .service");
let totalNum = document.querySelector("#step-4 .total-num")
let totalText = document.querySelector("#step-4 .text span")
const togglebtn = document.querySelector(".toggle-btn")

let currentStep = 0;

showSteps(currentStep)




let validForm = [step1Valid, step2Valid]

function showSteps(n) {
    steps.forEach(e=> {
        e.style.display = 'none'
    })
    steps[n].style.display = "block";

    if (n == 0) {
        backBtn.style.display = "none"
    } else {
        backBtn.style.display = "block"
    }

    if (n == (steps.length - 1)) {
        nextBtn.innerHTML = "Confirm"
    } else {
        nextBtn.innerHTML = "Next"
    }


    changeindicator(n)
}

function changeindicator(n) {
        const indicators = document.querySelectorAll(".indicator-bar .indicator-circle");
        indicators.forEach(indicator=> {
            indicator.classList.remove("active")
        })
        indicators[n].classList.add("active")
}

function nextPrev(n) {
    if (currentStep == (steps.length - 1)) {
        steps[currentStep].style.display = "none"
        nextBtn.style.display = "none"
        backBtn.style.display = "none"
        document.getElementById("thanks").style.display = "flex"
        return
    }

    if (currentStep == 2) {
        addSerivce()
        totalPrice()
    }

    if (currentStep < 2) {
        if (n ==1 && !validForm[currentStep]()) return false
    }

    if (currentStep == 1) {
        changePriceInSummery()
    }

    steps[currentStep].style.display = "none";

    currentStep = currentStep + n;

    if (currentStep >= steps.length) {
        return false
    }
    showSteps(currentStep)
    
}

function step1Valid() {
    const step1 = document.getElementById("step-1")

    let isValid = true

    inputs = step1.querySelectorAll("input")
    document.querySelectorAll(".form-error").forEach(e=> {
        e.style.display = "none"
    })
    inputs.forEach(input=> {
        input.parentElement.classList.remove('error')
        if (input.value == "") {
            isValid = false
            input.parentElement.classList.add("error")
            document.getElementById(`${input.id}-error`).style.display = "block"
        }
    })

    return isValid
}


const step2 = document.getElementById("step-2")
const plans = step2.querySelectorAll(".plan");
plans.forEach(plan=> {
    plan.addEventListener("click", ()=> {
        plans.forEach(e=> e.classList.remove("selected"))
        plan.classList.toggle("selected")
    }
)
})

function changePriceInSummery() {
    summaryPlan.innerText = document.querySelector('#step-2 .selected .plan-title').innerText
    if (togglebtn.parentElement.classList.contains("toggle-monthly")) {
        summaryPrice.innerText = document.querySelector('#step-2 .selected .price-monthly').innerText
    } else if (togglebtn.parentElement.classList.contains("toggle-yearly")) {
        summaryPrice.innerText = document.querySelector("#step-2 .selected .price-yearly span:nth-child(1)").innerText
    }

}

function addSerivce() {
    let checkedSerivce = step3.querySelectorAll(".checked");
    if (checkedSerivce.lenght <= 0) {
        return
    }
    services.innerHTML = ''
    checkedSerivce.forEach(el=> {
        let serviceTitle = document.createTextNode(`${el.querySelector(".service-title").innerText}`)
        let div = document.createElement("div")
        let span1 = document.createElement("span");
        let span2 = document.createElement("span");

        if (togglebtn.parentElement.classList.contains("toggle-monthly")) {
            span2.appendChild(document.createTextNode(`${el.querySelector(".price-monthly").innerText}`))
        } else if (togglebtn.parentElement.classList.contains("toggle-yearly")) {
            span2.appendChild(document.createTextNode(`${el.querySelector(".price-yearly").innerText}`))
        }

        span1.classList.add("cool-grey")
        span1.appendChild(serviceTitle)
        div.appendChild(span1)
        div.appendChild(span2)
        services.appendChild(div)
    })
}


function totalPrice() {
    let total = 0;
    if (togglebtn.parentElement.classList.contains("toggle-monthly")) {
        num = Number(step2.querySelector(".selected .price-monthly .num").innerText);
        total = total + num
        step3.querySelectorAll(".checked .price-monthly .num").forEach(e=> {
            total = total + Number(e.innerText)
        })
        totalText.innerHTML = "month"
        totalNum.innerHTML = `+$${total}/mo`
    } else {
        num = Number(step2.querySelector(".selected .price-yearly .num").innerText);
        total = total + num
        step3.querySelectorAll(".checked .price-yearly .num").forEach(e=> {
            total = total + Number(e.innerText)
        })
        totalText.innerHTML = "year"
        totalNum.innerHTML = `$${total}/yr`
    }

}

function step2Valid() {
    let isValid = true
    
    if (plans[0].classList.contains("selected") ||
    plans[1].classList.contains("selected") ||
    plans[2].classList.contains("selected")) {
        isValid = true
    } else {
        isValid = false
    }

    return isValid
}


togglebtn.addEventListener("click", ()=> {
    togglebtn.classList.toggle("active")
    const parentelement = togglebtn.parentElement;

    if (parentelement.classList.contains("toggle-monthly")){
        parentelement.classList.remove("toggle-monthly")
        parentelement.classList.add("toggle-yearly")
        document.querySelectorAll(".price-monthly").forEach(e=> {
            e.style.display = "none"
        })
        document.querySelectorAll(".price-yearly").forEach(e=> {
            e.style.display = "flex"
        })

    } else if (parentelement.classList.contains("toggle-yearly")) {
        parentelement.classList.remove("toggle-yearly")
        parentelement.classList.add("toggle-monthly")
        document.querySelectorAll(".price-monthly").forEach(e=> {
            e.style.display = "block"
        })
        document.querySelectorAll(".price-yearly").forEach(e=> {
            e.style.display = "none"
        })
    }
})

const step3 = document.getElementById("step-3")



step3.querySelectorAll(".row").forEach(e=> {
    e.addEventListener("click", ()=> {
        e.classList.toggle("checked")
        if (e.classList.contains("checked")) {
            e.querySelector("input").checked = true
        } else {
            e.querySelector("input").checked = false
        }
    })
})

checkBoxes = document.querySelectorAll("input[type=checkbox]")
checkBoxes.forEach(box=> {
    box.addEventListener("change", ()=> {
        if (box.checked) {
            box.parentElement.classList.add("checked")
        } else {
            box.parentElement.classList.remove("checked")
        }
        
    })
})


document.querySelector(".change").addEventListener("click", ()=> {
    console.log(currentStep)
    currentStep = 1;
    console.log(currentStep)
    showSteps(currentStep)
})