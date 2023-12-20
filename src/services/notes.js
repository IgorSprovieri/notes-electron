const { notesRepository } = require("../repositories");

const getInitialNotes = async () => {
  await notesRepository.createTable();

  const initialNotes = await notesRepository.findAll();

  if (initialNotes.length !== 0) return initialNotes;

  const createdNote = await notesRepository.create({
    lines: [{}],
  });

  initialNotes.push(createdNote);

  return initialNotes;
};

const saveLines = async ({ id, lines }) => {
  const note = await notesRepository.findById({ id });

  if (!note) return console.error("Note not found");

  await notesRepository.update({ id, lines });
};

module.exports = { notesService: { getInitialNotes, saveLines } };
