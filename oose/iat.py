import pandas as pd
from pymongo import MongoClient


def process_internal(file):
    try:
        # Connect to MongoDB
        client = MongoClient("mongodb://localhost:27017/")
        db = client["IAT"]  
        collection = db["cse"]  

        # Read Excel file with multi-level headers
        df = pd.read_excel(file, header=[0, 1, 2])

        # Flatten column names
        df.columns = ['_'.join(map(str, col)).strip() for col in df.columns.values]

        # Function to calculate IAT score
        def calculate_iat_score(score, max_score):
            return round((score / max_score) * 5, 1) if pd.notna(score) else 0

        # Function to calculate semester score
        def calculate_semester_score(paper1, paper2):
            if paper2 == 0:
                return paper1  
            else:
                return round((paper1 + paper2) / 2, 1)

        staff_data = []

        for _, row in df.iterrows():
            staff_id = row.get("Staff_id_Unnamed: 1_level_1_Unnamed: 1_level_2", "Unknown")
            dept = row.get("Dept_Unnamed: 2_level_1_Unnamed: 2_level_2", "Unknown")

            # Odd Sem Calculations
            odd_paper1_iat1 = calculate_iat_score(row.get("Odd sem_Paper 1_IAT 1 (75)", 0), 75)
            odd_paper1_iat2 = calculate_iat_score(row.get("Odd sem_Paper 1_IAT 2 (85)", 0), 85)
            odd_paper1 = round((odd_paper1_iat1 + odd_paper1_iat2) / 2, 1)

            odd_paper2_iat1 = calculate_iat_score(row.get("Odd sem_Paper 2_IAT 1 (75)", 0), 75)
            odd_paper2_iat2 = calculate_iat_score(row.get("Odd sem_Paper 2_IAT 2 (85)", 0), 85)
            odd_paper2 = round((odd_paper2_iat1 + odd_paper2_iat2) / 2, 1)

            odd_sem_score = calculate_semester_score(odd_paper1, odd_paper2)

            # Even Sem Calculations 
            even_paper1_iat1 = calculate_iat_score(row.get("Even sem_Paper 1_IAT 1 (75)", 0), 75)
            even_paper1_iat2 = calculate_iat_score(row.get("Even sem_Paper 1_IAT 2 (85)", 0), 85)
            even_paper1 = round((even_paper1_iat1 + even_paper1_iat2) / 2, 1)

            even_paper2_iat1 = calculate_iat_score(row.get("Even sem_Paper 2_IAT 1 (75)", 0), 75)
            even_paper2_iat2 = calculate_iat_score(row.get("Even sem_Paper 2_IAT 2 (85)", 0), 85)
            even_paper2 = round((even_paper2_iat1 + even_paper2_iat2) / 2, 1)

            even_sem_score = calculate_semester_score(even_paper1, even_paper2)

            # Final Score (Out of 10)
            total_score = round(odd_sem_score + even_sem_score)

            staff_record = {
                "staff_id": staff_id,
                "dept": dept,
                "odd_paper": [odd_paper1_iat1, odd_paper1_iat2, odd_paper2_iat1, odd_paper2_iat2],
                "even_paper": [even_paper1_iat1, even_paper1_iat2, even_paper2_iat1, even_paper2_iat2],
                "avg": [odd_paper1, odd_paper2, even_paper1, even_paper2], 
                "total_avg": [odd_sem_score, even_sem_score],
                "total_iat": total_score
            }
            
            staff_data.append(staff_record)

        # Insert data into MongoDB only if staff_data is not empty
        if staff_data:
            collection.insert_many(staff_data)
            print("Data successfully inserted into MongoDB!")
        else:
            print("No data to insert.")

    except Exception as e:
        print(f"Error processing internal assessment: {e}")
