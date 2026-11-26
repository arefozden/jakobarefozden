try:
    antall = int(input("Antall billetter: "))
    print("Total:", antall * 50)
except ValueError:
    print("Skriv et helt tall!")
