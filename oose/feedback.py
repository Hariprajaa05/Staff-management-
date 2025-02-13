import pandas as pd
from pymongo import MongoClient

def process_feedback(file):
    try:
        client = MongoClient("mongodb://localhost:27017/")
        db = client["FEEDBACK"]
        collection = db["cse"]

        df = pd.read_excel(file, header=[0, 1])
        df.columns = ['_'.join(map(str, col)).strip() for col in df.columns]

        def calculate_feedback_score(score, max_score=80):
            return round((score / max_score) * 7.5, 1) if pd.notna(score) else 0

        staff_data = []

        for _, row in df.iterrows():
            staff_id = row.get("Staff_id_Unnamed: 1_level_1", "Unknown")
            dept = row.get("Dept_Unnamed: 2_level_1", "Unknown")

            # Odd Sem Calculations
            odd_paper1 = calculate_feedback_score(row.get("Odd_Paper 1 (80)", 0))
            odd_paper2 = calculate_feedback_score(row.get("Odd_Paper 2 (80)", 0))
            odd_sem_score = round(odd_paper1 if odd_paper2 == 0 else (odd_paper1 + odd_paper2) / 2, 1)

            # Even Sem Calculations
            even_paper1 = calculate_feedback_score(row.get("Even_Paper 1 (80)", 0))
            even_paper2 = calculate_feedback_score(row.get("Even_Paper 2 (80)", 0))
            even_sem_score = round(even_paper1 if even_paper2 == 0 else (even_paper1 + even_paper2) / 2, 1)

            total_feedback_score = round(odd_sem_score + even_sem_score)

            staff_record = {
                "staff_id": staff_id,
                "dept": dept,
                "odd_paper": [odd_paper1, odd_paper2],
                "even_paper": [even_paper1, even_paper2],
                "total_avg": [odd_sem_score, even_sem_score],
                "total_feedback": total_feedback_score
            }

            staff_data.append(staff_record)

        if staff_data:
            collection.insert_many(staff_data)
            print("Feedback scores successfully inserted into MongoDB!")
        else:
            print("No data to insert.")

    except Exception as e:
        print(f"Error processing feedback: {e}")
