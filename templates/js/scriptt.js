document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  const currentYear = document.getElementById("currentYear")
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear()
  }

  createStarBackground()

  // Initialize mobile menu
  initMobileMenu()

  // Initialize theme toggle
  initThemeToggle()

  // Header scroll effect
  initHeaderScroll()

  // Initialize services section
  initServices()

  // Initialize who we are section
  initWhoWeAre()

  initScrollAnimations()

  initInteractiveEffects()
  initParallaxEffect()
  initMouseFollower()

  function createStarBackground() {
    const starBackground = document.getElementById("starBackground")
    if (!starBackground) return

    const numStars = 200
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight * 3

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div")
      star.classList.add("star")
      star.style.left = `${Math.random() * windowWidth}px`
      star.style.top = `${Math.random() * windowHeight}px`
      star.style.animationDelay = `${Math.random() * 4}s`
      const size = Math.random() * 2 + 0.5
      star.style.width = `${size}px`
      star.style.height = star.style.width
      starBackground.appendChild(star)
    }
  }

  function initMobileMenu() {
    const mobileMenuButton = document.getElementById("mobileMenuButton")
    const mobileMenuCloseButton = document.getElementById("mobileMenuCloseButton")
    const mobileNavDrawer = document.getElementById("mobileNavDrawer")
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

    if (!mobileMenuButton || !mobileMenuCloseButton || !mobileNavDrawer) return

    function openMobileMenu() {
      mobileNavDrawer.classList.add("active")
      document.body.style.overflow = "hidden"
      mobileMenuButton.style.transform = "rotate(90deg)"
    }

    function closeMobileMenu() {
      mobileNavDrawer.classList.remove("active")
      document.body.style.overflow = ""
      mobileMenuButton.style.transform = "rotate(0deg)"
    }

    mobileMenuButton.addEventListener("click", openMobileMenu)
    mobileMenuCloseButton.addEventListener("click", closeMobileMenu)

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenu)
    })
  }

  function initThemeToggle() {
    const themeToggle = document.getElementById("themeToggle")
    const themeToggleMobile = document.getElementById("themeToggleMobile")
    const logoImg = document.getElementById("logo-img")
    const mobileLogoImg = document.getElementById("mobile-logo-img")

    if (!themeToggle) return

    function toggleTheme() {
      if (document.body.classList.contains("dark-theme")) {
        document.body.classList.remove("dark-theme")
        if (logoImg) logoImg.src = "img/logoazul.png"
        if (mobileLogoImg) mobileLogoImg.src = "img/logoazul.png"
        localStorage.setItem("theme", "light")
      } else {
        document.body.classList.add("dark-theme")
        if (logoImg) logoImg.src = "img/logodourada.png"
        if (mobileLogoImg) mobileLogoImg.src = "img/logodourada.png"
        localStorage.setItem("theme", "dark")
      }
    }

    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light") {
      document.body.classList.remove("dark-theme")
      if (logoImg) logoImg.src = "img/logoazul.png"
      if (mobileLogoImg) mobileLogoImg.src = "img/logoazul.png"
    } else {
      document.body.classList.add("dark-theme")
      if (logoImg) logoImg.src = "img/logodourada.png"
      if (mobileLogoImg) mobileLogoImg.src = "img/logodourada.png"
    }

    themeToggle.addEventListener("click", toggleTheme)
    if (themeToggleMobile) {
      themeToggleMobile.addEventListener("click", toggleTheme)
    }
  }

  function initHeaderScroll() {
    const header = document.getElementById("header")
    if (!header) return

    let lastScrollY = 0
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 10) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }

      // Add hide effect when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        header.style.transform = "translateY(-100%)"
      } else {
        header.style.transform = "translateY(0)"
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
  }

  function initServices() {
    const servicesGrid = document.getElementById("services-grid")
    if (!servicesGrid) return

    const services = [
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
        title: "Conexão com Empresas",
        description:
          "Conectamos jovens talentos diretamente com empresas que buscam profissionais em início de carreira.",
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
        title: "Perfil Personalizado",
        description: "Crie um perfil destacando suas habilidades, experiências e objetivos profissionais.",
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
        title: "Segurança e Confiabilidade",
        description: "Todas as empresas e vagas são verificadas para garantir um ambiente seguro para os jovens.",
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
        title: "Recursos Educacionais",
        description: "Acesso a materiais e cursos para desenvolvimento profissional e preparação para o mercado.",
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>',
        title: "Experiência Simplificada",
        description:
          "Interface intuitiva e fácil de usar, projetada especialmente para jovens em busca do primeiro emprego.",
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
        title: "Mentoria e Suporte",
        description: "Orientação profissional e suporte contínuo para ajudar no desenvolvimento da carreira.",
      },
    ]

    services.forEach((service, index) => {
      const serviceCard = document.createElement("div")
      serviceCard.className = "service-card fade-in-up"
      serviceCard.style.animationDelay = `${index * 0.1}s`
      serviceCard.innerHTML = `
          <div class="service-icon">${service.icon}</div>
          <h3 class="service-title">${service.title}</h3>
          <p class="service-description">${service.description}</p>
        `
      servicesGrid.appendChild(serviceCard)
    })
  }

  function initWhoWeAre() {
    const whoWeAreGrid = document.getElementById("who-we-are-grid")
    if (!whoWeAreGrid) return

    const missions = [
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h6"></path><path d="M14 3v5h5M18 21v-6M15 18h6"></path></svg>',
        title: "Nossa Missão",
        items: [
          "Facilitar a entrada de jovens no mercado de trabalho",
          "Conectar talentos a oportunidades de qualidade",
          "Promover o desenvolvimento profissional",
          "Criar um ambiente seguro e confiável",
        ],
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
        title: "Nossa Visão",
        items: [
          "Ser referência em inclusão de jovens no mercado",
          "Transformar a experiência de primeiro emprego",
          "Reduzir a taxa de desemprego juvenil",
          "Criar uma comunidade de apoio mútuo",
        ],
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>',
        title: "Nossos Valores",
        items: [
          "Inclusão e Eficiência",
          "Hierarquia e Organização",
          "Inovação e tecnologia",
          "Transparência e confiança",
          "Compromisso com o desenvolvimento",
        ],
      },
    ]

    whoWeAreGrid.innerHTML = ""

    missions.forEach((mission, index) => {
      const missionCard = document.createElement("div")
      missionCard.className = "mission-card fade-in-up"
      missionCard.style.animationDelay = `${index * 0.15}s`

      let itemsHTML = ""
      mission.items.forEach((item, itemIndex) => {
        itemsHTML += `
            <div class="mission-item" style="animation-delay: ${0.2 + itemIndex * 0.1}s">
              <span class="mission-marker">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
              <span>${item}</span>
            </div>
          `
      })

      missionCard.innerHTML = `
          <div class="mission-icon">${mission.icon}</div>
          <h3 class="mission-title">${mission.title}</h3>
          <div class="mission-list">
            ${itemsHTML}
          </div>
        `

      whoWeAreGrid.appendChild(missionCard)
    })
  }

  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const fadeElements = document.querySelectorAll(
      ".fade-in-up, .section-header, .section-title, .section-description, .form-group, .contact-info, .contact-form-container, .footer-info",
    )
    fadeElements.forEach((element) => {
      observer.observe(element)
    })
  }

  function initInteractiveEffects() {
    const cards = document.querySelectorAll(".service-card, .mission-card")

    cards.forEach((card) => {
      // Enhanced hover effect
      card.addEventListener("mouseenter", function () {
        this.style.animation = "pulse 0.6s ease-in-out, glow 2s ease-in-out infinite"
      })

      card.addEventListener("mouseleave", function () {
        this.style.animation = ""
      })

      // Add parallax tilt effect
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const angleX = (y - centerY) / 10
        const angleY = (centerX - x) / 10

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
      })
    })

    const buttons = document.querySelectorAll(".button")
    buttons.forEach((button) => {
      button.addEventListener("click", function (e) {
        const ripple = document.createElement("span")
        ripple.classList.add("ripple")
        ripple.style.position = "absolute"
        ripple.style.borderRadius = "50%"
        ripple.style.background = "rgba(255, 255, 255, 0.6)"
        ripple.style.pointerEvents = "none"

        const rect = this.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2

        ripple.style.width = ripple.style.height = size + "px"
        ripple.style.left = x + "px"
        ripple.style.top = y + "px"
        ripple.style.animation = "rippleAnimation 0.6s ease-out forwards"

        this.appendChild(ripple)
        setTimeout(() => ripple.remove(), 600)
      })
    })
  }

  function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll("[data-parallax]")

    if (parallaxElements.length === 0) return

    const handleParallax = () => {
      parallaxElements.forEach((element) => {
        const scrollY = window.scrollY
        const elementOffset = element.offsetTop
        const elementHeight = element.offsetHeight
        const windowHeight = window.innerHeight

        if (scrollY + windowHeight > elementOffset && scrollY < elementOffset + elementHeight) {
          const distance = (scrollY - elementOffset) * 0.5
          element.style.transform = `translateY(${distance}px)`
        }
      })
    }

    window.addEventListener("scroll", handleParallax, { passive: true })
    handleParallax()
  }

  function initMouseFollower() {
    const follower = document.createElement("div")
    follower.className = "mouse-follower"
    follower.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: var(--primary);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.6;
      display: none;
      box-shadow: 0 0 10px var(--primary);
    `
    document.body.appendChild(follower)

    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      follower.style.display = "block"
    })

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.1
      followerY += (mouseY - followerY) * 0.1

      follower.style.left = followerX + "px"
      follower.style.top = followerY + "px"

      requestAnimationFrame(animateFollower)
    }

    animateFollower()
  }

  // Initialize animations on load
  setTimeout(() => {
    const fadeElements = document.querySelectorAll(".fade-in-up")
    fadeElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("visible")
      }, index * 50)
    })
  }, 300)
})

const teamSlider = document.getElementById("team-slider")
const teamCards = teamSlider ? teamSlider.querySelectorAll(".team-card") : []
const teamDots = document.getElementById("team-dots")
const teamPrev = document.getElementById("team-prev")
const teamNext = document.getElementById("team-next")
let currentIndex = 0

function showTeamCard(index) {
  if (!teamCards.length) return

  teamCards.forEach((card) => card.classList.remove("active"))
  const dots = teamDots.querySelectorAll(".carousel-dot")
  dots.forEach((dot) => dot.classList.remove("active"))

  teamCards[index].classList.add("active")
  dots[index].classList.add("active")
  currentIndex = index
}

function nextTeamCard() {
  if (!teamCards.length) return

  let newIndex = currentIndex + 1
  if (newIndex >= teamCards.length) {
    newIndex = 0
  }
  showTeamCard(newIndex)
}

function prevTeamCard() {
  if (!teamCards.length) return

  let newIndex = currentIndex - 1
  if (newIndex < 0) {
    newIndex = teamCards.length - 1
  }
  showTeamCard(newIndex)
}

if (teamPrev && teamNext) {
  teamPrev.addEventListener("click", prevTeamCard)
  teamNext.addEventListener("click", nextTeamCard)
}

if (teamDots) {
  const dots = teamDots.querySelectorAll(".carousel-dot")
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showTeamCard(index)
    })
  })

  let autoplayInterval = setInterval(nextTeamCard, 5000)

  if (teamPrev && teamNext) {
    ;[teamPrev, teamNext, ...dots].forEach((el) => {
      el.addEventListener("click", () => {
        clearInterval(autoplayInterval)
        autoplayInterval = setInterval(nextTeamCard, 5000)
      })
    })
  }
}

const form = document.getElementById("contact-form")
const formSuccess = document.getElementById("form-success")

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search)
  const success = params.get("success")

  if (success === "true") {
    form.classList.add("hidden")
    formSuccess.classList.remove("hidden")

    setTimeout(() => {
      formSuccess.classList.add("hidden")
      form.classList.remove("hidden")
    }, 10000)

    const cleanUrl = window.location.origin + window.location.pathname + "#contact"
    history.replaceState(null, null, cleanUrl)
  }
})

const style = document.createElement("style")
style.textContent = `
  @keyframes rippleAnimation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .ripple {
    animation: rippleAnimation 0.6s ease-out !important;
  }
`
document.head.appendChild(style)
