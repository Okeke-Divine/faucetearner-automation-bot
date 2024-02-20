const puppeteer = require("puppeteer");
require("dotenv").config();

const mineLogic = async (res = null) => {
let console_log = 1;
if (console_log == 1) { console.log('Mine Logic'); }

puppeteer.launch({ headless: false, args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    ignoreDefaultArgs: ['--disable-extensions'],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(), }).then(async browser => {


  const Emma_bot = {
    useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    screenWdith: 1366,
    screenHeight: 768,
  }

  const page = await browser.newPage();
  if (console_log == 1) { console.log('Browser Launched'); }
  await page.setDefaultNavigationTimeout(600000);


  await page.setUserAgent(Emma_bot.useragent);
  await page.setViewport({
    width: Emma_bot.screenWdith,
    height: Emma_bot.screenHeight,
  });
  await page.setRequestInterception(true);

  page.on('request', (req) => {
     if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
         req.abort();
     }
     else {
         req.continue();
     }
 });
  await page.goto('https://faucetearner.org');
  if (console_log == 1) { console.log('faucelearner.org->opended'); }

  // Click on the "Login" button
  await page.click('a.btn-one[href="login.php"]');
  if (console_log == 1) { console.log('clicked on login button'); }

  // Wait for the username, password  and button fields to load
  await page.waitForSelector('input[name="email"]', {timeout: 0});
  if (console_log == 1) { console.log('email selector active'); }

  await page.waitForSelector('input[name="password"]', {timeout: 0});
  if (console_log == 1) { console.log('password selector active'); }


  // Fill in the login form
  if (console_log == 1) { console.log('inputing details'); }
  await page.type('input[name="email"]', 'okekedivine.skiy1@gmail.com', { delay: 10 });
  await page.type('input[name="password"]', 'kayks1234', { delay: 10 });

  await page.waitForSelector('button.reqbtn[type="button"]');
  if (console_log == 1) { console.log('button selector active'); }
  // Click on the "Login" button
  await page.click('button.reqbtn[type="button"]');
  await page.click('button.reqbtn.btn-submit.w-100[type="button"]');


  if (console_log == 1) { console.log('Logging in.....'); }

  // Wait for the page to load
  await page.waitForNavigation();
  if (console_log == 1) { console.log('Page loaded...'); }

  // Close the first pop-up (if it's not clickable)
  await page.evaluate(() => {
    const popup = document.querySelector('.btn-secondary');
    if (popup) {
      popup.remove();
    }
  });
  if (console_log == 1) { console.log('Initial popup removed'); }

  // Wait for the pop-up to appear
  await page.waitForSelector('button.btn-info');

  // Click on the "OK" button in the pop-up
  await page.click('button.btn-info');
  if (console_log == 1) {
    console.log("I just clicked on the second pop_up ");
  }
  await page.waitForSelector('button.m-auto.mt-2.reqbtn.btn.solid_btn.text-white.d-flex.align-items-center');


  if (console_log == 1) { console.log('Injection Init'); }
  await page.evaluate(() => {
    let clickCount = 0;
    let intervalTimer;

    function clickButton() {
      const button = document.querySelector("form button");
      const close = document.querySelector(".modal-header .btn-close");

      if (button) {
        button.click();
        clickCount++;

        setTimeout(function () {
          if (
            document.querySelector(".modal-body .fs-4").innerHTML ==
            "You have already claimed, please wait for the next wave!" || document.querySelector(".modal-body .fs-4").innerHTML == "The current wave of XRP has been distributed, please wait for the next wave."
          ) {
            setTimeout(function () {
              close.click();
              setTimeout(function () {
                if (clickButton()) {
                  // alert('success');
                }
                if (clearInterval(intervalTimer)) {

                }
                if (intervalTimer = setInterval(clickButton, 30000)) {

                }

              }, 2000)
              // clickButton(); // Recalling the clickButton function after 5 seconds
              // c; // Resetting the original interval timer
              // intervalTimer = setInterval(clickButton, 60000); // Starting a new interval timer
            }, 2000);
          }
          else {
            setTimeout(function () {
              close.click();
            }, 2000);
          }
        }, 2000);
      }
    }

    clickButton();
    intervalTimer = setInterval(clickButton, 5000);
  });
  if (console_log == 1) { console.log('Injection End'); }

})
}


module.exports = {mineLogic}
