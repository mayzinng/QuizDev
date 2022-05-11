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