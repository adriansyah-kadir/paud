export function Validator<T>(...validator: ((arg0: T)=>boolean)[]){
    return {
        all: (...inputs: T[]) => {
            for (const input of inputs) {
                for (const v of validator) {
                    if(!v(input)) return false
                }
            }
            return true
        }
    }
}

export function MinMaxInputLen(min: number, max: number){
    return function(input: string){
        return input.length <= max && input.length >= min
    }
}

export function NotEmptyString(trim: boolean){
    let re = /^\s+$/
    return function(input: string){
        for (const i of input) {
            if(i === ' ') return false
        }
        return true
    }
}