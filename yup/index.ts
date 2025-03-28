import { ref as YupRef, string } from 'yup'

const requiredFieldMessage = 'Обязательное поле'
export const usernameValidation = string().required(requiredFieldMessage)
export const lastNameValidation = string().required(requiredFieldMessage)
export const emailValidation = string()
    .email('E-mail введен с ошибками')
    .required(requiredFieldMessage)
export const passwordValidation = string()
    .min(8, 'Минимум 8 символов')
    .required(requiredFieldMessage)
export const getConfirmPasswordValidation = (
    passwordFieldName: string = 'password'
) =>
    string()
        .oneOf([YupRef(passwordFieldName)], 'Пароли должны совпадать')
        .required(requiredFieldMessage)
