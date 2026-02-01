(() => {
  // Year Update
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile Menu Logic
  const menuBtn = document.getElementById("menuBtn");
  const mobilePanel = document.getElementById("mobilePanel");
  const closeLinks = document.querySelectorAll("[data-close]");

  function setMenu(open){
    mobilePanel.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    const icon = menuBtn.querySelector("i");
    icon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  }

  menuBtn?.addEventListener("click", () => {
    const open = !mobilePanel.classList.contains("open");
    setMenu(open);
  });

  closeLinks.forEach(a => a.addEventListener("click", () => setMenu(false)));

  document.addEventListener("click", (e) => {
    if (!mobilePanel?.classList.contains("open")) return;
    const within = mobilePanel.contains(e.target) || menuBtn.contains(e.target);
    if (!within) setMenu(false);
  });

  // Smooth Scrolling with Header Offset
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;

      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();

      const y = target.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // Lead Form Submission -> Backend
  const form = document.getElementById("leadForm");
  const statusEl = document.getElementById("formStatus");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (statusEl) statusEl.textContent = "Submitting...";

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || "")
    };

    try{
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Submit failed");

      if (statusEl) statusEl.textContent = data.message || "Submitted successfully!";
      form.reset();
    }catch(err){
      if (statusEl) statusEl.textContent = err.message || "Something went wrong.";
    }
  });
})();
