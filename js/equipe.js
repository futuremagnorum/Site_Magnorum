document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  const currentYear = document.getElementById("currentYear")
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear()
  }

  // Create star background
  createStarBackground()

  // Initialize mobile menu
  initMobileMenu()

  // Initialize theme toggle
  initThemeToggle()

  // Header scroll effect
  initHeaderScroll()

  // Initialize team filter
  initTeamFilter()

  // Initialize stats counter
  initStatsCounter()

  // Create star background
  function createStarBackground() {
    const starBackground = document.getElementById("starBackground")
    if (!starBackground) return

    const numStars = 200
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight * 3 // Make it 3x the height for scrolling

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div")
      star.classList.add("star")
      star.style.left = `${Math.random() * windowWidth}px`
      star.style.top = `${Math.random() * windowHeight}px`
      star.style.animationDelay = `${Math.random() * 4}s`
      star.style.width = `${Math.random() * 2 + 1}px`
      star.style.height = star.style.width
      starBackground.appendChild(star)
    }
  }

  // Mobile menu functionality
  function initMobileMenu() {
    const mobileMenuButton = document.getElementById("mobileMenuButton")
    const mobileMenuCloseButton = document.getElementById("mobileMenuCloseButton")
    const mobileNavDrawer = document.getElementById("mobileNavDrawer")
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

    if (!mobileMenuButton || !mobileMenuCloseButton || !mobileNavDrawer) return

    function openMobileMenu() {
      mobileNavDrawer.classList.add("active")
      document.body.style.overflow = "hidden"
    }

    function closeMobileMenu() {
      mobileNavDrawer.classList.remove("active")
      document.body.style.overflow = ""
    }

    mobileMenuButton.addEventListener("click", openMobileMenu)
    mobileMenuCloseButton.addEventListener("click", closeMobileMenu)

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenu)
    })
  }

  // Theme toggle functionality
  function initThemeToggle() {
    const themeToggle = document.getElementById("themeToggle")
    const themeToggleMobile = document.getElementById("themeToggleMobile")
    const logoImg = document.getElementById("logo-img")
    const mobileLogoImg = document.getElementById("mobile-logo-img")

    if (!themeToggle) return

    function toggleTheme() {
      if (document.body.classList.contains("dark-theme")) {
        document.body.classList.remove("dark-theme")
        if (logoImg) logoImg.src = "/static/img/logoazul.png"
        if (mobileLogoImg) mobileLogoImg.src = "/static/img/logoazul.png"
        localStorage.setItem("theme", "light")
      } else {
        document.body.classList.add("dark-theme")
        if (logoImg) logoImg.src = "/static/img/logodourada.png"
        if (mobileLogoImg) mobileLogoImg.src = "/static/img/logodourada.png"
        localStorage.setItem("theme", "dark")
      }
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light") {
      document.body.classList.remove("dark-theme")
      if (logoImg) logoImg.src = "/static/img/logoazul.png"
      if (mobileLogoImg) mobileLogoImg.src = "/static/img/logoazul.png"
    } else {
      document.body.classList.add("dark-theme")
      if (logoImg) logoImg.src = "/static/img/logodourada.png"
      if (mobileLogoImg) mobileLogoImg.src = "/static/img/logodourada.png"
    }

    themeToggle.addEventListener("click", toggleTheme)
    if (themeToggleMobile) {
      themeToggleMobile.addEventListener("click", toggleTheme)
    }
  }

  // Header scroll effect
  function initHeaderScroll() {
    const header = document.getElementById("header")
    if (!header) return

    function handleScroll() {
      if (window.scrollY > 10) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()
  }

  // Team filter functionality
  function initTeamFilter() {
    const filterButtons = document.querySelectorAll(".filter-button")
    const teamCards = document.querySelectorAll(".team-member-card")

    if (!filterButtons.length || !teamCards.length) return

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        // Add active class to clicked button
        button.classList.add("active")

        const filter = button.getAttribute("data-filter")

        teamCards.forEach((card) => {
          if (filter === "all") {
            card.style.display = "block"
          } else {
            const categories = card.getAttribute("data-category").split(" ")
            if (categories.includes(filter)) {
              card.style.display = "block"
            } else {
              card.style.display = "none"
            }
          }
        })
      })
    })
  }

  // Stats counter animation
  function initStatsCounter() {
    const statNumbers = document.querySelectorAll(".stat-number")

    if (!statNumbers.length) return

    const options = {
      threshold: 0.5,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target
          const count = Number.parseInt(target.getAttribute("data-count"))
          let current = 0
          const increment = Math.ceil(count / 50)
          const timer = setInterval(() => {
            current += increment
            if (current >= count) {
              target.textContent = count
              clearInterval(timer)
            } else {
              target.textContent = current
            }
          }, 30)
          observer.unobserve(target)
        }
      })
    }, options)

    statNumbers.forEach((stat) => {
      observer.observe(stat)
    })
  }

  // Apply the class 'visible' to elements fade-in-up after a small delay
  setTimeout(() => {
    const fadeElements = document.querySelectorAll(".fade-in-up")
    fadeElements.forEach((element) => {
      element.classList.add("visible")
    })
  }, 300)
})
