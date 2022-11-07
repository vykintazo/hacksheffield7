# DiscountMapper
Discount Mapper is an app that aims to bring consumers and local business owners closer together by offering a platform for vendors to offer time-sensitive discounts.

One of the winners @ [HackSheffield 7](https://hs7.devpost.com/).

## Third party services
To run this project you will need to get access keys from these services:
- [Mapbox](https://www.mapbox.com/)
- [Google Firebase](https://firebase.google.com/)

## Setup
### Firebase project
- Create a new Firebase project
- Set up a web app for it
- Save generated config in the file `firebaseConfig.js` in the project root
- Firebase project needs Auth (email and Google methods) and Firestore services enabled and configured.
### Mapbox
- Create a Mapbox account to get an access token
- Copy contents of `.env.example` to a new file called `.env` and set the access token there.

## Running
- Run `yarn install` to get all dependencies.
- Run `yarn run dev` to start development server.