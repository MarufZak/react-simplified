class EventRegistry {
    constructor() {
        this.eventRegistry = {};
    }
    hasEvent(event) {
        return Object.keys(this.eventRegistry).includes(event);
    }
    hasEventTarget(event, eventTarget) {
        return this.eventRegistry[event].has(eventTarget);
    }
    setEvent(event, eventTarget, eventHandler) {
        if (this.hasEvent(event)) {
            if (this.hasEventTarget(event, eventTarget)) {
                return;
            }
            document.body.addEventListener(event, eventHandler);
            this.eventRegistry[event].set(eventTarget, eventHandler);
            return;
        }
        document.body.addEventListener(event, eventHandler);
        const map = new Map();
        map.set(eventTarget, eventHandler);
        this.eventRegistry[event] = map;
    }
    getEvent(event, eventTarget) {
        if (!this.hasEvent(event)) {
            return;
        }
        return this.eventRegistry[event].get(eventTarget);
    }
}
const eventRegistry = new EventRegistry();
export default eventRegistry;
