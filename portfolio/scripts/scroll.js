function ScrollToElement(theElement) {
  var el = document.getElementById(theElement);
  var selectedPosX = 0;
  var selectedPosY = 0;

  while (el != null) {
    selectedPosX += el.offsetLeft;
    selectedPosY += el.offsetTop;
    el = el.offsetParent;
  }

  window.scrollTo(selectedPosX, selectedPosY);
}
