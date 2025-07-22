import os
import json

def create_task_template(activity_id, title, grades_with_goals):
    data = {
        "activityId": activity_id,
        "activityTitle": title,
        "totalTasks": len(grades_with_goals) * 9,
        "tasksPerGrade": 9,
        "supportedGrades": list(grades_with_goals.keys()),
        "grades": {}
    }

    for grade, goal in grades_with_goals.items():
        grade_key = grade
        data["grades"][grade_key] = {
            "easy": [],
            "medium": [],
            "hard": []
        }

        for level in ["easy", "medium", "hard"]:
            for i in range(1, 4):
                task = {
                    "id": f"{activity_id}_{grade.lower().replace(' ', '_')}_{level}_{i}",
                    "difficulty": level,
                    "grade": grade,
                    "learningGoal": goal,
                    "question": "",
                    "answer": ""
                }
                data["grades"][grade_key][level].append(task)

    return data

# === Interaktiv input ===
activity_id = input("Aktivitets-ID (f.eks. lærKlokka): ").strip()
title = input("Tittel (f.eks. Lær Klokka): ").strip()

grades_with_goals = {}

print("\nLegg til trinn og læringsmål (skriv 'ferdig' for å avslutte)")
while True:
    grade = input("Årstrinn (f.eks. Andre årstrinn): ").strip()
    if grade.lower() == "ferdig":
        break
    if grade == "":
        continue
    goal = input("Læringsmål: ").strip()
    if goal:
        grades_with_goals[grade] = goal
        print("✅ Lagt til!\n")

# === Lagre JSON-filen ===
output_data = create_task_template(activity_id, title, grades_with_goals)

# Lagre i activityData/tasks/
output_dir = os.path.join("activityData", "tasks")
os.makedirs(output_dir, exist_ok=True)

output_path = os.path.join(output_dir, f"{activity_id}.json")
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(output_data, f, ensure_ascii=False, indent=2)

print(f"\n✅ Fil lagret som: {output_path}")