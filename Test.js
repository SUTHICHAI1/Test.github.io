const clockTime = document.querySelector(".clock .time");
const clockDate = document.querySelector(".clock .date");

const calendarDate = document.querySelector(".calendar .current-date");
const calendarDays = document.querySelector(".calendar .days");
const calendarPrevNext = document.querySelectorAll(".calendar .icons span");

const calendarShow = document.querySelector(".calendar .show");
const calendarHide = document.querySelector(".calendar .hide");
const calendarYear = document.querySelector(".calendar .hide input");
const calendarMonths = document.querySelector(".calendar .hide .months");
const calendarBtns = document.querySelectorAll(".calendar .hide button");



const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday",
"Friday","Saturday"];

const months = ["January","February","March","April","May","June",
"July","August","September","October","November","December"];

let d = new Date();
let day = d.getDay(); // return 0 to 6 <=> sunday to saturday
let date = d.getDate();
let month = d.getMonth(); // return 0 to 11 <=> january to december
let year = d.getFullYear();
let hour = d.getHours();
let count =0;

// calendar
function renderCalendar(){
    let lists = ``;
    
    //lastDateOfLastMonth = 30 <=> last month has 30
    const lastDateOfLastMonth = new Date(year, month, 0).getDate();

    //lastDateOfCurrentMonth = 31 <=> last month has 31
    const lastDateOfCurrentMonth = new Date(year, month + 1, 0).getDate();

    //lastDateOfCurrentMonth = 6 <=> Sunday
    const firstDayOfCurrentMonth = new Date(year, month , 1).getDay();

    //lastDateOfLastMonth = 2 <=> Wed
    const firstDayOfNextMonth = new Date(year, month +1 , 1).getDay();
    
    for (let i = firstDayOfCurrentMonth; i > 0; i--){
     lists += `<li class="inactive">${lastDateOfLastMonth - i +1 }</li>`
    }

    for (let i = 1; i <= lastDateOfCurrentMonth; i++){
       lists += `<li class="${isToday(i) ? "active" : ""}">${ i }</li>`
       //console.log(i)
    }

    for (let i = firstDayOfNextMonth; i < 7 ; i++){
        lists += `<li class="inactive">${i - firstDayOfNextMonth +1}</li>`
       }
    calendarDate.innerText = `${months[month]} ${year}`
    calendarDays.innerHTML = lists;
    calendarYear.value = year;
    renderCalendarMonths();

}
renderCalendar();

function isToday(day){
    const cy = new Date().getFullYear();
    const cm = new Date().getMonth();
    const cd = new Date().getDate();

    return day === cd && month === cm && year === cy;
}

//Calendar Prev And Next
//console.log(calendarPrevNext)
calendarPrevNext.forEach(icon => {
    icon.addEventListener("click", () => {
        month = icon.id === "prev" ? month - 1 : month + 1 ;
        //console.log(month)
        if(month < 0 || month > 11 ){
            const d = new Date(year , month);
            //console.log(d)
            month = d.getMonth();
            year = d.getFullYear();
        }
       renderCalendar();
    })
})

//Change month and year
calendarDate.addEventListener("click", () => {
   calendarShow.style.display = "none";
   calendarHide.style.display = "block"; 
});

function renderCalendarMonths() {
    let lists = ``;
    months.forEach((m,index) => {
       // console.log(month)
       lists += `
        <li class="${index === month ? 'active' : ''}"
        onClick="setMonth(${index})" > 
         ${m}
        </li>
        `
    })
    calendarMonths.innerHTML = lists;
}


function setMonth(m){
    //console.log(m)
    month = m;
    renderCalendarMonths();
}

calendarBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if(btn.id === "ok"){
            year = Number(calendarYear.value);
            //console.log(year,month)
        }else{
            year = new Date().getFullYear();
            month = new Date().getMonth();
        }
        calendarShow.style.display = "block";
        calendarHide.style.display = "none";
        renderCalendar();
    })
})


//clock
function renderClock(){
    const time = d.toLocaleTimeString();
    //console.log(time)
    clockTime.innerText = time;
}

function renderDate(){
    clockDate.innerText = `${days[day]} , ${months[month]} ${date} ,${year}` ;
    //console.log(months[month])
}
renderDate();


//Input
function init(){
    d = new Date();
    hour = d.getHours();
    renderClock();
    //console.log(d)

    //starting a new day will re-render ,render only once
    if(hour === 0 && count === 0){
        day = d.getDay();
        date = d.getDate();
        month = d.getMonth();
        year = d.getFullYear();
        count++;

        renderDate();
        renderCalendar();
    }

    if(hour > 0 && count > 0) {
        count = 0;
    }

    setTimeout(init,1000);
}
init();