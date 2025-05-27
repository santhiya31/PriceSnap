# product_filter.py

import pandas as pd

# ✅ Load CSV globally so it's accessible to the function
df = pd.read_csv('all_products.csv')

import pandas as pd

# Load CSV once (global)
df = pd.read_csv('all_products.csv')

def clean_price_column(df):
    df['price_num'] = df['price'].str.replace(',', '').astype(float)
    return df

def get_all_products(sort_by='', sort_order='asc'):
    data = df.copy()
    
    # Clean price for sorting if needed
    data = clean_price_column(data)
    
    # Sort if requested
    if sort_by in ['price', 'rating']:
        sort_col = 'price_num' if sort_by == 'price' else sort_by
        ascending = True if sort_order == 'asc' else False
        data = data.sort_values(by=sort_col, ascending=ascending)
    
    # Prepare output columns
    result = data[['name', 'price', 'rating', 'image_url', 'product_link-href', 'source']].copy()
    result = result.rename(columns={
        'image_url': 'image',
        'product_link-href': 'link'
    })
    
    # Convert price to string without ₹ for frontend
    result['price'] = result['price'].str.replace('₹', '').str.replace(',', '').astype(str)
    
    # Fill NaN ratings with "N/A" or 0 (your choice)
    result['rating'] = result['rating'].fillna('N/A').astype(str)
    
    return result.to_dict(orient='records')

def filter_products(query, sort_by='', sort_order='asc'):
    query = query.lower().strip()

    filtered = df[df['name'].str.contains(query, case=False, na=False)].copy()

    if sort_by in ['price', 'rating']:
        if sort_by == 'price':
            filtered['price_num'] = filtered['price'].str.replace('₹', '').str.replace(',', '').astype(float)
            sort_col = 'price_num'
        else:
            filtered['rating'] = pd.to_numeric(filtered['rating'], errors='coerce').fillna(0)
            sort_col = 'rating'

        filtered = filtered.sort_values(by=sort_col, ascending=(sort_order == 'asc'))

    filtered = filtered[['name', 'price', 'rating', 'image_url', 'product_link-href', 'source']]
    filtered = filtered.rename(columns={
        'image_url': 'image',
        'product_link-href': 'link'
    })
    filtered['price'] = filtered['price'].str.replace('₹', '').str.replace(',', '').astype(str)
    filtered = filtered.where(pd.notnull(filtered), None)
    return filtered.to_dict(orient='records')

