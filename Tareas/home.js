let events = [];
let arr = [] //load dates

const eventName = document.querySelector('#eventName');
const eventDate = document.querySelector('#eventDate');
const buttonAdd = document.querySelector('#bAdd');
const eventsContainer = document.querySelector('#eventsContainer');



document.querySelector("form").addEventListener("submit", (e)=>{
    e.preventDefault();
    addEvent();
});

function addEvent() {
    if (eventName.value == "" || eventDate.value == "") {
        return;
    }

    if(dateDiff(eventDate.value) < 0){
        return;
    }

    const newEvent = {
        id: (Math.random() * 100).toString(36).slice(3),
        name: eventName.value,
        date: eventDate.value,
    };

    events.unshift(newEvent);

    eventName.value = "";

    renderEvents();
}

function dateDiff(data) {
    const target_date = new Date(data);
    const today = new Date();
    const difference = target_date.getTime() - today.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days;
}

function renderEvents(){
    const eventsHTML = events.map(event => {
        return `
            <div class = "event">
                <div class = "days">
                    <span class = "days-number">${dateDiff(event.date)}</span>
                    <span class = "days-text"> days </span>
                </div>

                <div class = "event-name">${event.name}</div>
                <div class = "event-date">${event.date}</div>
                <div class = "actions">
                    <button class = "bDelete" data-id = "${event.id}"> Eliminar </button>
                </div>
            </div>
        `;
    });

    eventsContainer.innerHTML = eventsHTML.join(""); //join new dates in the index.html
    document.querySelectorAll('.bDelete').forEach(button => {
        button.addEventListener('click', e => {
            const id = button.getAttribute('data-id');
            events = events.filter(event => event.id !== id);
            
            renderEvents();
        });
    });
}

function save(data){
    localStorage.setItem('items', data);
}

function load(){
    localStorage.getItem('items');
}