import {FormValidator, StringMinMax, NotEmpty} from "$lib/form"

export const createValidator = () => new FormValidator({
    username: {
        required: true,
        validators: [NotEmpty, StringMinMax(5, 20)]
    },
    password: {
        required: true,
        validators: [NotEmpty, StringMinMax(5, 20)]
    }
})