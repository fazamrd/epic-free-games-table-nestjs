import * as puppeteer from "puppeteer";

(async () => {
  // Launch the browser and open a new blank page
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

  // // Wait and click on first result
  // const searchResultSelector = '.search-box__link';
  // await page.waitForSelector(searchResultSelector);
  // await page.click(searchResultSelector);

  // // Locate the full title with a unique string
  // const textSelector = await page.waitForSelector(
  //   'text/Customize and automate'
  // );
  // const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // // Print the full title
  // console.log('The title of this blog post is "%s".', fullTitle);

  // await browser.close();
})();