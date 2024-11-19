// Get modal element
const nameModal = document.getElementById("nameModal");

// Function to toggle modal visibility
function showModalName() {
    if (nameModal.style.display === "none" || nameModal.style.display === "") {
        nameModal.style.display = "block";
    } else {
        nameModal.style.display = "none";
    }
}

// Function to handle name submission (to be customized)
function submitName() {
    const nameInput = document.getElementById("name").value;
    if (nameInput.trim()) {
        showHome(nameInput);
        displayUserName();
    } else {
        alert("Please enter a valid name.");
    }
}

// Redirect to home page
function showHome(nameInput) {
    window.location.href = "home.html?name=" + encodeURIComponent(nameInput);
}

//display user name
function displayUserName(){
    const params = new URLSearchParams(window.location.search); 
    const name = params.get('name');
    if(document.getElementById('greeting')){
        document.getElementById('greeting').textContent = name ? "Hello, " + name : 'No name provided'; 
    }
}

if(window.location.pathname.endsWith('home.html')){
    displayUserName();
}

// redirect to html questions
function htmlQues(){
    const params = new URLSearchParams(window.location.search); 
    const name = params.get('name');
    window.location.href = "htmlQues.html?name=" + encodeURIComponent(name);
}

// redirect to home
function backHome(){
    const params = new URLSearchParams(window.location.search); 
    const name = params.get('name');
    showHome(name);
}

//Redirect to the next page
let answerArr = []; 
let selectedAnswer;
function proceedToNext(prevId, nextId, answer){
    const pId = document.getElementById(prevId); 
    const nId = document.getElementById(nextId);
    selectedAnswer = document.querySelector(`input[name="${answer}"]:checked`);

    if(!selectedAnswer){
        alert("Please select an answer before proceeding."); 
        return;
    } else {
        answerArr.push(selectedAnswer.value);
        //selectedAnswer.checked = false;
        pId.style.display = "none";
        nId.style.display = "block";
    }
}

// redirects to previous page
function proceedToPrevious(prevId, nextId, answerIndex, answer){
    const prevElement = document.getElementById(prevId); 
    const nextElement = document.getElementById(nextId);
    const ansInd = answerIndex - 1;

    nextElement.style.display = "none";
    prevElement.style.display = "block";

    const previousAnswer = answerArr[ansInd];
    if (previousAnswer) {
        const radioToSelect = document.querySelector(`input[name="${answer}"][value="${previousAnswer}"]`);
        if (radioToSelect) {
            radioToSelect.checked = true;
        }
    }

    answerArr.splice(ansInd, 1);
}

// redirects to main page
function exit(){
    let userConfirmed = confirm("Do you want to leave this quiz?");

    if(userConfirmed){
        window.location.href = "index.html";
    }
}

//compute score
let score = 0;
function computeScore(){
    
    const keyAnswer = [
        'A', 'C', 'C', 'B',
        'A', 'A', 'C', 'D',
        'C', 'B', 'B', 'B', 
        'A', 'A', 'B', 'A', 
        'A', 'B', 'B', 'B'
    ];

    let len = keyAnswer.length;
    for(let i = 0; i < len; i++){
        if(keyAnswer[i] == answerArr[i]){
            score++;
        } 
    }

    return score;
}

//Show score 
function showScore(prevId, nextId, displayId){
    document.getElementById(prevId).style.display = "none";
    document.getElementById(nextId).style.display = "block";

    let score = computeScore();
    document.getElementById(displayId).innerHTML = "Score: " + score;
}

//Retake quiz
function retakeQuiz(prevId, nextId){
    const pId = document.getElementById(prevId);
    const nId = document.getElementById(nextId);

    let userConfirmed = confirm("Do you want to retake the quiz?"); 
    if(userConfirmed){
        pId.style.display = "none"; 
        nId.style.display = "block";
        
        answerArr = []; 
        score = 0; 
        const selectedAnswer = document.querySelectorAll('input[type="radio"]');
        selectedAnswer.forEach(answer => answer.checked = false);
    }
    else{
        nId.style.display = "none";
        pId.style.display = "block";
    }
}
