let input = document.querySelector(".title");
let text = document.querySelector(".texts");
let cover = document.querySelector(".cover");
let book = document.querySelector(".book");
let cover2 = document.getElementById('cover2')
let currentPage = 0;
let dates = document.querySelector('.dates')
let times = document.getElementById('times')
let bool = false
let date = new Date();



window.onload = function(){
    let memo = JSON.parse(localStorage.getItem("input")) || [];
    renderNotes(memo);
    note.style.position = "relative";
    boxnew.style.position = "relative";
}

function renderNotes(memo){

    document.querySelectorAll(".page").forEach(p => p.remove());

    memo.forEach((item,index)=>{

        if(index % 3 === 0){
            let page = document.createElement("div");
            page.classList.add("page");
            book.appendChild(page);
        }

        let pages = document.querySelectorAll(".page");
        let lastPage = pages[pages.length-1];

        let note = document.createElement("div");
        note.classList.add("boxnew");

        note.innerHTML = `
    <div class="note-header">
        <h4>${item.title}</h4>
       <input type="datetime-local" class="time-text" value="${item.time || ''}">
    </div>
    <p>${item.text}</p>
`;

        lastPage.appendChild(note);
    });
}

function btn1(){
    let title = input.value.trim();
    let content = text.value.trim();
    let time = dates.value;   

    if(title === "" || content === "") return;

    let memo = JSON.parse(localStorage.getItem("input")) || [];

    memo.push({
        title: title,
        text: content,
        time: time 
    });

    localStorage.setItem("input", JSON.stringify(memo));

    renderNotes(memo);

    input.value = "";
    text.value = "";
}
function btn2(){
    cover.classList.add("turn");
    cover2.style.transform = "rotateY(-180deg)";
    cover.style.backfaceVisibility = "hidden";
    bool = true
}

function nextPage(){
   if(bool){
    let pages = document.querySelectorAll(".page");

    if(currentPage < pages.length){
        pages[currentPage].classList.add("turn");
        currentPage++;
    }
}
}
function prevPage(){
    let pages = document.querySelectorAll(".page");

  
    if(currentPage > 0){
        currentPage--;
        pages[currentPage].classList.remove("turn");
    }
    else if(currentPage === 0 && bool){
        cover.classList.remove("turn");
        cover2.style.transform = "rotateY(0deg)";
        bool = false;
    }
}
function setCurrentDateTime(){
    let now = new Date();

    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, '0');
    let day = String(now.getDate()).padStart(2, '0');

    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');

    let formatted = `${year}-${month}-${day}T${hours}:${minutes}`;

    dates.value = formatted;
}
window.onload = function(){
    let memo = JSON.parse(localStorage.getItem("input")) || [];
    renderNotes(memo);

    setCurrentDateTime(); 
}