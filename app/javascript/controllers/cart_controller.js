import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="cart"
export default class extends Controller {
  initialize() {
    const cart = JSON.parse(localStorage.getItem("cart"))
    if (!cart) {
      return
    }

    let total = 0
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i]
      total += item.price * item.quantity

      const div = document.createElement("div")
      div.classList.add("mt-4", "flex", "items-center", "justify-between", "bg-gray-100", "p-4", "rounded-xl", "shadow-sm")

      const infoSpan = document.createElement("span")
      infoSpan.innerText = `Item: ${item.name} - $${(item.price / 100).toFixed(2)} - Size: ${item.size} - Quantity: ${item.quantity}`
      infoSpan.classList.add("text-gray-900", "font-medium", "text-sm", "max-w-xs", "truncate")

      const deleteButton = document.createElement("button")
      deleteButton.innerText = "Remove"
      deleteButton.value = JSON.stringify({ id: item.id, size: item.size })
      deleteButton.classList.add(
        "bg-red-600",
        "hover:bg-red-700",
        "focus:ring-2",
        "focus:ring-red-400",
        "text-white",
        "text-sm",
        "font-semibold",
        "rounded-lg",
        "px-3",
        "py-1",
        "transition",
        "duration-300",
        "shadow-sm",
        "ml-4"
      )
      deleteButton.addEventListener("click", this.removeFromCart.bind(this))

      div.appendChild(infoSpan)
      div.appendChild(deleteButton)

      this.element.prepend(div)
    }

    const totalEl = document.createElement("div")
    totalEl.innerText = `Total: $${(total / 100).toFixed(2)}`
    totalEl.classList.add("mt-6", "text-xl", "font-bold", "text-gray-900", "text-right")
    let totalContainer = document.getElementById("total")
    totalContainer.appendChild(totalEl)
  }

  clear() {
    localStorage.removeItem("cart")
    window.location.reload()
  }

  removeFromCart(event) {
    const cart = JSON.parse(localStorage.getItem("cart"))
    const values = JSON.parse(event.target.value)
    const { id, size } = values
    const index = cart.findIndex(item => item.id === id && item.size === size)
    if (index >= 0) {
      cart.splice(index, 1)
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    window.location.reload()
  }

  checkout() {
    const cart = JSON.parse(localStorage.getItem("cart"))
    const payload = {
      authenticity_token: "",
      cart: cart
    }

    const csrfToken = document.querySelector("[name='csrf-token']").content

    fetch("/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken
      },
      body: JSON.stringify(payload)
    }).then(response => {
      if (response.ok) {
        response.json().then(body => {
          window.location.href = body.url
        })
      } else {
        response.json().then(body => {
          const errorEl = document.createElement("div")
          errorEl.innerText = `There was an error processing your order. ${body.error}`
          errorEl.classList.add("text-red-600", "font-semibold", "mt-4")
          let errorContainer = document.getElementById("errorContainer")
          errorContainer.appendChild(errorEl)
        })
      }
    })
  }
}
