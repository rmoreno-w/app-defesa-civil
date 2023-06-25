export function formatTime(time: string) {
    return `${time.slice(8, 10)}/${time.slice(5, 7)}/${time.slice(0, 4)} - ${time.slice(11, 13)}:${time.slice(14, 16)}`;
}
