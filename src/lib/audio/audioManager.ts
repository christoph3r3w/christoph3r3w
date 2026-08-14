import {globalMute} from '$lib/store.js'
export interface SoundConfig {
    src: string
}

export interface PlayOptions {
    volume?: number
    playbackRate?: number
}

export class AudioManager {
    sounds = new Map<string, HTMLAudioElement>()
    buffers = new Map<string, AudioBuffer>()
    configs = new Map<string, SoundConfig>()
    context: AudioContext | null = null
    isMuted = false

    constructor() {
        globalMute.subscribe(value => {
            this.isMuted = value
        })
    }

    register(name: string, config: SoundConfig): void {
        if (typeof Audio === 'undefined') return

        const audio = new Audio(config.src)
        audio.preload = 'auto'
        audio.load()

        this.sounds.set(name, audio)
        this.configs.set(name, config)

        void this.preloadBuffer(name, config.src)
    }

    async preloadBuffer(name: string, src: string): Promise<void> {
        if (typeof window === 'undefined' || typeof AudioContext === 'undefined') return

        const context = this.getContext()
        const response = await fetch(src)
        const arrayBuffer = await response.arrayBuffer()
        const buffer = await context.decodeAudioData(arrayBuffer)

        this.buffers.set(name, buffer)
    }

    play(name: string, options: PlayOptions = {}): void {
        const buffer = this.buffers.get(name)

        if (buffer) {
            this.playBuffer(buffer, options)
            return
        }

        const audio = this.sounds.get(name)

        if (!audio) return

        audio.volume = this.isMuted ? 0 : (options.volume ?? 1)
        audio.playbackRate = options.playbackRate ?? 1
        audio.currentTime = 0

        audio.play().catch(() => {})
    }

    playBuffer(buffer: AudioBuffer, options: PlayOptions = {}): void {
        void this.startBuffer(buffer, options)
    }

    async startBuffer(buffer: AudioBuffer, options: PlayOptions = {}): Promise<void> {
        const context = this.getContext()

        if (context.state === 'suspended') {
            await context.resume()
        }

        const source = context.createBufferSource()
        const gain = context.createGain()

        source.buffer = buffer
        source.playbackRate.value = options.playbackRate ?? 1
        gain.gain.value = this.isMuted ? 0 : (options.volume ?? 1)

        source.connect(gain)
        gain.connect(context.destination)

        source.start(0)
    }

    getContext(): AudioContext {
        if (this.context) return this.context

        this.context = new AudioContext()
        return this.context
    }
}