const editorElement = document.getElementById('editor');

const undoElement = document.getElementById('undo');
const redoElement = document.getElementById('redo');



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
    const exports = evt.detail.exports;
    const text = exports['text/plain'];
    var inputMode = $('#handwriting_modal').attr('data-input-mode');
    console.log('inputMode: ', inputMode);
    // console.log(exports['application/vnd.myscript.jiix']);

    // if inputMode is input, text replaces the #result element's textarea value
    // if inputMode is textarea, text adds/appends to the #result textarea value

    // if (inputMode == 'input') {
    // disable #result as textarea
    $('#result').prop('disabled', true);
    document.getElementById('result').value = text;
    // }
    // else if (inputMode == 'textarea') {
    //     $('#result').prop('disabled', false);
    //     document.getElementById('result').value += text;
    // }
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

