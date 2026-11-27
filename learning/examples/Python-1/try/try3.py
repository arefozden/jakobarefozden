try:
    alder = int(input("Hvor gammel er du? "))
    print("Neste år er du", alder + 1, "år.")

except ValueError:
    print("Feil! Du må skrive inn et tall.")