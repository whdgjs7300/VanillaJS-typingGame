// 업데이트 하는 변수 score,time let사용
const GAME_TIME = 9;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words =[];

const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".word-display");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");

init();

function init() {
    buttonChange('게임로딩중...');
    getWords();
    wordInput.addEventListener("input",checkMatch);
}

// 게임실행
function run() {
    // 게임중에 버튼 클릭방지
    if(isPlaying){
        return;
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    // 1초마다 카운트 다운 실행
    timeInterval = setInterval(countDown, 1000);
    // 상태 확인을 지속적으로 하기위함
    checkInterval = setInterval(checkStatus, 50);
    buttonChange('게임중');
}


function checkStatus() {
    if(!isPlaying && time === 0) {
        buttonChange('게임 시작');
        clearInterval(checkInterval);
    }
}

// 단어 불러오는 함수
function getWords(){
    // axios
    // 지정된 ID를 가진 유저에 대한 요청
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
    .then(function (response) {
    // 성공 핸들링
        response.data.forEach((word)=>{
            if(word.length < 10) {
                words.push(word);
            }
        })
        buttonChange('게임시작');
        console.log(words);
    })
    .catch(function (error) {
    // 에러 핸들링
    console.log(error);
    })
    
}



// 단어 일치 체크함수
function checkMatch() {
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        // 점수 무한 증가 방지
        wordInput.value = "";
        if(!isPlaying) {
            return; 
        }
        score++;
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random()* words.length);
        wordDisplay.innerText = words[randomIndex];
    }
}




function countDown() {
    time > 0 ? time-- : isPlaying = false;
    if(!isPlaying) {
        clearInterval(timeInterval);
    }

    timeDisplay.innerText = time;
}



function buttonChange(text) { 
    button.innerText = text;
    text === "게임시작" ? button.classList.remove('loading') : button.classList.add('loading')
}
