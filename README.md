# Screening Project: Styline Web and Backend Developer Recruitment
- Fork the repository
- Create an ecommerce store according to the guidelines below using any web stack/framework you are comfortable with
- Complete the sections after the horizontal line in the README to provide instructions about how to install the depepndencies and run the project
- After you are done send a pull request to the original repository

#### Project Spec (implement as much as you can)
- Use Moltin API/SDK functionalities (https://moltin.com/docs/)
- API Keys/SDK Credentials are provided via email
- A test store is already configured and prepopulated with products and categories

##### Objectives (Basic)
- Implement a product list/grid page (having pagination is a plus)
- Each product item should show product name, product image (just one), sku, price, stock and category
- Products should be filtered by categories, stock availablability
- Products should be sorted by price
- Implement Customer Sign Up and Login functionalities using Moltin SDK (No email/sms verification is required)
- If the customer is logged in, show customer's name and logout button.
- Also an add to cart button should be visible with each products if customer is logged in (and if the product is in stock)

##### Objectives (Advanced)
- Show a Cart button when customer is logged in
- If Add to cart is pressed the product should be added to cart
- Tapping the cart button should take the user to a cart page where all items in the cart should be listed
- User should be able to remove items from cart and go back to the product page from the cart page

##### Notes
- UI can be very simple, but should be consistent
- Any UI Framework/icon sets/themes can be used
- You must use the provided backend (Moltin) using any of their SDKs or REST API and have to use the API/Access Keys that has been provided
- Focus should be on workable and consistent functionalities rather than aesthetics

---
**Note**: Fill up the following sections before creating the pull request

#### Used tech stack
1. Express.js, Node.js framework
2. Milligram, css framework

#### How to install dependencies (mention the OS it'll run on - Windows/Mac/Linux)
1. install dependencies
```bash
npm install
```
2. make a copy of `.env.dis` file named `.env` and put moltin credentials.
should work on any OS with node installed.
#### How to run the project
2. run project
```bash
npm start
```
project should be visible at http://localhost:3000


#### Notes
1. Product List api response has no category name for products. So showing category id for each product
2. Could not implement filter by stock availablability. insufficient Moltin documentation.

