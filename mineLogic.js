console.log('mineLogic.js');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
require("dotenv").config();

const mineLogic = async (res = null) => {
  let console_log = 1;
  if (console_log == 1) { console.log('Mine Logic'); }


  puppeteer.launch({
    headless: 'new', args: [
      // "--disable-setuid-sandbox",
      // "--no-sandbox",
      // "--single-process",
      // "--no-zygote",
    ],
    // ignoreDefaultArgs: ['--disable-extensions'],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  }).then(async browser => {


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
      if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image' || req.url().includes('hm.js')) {
        req.continue();
        // req.abort();
      }
      else {
        req.continue();
      }
    });
    await page.goto('https://faucetearner.org/login.php');
    if (console_log == 1) { console.log('faucelearner.org/login.php->opended'); }

    // await page.waitForSelector('a.btn-one[href="login.php"]', { timeout: 900000 });
    // await page.click('a.btn-one[href="login.php"]');
    // if (console_log == 1) { console.log('clicked on login href link'); }

    // Wait for the username, password  and button fields to load
    await page.waitForSelector('input[name="email"]', { timeout: 0 });
    if (console_log == 1) { console.log('email input is active'); }
    await page.waitForSelector('input[name="password"]', { timeout: 0 });
    if (console_log == 1) { console.log('password input is active'); }

    // Fill in the login form
    await page.type('input[name="email"]', 'okekedivine.skiy1@gmail.com', { delay: 10 });
    await page.type('input[name="password"]', 'kayks1234', { delay: 10 });

    await page.evaluate(() => {
      function apireq() {
        var formData = {};
        formData.email = "okekedivine.skiy1@gmail.com";
        formData.password = "kayks1234";
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'api.php?act=login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              var data = JSON.parse(xhr.responseText);
              if (data.code === 0) {
                alert_text.innerHTML = data.message;
                alert_icon.innerHTML = checkicon;
                document.getElementById("modal_alert").style.display = 'block';
                alert_ok.addEventListener('click', function () {
                  location.href = "faucet.php";
                });
                setTimeout(function () {
                  location.href = "faucet.php";
                }, 2000);
              } else {
                alert_text.innerHTML = data.message;
                alert_icon.innerHTML = closeicon;
                document.getElementById("modal_alert").style.display = 'block';
              }
            } else {
              console.error('Request failed: ' + xhr.status);
            }
          }
        };
        xhr.send(JSON.stringify(formData));

        console.log(formData);
      }
      apireq();
    });

    if (console_log == 1) { console.log('Form submitted using ajax'); }

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
    await page.waitForSelector('button.btn-info', { timeout: 0 });

    // Click on the "OK" button in the pop-up
    await page.click('button.btn-info');
    if (console_log == 1) {
      console.log("I just clicked on the second pop_up ");
    }
    await page.waitForSelector('button.m-auto.mt-2.reqbtn.btn.solid_btn.text-white.d-flex.align-items-center', { timeout: 0 });


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


module.exports = { mineLogic }
