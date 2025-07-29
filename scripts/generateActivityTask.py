import os
import json

LEARNING_GOALS_PATH = os.path.join(os.path.dirname(__file__), "learning_goals_by_grade.json")

def load_learning_goals():
    with open(LEARNING_GOALS_PATH, encoding="utf-8") as f:
        return json.load(f)

def create_task_template(activity_id, title, grades_with_goals):
    total_tasks = sum(len(goals) * 9 for goals in grades_with_goals.values())
    data = {
        "activityId": activity_id,
        "activityTitle": title,
        "totalTasks": total_tasks,
        "tasksPerGrade": 9,
        "supportedGrades": list(grades_with_goals.keys()),
        "grades": {}
    }

    for grade, goals in grades_with_goals.items():
        grade_key = grade
        data["grades"][grade_key] = {
            "tips": "",
            "reflection": "",
            "easy": [],
            "medium": [],
            "hard": []
        }
        for goal in goals:
            for level in ["easy", "medium", "hard"]:
                for i in range(1, 4):
                    task = {
                        "id": f"{activity_id}_{grade.lower().replace(' ', '_')}_{level}_{i}_{abs(hash(goal))%10000}",
                        "difficulty": level,
                        "grade": grade,
                        "learningGoal": goal,
                        "question": "",
                        "answer": ""
                    }
                    data["grades"][grade_key][level].append(task)
    return data

def prompt_select_from_list(options, prompt_text):
    print(prompt_text)
    for idx, opt in enumerate(options, 1):
        print(f"  {idx}. {opt}")
    sel = input("Velg (kommaseparert nr eller tekst, eller ENTER for å hoppe): ").strip()
    if not sel:
        return []
    selected = []
    for s in sel.split(","):
        s = s.strip()
        if s.isdigit() and 1 <= int(s) <= len(options):
            selected.append(options[int(s)-1])
        elif s in options:
            selected.append(s)
    return selected

def main():
    learning_goals_by_grade = load_learning_goals()

    activity_id = input("Aktivitets-ID (f.eks. lærKlokka): ").strip()
    title = input("Tittel (f.eks. Lær Klokka): ").strip()

    print("\nTilgjengelige trinn:")
    all_grades = list(learning_goals_by_grade.keys())
    for idx, grade in enumerate(all_grades, 1):
        print(f"  {idx}. {grade}")
    grades_input = input("\nHvilke trinn? (kommaseparert nr eller tekst): ").strip()
    grades = []
    for s in grades_input.split(","):
        s = s.strip()
        if s.isdigit() and 1 <= int(s) <= len(all_grades):
            grades.append(all_grades[int(s)-1])
        elif s in all_grades:
            grades.append(s)

    grades_with_goals = {}
    for grade in grades:
        goals = learning_goals_by_grade.get(grade, [])
        if not goals:
            print(f"Ingen læringsmål funnet for {grade}.")
            continue
        selected_goals = prompt_select_from_list(goals, f"\nLæringsmål for {grade}:")
        if selected_goals:
            grades_with_goals[grade] = selected_goals

    if not grades_with_goals:
        print("Ingen trinn med læringsmål valgt. Avslutter.")
        return

    output_dir = "public/activityData/tasks"
    if not os.path.exists(output_dir):
        print(f"❌ Mappen '{output_dir}' finnes ikke. Lag den først og prøv igjen.")
        return

    output_data = create_task_template(activity_id, title, grades_with_goals)
    output_path = os.path.join(output_dir, f"{activity_id}.json")

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Fil lagret: {output_path}")

if __name__ == "__main__":
    main()