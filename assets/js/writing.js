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

    // console.log(exports['application/vnd.myscript.jiix']);

    if (text == "") {
        document.getElementById('result').innerHTML = `<span class="opacity-50">Write something fist...</span>`;
        return;
    }

    document.getElementById('result').innerText = text;
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
                }

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
$freeEditor.penStyle = {'color':'#FFFFFF','-myscript-pen-width':'1'};



window.addEventListener('resize', () => {
    editorElement.editor.resize();
});

