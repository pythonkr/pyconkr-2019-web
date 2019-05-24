export function isEmailAddress (str: string) {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    return pattern.test(str)
}

export function isStringNumber (str: string) {
    const pattern = /^\d+$/

    return pattern.test(str)
}

export function creditCardFormatter (value: string) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    const matchLength = match.length
    for (let i = 0; i < matchLength; i += 4) {
        parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
        return parts.join('  ')
    } else {
        return value
    }
}

export function removeWhiteSpaces (value: string) {
    return value.replace(/\s/g, '')
}
