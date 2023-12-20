const createNoteLine = ({ data, index, lines }) => {
  const { tag, variant, fontFamily, text } = data;

  const element = document.createElement(tag);

  if (tag === "input") {
    element.type = "text";
  }

  if (tag === "textarea") {
    element.rows = 1;
  }

  element.id = `line-${index}`;
  element.classList = [variant];
  element.style.fontFamily = fontFamily;
  element.defaultValue = text;

  element.oninput = (event) => {
    lines[index].text = event.target.value;

    if (tag === "textarea") {
      event.target.style.height = "auto";
      event.target.style.height = event.target.scrollHeight + "px";
    }
  };

  return element;
};
