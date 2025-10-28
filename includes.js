/* includes.js — versión debug visual + evento de listo */
(async function () {
  const spots = document.querySelectorAll('[data-include]');
  let ok = 0, fail = 0;

  for (const el of spots) {
    const file = el.getAttribute('data-include');
    try {
      const res = await fetch(file, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

      el.innerHTML = await res.text();
      console.log(`✅ Include cargado: ${file}`);
      ok++;
    } catch (err) {
      console.error(`❌ Error cargando include: ${file}`, err);
      const errorBox = document.createElement('div');
      errorBox.style.cssText = `
        background:#c0392b;color:#fff;padding:8px 12px;font-family:sans-serif;
        font-size:.9rem;text-align:center;border-radius:4px;margin:8px 0;
      `;
      errorBox.textContent = `⚠️ No se pudo cargar: ${file} (${err.message})`;
      el.replaceWith(errorBox);
      fail++;
    }
  }

  // Avísale al resto de la página que ya terminamos
  document.dispatchEvent(new CustomEvent('includes:loaded', { detail: { ok, fail } }));
})();
