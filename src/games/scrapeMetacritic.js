import * as puppeteer from "puppeteer";

(async () => {
  // Launch the browser and open a new blank page
  // headless must be false to get game data
  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://www.metacritic.com/search/earthlock/');

  // Wait and click on first result
  const firstGameSelector = '.c-pageSiteSearch-results-item';
  await page.waitForSelector(firstGameSelector);
  page.waitForNavigation(), // Waits for the next navigation event
  page.click(firstGameSelector),
  
  // Get critic score, user score, number of critic reviews and number of user reviews
  await page.waitForSelector('.c-productHero_scoreInfo.g-inner-spacing-top-medium.g-outer-spacing-bottom-medium.g-outer-spacing-top-medium');
  const ratings = await page.$$('.c-productHero_scoreInfo.g-inner-spacing-top-medium.g-outer-spacing-bottom-medium.g-outer-spacing-top-medium')

  for (const rating of ratings) {
    const criticRating = await page.evaluate(el => el.querySelector("div.c-productScoreInfo_scoreNumber.u-float-right > div > div > span").textContent, rating)
    const userRating = await page.evaluate(el => el.querySelector("div.c-productHero_scoreInfo.g-inner-spacing-top-medium.g-outer-spacing-bottom-medium.g-outer-spacing-top-medium > div.c-productScoreInfo.u-clearfix > div.c-productScoreInfo_scoreContent.u-flexbox.u-flexbox-alignCenter.u-flexbox-justifyFlexEnd.g-width-100.u-flexbox-nowrap > div.c-productScoreInfo_scoreNumber.u-float-right > div > div > span").textContent, rating)
    const criticNumber = await page.evaluate(el => el.querySelector("a > span").textContent.split(' ')[2], rating)
    const userNumber = await page.evaluate(el => el.querySelector("div.c-productHero_scoreInfo.g-inner-spacing-top-medium.g-outer-spacing-bottom-medium.g-outer-spacing-top-medium > div.c-productScoreInfo.u-clearfix > div.c-productScoreInfo_scoreContent.u-flexbox.u-flexbox-alignCenter.u-flexbox-justifyFlexEnd.g-width-100.u-flexbox-nowrap > div.c-productScoreInfo_text.g-outer-spacing-right-auto > span.c-productScoreInfo_reviewsTotal.u-block > a > span").textContent.split(' ')[2], rating)
    console.log([criticRating, userRating, criticNumber, userNumber])
  }

  await browser.close();
})();