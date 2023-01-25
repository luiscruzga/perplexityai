
# PerplexityAI

Perplexity AI is an answer engine that delivers accurate answers to complex questions using large language models. It is an unofficial implementation of the [PerplexityAI](https://www.perplexity.ai/) site to be able to use easily and quickly


## Installation

Install this project with npm

```bash
  npm install --save perplexityai
```

## Demo

Example of an search

```js
const PerplexityAI = require('perplexityai');

const main = async() => {
  const prompt = 'cuál es la última polemica de elon musk?';
  const response = await PerplexityAI.search(prompt);
  console.log('response', response);
}

main();
```

OUTPUTS

```js
{
  concise: '',
  detailed: '',
  sources: [
    {
      name: '',
      url: ''
    },
    {
      name: '',
      url: ''
    },
    ....
  ]
}
```
## Authors

- [@luiscruzga](https://www.github.com/luiscruzga)

