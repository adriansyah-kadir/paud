import type { TransitionConfig, EasingFunction } from "svelte/transition";
import { circOut, cubicOut } from "svelte/easing";

export interface TranslateAndFadeParams{
    x: string
    y: string
    easing: EasingFunction,
    duration: number,
    delay: number,
    opacity: boolean
}

export function translateAndfade(node: HTMLElement, params: Partial<TranslateAndFadeParams> = {}): TransitionConfig{
    let p: TranslateAndFadeParams = {
        ...{
            y: "10px",
            x: "0px",
            easing: circOut,
            duration: 300,
            delay: 0,
            opacity: true
        },
        ...params
    }
    let re = /[(px)%]/
    let xi = re.exec(p.x)
    let x = parseInt(p.x.slice(0, xi?.index))
    let xv = p.x.slice(xi?.index)
    let yi = re.exec(p.y)
    let y = parseInt(p.y.slice(0, yi?.index))
    let yv = p.y.slice(yi?.index)
    return {
        css: (t,u) => `transform: translate(${x - t * x}${xv}, ${y - t * y}${yv}); opacity: ${p.opacity ? t : 1}`,
        easing: p.easing,
        duration: p.duration,
        delay: p.delay
    }
}