import * as puppeteer from "puppeteer";

(async () => {
  // Launch the browser and open a new blank page
  // headless must be false to get game data
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://www.metacritic.com/search/undertale/');

  // Wait and click on first result
  const firstGameSelector = '.c-pageSiteSearch-results-item';
  await page.waitForSelector(firstGameSelector);
  await page.click(firstGameSelector);



  // Get critic review score
  // Works
  const criticRatings = await page.$$('.c-siteReviewScore')

  const criticRating = await page.evaluate(el => el.querySelector("div > span").textContent, criticRatings[0])
  console.log(criticRating)

  // Get user review score
  // DOES NOT WORK

  // const ratings = await page.$$('.c-siteReviewScore')
  // console.log(ratings)
  // for (const rating of ratings) {
  //   const allRatings = await page.evaluate(el => el.querySelector("div > div > span").textContent, rating)
  //   console.log(allRatings)
  // }

  // await browser.close();
})();