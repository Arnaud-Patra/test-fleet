# Technical Test for Fleet

## Instructions : 
https://getfleet.notion.site/Study-Case-Full-Stack-Developer-e2db5673111249acae5d0b48a44662b4

## Data

The movie app should use data coming from themovieDB API:

- Create an account on https://www.themoviedb.org/
- Generate an API key (as described here : [The Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction) )
- Connect your app to that API

# Requirements

## Packages used for the front
- React
- TailwindCSS : https://www.material-tailwind.com/docs/react/installation
- lodash
- React Router
- Axios
- React Query
- React Hook Form

## For python, we use :
- numpy
- sklearn
- pandas
- mysql-connector-python

## Text editor used
- Cursor

# How to run the project
- npm start

- For the sql database, I used mysql workbench to create the database and the tables. You can also run it on your local server.

- python linear_regression.py

## Remarks
I dit not use linters for python because it's a simple script.

The Front end is simple and could be prettier but it's efficient for the purpose.

For the SQL database, I created a third table, called "order_items" that is a many-to-many relationship between the "orders" and "products" tables.

For the marquet prediction I used a machine learning model from sklearn that uses a linear regression algorithm. I have some mock data in sales_data.csv that I used to train the model. The script also predicts the next 7 days of sales and prints it.
