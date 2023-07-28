const editorElement = document.getElementById('editor');

const undoElement = document.getElementById('undo');
const redoElement = document.getElementById('redo');
const resultElement = document.getElementById('result');


editorElement.addEventListener('changed', (event) => {
    undoElement.disabled = !event.detail.canUndo;
    redoElement.disabled = !event.detail.canRedo;
});

undoElement.addEventListener('click', () => {
    editorElement.editor.undo();
});
redoElement.addEventListener('click', () => {
    editorElement.editor.redo();
});

const eraserElement = document.getElementById('eraser');
const penElement = document.getElementById('pen');
eraserElement.addEventListener('click', () => {
    editorElement.editor.enableEraser();
    eraserElement.classList.add('btn-active')
    penElement.classList.remove('btn-active')
});
penElement.addEventListener('click', () => {
    editorElement.editor.disableEraser();
    eraserElement.classList.remove('btn-active')
    penElement.classList.add('btn-active')
});

const doneElement = document.getElementById('done');
doneElement.addEventListener('click', () => {
    try {
        editorElement.editor.clear();
    } catch (error) {
        document.getElementById('result').innerText = '';
        console.log('Nothing to clear');
    }
});

editorElement.addEventListener('exported', (evt) => {
    var exports = evt.detail.exports;
    var text = exports['text/plain'];

    if ($currentInput) {
        var inputType = $currentInput.attr('type');
        if (inputType == 'number') {
            console.log('number detected');
            text = convertSimilarLettersToNumbers(text);
        }
    }
    document.getElementById('result').value = text;
});


//When resultElement is changed, import the value to Editor
let typingTimer;
const doneTypingInterval = 1000;

resultElement.addEventListener('input', () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    // This code will execute after the user stops typing for 0.5 seconds
    editorElement.editor.import_(resultElement.value, 'text/plain');
  }, doneTypingInterval);
});


// Add Custom Lexicon to IINK Recognizer
var $customConfig = {};
$customConfig['addLKText'] = true;

function transformData(originalData) {
    const transformedArray = [];

    for (const item of originalData) {
        if (item.text) {
            transformedArray.push(item.text);
        }

        if (item.desc) {
            const descParts = item.desc.split(' ');
            for (const part of descParts) {
                transformedArray.push(part);
            }
        }

        if (item.long_desc) {
            const longDescParts = item.long_desc.split(' ');
            for (const part of longDescParts) {
                transformedArray.push(part);
            }
        }
    }

    return transformedArray;
}

$.ajax({
    url: '/assets/data/doctorShorthands.json',
    dataType: 'text',
    async: false,
    success: function (data) {
        $customConfig['customLexicon'] = transformData(JSON.parse(data));


    }
});


var $freeEditor = iink.register(editorElement, {
    recognitionParams: {
        type: 'TEXT',
        protocol: 'WEBSOCKET',
        server: {
            applicationKey: 'bdb4ba32-0b0a-40d5-9f4d-3d89764cf83d',
            hmacKey: 'eae577ea-57c1-49f8-b761-269d98c96b3b'
        },
        iink: {
            lang: "id_ID",

            text: {
                smartGuide: false,
                guides: {
                    enable: false
                },
                configuration: $customConfig

            },

            export: {
                jiix: {
                    strokes: true
                }
            }




        },
    },
    highlight: false
});

$freeEditor.theme = { ink: { color: '#FFFFFF' } };
$freeEditor.penStyle = { 'color': '#FFFFFF', '-myscript-pen-width': '1' };
console.log(editorElement.editor.configuration.recognitionParams.iink.text.configuration.customLexicon);



window.addEventListener('resize', () => {
    editorElement.editor.resize();
});

function convertSimilarLettersToNumbers(inputString) {
    const similarLetterMapping = {
        'o': '0',
        'z': '2',
        'l': '1',
        'a': '4',
        's': '5',
        'b': '6',
        't': '7',
        'g': '9',
        'i': '1',
        'q': '9',
        'O': '0',
        'Z': '2',
        'S': '5',
        'B': '6',
        'G': '9',
        'I': '1',
        'Q': '9',
        'A': '4',
        'E': '3',
        'T': '7',
        'L': '1',
        'B': '8',
        'S': '8',
        'E': '8',
        ',': '.',
        // Add more mappings as needed.
    };

    // Regular expression to match the similar letters (case-insensitive).
    const regex = new RegExp(Object.keys(similarLetterMapping).join('|'), 'gi');

    return inputString.replace(regex, matchedLetter => similarLetterMapping[matchedLetter.toLowerCase()])
        .replace(/[^0-9.\/"'°\-]/g, ''); // Remove any non-numeric characters not in the mappings except ".", "-", "/", "\"", "'", and "°".
}

// Test the function:
const input = "10z2,lH/x\"y'z°";
const output = convertSimilarLettersToNumbers(input);
console.log(output); // Output: "1022,148"


