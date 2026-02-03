// Quiz data in Somali
const quizData = [
  {q:"Goorma ayay Soomaaliya xorriyadda qaadatay?", o:["1950","1960","1970","1980"], a:1},
  {q:"Meeraha ugu weyn nidaamka qoraxda waa kee?", o:["Mars","Earth","Jupiter","Venus"], a:2},
  {q:"Qaaradda ugu weyn dunida waa?", o:["Africa","Asia","Europe","Australia"], a:1},
  {q:"Jirka bini'aadamka boqolkiiba imisa biyo ayuu ka kooban yahay?", o:["40%","50%","60%","70%"], a:3},
  {q:"Qaybta maskaxda u ah kombiyuutarka waa?", o:["RAM","CPU","Hard Disk","Monitor"], a:1}
];

// Variables
let currentQuestion = 0;
let score = 0;
let time = 600; // 10 minutes in seconds
let locked = false;

// DOM elements
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const infoEl = document.getElementById('info');
const nextBtn = document.getElementById('nextBtn');
const timerEl = document.getElementById('timer');

// Load question
function loadQuestion(){
  locked = false;
  nextBtn.style.display = 'none';
  optionsEl.innerHTML = '';
  questionEl.textContent = quizData[currentQuestion].q;
  infoEl.textContent = `Question ${currentQuestion+1}/${quizData.length} | Score: ${score}`;

  quizData[currentQuestion].o.forEach((optionText, idx) => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option';
    optionDiv.textContent = optionText;
    optionDiv.onclick = () => checkAnswer(idx, optionDiv);
    optionsEl.appendChild(optionDiv);
  });

  // Last question → show "Submit"
  if(currentQuestion === quizData.length - 1){
    nextBtn.textContent = "Submit";
  } else {
    nextBtn.textContent = "Next";
  }
}

// Check answer
function checkAnswer(selectedIdx, el){
  if(locked) return;
  locked = true;
  const correctIdx = quizData[currentQuestion].a;
  if(selectedIdx === correctIdx){
    el.classList.add('correct');
    score++;
  } else {
    el.classList.add('wrong');
    optionsEl.children[correctIdx].classList.add('correct');
  }
  nextBtn.style.display = 'inline-block';
}

// Next button click
nextBtn.onclick = () => {
  currentQuestion++;
  if(currentQuestion < quizData.length){
    loadQuestion();
  } else {
    endQuiz();
  }
}

// End quiz
function endQuiz(){
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = `<h2>Your final score: ${score} out of ${quizData.length}</h2>`;
  infoEl.textContent = '';
  nextBtn.style.display = 'none';
  clearInterval(timerInterval);
}

// Timer function
function updateTimer(){
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timerEl.textContent = `Time remaining: ${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
  if(time <= 0){
    endQuiz();
  }
  time--;
}

// Start timer
let timerInterval = setInterval(updateTimer, 1000);

// Initialize first question
loadQuestion();
