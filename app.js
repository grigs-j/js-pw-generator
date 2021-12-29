const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
    //creating obj to point to funcs
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};

generateEl.addEventListener("click", () => {
    //+ turns length from sting to number
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(
        //changing html text to generated pw
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    );
});

//takes in params where we can see what is checked and generate pw
function generatePassword(lower, upper, number, symbol, length) {
    //initialized empty string
    let generatedPassword = "";

    //how many t/f we have on click
    const typesCount = lower + upper + number + symbol;

    //instead of just receiving t/f value for els being checked,
    //we now recieve obejects that point the t/f to the el checked
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
        //if falsy/unchecked, filter out of array
        (item) => Object.values(item)[0]
    );

    if (typesCount === 0) {
        return "";
    }

    //loop over length and call generate pw func for each iteration
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach((type) => {
            //grabbing keys (t/f) of each type of func we are looping thru
            const funcName = Object.keys(type)[0];

            //running the funcs that are true and being looped over
            generatedPassword += randomFunc[funcName]();
        });
    }
    //still loops thru all trues checked even if length < 3, but we slice extra off
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

//copy pw to clipboard
//create textarea from dom on click
clipboardEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    //grabs pw from generatedpw in resultsEl
    const password = resultEl.innerText;

    if (!password) {
        return;
    }

    //assigning value to textarea, appending it html
    textarea.value = password;
    document.body.appendChild(textarea);

    //selects and copies
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("password copied to clipboard");
});

//generator funcs
function getRandomLower() {
    //using charcode, lower numbers start at 97 so we start there
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
    const symbol = "!@#$%^&*(){}[]=<>/,.";
    return symbol[Math.floor(Math.random() * symbol.length)];
}
