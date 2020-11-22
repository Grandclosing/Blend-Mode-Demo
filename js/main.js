
const blendModes = [
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity'
]

function isValidURL(str) {
    try {
        url = new URL(str);

        return true;
    } catch (_) {
        return false;  
    }
}

function processKey(e) {
    const key = e.which || e.keyCode;

    if(key == 13 /* enter */)
        search();
}

function search() {
    const urlEntry = document.getElementsByClassName('url-entry')[0];
    const url = urlEntry.value;

    if(!isValidURL(url)) {
        urlEntry.classList.toggle('bad-url');

        setTimeout(function() {
            urlEntry.classList.toggle('bad-url');
        }, 1000);

        return;
    }

    loadImage(url);
}

function loadImage(url) {
    let boxes = document.getElementsByClassName('grid-element');

    let rootStyle = document.documentElement.style;
    rootStyle.setProperty('--empty-box-padding', '0px');

    document.getElementsByClassName('no-pic-container')[0].style.display = 'none';
    document.body.style.overflowY = 'scroll';

    for(let i = 0; i < boxes.length; ++i) {
        let box = boxes[i];
        let imageNode = document.createElement('img');
        imageNode.setAttribute('src', url);
        imageNode.style.mixBlendMode = blendModes[i];

        box.appendChild(imageNode);
    }
}

function updateColor() {
    document.documentElement.style.setProperty('--blend-color', 
        document.getElementsByClassName('color-picker')[0].value);
}

// function loadImage(url) {
//     fetch(url, {
//         method: 'GET',
//         mode: 'no-cors',
//         referrerPolicy: 'no-referrer'
//     })
//     .then(response => response.blob())
//     .then(image => {
//         let ourNewImage = URL.createObjectURL(image);
//         console.log(ourNewImage);

//         applyImageToDOM(url);
//     });
// }

// function loadImage(url) {
//     let ourImage = new Image();
    
//     ourImage.crossOrigin = 'anonymous';
//     ourImage.addEventListener('load', () => {
//         applyImageToDOM(this);
//     }, false);
//     ourImage.src = url;
// }

