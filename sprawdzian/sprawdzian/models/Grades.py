from .Teacher import Teacher

__copyright__ = "Zespól Szkół Komunikacji"
__author__ = "Dominika Bomba 4d"

class Grades:
    def __init__(self,student, subject ):
        self.student = student
        self.subject = subject
        self.grades :list[int]= []

    def add_grade(self,grade:int)->None:
        if grade < 1 or grade > 6:
           raise ValueError("Grade must be between 1 and 6")
        self.grades.append(grade)

    def get_grades(self)->list[int]:
        return self.grades
    def get_average(self)->float:
        return sum(self.grades) / len(self.grades)


