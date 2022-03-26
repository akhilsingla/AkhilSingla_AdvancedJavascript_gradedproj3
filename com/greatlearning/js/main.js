/*

Note :- WPM is calculated by total number of words entered by user.

e.g if user entered (in a minute) :- All the world's a stage, and all the men and women merely players.

WPM is 13 since 13 words are entered here (assuming each word is separated by space)

if user entered (in a minute):-
All the world's a stage, and all the men and women merely players.
The journey of thousand miles begins with a single step.

WPM is 23

I have added console.log statement for the same, please confirm total number of words entered there.

*/

let popularQuotes = [
    "All the world's a stage, and all the men and women merely players.",
    "The journey of thousand miles begins with a single step.",
    "A rose by any other name would smell as sweet.",
    "All that glitters is not gold.",
    "Eighty percent of success is showing up.",
    "For those to whom much is given, much is required.",
    "Genius is one percent inspiration and ninety-nine percent perspiration.",
    "I have always depended on the kindness of strangers.",
    "If you want something said, ask a man; if you want something done, ask a woman."
];
let TIME_LIMIT = 60;
let allInputStringsEnteredByUser = '';
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function verifyInput() {

    let curr_input = input_area.value;
    let curr_input_array = curr_input.split('');
    characterTyped++;
    errors = 0;

    let quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((spanTag, index) => {
        let typedChar = curr_input_array[index]

        if (typedChar == null) {
            spanTag.classList.remove('correct_char');
            spanTag.classList.remove('incorrect_char');
        } else if (typedChar === spanTag.innerText) {
            spanTag.classList.add('correct_char');
            spanTag.classList.remove('incorrect_char');
        } else {
            spanTag.classList.add('incorrect_char');
            spanTag.classList.remove('correct_char');
            errors++;
        }
    });

    error_text.textContent = total_errors + errors;
    let correctCharacters = (characterTyped - (total_errors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    accuracy_text.textContent = Math.round(accuracyVal);

    if (curr_input.length == current_quote.length) {
        updateQuote();
        total_errors += errors;
        input_area.value = "";
    }
}

function updateQuote() {
    quote_text.textContent = null;
    current_quote = popularQuotes[quoteNo];
    allInputStringsEnteredByUser = allInputStringsEnteredByUser + input_area.value + ' ';

    current_quote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        quote_text.appendChild(charSpan)
    })

    if (quoteNo < popularQuotes.length - 1)
        quoteNo++;
    else
        quoteNo = 0;
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeElapsed++;
        timer_text.textContent = timeLeft + "s";
    } else {
        publishResult();
    }
}

function publishResult() {
    clearInterval(timer);
    input_area.disabled = true;
    quote_text.textContent = "Click on restart to start a new game.";
    restart_btn.style.display = "block";

    let cpm = Math.round(((characterTyped / timeElapsed) * 60));
    let wpm = Math.round((((calculateWordCount()) / timeElapsed) * 60));

    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;

    cpm_group.style.display = "block";
    wpm_group.style.display = "block";
    allInputStringsEnteredByUser = '';
}

function calculateWordCount() {
    let wordCount = 0;
    let cond = false;
    allInputStringsEnteredByUser = allInputStringsEnteredByUser + input_area.value + ' ';
    console.log(allInputStringsEnteredByUser);
    for (let i = 0; i < allInputStringsEnteredByUser.length; i++) {
        if (!allInputStringsEnteredByUser.charAt(i).trim()) {
            if (cond) {
                ++wordCount;
                cond = false;
            }
        } else {
            cond = true;
        }
    }
    console.log(wordCount);
    return wordCount;
}

function startTyping() {
    if (timer != null)
        return;
    reset();
    updateQuote();
    timer = setInterval(updateTimer, 1000);
}

function reset() {
    clearInterval(timer);
    timer = null;
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;
    input_area.value = "";
    quote_text.textContent = 'Click on the area below to start the game.';
    accuracy_text.textContent = 100;
    timer_text.textContent = timeLeft + 's';
    error_text.textContent = 0;
    restart_btn.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
}