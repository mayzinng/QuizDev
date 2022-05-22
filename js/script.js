//Themes

function quiz() {
    window.location.href = "choices.html";
}

function htmlquiz() {
    window.location.href = "choices.html";
}
//Themes


const html = document.querySelector("html");
const theme = document.querySelector("input[name=theme]");

const getStyle = (element, styles) =>
    window.getComputedStyle(element).getPropertyValue(styles)


const initialColors = {
    bg: getStyle(html, "--theme-color"),
    details: getStyle(html, "--details-color"),
    css: getStyle(html, "--css"),
    html: getStyle(html, "--html"),
    js: getStyle(html, "--js"),
    cardsShadow: getStyle(html, "--shadow-cards"),
    cardsHover: getStyle(html, "--shadow-hover"),
    jsTheme: getStyle(html, "--js-theme"),
    htmlTheme: getStyle(html, "--html-theme"),
    cssTheme: getStyle(html, "--css-theme"),
    wordsThemeCssandHTML: getStyle(html, "--words-question-css-html"),
    questionCSS: getStyle(html, "--question-css"),
    questionHTML: getStyle(html, "--question-html"),
    questionJS: getStyle(html, "--question-js"),
}

const darkMode = {
    bg: "#212121",
    details: "#000",
    css: "#0C304D",
    html: "#7E2002",
    js: "#BF8106",
    cardsShadow: "rgba(253, 253, 253, 0.192)",
    cardsHover: "#F5A300",
    jsTheme: "#B57800",
    htmlTheme: "#AD2E06",
    cssTheme: "#054A81",
    questionCSS: "#053255",
    questionHTML: "#7E2508",
    questionJS: "#E19A0D",
}

console.log(darkMode)
console.log(initialColors)


const transformKey = key =>
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()


const changeTheme = (colors) => {
    Object.keys(colors).map(key =>
        html.style.setProperty(transformKey(key), colors[key])
    )
}


theme.addEventListener("change", ({ target }) => {
    target.checked ? changeTheme(darkMode) : changeTheme(initialColors)
})



const isExistLocalStorage = (key) =>
    localStorage.getItem(key) != null

const createOrEditLocalStorage = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value))

const getValeuLocalStorage = (key) =>
    JSON.parse(localStorage.getItem(key))

theme.addEventListener("change", ({ target }) => {
    if (target.checked) {
        changeTheme(darkMode)
        createOrEditLocalStorage('modo', 'darkMode')
    } else {
        changeTheme(initialColors)
        createOrEditLocalStorage('modo', 'initialColors')
    }
})

if (!isExistLocalStorage('modo'))
    createOrEditLocalStorage('modo', 'initialColors')


if (getValeuLocalStorage('modo') === "initialColors") {
    theme.removeAttribute('checked')
    changeTheme(initialColors);
} else {
    theme.setAttribute('checked', "")
    changeTheme(darkMode);
}

// Fluxo de páginas

// function nextPageCss(valor) {
//     console.log("It works");
//     let teste = document.getElementById("numberQuestion");

    // for (i = 1; i <= 2; i++) {
    //     console.log(i)

//     let numberRight = Math.random()

//     console.log(numberRight)
//     if (valor == '1') {
//         let i = 1;
//         i++
//         let teste = document.getElementById("numberQuestion").src = "images/Q" + i + ".svg";
//         console.log(teste)
//     } else {
//         console.log('error')
//     }
// }



//Fluxo de perguntas

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choices'));
const progressText = document.querySelector('#progressText')
const imgQuestion = document.querySelector('#numberQuestion');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let avaiableQuestions = []


let questions = [
    {
        question: 'Qual desses é o modo correto de declarar o caminho para o css para o html?',
        choice1: 'a. < link rel="stylesheet" type="text/css" href="myCss/myStyle.css" >',
        choice2: 'b. < css rel="stylesheet" type="text/css" href="css/styles-choices.css">',
        choice3: 'c. @import < link href="myCss/myStyle.css">',
        choice4: 'd. < link type="text/css" href="myCss/myStyle.css">',
        answer: 1,
    },
    {
        question: 'Como centralizar algo na horizontal com flexbox?',
        choice1: 'a. Aplicando text-align: center ',
        choice2: 'b. Aplicando justify-content: center no elemento pai',
        choice3: 'c. Usando display: flex no elemento filho',
        choice4: 'd. Aplicando display: flex e justify-content: center no elemento pai',
        answer: 4,
    },
    {
        question: 'Qual a diferença entre id e class?',
        choice1: 'a. Nenhuma, as duas tem exatamente a mesma aplicação',
        choice2: 'b. Apenas ID pode ser relacionado em um script javascript, classes não',
        choice3: 'c. ID deve ser usado em apenas um elemento e class para vários',
        choice4: 'd. Class deve ser usado em apenas um elemento e ID para vários ',
        answer: 3,
    },
    {
        question: 'Qual o seletor universal para aplicar o estilo css aos elementos HTML?',
        choice1: 'a. #',
        choice2: 'b. !',
        choice3: 'c. /',
        choice4: 'd. *',
        answer: 4,
    },

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    avaiableQuestions = {...questions}
    getNewQueston()
}

getNewQueston = () => {
    if(avaiableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)


        return window.location.assign('/end.html')
    }


    questionCounter++
    
    const questionIndex = Math.floor(Math.random() * avaiableQuestions.length)
    currentQuestion = avaiableQuestions[questionnIndex]
    question.innerText = currentQuestion.question



    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })



    avaiableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}


choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return 


        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']


        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
           let pontos = 0
           return pontos++
        }


        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQueston()
        }, 1000)
    })
})