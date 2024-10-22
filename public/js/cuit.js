function patternMatch({ input, template }) {
  try {
    let j = 0;
    let plainText = "";
    let countj = 0;

    while (j < template.length) {
      if (countj > input.length - 1) {
        template = template.substring(0, j);
        break;
      }

      if (template[j] == input[j]) {
        j++;
        countj++;
        continue;
      }

      if (template[j] == "x") {
        template = template.substring(0, j) + input[countj] + template.substring(j + 1);
        plainText = plainText + input[countj];
        countj++;
      }
      j++;
    }

    return template;
  } catch (error) {
    return "";
  }
}
window.addEventListener("load", () => {

  /*cuit.addEventListener("input", (e) => {
    e.target.value = patternMatch({
      input: e.target.value,
      template: "xx-xxxxxxxx-x",
    });
  });*/
});
