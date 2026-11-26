# Billettkalkulator med rabatt

antall = int(input("Hvor mange billetter vil du kjøpe? "))
pris = float(input("Hva koster én billett? "))

total = antall * pris

if antall >= 5:
    rabatt = total * 0.20
    total = total - rabatt
    print("Du får 20 % rabatt!")
else:
    print("Ingen rabatt.")

print("Totalpris:", total, "kr")