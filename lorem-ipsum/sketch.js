let length = 500;
const order = 2;

const nGrams = {};
const lorem = 'Sol ardet, silentium est, villa sub sole iacet. Etiam canis tacet, asinus non iam clamat. Quintus stat et exspectat. Ubi est Flavia? Cur Amica non venit? Cur venire cessat? Non placet stare et exspectare, non placet esse sine amica, non placet villa sine amica, non placet sol, non placet silentium. Subito canis latrat, etiam asinus clamat. Quid est? Ecce! Quis venit?';

generateNGrams();
document.querySelector('#output').textContent = generateLorem();

document.querySelector('#length').addEventListener('input', function () {
  length = this.value;
  document.querySelector('#output').textContent = generateLorem();
});

function generateNGrams() {
  for (let i = 0; i < lorem.length - order + 1; i++) {
    const gram = lorem.substring(i, i + order);
    if (!nGrams[gram]) {
      nGrams[gram] = [];
    }
    nGrams[gram].push(lorem.substring(i + order, i + order + 1));
  }
}

function generateLorem() {
  let txt = lorem.substring(0, order);
  for (let i = 0; i < length; i++) {
    const gram = txt.substring(txt.length - order, txt.length);
    const j = Math.floor(Math.random() * nGrams[gram].length);
    let newChar = (nGrams[gram])[j];
    if (newChar.length == 0) newChar = ' ';
    txt += newChar;
  }
  return txt;
}
