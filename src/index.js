let textOptions = document.querySelectorAll("[data-text-option]")
let bold = document.querySelector("#bold")
let italic = document.querySelector("#italic")
let strikethrough = document.querySelector("#strikethrough")
let ul = document.querySelector("#list")
let ol = document.querySelector("#ordered-list")
let undo = document.querySelector("#undo")
let redo = document.querySelector("#redo")
let link = document.querySelector("#link")
let delink = document.querySelector("#delink")
let table = document.querySelector("#table")
let title = document.querySelector("#title")
let writingArea = document.getElementById("text-input")

const middle = 1;

let textHistory = [writingArea.value]
let historyPointer = 0;

textOptions.forEach(option => {
    option.addEventListener("click", ()=>{
        pushHistory(writingArea.value)
    })
})

const intializer = () => {
        
}

let numToCheckForChange;

const putInHistory = ()=> {
    const randNum = Math.random()
    const areaValue = writingArea.value;
    numToCheckForChange = randNum;
    setTimeout(()=> {
        if (randNum == numToCheckForChange) {
            pushHistory(areaValue)
        }
    }, 500);
}

bold.addEventListener("click", (e) => {
    changeSelection(
        (contentAsArray) => {
            if(contentAsArray[middle].startsWith("**") && contentAsArray[middle].endsWith("**")) {
                contentAsArray[middle] = contentAsArray[middle].replace(/\*\*/g, '');
            } else {
                contentAsArray[middle] = "**" + contentAsArray[middle] + "**"
            }
        })
});

italic.addEventListener("click", (e) => {
    changeSelection(
        (contentAsArray) => {
                if(contentAsArray[middle].startsWith("*") && contentAsArray[middle].endsWith("*")) {
                    contentAsArray[middle] = contentAsArray[middle].replace(/\*/g, '');
                } else {
                    contentAsArray[middle] = "*" + contentAsArray[middle] + "*"
                }
        })
})

strikethrough.addEventListener("click", (e) => {
    changeSelection(
        (contentAsArray) => {
                if(contentAsArray[middle].startsWith("~~") && contentAsArray[middle].endsWith("~~")) {
                    contentAsArray[middle] = contentAsArray[middle].replace(/~~/g, '');
                } else {
                    contentAsArray[middle] = "~~" + contentAsArray[middle] + "~~"
                }
        })
})

list.addEventListener("click", (e) => {
    changeLine(
        (content) => {
            let i = 0;
            for(i = 0; i < content.length && content.charAt(i) == " "; i++){}
            content = content.substring(i);
            if(content.startsWith("- ")) {
                return content.substring(2);
            } 
            return "- " + content;
        },
        () => {
            return "\n- "
        }
    );
})

ol.addEventListener("click", (e) => {
    changeLine(
        (content) => {
            let i = 0;
            for(i = 0; i < content.length && content.charAt(i) == " "; i++){}
            content = content.substring(i);
            if(content.startsWith("1. ")) {
                return content.substring(2);
            } 
            return "1. " + content;
        },
        () => {
            return "\n1. "
        }
    )
})

undo.addEventListener("click", () => {
    if(historyPointer > 0) {
        historyPointer--;
        writingArea.value = textHistory[historyPointer];
    }
})

redo.addEventListener("click", () => {
    if(historyPointer < textHistory.length - 1) {
        historyPointer++;
        writingArea.value = textHistory[historyPointer]
    }
})

const changeLine = (changer, creer) => {
    let text = writingArea.value;
    const areaValue = text;
    const del1 = writingArea.selectionStart;
    const del2 = writingArea.selectionEnd;
    let contentAsArray = []
    if(del1 != del2) {
        let i;
        for(i = del1; i >= 0 && text.charAt(i) != '\n'; i--) {}
        text = text.substring(i+1, del2);
        text = changer(text);
        contentAsArray = [
            areaValue.substring(0, i+1),
            text,
            areaValue.substring(del2, areaValue.length),
        ]
    } else {
        text = creer()
        contentAsArray = [
            areaValue.substring(0, del1),
            text,
            areaValue.substring(del1, areaValue.length)
        ]
    }
    writingArea.value = contentAsArray.join("");



}

const changeSelection = (ajouter) => {
    let text;
    let selection;
    const del1 = writingArea.selectionStart;
    const del2 = writingArea.selectionEnd;
    text = writingArea.value;
    if(del1 !== del2) {
        let innerText = text.substring(del1, del2)
        let contentAsArray = [
            text.substring(0, del1),
            innerText,
            text.substring(del2, text.length),
        ]
        ajouter(contentAsArray);
        writingArea.value = contentAsArray.join("");
    }
}


/**
*/
const pushHistory = (content) => {
    if(textHistory.length > historyPointer + 1) {
        textHistory = textHistory.slice(0, historyPointer+1);
        textHistory.push(content);
        historyPointer = textHistory.length - 1;
        return; 
    }
    if(textHistory.length >= 10) {
        textHistory.unshift()
        textHistory.push(content);
        return;
    }
    textHistory.push(content);
    historyPointer++;
}

