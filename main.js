// 업데이트 하는 변수 score,time let사용
let score = 0;
let time = 9;
let isPlaying = false;

const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".word-display");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");


wordInput.addEventListener("input",()=>{
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        score++;
        scoreDisplay.innerText = score;
        // 점수 무한 증가 방지
        wordInput.value = "";
    }
})

// 1초마다 카운트 다운 실행
setInterval(countDown,1000);


function countDown() {
    time > 0 ? time-- : isPlaying = false;
    timeDisplay.innerText = time;
}



function buttonChange(text) { 

}