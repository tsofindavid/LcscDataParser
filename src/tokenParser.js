const config = require('../config');
const puppeteer = require('puppeteer');

const url  = 'https://lcsc.com/products/ST-Microelectronics_474.html?q=stm32';

async function fetchProductList(url) {
    const browser = await puppeteer.launch({ 
        headless: true, // false: enables one to view the Chrome instance in action
        defaultViewport: null, // (optional) useful only in non-headless mode
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    config.token = await page.evaluate(()=>{
        return $.ajaxSetup().headers["X-CSRF-TOKEN"];
    });
    console.log(config)
    await browser.close();
}

fetchProductList(url);