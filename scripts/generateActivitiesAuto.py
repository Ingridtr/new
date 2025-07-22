import os
import json

# === KONFIGURASJON ===
ACTIVITIES_FILE = "./public/activityData/activities.json"
TASKS_FOLDER = "./public/activityData/tasks"
INPUT_FILE = "/Users/ingrid/Desktop/mappe uten navn/new/scripts/activity_input.json"
# Sørg for at mappen finnes
os.makedirs(TASKS_FOLDER, exist_ok=True)

# === Last inn input-aktiviteter fra JSON ===
with open(INPUT_FILE, "r", encoding="utf-8") as file:
    input_activities = json.load(file)


# === Genererer 3 oppgaver per nivå for et trinn og læringsmål ===
def generate_tasks(activity_id, grade, goal):
    tasks = {"easy": [], "medium": [], "hard": []}
    for level in tasks:
        for i in range(1, 4):
            tasks[level].append({
                "id": f"{activity_id}_{grade.lower().replace(' ', '_')}_{level}_{i}",
                "difficulty": level,
                "grade": grade,
                "learningGoal": goal,
                "question": "",
                "answer": ""
            })
    return tasks

# === Last eksisterende aktiviteter ===
if os.path.exists(ACTIVITIES_FILE):
    with open(ACTIVITIES_FILE, "r", encoding="utf-8") as f:
        existing_activities = json.load(f)
else:
    existing_activities = []

# === Hovedløp ===
for activity in input_activities:
    activity_id = activity["id"]
    title = activity["title"]
    description = activity["description"]
    time = activity["time"]
    image = activity["image"]
    tools = activity["tools"]
    location = activity["location"]
    grade = activity["grade"]
    learning_goals = activity["learning_goals"]
    num_tasks = activity["number_of_tasks"]

    # === Lag TASK JSON ===
    grades_obj = {}
    for goal in learning_goals:
        grades_obj[grade] = generate_tasks(activity_id, grade, goal)

    task_data = {
        "activityId": activity_id,
        "activityTitle": title,
        "totalTasks": num_tasks,
        "tasksPerGrade": 9,
        "supportedGrades": [grade],
        "grades": grades_obj
    }

    task_path = os.path.join(TASKS_FOLDER, f"{activity_id}.json")
    with open(task_path, "w", encoding="utf-8") as f:
        json.dump(task_data, f, indent=2, ensure_ascii=False)
    print(f"✅ Lagret oppgaver til: {task_path}")

    # === Oppdater activities.json hvis aktivitet ikke finnes fra før ===
    if not any(a["id"] == activity_id for a in existing_activities):
        existing_activities.append({
            "id": activity_id,
            "title": title,
            "description": description,
            "time": time,
            "image": image,
            "tools": tools,
            "location": location,
            "grade": grade,
            "number_of_tasks": num_tasks
        })

# === Lagre activities.json ===
with open(ACTIVITIES_FILE, "w", encoding="utf-8") as f:
    json.dump(existing_activities, f, indent=2, ensure_ascii=False)

print("📝 Oppdatert activities.json uten learning_goals")