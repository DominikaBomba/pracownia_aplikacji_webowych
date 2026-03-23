from typing import List

class Student:
    def __init__(self, name: str, surname: str, age: int, courses: List[str]):
        self.name: str = name
        self.surname: str = surname
        self.age: int = age
        self.list: List[str] = courses

    def printStudent(self) -> None:
        kursy_napis: str = ", ".join(self.list)
        print(f"{self.name} {self.surname} ({self.age} lat): {kursy_napis}")
def main():
    uczen_dict = {}
    kurs_dict ={}
    with open("courses.txt", "r") as file:
        for linia in file:
            data = linia.strip().split(',')
            if data[0] not in kurs_dict:
                kurs_dict[data[0]] = []
            kurs_dict[data[0]].append(data[1])

    with open("students.txt","r") as file:
        for linia in file:
            data = linia.strip().split(',')
            id = data[0]
            imie = data[1]
            nazwisko = data[2]
            wiek = data[3]
            list = kurs_dict[id]
            uczen_dict[id] = Student(imie, nazwisko, wiek, list)

    for dane in uczen_dict.values():
        dane.printStudent()
        open(dane.name + "_"+  dane.surname + ".txt","w").write("".join([f"- {c}\n" for c in dane.list]) )
if __name__ == "__main__":
    main()