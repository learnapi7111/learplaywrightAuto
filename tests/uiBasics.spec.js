const {test, expect} = require('@playwright/test');

test(" My first playwright script", async ({browser}) =>{

    const context = await browser.newContext();
    const page = await context.newPage();

    const loginTxt = page.locator("input#username");;
    const passwordTxt = page.locator("input#password");
    const btnLogin = page.locator("#signInBtn");
    const erroMsgTxt = page.locator("[style*='block']");
    const cardTitle = page.locator('.card-body a');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");


    await console.log(page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await loginTxt.fill("random@gmail.com");
    await passwordTxt.fill('learning');
    await btnLogin.click();
    await expect(erroMsgTxt).toContainText("Incorrect");

    await loginTxt.fill("");
    await loginTxt.fill("rahulshettyacademy");
    await page.screenshot({path: "screenshot.png"});
    await page.locator("#signInBtn").screenshot({path: "partialscreenshot.png"})
    await btnLogin.click();

  // console.log(await expect(cardTitle).nth(0).toHaveText("iphone X"));
  // console.log(await expect(cardTitle).nth(3).textContent("Blackberry"));
//    let textTitle =  await cardTitle.allTextContents();
//    console.log(textTitle)

    console.log(await(cardTitle.nth(0).textContent()));
    console.log(await(cardTitle.nth(3).textContent()));
    console.log(await(cardTitle.allTextContents));

    await expect(cardTitle.nth(0)).toHaveText("iphone X");
    

});

test(" Visual Automation ", async ({page}) =>{

    await page.goto("https://pmbr.com/");
    expect(await page.screenshot()).toMatchSnapshot("pmbr.png");
    await page.locator('.sc-pZdvY .sc-ptSuy ').nth(0).screenshot({path: "firstTest.png"});


});



