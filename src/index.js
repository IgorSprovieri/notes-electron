const { createNoteLine, createButtonLine } = require("./components");
const { notesService } = require("./services");

const notes = [];
let selectedNote = "";

const lines = [];
let optionsOpen = false;

const init = async () => {
  const initialNotes = await notesService.getInitialNotes();

  initialNotes.forEach(({ id, lines }) => notes.push({ id, lines }));

  selectedNote = initialNotes[0].id.toString();

  initialNotes[0].lines.forEach(({ tag, text, variant, fontFamily }) =>
    lines.push({ tag, text, variant, fontFamily })
  );

  onRenderLines();
};

const saveOnDB = async () => {
  await notesService.saveLines({ id: selectedNote, lines: lines });
};

const onRenderLines = () => {
  const note = document.getElementById("note");

  note.innerHTML = "";

  lines.forEach((data, index) => {
    const noteCreated = createNoteLine({ data, index, lines, saveOnDB });

    note.appendChild(noteCreated);

    if (noteCreated.tagName === "TEXTAREA") {
      noteCreated.style.height = "auto";
      noteCreated.style.height = noteCreated.scrollHeight + "px";
    }
  });

  note.appendChild(createButtonLine());
};

const onShowOptions = () => {
  document.getElementById("options").style.display = "flex";
};

const onCloseOptions = () => {
  document.getElementById("options").style.display = "none";
  optionsOpen = false;
};

const onCreateLine = ({ tag, variant }) => {
  lines.push({
    tag: tag,
    text: "",
    variant: variant,
    fontFamily: "Sans Serif",
  });

  onRenderLines();
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

init();
