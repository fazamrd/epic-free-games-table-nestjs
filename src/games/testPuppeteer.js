import * as puppeteer from "puppeteer";

(async () => {
  // Launch the browser and open a new blank page
  // headless must be false to get game data
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://store.epicgames.com/en-US/');

  const freeGames = await page.$$('.css-1vu10h2')
  console.log(freeGames)

  for (const freeGame of freeGames) {
    const gameName = await page.evaluate(el => el.querySelector("div > div > a > div > div > .css-hkjq8i > div > div").textContent, freeGame)
    console.log(gameName)
  }  

  await browser.close();
})();