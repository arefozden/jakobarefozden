# Billettkalkulator med feilhåndtering

try:
    antall = int(input("Hvor mange billetter? "))
    pris = float(input("Pris per billett? "))

    if antall <= 0 or pris <= 0:
        print("Feil! Antall og pris må være større enn 0.")

    else:
        total = antall * pris

        if antall >= 5:
            total = total * 0.80
            print("Du får 20 % rabatt!")

        print("Totalpris:", total, "kr")

except ValueError:
    print("Feil! Du må skrive inn gyldige tall.")