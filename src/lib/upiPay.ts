export type UpiOrder = {
  keyId: string
  orderId: string
  amount: number
  currency: string
  pack: number
  credit: number
  firstBonus: number
  name: string
  email: string
}

export type UpiVerifyBody = {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

declare global {
  interface Window {
    Razorpay?: new (opts: {
      key: string
      amount: number
      currency: string
      name: string
      description: string
      order_id: string
      prefill?: { name?: string; email?: string }
      method?: { upi: boolean; card: boolean; netbanking: boolean; wallet: boolean }
      theme?: { color: string }
      handler: (r: UpiVerifyBody) => void
      modal?: { ondismiss?: () => void }
      config?: { display?: { hide?: { method: string }[] } }
    }) => { open: () => void }
  }
}

let scriptWait: Promise<void> | null = null

function loadCheckout() {
  if (typeof window === "undefined") return Promise.reject(new Error("No window"))
  if (window.Razorpay) return Promise.resolve()
  if (scriptWait) return scriptWait
  scriptWait = new Promise((resolve, reject) => {
    const s = document.createElement("script")
    s.src = "https://checkout.razorpay.com/v1/checkout.js"
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => {
      scriptWait = null
      reject(new Error("Could not load UPI checkout."))
    }
    document.head.appendChild(s)
  })
  return scriptWait
}

/** Opens GPay / PhonePe / Paytm via Razorpay UPI. Resolves null if the user closes it. */
export async function openUpiCheckout(order: UpiOrder): Promise<UpiVerifyBody | null> {
  await loadCheckout()
  if (!window.Razorpay) throw new Error("UPI checkout missing.")
  return new Promise((resolve, reject) => {
    try {
      const Rzp = window.Razorpay
      if (!Rzp) throw new Error("UPI checkout missing.")
      const rzp = new Rzp({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "AstroLive",
        description: `Wallet ₹${order.pack}`,
        order_id: order.orderId,
        prefill: { name: order.name, email: order.email },
        method: { upi: true, card: false, netbanking: false, wallet: false },
        config: {
          display: {
            hide: [{ method: "card" }, { method: "netbanking" }, { method: "wallet" }, { method: "emi" }, { method: "paylater" }],
          },
        },
        theme: { color: "#111113" },
        handler: (r) => resolve(r),
        modal: { ondismiss: () => resolve(null) },
      })
      rzp.open()
    } catch (e) {
      reject(e)
    }
  })
}
