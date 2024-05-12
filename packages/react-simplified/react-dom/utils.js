export function attachStyles(element, styles) {
    for (const key in styles) {
        element.style.setProperty(key, styles[key]);
    }
}
const specialEventCases = {
    onDoubleClick: "dblclick",
};
export function transformJSXEvent(event) {
    if (Object.keys(specialEventCases).includes(event)) {
        return specialEventCases[event];
    }
    const result = event.slice(2); // remove "on"
    return result.toLowerCase();
}
