export function getTime(timeString: string) {
    return `${timeString.slice(11, 13)}:${timeString.slice(14, 16)}`;
}
