// PASSWORD GENERATOR

// Character Generator Functions

// Function that accepts a string value as a argument and returns a random index number from the string argument 
function randomIndex(str){
    return Math.floor(Math.random() * str.length)
}
// EXAMPLE of the randomIndex function
randomIndex(`Chicken`)// 0, 1, 2, 3, 4, 5, 6



// Function that returns a random lowercase letter using a random index in the "letters" string
function getRandomLower(){
    const letters = `abcdefghijklmnopqrstuvwxyz`
    // returning a random letter using a random index in the "letters" string 
    return letters[randomIndex(letters)]
}
// Example of the getRandomLower function
console.log(getRandomLower())// Random lowercase letter



// Function that returns a random uppercase letter
function getRandomUpper(){
    // running the getRandomLower function to create a random lowercase letter and setting that value to the "letter" variable
    const letter = getRandomLower()
    // Changing the random lowercase letter to an uppercase letter & returning it from the function
    return letter.toUpperCase()
}
// Example of the getRandomUpper function
console.log(getRandomUpper());// Random uppercase letter



// Function that returns a random number(AKA Random number as a string value)
function getRandomNumber(){
    const numbers = `1234567890`
    // returning a random number using a random index from the "numbers" string
    return numbers[randomIndex(numbers)]
}
// Example of the getRandomNumber function
console.log(getRandomNumber());// random number from the 'number' string



// Function that returns a random symbols(AKA Random symbol as a string value)
function getRandomSymbols(){
    const symbols = `!@#$%^&*(){}[]=<>/,.`
    // returning a random symbol using a random index from the "symbol" string
    return symbols[randomIndex(symbols)]
}
// Example of the getRandomSymbols function
console.log(getRandomSymbols());// random symbol from the 'symbol' string


// Object to store all the character generator functions
const randomFunctions = {
    lower: getRandomLower, 
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbols
}

// Selected the DOM element
const resultEl = document.querySelector(`#result`)
const clipboardEl = document.querySelector(`#clipboard`)
const lowercaseEl = document.querySelector(`#lowercase`)
const uppercaseEL = document.querySelector(`#uppercase`)
const numberEl = document.querySelector(`#number`)
const symbolEl = document.querySelector(`#symbol`)
const lengthEl = document.querySelector(`#length`)
const generateEl = document.querySelector(`#generate`)

// Generate Password Function (function that accepts true or false values as well as number as argument)
// NOTE: the checkbox inputs & number (aka length) input will determine the values/argument entered into this function
function generatePassword(lower, upper, number, symbol, length){
    console.log(lower, upper, number, symbol, length);

    // 1. CREATE THE PASSWORD VARIABLE 
    let generatePassword = ``;


    // 2. FILTER OUT UNCHECKED OPTIONS
    // true and false values can be added together(true is equal to 1 & false is equal to 0)
    // NOTE:This value set to the typesCount variable will be used when building out the password
    const typesCount = lower + upper + number + symbol;
    console.log(typesCount);
    // If the user has NOT selected anything then the alert will be displayed and an empty string will be returned from the function so the password displayed to the user will be an empty string(nothing)
    if(typesCount===0){
        alert(`Please select at least one option`)
        // The RETURN keyword stops/ends the running of a function(AKA does NOT run any code)
        return ``;
    }
    // Creating an array of arrays. The first item in each nested array holds the value of a string that will be used to access a function in the randomFunctions Object. Also, the second items in each nested array are of the values passes into this generatePassword function
    let typesArr = [
        [`lower`, lower],
        [`upper`, upper],
        [`number`, number],
        [`symbol`, symbol]
    ];
    console.log(typesArr);
    // The filter method creates a new array will all the items that "pass the test" implemented by the provided function(AKA all the items that cause the function to return a boolean value of true when the function is run using the item as the argument for the item parameter in this example)
    // Checking if the value for the index of 1 in each item (aka array in the typesArr array is true or false. also removing the item from the typesArr if it is false)
    typesArr = typesArr.filter(item => {
        console.log(item[1]);
        return item[1];
    })
    console.log(item[1]);


    // 3. LOOP OVER THE LENGTH AND CALL THE GENERATOR FUNCTION FOR EACH CHECKED OPTION
    // Building password with a for loop
    // NOTE: the value for "length" is the values entered/ selected for the length number input
    for (i=0; i < length; i+= typesCount){
        // One of item in the updated/filtered version if the typesArr array will be the value/argument passed un the the types parameter each time the anonymous arrow function is run
        typesArr.forEach(type => {
            const funcName = type[0]
            console.log(funcName);
            // Accessing and running.executing a function in the randomFunction object. Also, concatenating/adding the value returned from the accessed function to the generatedPassword string variable
            generatePassword += randomFunctions[funcName]()
            console.log(generatePassword);
        })
    }


    // 4. ADD THE GENERATED PASSWORD TO THE FINAL PASSWORD VARIABLE AND RETURN IT OUT OF THE FUNCTION
    // Removing extra characters if necessary(the above loop will create a password that may not match the length selected if that length is NOT a multiple of the number of checkboxes/options selected)
    const finalPassword = generatePassword.slice(0, length)
    console.log(finalPassword);

    return finalPassword
}
// Example of generatePassword function
// NOTE: using the starting values for when the page first loads
// generatePassword(true, true, true, true, 10)


// Event Listener for when the "generate password" button is clicked
generateEl.addEventListener(`click`, () => {
    // Checking if the following option/checkbox are selected/checked and the true or false values to the respective variable
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEL.checked
    const hasNumber = numberEl.checked
    const hasSymbol = symbolEl.checked

    // Accessing the value entered in for the number input and changing the value from string to a number NOTE: the value returned from a number input us a string value
    const length = parseInt(lengthEl.value)

    console.log(hasLower, hasNumber, hasUpper, hasSymbol, length);

    // The generatePassword function takes the true/false values determined by the checkboxes as well as the number from the number input has arguments and returns a string(AKA password)which is set as thw innerText value for the 'results' (aka span) element.
    resultEl.innerText = generatePassword(hasLower, hasNumber, hasUpper, hasSymbol, length)
});

// COPY PASSWORD
clipboardEl.addEventListener(`click`, () => {
    // creating a textarea element which will be used to put the password inside of so it can be copied
    const textarea = document.createElement(`textarea`)

    // Accessing the text/string value for the 'result' span and setting it to the "password" variable
    const password = resultEl.innerText

    // if the user clicks the clipboard button while no password is displayed, then an alert will be displayed to the user and function will end and nothing will be copied to the clipboard
    if(password === ``){
        alert(`Please generate a password first`)
        return;
    }

    // Referencing the "navigator" object to copy the selected value to the clipboard on the device the webpage is being viewed on
    navigator.clipboard.writeText(resultEl.innerText)

    // removing the textarea element from the webpage/document
    textarea.remove()

    // Alert letting the user know the password has been copied to the clipboard
    // alert(`Password has been copied to the clipboard`)
})
