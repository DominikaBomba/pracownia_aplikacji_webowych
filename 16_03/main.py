def zad1():
    i = 0
    with open("sygnaly.txt", "r") as plik:

        for linia in plik:
            if((i)%40 == 39):
                print(linia[9], end = "")
            i = i+1
def zad2():
    max = 0;
    max_slowo = "";
    with open("sygnaly.txt", "r") as plik:
        for linia in plik:
            if(max < len(set(linia)) - 1):
                max = len(set(linia)) - 1
                max_slowo = linia

    print(max_slowo, max)
def zad3():
    with open("sygnaly.txt", "r") as plik:
        for linia in plik:
            dobra = True
            for i in range(0, len(linia)-1):
                for j in range(i, len(linia) -1):
                    if(abs((ord(linia[i]) - ord(linia[j])))>10 ):
                        dobra = False
            if(dobra):
                print(linia)



if __name__ == "__main__":
    zad3()