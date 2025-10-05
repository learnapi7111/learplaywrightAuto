import { test, expect,request} from '@playwright/test';

// let requestData = {
//   "operationName": null,
//   "variables": {
//       "tenantId": "ddd525b9-e47c-46ac-ab55-e0db93338ff3"
//   },
//   "query": "query ($tenantId: String) {\n  tenantConfig(tenantId: $tenantId) {\n    tenantId\n    gtmAccountId\n    supportEmail\n    theme {\n      primaryColor\n      secondaryColor\n      logoUrl\n      __typename\n    }\n    topNavItems {\n      title\n      url\n      isNewTab\n      headerNavItem\n      icon\n      iconSvg\n      __typename\n    }\n    __typename\n  }\n}\n"
// }

// let token;

// test.beforeAll(async() =>{
//   let apiRequest = await request.newContext();
// let apiresponse =  await apiRequest.post('https://api-atom.qa.learnwithatom.com/admin/graphql',{
//   data: requestData,
// });
// //expect(apiresponse.ok()).toBeTruthy();
// let apiJson = apiresponse.json()
// token = apiJson.atom_access_token;
// console.log(token)


// })


test('test', async ({ page }) => {
  await page.goto('https://kna.qa.learnwithatom.com/');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('e2e.author');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Kaplan123@');
  await page.getByRole('button', { name: 'submit' }).click();
  await page.getByLabel('launch KNA').click();
  await page.getByRole('link', { name: 'Reports & Tooling' }).click();
  await page.getByText(' Tools ').click();
  await page.getByText('Export QTI to Alfresco').click();
  await page.getByLabel(' Click here to upload QTI File ').click();
  await page.getByLabel(' Click here to upload QTI File ').setInputFiles('/Users/kaplan/Desktop/1108/qti_files_1108_1.zip');
  await page.getByLabel('Click here to upload Metadata').click();
  await page.getByLabel('Click here to upload Metadata').setInputFiles('/Users/kaplan/Desktop/1108/test_data_metadata-1108.csv');
  await page.screenshot({path: "addfiles.png"});
  await page.getByLabel('TOC Path *').click();
  await page.getByPlaceholder('Enter Table of Contents URL').fill('https://kaplan.componize.com/share/page/site/atom-tech-team/document-details?nodeRef=workspace://SpacesStore/3eaa524b-0e62-4405-b63b-25d62e3cf5b6');
  await page.getByLabel('Output Folder Path *').click();
  await page.getByLabel('Output Folder Path *').fill('https://kaplan.componize.com/share/page/site/atom-tech-team/folder-details?nodeRef=workspace://SpacesStore/a33601f2-f514-46a6-9d13-9d1bb34ea6e5');
  await page.screenshot({path: "addFolderPaths.png"});
  await page.getByRole('button', { name: 'Convert' }).click();
  await page.screenshot({path: "popUp.png"});
  await page.getByLabel('Confirm button. Press enter').click();
  await page.getByRole('button', { name: 'View Progress' }).click();
  // await page.getByText('Task was scheduled successfully!').screenshot({path: "taskSucessfull.png"});
  // await page.waitForTimeout(2000)


});


