(() => {
  const $ = (id) => document.getElementById(id);
  const amount = $("fx-amount"),
    from = $("fx-from"),
    to = $("fx-to");
  const status = $("fx-status"),
    result = $("fx-result");
  from.value = "NOK";
  to.value = "TRY";
  let requestId = 0;

  const format = (value, currency) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);

  async function getJson(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 9000);
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        cache: "no-store",
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } finally {
      clearTimeout(timer);
    }
  }

  async function getRate(base, quote) {
    // Primary provider: current Frankfurter API endpoint (not the retired .app endpoint).
    try {
      const data = await getJson(
        `https://api.frankfurter.dev/v2/rate/${encodeURIComponent(base)}/${encodeURIComponent(quote)}`,
      );
      const rate = Number(data.rate);
      if (!Number.isFinite(rate) || rate <= 0) throw new Error("Invalid rate");
      return { rate, date: data.date, source: "Frankfurter" };
    } catch (_) {
      // Independent provider; supports additional currencies and mirrors.
      const baseCode = base.toLowerCase();
      const quoteCode = quote.toLowerCase();
      const urls = [
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCode}.min.json`,
        `https://latest.currency-api.pages.dev/v1/currencies/${baseCode}.min.json`,
      ];
      for (const url of urls) {
        try {
          const data = await getJson(url);
          const rate = Number(data[baseCode]?.[quoteCode]);
          if (Number.isFinite(rate) && rate > 0) {
            return { rate, date: data.date, source: "Currency API" };
          }
        } catch (_) {
          /* Try next mirror. */
        }
      }
      throw new Error(
        "Exchange rates could not be loaded. Check your connection and try again.",
      );
    }
  }

  async function convert() {
    const raw = amount.value.trim();
    const n = Number(raw);
    const id = ++requestId;
    if (!raw || !Number.isFinite(n) || n < 0) {
      status.textContent = "Enter a valid non-negative amount.";
      status.classList.add("error");
      result.hidden = true;
      return;
    }
    status.classList.remove("error");
    status.textContent = "Fetching the latest exchange rate…";
    $("fx-convert").disabled = true;
    result.hidden = true;
    try {
      const data =
        from.value === to.value
          ? { rate: 1, date: "", source: "No API needed" }
          : await getRate(from.value, to.value);
      if (id !== requestId) return;
      $("fx-output").textContent = format(n * data.rate, to.value);
      $("fx-rate").textContent =
        `1 ${from.value} = ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 6 }).format(data.rate)} ${to.value}`;
      $("fx-date").textContent =
        from.value === to.value
          ? "Same currency — no conversion needed."
          : `Reference rate date: ${data.date || "Latest available"}`;
      $("fx-source").textContent = `Current source: ${data.source}.`;
      result.hidden = false;
      status.textContent = "Conversion ready.";
    } catch (error) {
      if (id !== requestId) return;
      status.textContent = error.message || "Could not retrieve rates.";
      status.classList.add("error");
      result.hidden = true;
    } finally {
      if (id === requestId) $("fx-convert").disabled = false;
    }
  }

  $("fx-convert").addEventListener("click", convert);
  $("fx-swap").addEventListener("click", () => {
    [from.value, to.value] = [to.value, from.value];
    convert();
  });
  document.querySelectorAll("[data-pair]").forEach((button) =>
    button.addEventListener("click", () => {
      [from.value, to.value] = button.dataset.pair.split(",");
      convert();
    }),
  );
  amount.addEventListener("keydown", (event) => {
    if (event.key === "Enter") convert();
  });
  from.addEventListener("change", convert);
  to.addEventListener("change", convert);
  convert();
})();
