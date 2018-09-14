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
#### How to install dependencies (mention the OS it'll run on - Windows/Mac/Linux)
#### How to run the project

#### Notes
1. product list response has category with id and type but no name

1. Fork their repo on Github
2. In your local, rename your origin remote to upstream

    git remote rename origin upstream

3. Add a new origin

    git remote add origin git@github...my-fork

4. Fetch & push

    git fetch origin
    git push origin
