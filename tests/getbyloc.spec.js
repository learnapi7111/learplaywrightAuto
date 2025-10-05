
import {test,expect} from '@playwright/test'




test("validate price", async ({page}) =>{
 await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
 const webTableList = await page.locator("#product tbody ").first();

 //console.log(webTableList);

 const webTableList1 = await webTableList.locator("tr").count();
 console.log(webTableList1);

for (let i = 0;i<webTableList1;i++){
   const webTableList2 =  await webTableList.locator("tr").nth(i).textContent();
   console.log(webTableList2);
  const  webTableList3 = webTableList2.siblings().textContent();
  console.log(webTableList3);

    // for(let j =0;j<webTableList2; j++){
    //     const webTableList3 =  await webTableList2.locator("td").nth(j).textContent();
    //     console.log(webTableList3);

    // }

 }






 

});






//  const webTableListCount = await webTableList.locator("tr td").count();
//  console.log("Thew web elements found : " + webTableListCount);
//  for (let i = 0; i<webTableListCount; i++){
//     const priceText = await webTableList.locator('preceding-sibling::td[2]').textContent();
//     console.log("The price Text is " + priceText);

//  }


//  for (let i = 0; i<webTableListCount; i++){
//     const priceText = await webTableList.locator("tr").nth(i).textContent();
//   //console.log("The price Text is " + priceText);
//   const getPrice = await webTableList.locator("tr").locator("td").nth(i).textContent();
//  console.log("the second price is " + getPrice);

//  }



 







test(" get by locators" , async ({page}) =>{
    await page.goto('https://rahulshettyacademy.com/angularpractice/')
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").fill("test@123");
    await page.getByRole("button", {name : "Submit"}).click();
    const sucessMsg = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    expect (sucessMsg).toBeTruthy();
    await page.getByRole("link" ,{name : "Shop"}).click();
})

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

  
    //  await inputEmailId.fill("anshika@gmail.com");
     await page.getByPlaceholder("email@example.com").fill("anshika@gmail.com");
    // await inputPwd.fill("Iamking@000");
     await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    // await btnLogin.click();  
     await page.getByText("Login").click();
       
   // await btnLogin.click();
  // const getfirstTitle =  await page.locator(productTitle).nth(0).textContent();

   //await page.waitForLoadState('networkidle')
   await page.locator(productTitle).first().waitFor();

  // const getfirstTitle =  await page.locator(productTitle).allTextContents();
   await page.locator(".card-body ").filter({hasText : "IPHONE 13 PRO"}).getByRole("button", { name: " Add To Cart"}).click();


   //console.log(getfirstTitle);

//    const count = await productDetails.count();

//    for ( let i = 0; i < count; i++){
//     if (await productDetails.nth(i).locator('b').textContent() === "IPHONE 13 PRO" ){
//         await productDetails.nth(i).locator("text= Add To Cart").click();
//         break;
//     }   
//    }

  // await btnCart.click();

   await page.getByRole("listitem").getByRole("button", {name : "Cart"}).click();

   await page.locator('div li').last().waitFor();

   //const bool = await page.locator('h3:has-text("IPHONE 13 PRO")').isVisible();

   await page.getByText("IPHONE 13 PRO").isVisible();
   //expect(bool).toBeTruthy();

  // await btnCheckout.click();

  await page.getByRole("button", {name : "Checkout"}).click();

   await inputCardNumber.first().waitFor();

  // await inputCardNumber.first().fill("371449635398431");
  //await page.getByPlaceholder("4542 9931 9292 2293").fill("371449635398431")
  await page.getByRole("textbox").first().fill("371449635398431");


   //await expect(page.locator(".user__name [type='text']").first()).toHaveText("anshika@gmail.com");
   await page.getByPlaceholder("anshika@gmail.com").isVisible();

//    const selectdropDown = await page.locator("[placeholder*='Country']").pressSequentially("ind");
//    const dropDwonItems = await page.locator("section .ta-results.list-group");
//    await dropDwonItems.first().waitFor();
//    const buttonCount = await dropDwonItems.locator("button").count();
//    for(let i = 0; i < buttonCount ;i++){
//       const text = await dropDwonItems.locator("button").nth(i).textContent();
//       if (text === " India"){
//           await dropDwonItems.locator("button").nth(i).click();
//           break;
  
//       }
//    }
await page.getByPlaceholder("Select Country").pressSequentially("ind");
await page.getByRole("button" ,{name: "India"}).last().click();


   const btnApplyCoupon = page.locator("[type='submit']");
   const errorText = page.locator(".field.small p")
   const inputCouponCode  = page.locator("[name*=coupon]");
   
   
   //await inputCouponCode.fill("rahulsheetyacademy");
   await page.getByRole("textbox").nth(3).fill("rahulsheetyacademy");
   await page.getByRole("button" ,{name: "Apply Coupon"}).click();
   await page.getByText("* Invalid Coupon").isVisible();
   await page.getByText("Place Order ").click();




//    await btnApplyCoupon.click();
//    await expect(btnApplyCoupon).toHaveText("Apply Coupon");
  // await expect(errorText).toHaveText("* Invalid Coupon");

//    const btnPlaceOrder = page.locator(".btnn.action__submit ");
//    await  expect(btnPlaceOrder).toHaveText("Place Order ");
//    await btnPlaceOrder.click();

   //await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")

   await page.getByText(" Thankyou for the order. ").isVisible();

   const orderId  = await page.locator(".box .em-spacer-1 label").last().textContent();
   orderId.trim();
   console.log(orderId);

await page.getByLabel(" | 6772a30ee2b5443b1f0a08a2 | ").isVisible();



//    const lnkOrder = page.locator("[routerlink='/dashboard/myorders']");
//    await lnkOrder.first().isVisible();
//    await lnkOrder.first().click();

await page.getByRole("button", {name : "ORDERS"}).click();

await page.locator(".table-bordered tbody tr th ").nth(0).isVisible();
await page.locator(".table-bordered tbody tr ").first().getByRole("button", { name: "View"}).click();

//    const tableIdList = page.locator(".table-bordered tbody tr");
//    await tableIdList.first().waitFor();
//    const tableIdListCount = await tableIdList.locator("th").count();
//    console.log("table rows count is : " + tableIdListCount);

//    for (let i =0;i < tableIdListCount; i++){
//     const getIdText = await tableIdList.locator("th").nth(i).textContent();
//     console.log(getIdText)
//     if (orderId.includes(getIdText)){
//        await tableIdList.locator(".btn-primary").nth(i).click();
//         break;
         
//     }
//    }

   const verifyTextOrderId = await page.locator(".col-md-6 .col-text ").textContent();
   expect(orderId.includes(verifyTextOrderId)).toBeTruthy();


});




test(" cypress test", async ({page}) =>{

    await page.goto("https://www.google.com/");

    const txtInputBox = page.locator("#APjFqb");
    const listtext = page.locator("[role='listbox'] li");

    await txtInputBox.fill("cypress");

   await page.locator("#Alh6id [role='listbox'] li [role='presentation'] span").filter({hasText : "cypress tree"}).click();



});