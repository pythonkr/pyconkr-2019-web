export function isEmailAddress (str: string) {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    return pattern.test(str)
}

export function isStringNumber (str: string) {
    const pattern = /^\d+$/

    return pattern.test(str)
}
