import { AudioManager } from './audioManager.ts'
import { sounds } from './sounds.js'

export const audio = new AudioManager()

for (const [name, config] of Object.entries(sounds)) {
    audio.register(name, config)
}