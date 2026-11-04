(() => {
  document.documentElement.classList.add("js");
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [
    ...scope.querySelectorAll(selector),
  ];

  const intro = $(".intro");
  const finishIntro = () => {
    if (!intro) return;
    intro.style.transition = "opacity .7s ease";
    intro.style.opacity = "0";
    setTimeout(() => intro.remove(), 720);
  };
  if (prefersReduced) finishIntro();
  else setTimeout(finishIntro, 1150);

  const header = $("[data-header]");
  const progress = $(".progress span");
  const updateChrome = () => {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > window.innerHeight * 0.72);
    if (progress)
      progress.style.height = `${Math.min(100, (y / Math.max(1, document.body.scrollHeight - innerHeight)) * 100)}%`;
  };
  addEventListener("scroll", updateChrome, { passive: true });
  updateChrome();

  const menuToggle = $(".menu-toggle");
  const mobileMenu = $(".mobile-menu");
  const mobileLinks = $$(".mobile-menu a");
  const setMenuState = (open, restoreFocus = false) => {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));
    mobileMenu.toggleAttribute("inert", !open);
    menuToggle.setAttribute("aria-expanded", String(open));
    mobileLinks.forEach((link) =>
      open
        ? link.removeAttribute("tabindex")
        : link.setAttribute("tabindex", "-1"),
    );
    if (!open && restoreFocus) menuToggle.focus();
  };
  const closeMenu = () => setMenuState(false, true);
  setMenuState(false);
  menuToggle?.addEventListener("click", () =>
    setMenuState(!mobileMenu.classList.contains("is-open")),
  );
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu?.classList.contains("is-open"))
      closeMenu();
  });
  mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

  let lenis;
  if (!prefersReduced && window.Lenis) {
    lenis = new Lenis({ duration: 1.12, smoothWheel: true, syncTouch: false });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    $$('a[href^="#"]').forEach((link) =>
      link.addEventListener("click", (event) => {
        const target = $(link.getAttribute("href"));
        if (target) {
          event.preventDefault();
          lenis.scrollTo(target, { offset: -50 });
          closeMenu();
        }
      }),
    );
  }

  const roles = $("[data-roles]");
  if (roles && !prefersReduced) {
    const values = JSON.parse(roles.dataset.roles);
    let index = 0;
    let char = values[0].length;
    let deleting = true;
    const type = () => {
      const current = values[index];
      roles.textContent = deleting
        ? current.slice(0, char--)
        : current.slice(0, char++);
      let wait = deleting ? 46 : 84;
      if (!deleting && char > current.length) {
        deleting = true;
        wait = 1650;
      }
      if (deleting && char < 0) {
        deleting = false;
        index = (index + 1) % values.length;
        char = 0;
        wait = 300;
      }
      setTimeout(type, wait);
    };
    setTimeout(type, 1400);
  }

  let projectTrigger = null;

  if (!prefersReduced && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".intro__line span", {
      x: "200%",
      duration: 1,
      ease: "power2.inOut",
      delay: 0.12,
    });
    gsap.to(".char", {
      y: 0,
      opacity: 1,
      stagger: 0.028,
      duration: 1.15,
      ease: "power4.out",
      delay: 0.78,
    });
    gsap.utils.toArray(".reveal").forEach((el) =>
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
      }),
    );
    gsap.utils.toArray(".layer").forEach((el) => {
      const speed = Number(el.dataset.speed || 0.2);
      gsap.to(el, {
        yPercent: speed * -18,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest(".section") || el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    gsap.utils.toArray(".section-watermark").forEach((el, i) =>
      gsap.to(el, {
        xPercent: i % 2 ? -9 : 9,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }),
    );
    gsap.utils
      .toArray(".hero-stage__data,.hero-stage__tag,.profile-scene__label")
      .forEach((el, i) =>
        gsap.to(el, {
          yPercent: i % 2 ? -20 : 16,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest(".section"),
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }),
      );
    const track = $(".work-track");
    const viewport = $(".work-viewport");
    if (track && viewport && innerWidth > 700) {
      const distance = () => Math.max(0, track.scrollWidth - innerWidth + 24);
      const projectTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: viewport,
          start: "top top",
          end: () => `+=${distance() + innerHeight * 0.7}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      projectTrigger = projectTween.scrollTrigger;
      window.__projectTrigger = projectTrigger;
    }
    gsap.utils.toArray("[data-count]").forEach((el) => {
      const end = Number(el.dataset.count);
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: end,
          duration: 1.8,
          snap: { innerText: 1 },
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        },
      );
    });
  } else {
    $$(".reveal").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    $$(".char").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    $$("[data-count]").forEach((el) => {
      el.textContent = el.dataset.count;
    });
  }

  const setupProjectNav = () => {
    const viewport = $(".work-viewport");
    const cards = $$(".project-card", viewport);
    const previous = $("[data-project-prev]");
    const next = $("[data-project-next]");
    const current = $("[data-project-current]");
    if (!viewport || !cards.length || !previous || !next || !current) return;
    if (!window.__projectTrigger && innerWidth > 700)
      viewport.classList.add("work-viewport--native");
    let projectIndex = 0;
    const paintIndex = () => {
      current.textContent = String(projectIndex + 1).padStart(2, "0");
    };
    const setIndex = (nextIndex) => {
      projectIndex = (nextIndex + cards.length) % cards.length;
      paintIndex();
      const trigger = window.__projectTrigger;
      if (trigger && innerWidth > 700) {
        const target =
          trigger.start +
          (trigger.end - trigger.start) *
            (projectIndex / Math.max(1, cards.length - 1));
        if (lenis) lenis.scrollTo(target, { duration: 0.9 });
        else window.scrollTo({ top: target, behavior: "smooth" });
      } else {
        viewport.scrollTo({
          left: Math.max(0, cards[projectIndex].offsetLeft - 16),
          behavior: "smooth",
        });
      }
    };
    const syncFromScroll = () => {
      const trigger = window.__projectTrigger;
      if (trigger && innerWidth > 700) {
        projectIndex = Math.max(
          0,
          Math.min(
            cards.length - 1,
            Math.round(trigger.progress * (cards.length - 1)),
          ),
        );
      } else {
        const center = viewport.scrollLeft + viewport.clientWidth * 0.35;
        projectIndex = cards.reduce(
          (closest, card, i) =>
            Math.abs(card.offsetLeft - center) <
            Math.abs(cards[closest].offsetLeft - center)
              ? i
              : closest,
          0,
        );
      }
      paintIndex();
    };
    previous.addEventListener("click", () => setIndex(projectIndex - 1));
    next.addEventListener("click", () => setIndex(projectIndex + 1));
    viewport.addEventListener("scroll", syncFromScroll, { passive: true });
    addEventListener("scroll", syncFromScroll, { passive: true });
    addEventListener("resize", syncFromScroll, { passive: true });
    paintIndex();
    syncFromScroll();
  };
  setupProjectNav();

  if (!isTouch && !prefersReduced) {
    const cursor = $(".cursor");
    let mouseX = innerWidth / 2;
    let mouseY = innerHeight / 2;
    let x = mouseX;
    let y = mouseY;
    addEventListener("pointermove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const nx = (e.clientX / innerWidth - 0.5) * 2;
      const ny = (e.clientY / innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty("--mx", nx.toFixed(3));
      document.documentElement.style.setProperty("--my", ny.toFixed(3));
    });
    const moveCursor = () => {
      x += (mouseX - x) * 0.18;
      y += (mouseY - y) * 0.18;
      if (cursor) {
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
      }
      requestAnimationFrame(moveCursor);
    };
    moveCursor();
    $$("a,button,.service-card,.badge,.project-card,[data-tilt]").forEach(
      (el) => {
        el.addEventListener("mouseenter", () =>
          cursor?.classList.add("is-hover"),
        );
        el.addEventListener("mouseleave", () =>
          cursor?.classList.remove("is-hover"),
        );
      },
    );
    $$("[data-tilt]").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 5;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  const quotes = $$(".quote");
  let quoteIndex = 0;
  const count = $("[data-slide-count]");
  const showQuote = (next) => {
    if (!quotes.length) return;
    quoteIndex = (next + quotes.length) % quotes.length;
    quotes.forEach((quote, i) =>
      quote.classList.toggle("is-active", i === quoteIndex),
    );
    if (count) count.textContent = `0${quoteIndex + 1} / 0${quotes.length}`;
  };
  $("[data-next]")?.addEventListener("click", () => showQuote(quoteIndex + 1));
  $("[data-prev]")?.addEventListener("click", () => showQuote(quoteIndex - 1));
  $(".quotes")?.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") showQuote(quoteIndex + 1);
    if (e.key === "ArrowLeft") showQuote(quoteIndex - 1);
  });
  let dragStart = 0;
  $(".quotes")?.addEventListener("pointerdown", (e) => {
    dragStart = e.clientX;
  });
  $(".quotes")?.addEventListener("pointerup", (e) => {
    const delta = e.clientX - dragStart;
    if (Math.abs(delta) > 45) showQuote(quoteIndex + (delta < 0 ? 1 : -1));
  });
})();
