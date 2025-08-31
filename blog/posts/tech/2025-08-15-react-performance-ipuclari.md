# React Performans İpuçları
- Gereksiz renderları **memo** ve `useMemo/useCallback` ile azaltın.
- Bileşenleri **lazy** yükleyin; route bazlı **code-splitting** uygulayın.
- Liste renderlarında `key` stabilitesini koruyun; sanallaştırma düşünün.
- Ağır hesapları web worker’a taşıyın.
