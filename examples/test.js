const PerplexityAI = require('../src/');

const main = async() => {
  const prompt = 'cual es la ultima polemica de boric?';
  const response = await PerplexityAI.search(prompt);
  console.log('response', response);
}

main();