const puppeteer = require('puppeteer');
const PerplexityAI = {};

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const getTextResponse = async(page) => {
  const textResponse = await page.evaluate(() => {
    let textResponse = '';
    [...document.querySelectorAll('.default span')].forEach(el => {
      if (el.textContent.trim().length === 3 && el.textContent.includes('[') && el.textContent.includes(']')) return false;
      if (el.querySelector('span')) return false;
      textResponse += el.textContent;
    });
    return textResponse;
  });
  return textResponse;
}

PerplexityAI.search = async (prompt) => {
  if (!prompt || prompt === '') throw new Error('prompt is required!');
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto('https://www.perplexity.ai/');
    //await page.waitForNavigation();
    await page.type('#ppl-query-input', prompt);
    await page.click('button.bg-super');
    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("View Detailed")'
    );
    const textConcise = await getTextResponse(page);
    await page.evaluate(() => {
      [...document.querySelectorAll('button')].find(element => element.textContent.includes('View Detailed')).click();
    });
    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("View Concise")'
    );
    
    let changeText = true;
    let detailedLength = 0;
    while (changeText) {
      const actualLength = (await getTextResponse(page)).length;
      if (actualLength > textConcise.length) {
        if (actualLength > detailedLength) detailedLength = actualLength;
        else changeText = false;
      }
      await delay(500);
    }
    
    const textDetailed = await getTextResponse(page);
    const sources = await page.evaluate(() => {
      return [...document.querySelectorAll('a[target="_blank"].block.group')].map(el => {
        return {
          name: el.textContent.substring(1),
          url: el.href
        }
      });
    });
    await browser.close();

    return {
      concise: textConcise,
      detailed: textDetailed,
      sources
    };
  } catch (err) {
    await browser.close();
    return {
      error: err.message || err
    };
  }
}

module.exports = PerplexityAI;