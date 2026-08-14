import { audio } from './audio.js'

/**
 * @typedef {'mouseenter' | 'focus' | 'mousedown' | 'mouseup' | 'pointerdown' | 'pointerup' | 'click' | 'wheel' | 'animationiteration'} AudioActionEvent
 * @typedef {string | {
 *   sound?: string,
 *   sounds?: Partial<Record<AudioActionEvent, string>>,
 *   volume?: number,
 *   playbackRate?: number
 * }} AudioActionParameter
 */

/** @type {import('svelte/action').Action<HTMLElement, AudioActionParameter>} */
export function audioAction(node, parameter) {
    let current = normalizeParameter(parameter)

    const play = (eventName) => {
        const sound = current.sounds[eventName] ?? current.sound

        if (!sound) return

        audio.play(sound, {
            volume: current.volume,
            playbackRate: current.playbackRate
        })
    }

    const handleMouseEnter = () => play('mouseenter')
    const handleFocus = () => play('focus')
    const handlePointerDown = () => play('pointerdown')
    const handlePointerUp = () => play('pointerup')
    const handleClick = () => play('click')
    const handleWheel = () => play('wheel')
	 const handleAnimationIteration = () => play('animationiteration')

    node.addEventListener('mouseenter', handleMouseEnter)
    node.addEventListener('focus', handleFocus)
    node.addEventListener('pointerdown', handlePointerDown)
    node.addEventListener('pointerup', handlePointerUp)
    node.addEventListener('click', handleClick)
    node.addEventListener('wheel', handleWheel)
    node.addEventListener('animationiteration', handleAnimationIteration)

    return {
        update(nextParameter) {
         	current = normalizeParameter(nextParameter)
        },

        destroy() {
            node.removeEventListener('mouseenter', handleMouseEnter)
            node.removeEventListener('focus', handleFocus)
            node.removeEventListener('pointerdown', handlePointerDown)
            node.removeEventListener('pointerup', handlePointerUp)
            node.removeEventListener('click', handleClick)
            node.removeEventListener('wheel', handleWheel)
            node.removeEventListener('animationiteration', handleAnimationIteration)
        }
    }
}

/** @param {AudioActionParameter} parameter */
function normalizeParameter(parameter) {
    if (typeof parameter === 'string') {
        return { sound: parameter, sounds: {} }
    }

    return {
        sound: parameter.sound,
        sounds: parameter.sounds ?? {},
        volume: parameter.volume,
        playbackRate: parameter.playbackRate
    }
}