import { FormValidator, NotEmpty, StringBetween, StringMinMax, StringValidDateFormat } from "$lib/form";


export let data = new FormValidator({
    username: {
        required: true,
        type: 'text',
        validators: [NotEmpty, StringMinMax(5, 20)]
    },
    password: {
        required: true,
        type: 'password',
        validators: [NotEmpty, StringMinMax(5, 20)]
    },
    birthdate: {
        required: true,
        type: 'datetime-local',
        validators: [StringValidDateFormat]
    },
    nip: {
        required: false,
        type: 'text',
        validators: [NotEmpty, StringMinMax(5, 20)]
    },
    nuptk: {
        required: true,
        type: 'text',
        validators: [NotEmpty, StringMinMax(5, 20)]
    },
    gender: {
        required: true,
        type: 'radio',
        validators: [StringBetween("Female", "Male")]
    }
})