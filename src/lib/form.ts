type Validator<T> = (arg0: T) => string|null

type Option = {
    required: boolean,
    type: 'text'|'file',
    validators: Validator<any>[]
}

export class FormValidator<T extends Record<string, Partial<Option>>>{
    errors: Record<keyof T, string|null>
    values: {
        [K in keyof T]: T[K]['type'] extends 'file' ? File|null : string|null
    }
    checked = false;
    opts: Record<keyof T, Option>
    
    constructor(opts: T){
        this.errors = {} as any
        this.values = {} as any
        this.opts = {} as any
        for (const key in opts) {
            this.errors[key] = null;
            this.values[key] = null;
            this.opts[key] = {...{
                required: false,
                type: 'text',
                validators: []
            }, ...opts[key]}
        }
    }

    getValues(): {
        [K in keyof T]: T[K]['required'] extends true ? NonNullable<FormValidator<T>['values'][K]> : FormValidator<T>['values'][K]
    }{
        if(!this.checked) throw "form is not checked";
        return this.values as any;
    }

    check(form: FormData){
        this.reset()
        this.checked = true;
        this.eachKey(key=>{
            let ipt = form.get(key.toString())
            let opt = this.opts[key]
            this.values[key] = ipt?.valueOf() as any || null
            if(ipt){
                this.checkInput(key, ipt, opt);
            }else if(opt.required) {
                this.errors[key] = "required"
            }
        })
        for (const key in this.errors) {
            if(this.errors[key] !== null) return false;
        }
        return true;
    }

    protected checkInput(key: keyof T, input: FormDataEntryValue, opt: Option){
        let error = false;
        if(opt.type === 'text'){
            if(!isString(input)) {
                this.errors[key] = 'not a text'
                error = true;
            };
        }
        if(opt.type === 'file'){
            if(!isFile(input)) {
                this.errors[key] = 'not a file'
                error = true;
            };
        }
        if (error) return;
        for (const V of opt.validators) {
            let v = V(input.valueOf() as any)
            if(v){
                this.errors[key] = v;
                return
            };
        }
    }

    protected eachKey(cb: (key: keyof T)=>void){
        for (const key in this.opts) {
            cb(key)
        }
    }

    protected reset(){
        this.checked = false;
        this.eachKey(k => {
            this.errors[k] = null
            this.values[k] = null as any
        })
    }
}

function isString(input: FormDataEntryValue){
    return input.valueOf() instanceof String || typeof input.valueOf() === 'string'
}

function isFile(input: FormDataEntryValue){
    return input.valueOf() instanceof File
}

export function NotEmpty(input: string): string|null{
    if(input.length > 0 && input.search(/^\s+$/)) return null;
    return "empty string"
}

export function StringMinMax(min: number, max: number){
    return function(input: string){
        if(input.length > max) return `${input} length is more than max:${max}`;
        if(input.length < min) return `${input} length is less than min:${min}`;
        return null
    }
}

export function StringBetween(...strings: string[]){
    return function(input: string){
        if(strings.indexOf(input) === -1) return `${input} is not a valid input [${strings.join(", ")}]`
        return null;
    }
}

export function StringValidDateFormat(input: string){
    if(isNaN(Date.parse(input))) return `${input} is not a valid date format`;
    return null;
}