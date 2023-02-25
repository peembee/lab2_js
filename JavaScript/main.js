// ------------- change background-function -----------------
function setBackgroundColor(newColor){
    document.body.style.background = newColor;
}
setBackgroundColor();
//  --------------- secret code-funktion --------------------
window.addEventListener("keypress", codeReader); 
const easteEggCode = [49,51,51,55]; // keyCode represent: 1337 (int)
let validateCode = []; // user keyboard input saves here.

function codeReader(key){    
    validateCode.push(key.keyCode);    
    let collectCode = validateCode.length - 1; // saves position 

    if(validateCode[collectCode] == easteEggCode[collectCode]){ // if input is == secret-code
        let userCodeToString = "";
        let CodeToString = () =>{
            let code ="";
            for(let i = 0; i < easteEggCode.length; i++){
                code += easteEggCode[i];
            }
            return(code);
        }       
        for(let i = 0; i < validateCode.length; i++){
            userCodeToString += validateCode[i];
        }
        if(userCodeToString == CodeToString()){ // If input from keyboard == easter-egg code
            const openModal = document.getElementById("modal");
            modal.style.display ="block";           
            validateCode.length = 0;

            const writeToHtml = document.getElementById("modalText"); 
            
            function randomMessage(){ // random jokes to user
                const message = [
                    "Vad heter nattflyget till Moskva? <br> – Sov-Jet!",
                    "Vet du vart hajen lärde sig att simma? <br> - På haj-school",
                    "Jag tränar nästan varje dag. <br> - I går till exempel, då tränade jag nästan.",
                    "Vad gör en arbetslös skådespelare? <br> – Spelar väl ingen roll?",
                    "Hur kan ni ha så lågt pris på kött?  <br>  – Vi har skurit ner på personalen…",
                    "Tror ni apelsiner vill bli juice eller blir de pressade till det?",
                    "Om någon vänlig själ är villig att komma hem till mig och förklara varför uppvärmningskostnaden skjuter i höjden varje vinter så står min dörr alltid öppen."
                ]
                let pick = Math.floor(Math.random() *message.length) // getting randomjokes, then display it in modal
                console.log(pick)
                let getMessage = message[pick];
                writeToHtml.innerHTML = getMessage;
            }
            randomMessage();
        }     
    }
    else{
        validateCode.length = 0; // deleting data in array.
    }  
}

// --- close easterEgg modal ---
let closeModal = () =>{
    window.addEventListener("click", close);
    modal.style.display = "none";
}

// -------------------- get JSON-file ---------------------
const jsonFile="cv.json"
const getJsonData = async() => {
    
    try{
    const response = await fetch(jsonFile); // getting jsonFile
    const data = await response.json();
    displayJson(data); // call function "displayJson"
    return data;   
    } catch(error){  
        console.log(error);
        return error;
    }
}
getJsonData();

// --- display json-data ---
function displayJson(data){
    const writeToHtml = document.getElementById("cv");

    let getinfo = "";
    for(let i = 0; i < data.length; i++){  // Print Job-information      
        if(data[i].Arbetsgivare != undefined){  // when printing worktitle is finished, then loop thru School-information 
        getinfo += '<br>' + data[i].Arbetsgivare + '<br>' +
         'År: ' + data[i].From + ' - ' + data[i].Tom + '<br>' +
         data[i].Beskrivning + '<br>';     
        }      
        else{  // Print School-information
            getinfo += '<br>' + data[i].Skola + '<br>';
            if(data[i].Utbildning === undefined ){  // If file contains just courses and not educations, print the specific courses
                getinfo += 'Kurser: ' + data[i].Kurser + '<br>';
            }
            else{
            getinfo += 'Utbildning: ' + data[i].Utbildning + '<br>';
            }             
            getinfo += 'År: ' + data[i].From + ' - ' + data[i].Tom + '<br>';          
        }
    }  
    writeToHtml.innerHTML = getinfo;
}







