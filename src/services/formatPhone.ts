export function formatPhoneNumber(number: string) {
    return `(${number.slice(0, 2)}) ${number.slice(2, 7)} - ${number.slice(7, 11)}`;
}
