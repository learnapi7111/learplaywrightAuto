import {test,expect} from '@playwright/test'


test("handle popups" , async({page}) =>{
    await  page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    page.on('dialog',dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    const hoveronButton =  await page.locator(".mouse-hover").hover();
    page.locator(".mouse-hover").locator(".mouse-hover-content").locator("a").first().click();

    




})

