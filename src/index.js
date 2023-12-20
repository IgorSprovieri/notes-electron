const lines = [];
let optionsOpen = false;

const onShowOptions = () => {
  document.getElementById("options").style.display = "flex";
};

const onCloseOptions = () => {
  document.getElementById("options").style.display = "none";
  optionsOpen = false;
};

const onCreateLine = ({ tag, variant }) => {
  const note = document.getElementById("note");

  lines.push({
    tag: tag,
    text: "",
    variant: variant,
    fontFamily: "Sans Serif",
  });

  note.innerHTML = "";

  lines.forEach((data, index) =>
    note.appendChild(createNoteLine({ data, index, lines }))
  );

  note.appendChild(createButtonLine());

  onCloseOptions();
};

document.addEventListener("click", (event) => {
  const options = document.getElementById("options");

  if (!options.contains(event.target) && optionsOpen === true) {
    onCloseOptions();
    return;
  }

  optionsOpen = true;
});
