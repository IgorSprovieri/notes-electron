const createButtonLine = () => {
  const buttonElement = document.createElement("button");

  buttonElement.onclick = () => onShowOptions();
  buttonElement.innerHTML = "+";

  return buttonElement;
};
