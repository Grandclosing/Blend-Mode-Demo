const blendModes = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity",
];

let imageLoaded = false;
let currentURL = "";

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

  if (key == 13 /* enter */) search();
}

function shakeSearchbar() {
  const urlEntry = document.getElementsByClassName("url-entry")[0];
  urlEntry.classList.toggle("bad-url");

  setTimeout(function () {
    urlEntry.classList.toggle("bad-url");
  }, 1000);
}

function search() {
  const urlEntry = document.getElementsByClassName("url-entry")[0];
  const url = urlEntry.value;

  if (url == currentURL) return;

  currentURL = url;

  if (!isValidURL(url)) {
    shakeSearchbar();

    return;
  }

  loadImage(url);
}

function loadImage(url) {
  let boxes = document.getElementsByClassName("grid-element");
  let saveButtons = document.getElementsByClassName("save-image-button");

  let rootStyle = document.documentElement.style;
  rootStyle.setProperty("--empty-box-padding", "0px");

  document.getElementsByClassName("no-pic-container")[0].style.display = "none";
  document.body.style.overflowY = "scroll";

  for (let i = 0; i < boxes.length; ++i) {
    let box = boxes[i];
    let imageNode = document.createElement("img");
    imageNode.setAttribute("src", url);
    imageNode.style.mixBlendMode = blendModes[i];

    if (box.firstChild) box.removeChild(box.firstChild);

    box.appendChild(imageNode);

    saveButtons[i].classList.remove("save-disabled");
  }

  imageLoaded = true;
}

function updateColor() {
  document.documentElement.style.setProperty(
    "--blend-color",
    document.getElementsByClassName("color-picker")[0].value
  );
}

function save(id) {
  if (!imageLoaded) return;

  let box = document.getElementsByClassName("grid-element")[id];
  let fileName = blendModes[id] + ".png";

  domtoimage
    .toBlob(box)
    .then(function (blob) {
      window.saveAs(blob, fileName);
    })
    .catch(function (e) {
      shakeSearchbar();

      openModal();
    });
}

function openModal() {
  document
    .getElementsByClassName("modal-background")[0]
    .classList.add("modal-visible");
}

function closeModal() {
  document
    .getElementsByClassName("modal-background")[0]
    .classList.remove("modal-visible");
}
