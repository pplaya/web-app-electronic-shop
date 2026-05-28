import { ref } from 'vue'

export function useTelegram() {
  const data = ref(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  const sendOrder = async (orderData: any) => {
    loading.value = true
    error.value = null
    data.value = null

    const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN
    const CHANNEL_CHAT_ID = import.meta.env.VITE_CHANNEL_CHAT_ID
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`

    const itemsList = orderData.items
      .map(
        (item: any) =>
          `➡️ ${item.name}: ${item.quantity} шт. × ${item.price} BYN = ${item.price * item.quantity} BYN`,
      )
      .join('\n')

    const now = new Date()
    const date = now.toLocaleDateString('ru-RU')
    const time = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })

    const messageText = `
🛒 <b>Новый заказ!</b>
📅 <b>${date}</b> в <b>${time}</b>

<b>Имя:</b> ${orderData.firstName} ${orderData.lastName}
<b>Телефон:</b> ${orderData.phone}
<b>Почта:</b> ${orderData.email}
<b>Адрес:</b> ${orderData.address}

<b>Товары:</b>
${itemsList}

<b>Итого:</b> ${orderData.total} BYN
        `

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHANNEL_CHAT_ID,
        text: messageText,
        parse_mode: 'HTML',
      }),
    })

    const result = await response.json()

    if (!result.ok) {
      error.value = result.description
    } else {
      data.value = result
    }

    loading.value = false
  }

  return {
    data,
    error,
    loading,
    sendOrder,
  }
}
