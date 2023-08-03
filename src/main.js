import './assets/main.css'
import './assets/spells.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import '@/node_modules/chessground/assets/chessground.base.css'
import '@/node_modules/chessground/assets/chessground.brown.css'
import '@/node_modules/chessground/assets/chessground.cburnett.css'
const app = createApp(App)

app.use(createPinia())

app.mount('#app')
