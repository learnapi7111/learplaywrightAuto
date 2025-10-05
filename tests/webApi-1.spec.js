
const {test, expect,request} = require('@playwright/test');
let requestData = {userEmail: "testingprofile@yopmail.com", userPassword: "Pa$$word1"};
let createdata = {orders: [{country: "India", productOrderedId: "6701364cae2afd4c0b90113c"}]};
let token;
let orderId;

test.beforeAll(async() =>{

   const apiContext = await request.newContext();
   const apiresponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: requestData,
  
        }
    )
   // expect(apiresponse.status()).toBe(200);
    expect(apiresponse.ok()).toBeTruthy();
    let apiJsonResponse = await apiresponse.json();
    token = apiJsonResponse.token;
    console.log(token);

    // Create Order API 
   const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{
        data: createdata,
        headers :{
            "authorization": token,
             "content-type" : 'application/json'

        }
        
    })
    //expect(orderResponse.ok()).toBeTruthy();
   // expect(orderResponse.status()).toBe(201);
   let orderresponseJson =  await orderResponse.json();
   orderId = await orderresponseJson.orders;
   console.log(orderId)

})


test(" Login ", async ({page}) =>{
    await page.goto("https://rahulshettyacademy.com/client/");

    page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    }, token);



    
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


  // await inputCardNumber.first().waitFor();
 //  await inputCardNumber.first().fill("371449635398431");

//    const firstDropdwon =  page.locator('.input.ddl');
//    await page.selectOption(firstDropdwon.first(), {index : '12'});
//    await page.pause();


//    await expect(page.locator(".user__name [type='text']").first()).toHaveText("anshika@gmail.com");

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
//    const btnApplyCoupon = page.locator("[type='submit']");
//    const errorText = page.locator(".field.small p")
//    const inputCouponCode  = page.locator("[name*=coupon]");
//    await inputCouponCode.fill("rahulsheetyacademy");
//    await btnApplyCoupon.click();
//    await expect(btnApplyCoupon).toHaveText("Apply Coupon");
//    await expect(errorText).toHaveText("* Invalid Coupon");

//    const btnPlaceOrder = page.locator(".btnn.action__submit ");
//    await  expect(btnPlaceOrder).toHaveText("Place Order ");
//    await btnPlaceOrder.click();

//    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")

//    const orderId  = await page.locator(".box .em-spacer-1 label").last().textContent();
//    orderId.trim();
//    console.log(orderId);


//    const lnkOrder = page.locator("[routerlink='/dashboard/myorders']");
//    await lnkOrder.first().isVisible();
//    await lnkOrder.first().click();

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