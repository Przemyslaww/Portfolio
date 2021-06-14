currentPanel = 'center-panel'

document.addEventListener("keydown", arrowScrool);

function arrowScrool(event) {
  var key = event.keyCode;
  var go;
  switch (key) {
    case 37:
      go = 'left';
      break;
    case 38:
      go = 'up';
      break;
    case 39:
      go = 'right';
      break;
    case 40:
      go = 'down';
      break;
    default:
      return;
  }
  if (currentPanel == 'center-panel') {
    switch (go) {
      case 'up':
        ScrollToElement('top-panel');
        break;
      case 'down':
        ScrollToElement('bottom-panel');
        break;
      case 'left':
        ScrollToElement('left-panel');
        break;
      case 'right':
        ScrollToElement('right-panel');
        break;
    }
  } else if (currentPanel == 'left-panel') {
    if (go == 'right')
      ScrollToElement('center-panel');
  } else if (currentPanel == 'right-panel') {
    if (go == 'left')
      ScrollToElement('center-panel');
  } else if (currentPanel == 'top-panel') {
    if (go == 'down')
      ScrollToElement('center-panel');
  } else if (currentPanel == 'bottom-panel') {
    if (go == 'up')
      ScrollToElement('center-panel');
  }
}

function ScrollToElement(theElement) {

  var el = document.getElementById(theElement);
  currentPanel = theElement;
  var selectedPosX = 0;
  var selectedPosY = 0;

  while (el != null) {
    selectedPosX += el.offsetLeft;
    selectedPosY += el.offsetTop;
    el = el.offsetParent;
  }

  window.scrollTo(selectedPosX, selectedPosY);
}