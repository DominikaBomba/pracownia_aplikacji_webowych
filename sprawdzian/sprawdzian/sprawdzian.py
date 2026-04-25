__copyright__ = "Zespól Szkół Komunikacji"
__author__ = "Dominika Bomba 4d"

import datetime
import json
from collections import defaultdict

from models import Teacher, Grades, Student, Subject

from year_grade import year_grade
teachers : list[Teacher] = []
students : list[Student] = []
subjects : list[Subject] = []
grades : list[Grades] = []


with open("teachers.txt" , "r" ) as file:
    for dane in file:
        dane_split = dane.strip().split(' ')
        teachers.append(Teacher(int(dane_split[0]), dane_split[1], dane_split[2]))


with open("subjects.txt", "r" ) as file:
    for line in file:
        dane = line.strip().split(' ')
        teacher = next((t for t in teachers if t._id ==  int(dane[2])), None)
        subjects.append(Subject(int(dane[0]), dane[1], teacher))
with open("students.txt", "r") as file:
    for line in file:
        dane = line.strip().split(' ')
        birthdate = datetime.datetime.strptime(dane[3], "%Y-%m-%d").date()
        students.append(Student(int(dane[0]), dane[1], dane[2], birthdate))

with open("grades.txt", "r") as file:
    for line in file:
        dane = line.strip().split(' ')
        student = next((s for s in students if s._id == int(dane[0])), None)
        subject = next((s for s in subjects if s._id == int(dane[1])), None)
        grade = Grades (student, subject)
        for g in  dane[2].strip().split(','):
            grade.add_grade(int(g))
        grades.append(grade)


data = {}

print("oceny i średnie poszczegółnych uczniów")
for student in students:
    print(student.first_name + " " +student.last_name + f"({str(student.age)})")
    student_key = f"{student.first_name} {student.last_name} ({student.age})"
    data[student_key] = {}


    for g in grades:
        if g.student == student:
            data[student_key][g.subject.name]=  {
               "oceny" : ",".join(map(str, g.grades)),
                "srednia" : g.get_average(),
                 "ocena roczna" :   year_grade(g.get_average())
            }

            print("\t" + g.subject.name + ":")
            print(end="\t\t")
            print("Oceny:", end="")

            for gg in g.grades:
                print(gg, end=", ")
            print()
            print(f"\t\tŚrednia: {g.get_average()}")
            print(f"\t\tOcena końcowa {year_grade(g.get_average())}")

with open("students.json", "w") as file:
    json.dump(data, file, indent=4)


print ("=" * 50)
print()


subject_grades = defaultdict(list)

data = {}

for subject in subjects:


    grades_for_subject = next((g for g in grades if g.subject == subject) , None)

    subject_grades[subject.name].extend(grades_for_subject.grades)

for first, second in subject_grades.items():
    subject_key = first
    print(first)
    sub = next(s for s in subjects if s.name == first)
    data[subject_key]= {}

    data[subject_key]["Nauczyciel"] =  str(sub.teacher)
    data[subject_key]["Oceny"] = "\n".join(map(str, second))
    print("Nauczyciel: " , end="")
    print( sub.teacher)
    print("Oceny: " , end="")
    print(", ".join (map(str, second)))
    print("średnia: ", (sum(second) / len(second)))
    data[subject_key]["Srednia"] = str(sub.teacher)
with open ("subject.json", "w") as file:
    json.dump(data, file, indent=4)
