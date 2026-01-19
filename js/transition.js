document.addEventListener("DOMContentLoaded", () => {
  const transitionOverlay = document.getElementById("transitionOverlay")

  function isNavigationLink(href) {
    return (
      href === "index.html" || href === "foryou.html" || href.endsWith("/index.html") || href.endsWith("/foryou.html")
    )
  }

  function createBlocksGrid() {
    const grid = document.createElement("div")
    grid.className = "blocks-grid"

    // Create 15 blocks (5x3 grid)
    for (let i = 0; i < 15; i++) {
      const block = document.createElement("div")
      block.className = "loading-block"
      grid.appendChild(block)
    }

    return grid
  }

  function animateBlocks(grid) {
    const blocks = grid.querySelectorAll(".loading-block")

    blocks.forEach((block, index) => {
      setTimeout(
        () => {
          block.classList.add("active")
        },
        600 + index * 80,
      )
    })
  }

  function updateTransitionContent() {
    const content = transitionOverlay.querySelector(".transition-content")
    const blocksGrid = createBlocksGrid()

    content.innerHTML = ""
    content.appendChild(blocksGrid)

    const textContainer = document.createElement("div")
    textContainer.innerHTML = `
      <div class="loader-text">
        <span class="highlight">Reformulando site</span>,<br>aguarde um instante
      </div>
      <div class="loader-subtitle">Carregando experiência...</div>
    `
    content.appendChild(textContainer)

    // Start block animation
    setTimeout(() => {
      animateBlocks(blocksGrid)
    }, 100)
  }

  function navigateWithTransition(href, event) {
    if (event) {
      event.preventDefault()
    }

    updateTransitionContent()
    transitionOverlay.classList.add("active")

    // Navigate after animation completes
    setTimeout(() => {
      window.location.href = href
    }, 2000)
  }

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a")

    if (link) {
      const href = link.getAttribute("href")

      if (isNavigationLink(href) && href !== window.location.pathname.split("/").pop()) {
        navigateWithTransition(href, e)
      }
    }
  })

  window.addEventListener("pageshow", () => {
    transitionOverlay.classList.remove("active")
  })

  window.addEventListener("popstate", () => {
    transitionOverlay.classList.remove("active")
  })
})
