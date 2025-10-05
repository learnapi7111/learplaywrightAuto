const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');


test("Handle child windows", async({browser}) =>{


    const context = await browser.newContext();
    const page = await context.newPage();

    const documentLink = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const [newPage] = await  Promise.all([
    context.waitForEvent('page'),
    documentLink.click(),
    ])

   const text = await newPage.locator("[href*='sign_up']").first().textContent();
   console.log(text)

   const textEmailId  = await newPage.locator('.im-para a').textContent();
   console.log(textEmailId);

    await page.locator('#username').fill(textEmailId);
   console.log(await page.locator('#username').textContent());
   const textGet = await newPage.locator('.im-para.red').first().textContent();
   const arrattext = textGet.split("@");
   const newarrayText = arrattext[1].split(" ")[0]
   //const newarrayText1 = newarrayText[0]
   console.log(newarrayText)
    
});

test(" cypress test", async ({page}) =>{

    await page.goto("https://www.google.com/");

    const txtInputBox = page.locator("#APjFqb");
    const listtext = page.locator("[role='listbox'] li");

    await txtInputBox.fill("cypress");

    const searchTextList  = page.locator("#Alh6id [role='listbox'] ");
    await searchTextList.waitFor();
    const searchTextListCount = await searchTextList.locator('li').count();
    console.log("the search count is :" + searchTextListCount);

    for (let i = 0;i <searchTextListCount; i++){
      const allVal =  await (searchTextList).locator('li [role="presentation"] span').nth(i).textContent();
      console.log(allVal);

      if (allVal.includes('cypress tree')){
        await (searchTextList).locator('li [role="presentation"] span').nth(i).click();
        break;
      }

    }



});


//await page.locator(productTitle).allTextContents();

test(" Click on register link", async ({page}) =>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const documentLink = page.locator("[href*='documents-request']");

    await expect(documentLink).toHaveAttribute('class','blinkingText');


});

test(" Register user ", async ({page}) =>{
    await page.goto("https://rahulshettyacademy.com/client");

    const lnkRegister = ".text-reset";
    await page.locator(lnkRegister).click();

    const fName = "#firstName";
    const lName = "#lastName";
    const eMail = "#userEmail";
    const occupation = "select.custom-select";
    const selectoccupation = "[formcontrolname='occupation'] option";
    const phoneNo = "#userMobile"
    const pwd = "#userPassword";
    const confirmPwd = "#confirmPassword";
    const btnRegister ="#login";
    const btnRadioMale = "[value='Male']"


    await page.locator("#firstName").fill("testing");
    await page.locator(lName).fill("QA");
    await page.locator(eMail).fill("testingprofile@yopmail.com");
    const role =  (await page.locator(occupation).selectOption("Student"));
   // await page.pause();
    console.log(role)
  //  await page.locator(selectoccupation).nth(2).click();
    await page.locator(pwd).fill("testing@123");
    await page.locator(btnRadioMale).click();

    await page.locator(phoneNo).fill("1234567890");
    await page.locator(confirmPwd).fill("testing@123");
    await page.locator(btnRegister).click();

});


test(" Login ", async ({page}) =>{

    await page.goto("https://rahulshettyacademy.com/client");
    
    const inputEmailId = page.locator("#userEmail");
    const inputPwd = page.locator("#userPassword");
    const btnLogin =  page.locator("#login");
    const productTitle = " .card .card-body h5 b";
    const productDetails = page.locator('.card-body');
    const btnCart = page.locator('[routerlink="/dashboard/cart"]');
    const btnCheckout = page.locator('.subtotal .btn-primary');

    const inputCardNumber = page.locator(".input.txt");
    const dropdownDate  = ".input.ddl";
    const cvvCode = page.locator(".field.small .input.txt");

  
    await inputEmailId.fill("anshika@gmail.com");
    await inputPwd.fill("Iamking@000");
    await btnLogin.click();
  // const getfirstTitle =  await page.locator(productTitle).nth(0).textContent();

   //await page.waitForLoadState('networkidle')
   await page.locator(productTitle).first().waitFor();

   const getfirstTitle =  await page.locator(productTitle).allTextContents();
   console.log(getfirstTitle);

   const count = await productDetails.count();

   for ( let i = 0; i < count; i++){
    if (await productDetails.nth(i).locator('b').textContent() === "IPHONE 13 PRO" ){
        await productDetails.nth(i).locator("text= Add To Cart").click();
        break;
    }   
   }

   await btnCart.click();
   await page.locator('div li').last().waitFor();
   const bool = await page.locator('h3:has-text("IPHONE 13 PRO")').isVisible();
   expect(bool).toBeTruthy();
   await btnCheckout.click();


   await inputCardNumber.first().waitFor();
   await inputCardNumber.first().fill("371449635398431");

   const firstDropdwon =  page.locator('.input.ddl');
   await page.selectOption(firstDropdwon.first(), {index : '12'});



   await expect(page.locator(".user__name [type='text']").first()).toHaveText("anshika@gmail.com");

   const selectdropDown = await page.locator("[placeholder*='Country']").pressSequentially("ind");
   const dropDwonItems = await page.locator("section .ta-results.list-group");
   await dropDwonItems.first().waitFor();
   const buttonCount = await dropDwonItems.locator("button").count();
   for(let i = 0; i < buttonCount ;i++){
      const text = await dropDwonItems.locator("button").nth(i).textContent();
      if (text === " India"){
          await dropDwonItems.locator("button").nth(i).click();
          break;
  
      }
   }
   const btnApplyCoupon = page.locator("[type='submit']");
   const errorText = page.locator(".field.small p")
   const inputCouponCode  = page.locator("[name*=coupon]");
   await inputCouponCode.fill("rahulsheetyacademy");
   await btnApplyCoupon.click();
   await expect(btnApplyCoupon).toHaveText("Apply Coupon");
   await expect(errorText).toHaveText("* Invalid Coupon");

   const btnPlaceOrder = page.locator(".btnn.action__submit ");
   await  expect(btnPlaceOrder).toHaveText("Place Order ");
   await btnPlaceOrder.click();

   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")

   const orderId  = await page.locator(".box .em-spacer-1 label").last().textContent();
   orderId.trim();
   console.log(orderId);


   const lnkOrder = page.locator("[routerlink='/dashboard/myorders']");
   await lnkOrder.first().isVisible();
   await lnkOrder.first().click();

   const tableIdList = page.locator(".table-bordered tbody tr");
   await tableIdList.first().waitFor();
   const tableIdListCount = await tableIdList.locator("th").count();
   console.log("table rows count is : " + tableIdListCount);

   for (let i =0;i < tableIdListCount; i++){
    const getIdText = await tableIdList.locator("th").nth(i).textContent();
    console.log(getIdText)
    if (orderId.includes(getIdText)){
       await tableIdList.locator(".btn-primary").nth(i).click();
        break;
         
    }
   }

   const verifyTextOrderId = await page.locator(".col-md-6 .col-text ").textContent();
   expect(orderId.includes(verifyTextOrderId)).toBeTruthy();


});




