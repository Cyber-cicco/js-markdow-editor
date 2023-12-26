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

const intializer = () => {
        
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
        (content) => {
            return content + "\n- "
        }
    );
})


const changeLine = (changer, creer) => {
    let text = writingArea.value;
    const del1 = writingArea.selectionStart;
    const del2 = writingArea.selectionEnd;
    let contentAsArray = []
    if(del1 != del2) {
        let areaValue = text;
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
        text = creer(text)
        contentAsArray = [text]
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
        textHistory = textHistory.slice(0, historyPointer);
        textHistory.push(content);
        return; 
    }
    textHistory.push;
}


const highlighter = () => {
    
}
