import sys
import json
import numpy as np
from sklearn.linear_model import LinearRegression
import pandas as pd

def predict_expenses(spending_trends, target_month_year):
    
    df = pd.DataFrame(spending_trends)

    
    df['month'] = pd.to_datetime(df['month'])
    df['month_number'] = df['month'].dt.month + (df['month'].dt.year * 12)  

    
    X = df[['month_number']]  
    y = df['total_spent']     

    
    model = LinearRegression()
    model.fit(X, y)

    
    last_month_number = df['month_number'].max()

    
    target_month = pd.to_datetime(target_month_year)
    target_month_number = target_month.month + (target_month.year * 12)

    
    if target_month_number > last_month_number:
        future_month_numbers = np.array([target_month_number]).reshape(-1, 1)
        predictions = model.predict(future_month_numbers)

        
        future_expenses = {
            'month': target_month.strftime('%Y-%m'),
            'predicted_expense': predictions[0]
        }
    else:
        
        actual_expense = df.loc[df['month_number'] == target_month_number, 'total_spent'].values[0]
        future_expenses = {
            'month': target_month.strftime('%Y-%m'),
            'predicted_expense': actual_expense
        }

    return future_expenses

if __name__ == "__main__":
    
    input_data = json.loads(sys.argv[1])
    target_month_year = sys.argv[2].strip()  

    
    predicted_expenses = predict_expenses(input_data, target_month_year)

    
    print(json.dumps(predicted_expenses))
