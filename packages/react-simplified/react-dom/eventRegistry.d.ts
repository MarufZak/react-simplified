type EventType = string;
type EventTargetType = HTMLElement;
type EventHandlerType = (...args: unknown[]) => void;
declare class EventRegistry {
    private eventRegistry;
    hasEvent(event: EventType): boolean;
    hasEventTarget(event: EventType, eventTarget: EventTargetType): boolean;
    setEvent(event: EventType, eventTarget: EventTargetType, eventHandler: EventHandlerType): void;
    getEvent(event: EventType, eventTarget: EventTargetType): EventHandlerType | undefined;
}
declare const eventRegistry: EventRegistry;
export default eventRegistry;
