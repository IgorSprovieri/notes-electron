const createNoteCard = ({ id }) => {
  const buttonElement = document.createElement("button");

  buttonElement.id = `note-${id}`;
  buttonElement.onclick = () => {};

  return buttonElement;
};

module.exports = { createNoteCard };
