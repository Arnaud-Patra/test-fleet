import pandas as pd
from sklearn.linear_model import LinearRegression
import mysql.connector


def load_data_from_mysql(product_name):
    cnx = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Sxks*63k",  # TODO : remove this
        database="ecommerce_db"
    )

    cursor = cnx.cursor()

    # Execute queries
    cursor.execute("""
        SELECT DATE(o.order_date) AS date,
               SUM(oi.quantity * oi.price_per_unit) AS total_sales_amount
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        WHERE p.name = %s
        GROUP BY DATE(o.order_date), p.product_id, p.name
    """, (product_name,))

    # Fetch results
    results = cursor.fetchall()

    cursor.close()
    cnx.close()

    return results


if __name__ == "__main__":
    # # this is some mock data from a csv file
    # data = pd.read_csv('./linear_regression/sales_data.csv', parse_dates=['date'])
    
    # Change product name to the one you want to predict
    product_name = 'Laptop'

    # Load data from MySQL database
    data = load_data_from_mysql(product_name)
    data = pd.DataFrame(data, columns=['date', 'total_sales_amount'])

    # Convert 'date' column to datetime
    data['date'] = pd.to_datetime(data['date'])

    # Extract X (dates) and y (values)
    X = data['date'].astype(int) // 10**9  # Convert to Unix timestamp
    # X = data['date'].astype(int) // 10**9  # Convert to timestamp, use for Mock data
    
    # Reshape to 2D array
    X = X.values.reshape(-1, 1)
    y = data['total_sales_amount']

    # Create and train the model
    model = LinearRegression()
    model.fit(X, y)

    # Calculate the coefficient of determination
    r_sq = model.score(X, y)
    print(f"coefficient of determination: {r_sq}")

    # Print the coefficients
    print(f"Intercept: {model.intercept_}")
    print(f"Coefficient: {model.coef_}")

    # Predict the next 7 days
    last_date = data['date'].max()
    future_dates = pd.date_range(start=last_date + pd.Timedelta(days=1), periods=7)
    X_future = future_dates.astype(int) // 10**9
    X_future = X_future.values.reshape(-1, 1)

    future_predictions = model.predict(X_future)

    # Print predictions with dates
    for date, prediction in zip(future_dates, future_predictions):
        print(f"Date: {date.date()}, Predicted sales: {prediction:.2f}")

    # # Predict one custom future value
    # date_str = '2023-05-11'
    # X_pred = pd.to_datetime([date_str]).astype(int) // 10**9
    # X_pred = X_pred.values.reshape(-1, 1)  # Reshape to 2D array

    # prediction = model.predict(X_pred)
    # print(f"Future predictions: {prediction}")
    # y_pred = model.intercept_ + model.coef_ * X_pred[0]
    # print(f"Predictions: {y_pred}")
