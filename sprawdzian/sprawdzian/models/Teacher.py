__copyright__ = "Zespól Szkół Komunikacji"
__author__ = "Dominika Bomba 4d"

class Teacher:
    def __init__(self, _id :int, name : str, surname : str):
        self._id = _id
        self.name = name
        self.surname = surname
    def __str__(self) -> str:
        return f" {self.name} {self.surname}"