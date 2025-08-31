# React Performance Tips
- Reduce unnecessary renders with **memo** and `useMemo/useCallback`.
- Use **lazy** loading; apply route‑level **code splitting**.
- Keep list `key`s stable; consider virtualization for large lists.
- Move heavy computations to a web worker when possible.
