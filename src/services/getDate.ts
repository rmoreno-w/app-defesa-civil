export function getDate(timeString: string) {
    return `${timeString.slice(8, 10)}/${timeString.slice(5, 7)}/${timeString.slice(0, 4)}`;
}
