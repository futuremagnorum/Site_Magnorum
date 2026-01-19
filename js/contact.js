// JavaScript para a página de contato
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")
  const submitBtn = document.getElementById("contact-submit-btn")
  const successAlert = document.getElementById("contact-success")
  const errorAlert = document.getElementById("contact-error")

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      // Mostrar loading
      showLoading(submitBtn)
      hideAlerts()

      try {
        const formData = new FormData(contactForm)
        const data = {
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          privacy: formData.get("privacy") === "on",
        }

        if (!data.name || data.name.length < 2) {
          showError("Nome inválido")
          hideLoading(submitBtn)
          return
        }

        if (!data.email || !data.email.includes("@")) {
          showError("Email inválido")
          hideLoading(submitBtn)
          return
        }

        if (!data.message || data.message.length < 10) {
          showError("Mensagem muito curta")
          hideLoading(submitBtn)
          return
        }

        if (!data.privacy) {
          showError("Você precisa aceitar a política de privacidade")
          hideLoading(submitBtn)
          return
        }

        const response = await fetch("https://api.magnorum.com/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        const result = await response.json()

        if (result.success) {
          showSuccess()
          contactForm.reset()
        } else {
          showError(result.message || "Erro ao enviar mensagem")
        }
      } catch (error) {
        console.error("Erro:", error)
        showError("Erro de conexão. Tente novamente.")
      } finally {
        hideLoading(submitBtn)
      }
    })
  }

  function showLoading(button) {
    const btnText = button.querySelector(".btn-text")
    const btnLoading = button.querySelector(".btn-loading")

    if (btnText && btnLoading) {
      btnText.style.display = "none"
      btnLoading.style.display = "inline-flex"
    }

    button.disabled = true
  }

  function hideLoading(button) {
    const btnText = button.querySelector(".btn-text")
    const btnLoading = button.querySelector(".btn-loading")

    if (btnText && btnLoading) {
      btnText.style.display = "inline"
      btnLoading.style.display = "none"
    }

    button.disabled = false
  }

  function showSuccess() {
    if (successAlert) {
      successAlert.style.display = "flex"
      successAlert.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  function showError(message) {
    if (errorAlert) {
      const errorText = errorAlert.querySelector("span")
      if (errorText) {
        errorText.textContent = message
      }
      errorAlert.style.display = "flex"
      errorAlert.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  function hideAlerts() {
    if (successAlert) successAlert.style.display = "none"
    if (errorAlert) errorAlert.style.display = "none"
  }

  // FAQ functionality
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    const answer = item.querySelector(".faq-answer")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Fechar todos os outros itens
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active")
          const otherAnswer = otherItem.querySelector(".faq-answer")
          otherAnswer.style.maxHeight = "0"
        }
      })

      // Toggle do item atual
      if (isActive) {
        item.classList.remove("active")
        answer.style.maxHeight = "0"
      } else {
        item.classList.add("active")
        answer.style.maxHeight = answer.scrollHeight + "px"
      }
    })
  })

  // Newsletter form
  const newsletterForm = document.getElementById("newsletterForm")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", async function (e) {
      e.preventDefault()

      const email = this.querySelector('input[name="newsletter_email"]').value

      try {
        // Aqui você pode implementar a lógica de newsletter
        console.log("Newsletter email:", email)
        alert("Obrigado por se inscrever em nossa newsletter!")
        this.reset()
      } catch (error) {
        console.error("Erro ao inscrever newsletter:", error)
        alert("Erro ao inscrever. Tente novamente.")
      }
    })
  }
})
