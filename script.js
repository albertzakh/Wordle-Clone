let currentIndex = 0;
let currentRow = 0;

import wordList from "./words.js";

const board = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
]

const keys = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','ENTER','Z','X','C','V','B','N','M', "BACKSPACE"];

let secretWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
let winGame = false;

document.addEventListener("keyup", PlaceKey);

function PlaceKey(e) {
    let box = document.getElementById(`box-${currentRow}-${currentIndex}`);
    for(let i = 0; i < keys.length; i++) {
        if(keys[i] == e.key.toUpperCase() && e.key !== "Enter" && e.key !== "Backspace") {
            board[currentRow][currentIndex] = e.key.toUpperCase();
            box.innerHTML = e.key;
            currentIndex++;
        }
        else if(e.key == "Enter" && currentIndex !== 5) {ShowModal("Not enough words"); return}
        else if(currentIndex >= 5 && e.key !== "Enter" && e.key !== "Backspace") {return;}

        else if(e.key == "Backspace" && currentIndex >= 1) {
            const box = document.getElementById(`box-${currentRow}-${currentIndex-1}`);
            board[currentRow][currentIndex-1] = "";
            currentIndex -= 1;
            box.innerHTML = "";
            break;
        }

        else if(currentIndex >= 5 && e.key == "Enter") {CheckWord(); return;}
    }
   
}

function ShowModal(message) {
    let grid = document.getElementById("grid");
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.textContent = message;
    grid.append(modal);

    if(currentRow >= 6) {
        let button = document.createElement("button");
        button.textContent = "Restart";

        button.onclick = RestartGame;
        modal.append(button);
        return;
    }
    else if(winGame) {
        let button = document.createElement("button");
        button.textContent = "Restart";

        button.onclick = RestartGame;
        modal.append(button);
        return;
    }
    else {
        setTimeout(() => modal.remove(), 1000)
        return;
    }
}

function CheckWord() {
    let word = "";
    let boardRow = board[currentRow];
    for(let i = 0; i < boardRow.length; i++) word += boardRow[i];
    let boxes = document.querySelectorAll(`[id^=box-${currentRow}]`);

    if(word.toUpperCase() == secretWord.toUpperCase()) {
        for(let i = 0; i < 5; i++) {
            winGame = true;
            boxes[i].classList.add("word_index"); 
            ShowModal("Congradulations!");
        }
    }

    else {
        for(let i = 0; i < 5; i++) {
           if(secretWord.toUpperCase().includes(word[i]) && word[i].toUpperCase() !== secretWord[i]){
                boxes[i].classList.add("word");
           } 
           else if(secretWord.toUpperCase().includes(word[i]) && word[i].toUpperCase() == secretWord[i]) {
                boxes[i].classList.add("word_index");
           }
           else if(!(secretWord.toUpperCase().includes(word[i]))) {
                boxes[i].classList.add("none");
           }
        }
        currentRow += 1; 
        currentIndex = 0
    }

    if(currentRow >= 6) ShowModal(`You lose the word was ${secretWord}`);
}

function RestartGame() {
    location.reload();
}