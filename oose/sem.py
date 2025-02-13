import pandas as pd
from pymongo import MongoClient

def process_university(file):
    try:
        # Connect to MongoDB
        client = MongoClient("mongodb://localhost:27017/")
        db = client["UNIVERSITY"]  
        collection = db["cse"] 

        # Read Excel file with multi-level headers
        df = pd.read_excel(file, header=[0, 1])

        # Flatten column names
        df.columns = ['_'.join(map(str, col)).strip() for col in df.columns]

        print(df.columns.tolist())

        # Function to calculate university score
        def calculate_univ_score(score, max_score=90):
            return round((score / max_score) * 10, 1) if pd.notna(score) else 0

        staff_data = []

        for _, row in df.iterrows():
            staff_id = row.get("Staff_id_Unnamed: 1_level_1", "Unknown")
            dept = row.get("Dept_Unnamed: 2_level_1", "Unknown")

            # Odd Sem Calculations
            odd_paper1 = calculate_univ_score(row.get("Odd_Paper 1 (90)", 0))
            odd_paper2 = calculate_univ_score(row.get("Odd_Paper 2 (90)", 0))
            odd_sem_score = round(odd_paper1 if odd_paper2 == 0 else (odd_paper1 + odd_paper2) / 2, 1)

            # Even Sem Calculations
            even_paper1 = calculate_univ_score(row.get("Even_Paper 1 (90)", 0))
            even_paper2 = calculate_univ_score(row.get("Even_Paper 2 (90)", 0))
            even_sem_score = round(even_paper1 if even_paper2 == 0 else (even_paper1 + even_paper2) / 2, 1)

            total_univ_score = round(odd_sem_score + even_sem_score)

            staff_record = {
                "staff_id": staff_id,
                "dept": dept,
                "odd_paper": [odd_paper1, odd_paper2],
                "even_paper": [even_paper1, even_paper2],
                "total_avg": [odd_sem_score, even_sem_score],
                "total_univ": total_univ_score
            }

            staff_data.append(staff_record)

        # Insert data into MongoDB only if staff_data is not empty
        if staff_data:
            collection.insert_many(staff_data)
            print("University marks successfully inserted into MongoDB!")
        else:
            print("No data to insert.")

    except Exception as e:
        print(f"Error processing university marks: {e}")
