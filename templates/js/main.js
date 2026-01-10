// ============================================
// MAGNORUM - Complete Animation System
// Premium Interactive Experience
// ============================================

const CONFIG = {
  ANIMATION_THRESHOLD: 0.5,
  REDUCED_MOTION: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
}

// ============================================
// Animation Manager
// ============================================
class AnimationManager {
  constructor() {
    this.observerOptions = {
      threshold: CONFIG.ANIMATION_THRESHOLD,
      rootMargin: "0px 0px -80px 0px",
    }
    this.observer = new IntersectionObserver((entries) => this.handleIntersection(entries), this.observerOptions)
    this.staggerDelay = 0.08 // 80ms stagger
    this.init()
  }

  init() {
    const animatedElements = document.querySelectorAll(
      ".service-card, .team-card, .portfolio-item, .info-card, .section-header, .stat-item, .floating-card, .about-text",
    )
    animatedElements.forEach((element) => {
      this.observer.observe(element)
    })
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!CONFIG.REDUCED_MOTION) {
          const delay = this.calculateStaggerDelay(entry.target)
          entry.target.style.animationDelay = `${delay}s`
        }
        entry.target.classList.add("animated")
        this.observer.unobserve(entry.target)
      }
    })
  }

  calculateStaggerDelay(element) {
    const parent = element.parentElement
    if (!parent) return 0
    const children = Array.from(parent.children)
    const index = children.indexOf(element)
    return index >= 0 ? index * this.staggerDelay : 0
  }
}

// ============================================
// Theme Manager
// ============================================
class ThemeManager {
  constructor() {
    this.isDarkMode = this.getInitialTheme()
    this.themeToggle = document.getElementById("themeToggle")
    this.html = document.documentElement
    this.init()
  }

  getInitialTheme() {
    const saved = localStorage.getItem("magnorum-theme")
    if (saved) return saved === "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  }

  init() {
    this.applyTheme()
    this.themeToggle.addEventListener("click", () => this.toggleWithTransition())
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      this.isDarkMode = e.matches
      this.applyTheme()
    })
  }

  applyTheme() {
    if (this.isDarkMode) {
      this.html.classList.add("dark-mode")
      document.documentElement.setAttribute("data-theme", "dark")
    } else {
      this.html.classList.remove("dark-mode")
      document.documentElement.setAttribute("data-theme", "light")
    }
    localStorage.setItem("magnorum-theme", this.isDarkMode ? "dark" : "light")
  }

  toggleWithTransition() {
    if (CONFIG.REDUCED_MOTION) {
      this.isDarkMode = !this.isDarkMode
      this.applyTheme()
      return
    }

    const overlay = document.createElement("div")
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--color-bg-primary);
      opacity: 1;
      pointer-events: none;
      z-index: 5000;
      animation: themeTransition 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    `
    document.body.appendChild(overlay)

    this.isDarkMode = !this.isDarkMode
    this.applyTheme()

    setTimeout(() => overlay.remove(), 600)
  }
}

// ============================================
// Navigation Manager
// ============================================
class NavigationManager {
  constructor() {
    this.header = document.getElementById("header")
    this.navMenu = document.getElementById("navMenu")
    this.mobileMenuBtn = document.getElementById("mobileMenuBtn")
    this.navLinks = document.querySelectorAll(".nav-link")
    this.init()
  }

  init() {
    // Scroll detection
    window.addEventListener("scroll", () => this.handleScroll())

    // Mobile menu toggle
    this.mobileMenuBtn.addEventListener("click", () => this.toggleMobileMenu())

    // Smooth scroll navigation
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavClick(e))
    })

    // Close mobile menu on link click
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".navbar")) {
        this.closeMobileMenu()
      }
    })
  }

  handleScroll() {
    if (window.scrollY > 50) {
      this.header.classList.add("scrolled")
    } else {
      this.header.classList.remove("scrolled")
    }
    this.updateActiveNav()
  }

  updateActiveNav() {
    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= 120 && rect.bottom >= 120) {
        const id = section.getAttribute("id")
        this.navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  handleNavClick(e) {
    e.preventDefault()
    const href = e.target.getAttribute("href")
    if (href && href.startsWith("#")) {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
        this.closeMobileMenu()
      }
    }
  }

  toggleMobileMenu() {
    this.navMenu.classList.toggle("active")
    this.mobileMenuBtn.classList.toggle("active")
  }

  closeMobileMenu() {
    this.navMenu.classList.remove("active")
    this.mobileMenuBtn.classList.remove("active")
  }
}

// ============================================
// Form Manager
// ============================================
class FormManager {
  constructor() {
    this.form = document.getElementById("contactForm")
    this.formMessage = document.getElementById("formMessage")
    this.init()
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e))

      const inputs = this.form.querySelectorAll("input, textarea")
      inputs.forEach((input) => {
        input.addEventListener("focus", () => this.handleInputFocus(input))
        input.addEventListener("blur", () => this.handleInputBlur(input))
      })
    }
  }

  handleInputFocus(input) {
    if (!CONFIG.REDUCED_MOTION) {
      input.style.transform = "translateY(-2px)"
      input.style.boxShadow = "0 0 0 3px rgba(212, 175, 55, 0.1)"
    }
  }

  handleInputBlur(input) {
    if (!input.value) {
      input.style.transform = ""
      input.style.boxShadow = ""
    }
  }

  async handleSubmit(e) {
    e.preventDefault()

    const submitBtn = this.form.querySelector("button[type='submit']")
    const originalText = submitBtn.innerHTML
    const originalDisabled = submitBtn.disabled

    submitBtn.disabled = true
    submitBtn.innerHTML = '<i class="fas fa-spinner" style="animation: spin 1s linear infinite;"></i> Enviando...'

    // Simulated submission
    setTimeout(() => {
      this.showMessage("Mensagem enviada com sucesso! 🎉", "success")
      this.form.reset()

      submitBtn.innerHTML = originalText
      submitBtn.disabled = originalDisabled

      setTimeout(() => this.hideMessage(), 5000)
    }, 1200)
  }

  showMessage(message, type) {
    this.formMessage.textContent = message
    this.formMessage.className = `form-message ${type}`
    if (!CONFIG.REDUCED_MOTION) {
      this.formMessage.style.animation = "fadeInDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
    }
  }

  hideMessage() {
    if (!CONFIG.REDUCED_MOTION) {
      this.formMessage.style.animation = "fadeOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards"
    }
    setTimeout(() => {
      this.formMessage.className = "form-message"
      this.formMessage.style.animation = ""
    }, 300)
  }
}

// ============================================
// Ripple Effect Manager
// ============================================
class RippleEffectManager {
  constructor() {
    this.init()
  }

  init() {
    const buttons = document.querySelectorAll(".btn, .info-icon, .service-icon")
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => this.createRipple(e))
    })
  }

  createRipple(event) {
    if (CONFIG.REDUCED_MOTION) return

    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const ripple = document.createElement("span")
    ripple.style.cssText = `
      position: absolute;
      top: ${y}px;
      left: ${x}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      pointer-events: none;
      animation: ripple 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    `

    if (button.style.position !== "absolute" && button.style.position !== "fixed") {
      button.style.position = "relative"
    }

    button.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)
  }
}

// ============================================
// Scroll Progress Manager
// ============================================
class ScrollProgressManager {
  constructor() {
    this.progressBar = this.createProgressBar()
    this.init()
  }

  createProgressBar() {
    const bar = document.createElement("div")
    bar.id = "scroll-progress"
    bar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--color-primary), var(--color-accent-blue));
      z-index: 999;
      transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    `
    document.body.appendChild(bar)
    return bar
  }

  init() {
    window.addEventListener("scroll", () => this.updateProgress())
  }

  updateProgress() {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = (window.scrollY / windowHeight) * 100
    this.progressBar.style.width = `${progress}%`
  }
}

// ============================================
// Preloader Manager
// ============================================
class PreloaderManager {
  constructor() {
    this.preloader = document.getElementById("preloader")
  }

  hide() {
    setTimeout(() => {
      if (this.preloader) {
        this.preloader.style.display = "none"
      }
    }, 2000)
  }
}

// ============================================
// Utility Functions
// ============================================
function updateYear() {
  const yearElement = document.getElementById("year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }
}

// ============================================
// Initialization
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Initializing Magnorum - Premium Website")

  // Initialize all managers
  const preloaderManager = new PreloaderManager()
  const themeManager = new ThemeManager()
  const navigationManager = new NavigationManager()
  const animationManager = new AnimationManager()
  const formManager = new FormManager()
  const rippleEffectManager = new RippleEffectManager()
  const scrollProgressManager = new ScrollProgressManager()

  // Utilities
  updateYear()
  preloaderManager.hide()

  console.log("✨ Magnorum initialized with premium animations and effects!")
})

// Page visibility optimization
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.documentElement.style.animationPlayState = "paused"
  } else {
    document.documentElement.style.animationPlayState = "running"
  }
})
