
# Credit Agricole Price listing Typescript + ReactJS app

This is a Typescript + ReactJS application that display a list of products and updates the prices once every second connecting to a backend API + Websocket of the CreditAgricole .NET c#  API.
The subscription can be stopped and started anytime at the user's convenience.

## Main functionality

The app displays a list of prices on the front-end every second being updated with new prices.

There are 2 endpoints in place for this app to call: 

* **/api/productlist** : API endpoint that returns the list of the products without prices, just ID and name.


* **/ws/productprices** : For Price List every second updates I have used a WebSocket returning an array with ProductID, Price and UpdatedAt 
( I have used UpdatedAt field for the showing a precise time, because the price is generated in the back end service so the price might be generated at different times than the others, at any time in the interval of one second )

I have used websocket because compared to the HTTP protocol, WebSocket eliminates the need for a new connection with every request,
 reducing the size of each message (no HTTP headers).

Therefore the traffic data is minimized retrieving only the data needed from these endpoints, when needed, with the minimum amount of server requests.

## Approaches and libraries used

For fetching the product list from the API I have used the fetch function.

For the retrieval of product prices I have used a **reactive pattern** with **RxJS library** making a subscription onto the  **/ws/productprices**  endpoint,
the ProductsPage taking care of opening and closing the subscription to this websocket when needed. The frequency is configured from the back end service , that being of 1 second.

The calculation of the Price comparison is set on the FE as the back end should not be interested of this matter.
I have used `.pipe(startWith(), pairwise())` on the rxjs websocket to get the previous value of list prices in order to compare it for the up arrow and down arrow to display accordingly.

The app automatically starts to subscribe to the host provided in the env file. 
It uses useEffect to make it to start at the beginning, when loading the page, and it closes the connection when functional component unmounts with the following clean up function `return () => stopSubscription()`

On local the env file should look like this: **REACT_APP_CREDIT_AGRICOLE_API_URL**=https://localhost:7242

I have also created a custom hook called **PriceSubscriptionHook** to manage separately the starting and ending of the subscription.
I have used useState hook locally to manage the state.

## Steps to set the app on your local machine

1. **npm install** on your machine in the root folder

2. **npm start** to start the app on local machine

Hitting GET on the /api/productlist endpoint will return the list of products with ID and name, 10 hardcoded products.
The second enpoint is the price list websocket /ws/productprices , which returns the price list array every second. The prices are generated randomly, a number between 1 and 100.

## CSS Styling

I have used CSS modules for styling with one root global variable in App.css

## Main folders

**Components** - reusable components with css modules

**Models** - typescript entity types

**Pages** - the ProductsPage manages the state of product list and product prices and passes it to the ProductList component

KISS and DRY principles are applied.

## Improvements / additions that can be useful are : 

* A global state tool (like redux) can be implemented if app gets more complex
* LazyLoading and Routes can be put in place if app requires more pages.
* Product list can be cached at a period of time if it does not change often
* Unit tests and e2e tests
* Authentication & Authorization
* Making the app responsive for multiple devices screens
* Web accessibility can be setup in place if used with tools like Narator.
If it's the case, web accessibility should be implemented in places. It ensures that all users, including those using screen readers or other assistive technologies, can interact with your content effectively
Also, browsers can understand and present in a better way the app to the users if WebAccessiblity is in place.

## Data Models

* **Product** - the product : ID and name
* **ProductPrice** - the product price: ProductID, Price and UpdatedAt
* **Currency** 

## Unit tests

JEST unit tests must be set up in place.
The util functions, all components and the page must be unit tested for a current and future robust application.
