(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("show");
      hamburger.setAttribute("aria-expanded", String(isOpen));
      mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    });
  }

  // Trial modal
  const modal = document.getElementById("trialModal");
  const closeBtn = document.getElementById("closeTrial");

  const openers = ["openTrial", "openTrialMobile", "openTrialHero", "openTrialCard", "openTrialFooter"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function openModal() {
    if (!modal) return;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  openers.forEach(btn => btn.addEventListener("click", openModal));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.dataset && target.dataset.close === "true") closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  // Trial form => opens mail client (no server needed)
  const trialForm = document.getElementById("trialForm");
  if (trialForm) {
    trialForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(trialForm);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const tz = (data.get("tz") || "").toString().trim();
      const msg = (data.get("msg") || "").toString().trim();

      const subject = encodeURIComponent("NEST Free Trial Request");
      const body = encodeURIComponent(
        `Hello NEST,\n\nI would like to join the free trial.\n\nName: ${name}\nEmail: ${email}\nTime zone: ${tz}\nMessage: ${msg}\n\nThank you!`
      );

      // CHANGE this email to your real contact email:
      const to = "hello@yourdomain.com";
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

      closeModal();
      trialForm.reset();
    });
  }

  // Contact page form => mailto
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const tz = (data.get("tz") || "").toString().trim();
      const goal = (data.get("goal") || "").toString().trim();
      const msg = (data.get("msg") || "").toString().trim();

      const subject = encodeURIComponent("NEST — Join / Inquiry");
      const body = encodeURIComponent(
        `Hello NEST,\n\nI’d like to join / ask about classes.\n\nName: ${name}\nEmail: ${email}\nTime zone: ${tz}\nGoal: ${goal}\nMessage: ${msg}\n\nThanks!`
      );

      const to = "hello@yourdomain.com"; // CHANGE to your real email
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      contactForm.reset();
    });
  }
})();
