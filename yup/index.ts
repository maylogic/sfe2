import {
    object,
    ref as YupRef,
    string,
    StringSchema
} from 'yup'

const requiredFieldMessage = 'Обязательное поле'
export const usernameValidation = string().required(requiredFieldMessage)
export const lastNameValidation = string().required(requiredFieldMessage)
export const emailValidation = string()
    .email('E-mail введен с ошибками')
    .required(requiredFieldMessage)
export const passwordValidation = string()
    .min(8, 'Минимум 8 символов')
    .required(requiredFieldMessage)
export const passwordValidationFn = (schema: StringSchema) => schema.min(8, 'Минимум 8 символов')
    .required(requiredFieldMessage)
export const getConfirmPasswordValidation = (
    passwordFieldName: string = 'password'
) =>
    string()
        .oneOf([YupRef(passwordFieldName)], 'Пароли должны совпадать')
        .required(requiredFieldMessage)

export const customerAddressSchema = object({
    first_name: string().required('Имя обязательно'),
    last_name: string().required('Фамилия обязательна'),
    address1: string().required('Адрес обязателен'),
    address2: string(),
    city: string().required('Город обязателен'),
    country: string().required('Страна обязательна'),
    phone_number: string().required('Телефон получателя обязателен'),
    postal_code: string().required('Код обязателен'),
    state: string().required('Регион обязателен'),
})
export const shippingMethodSchema = object({
    shippingMethodId: string().required('Необходимо выбрать способ доставки')
})