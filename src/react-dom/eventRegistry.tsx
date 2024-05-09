type EventType = string;
type EventTargetType = HTMLElement;
type EventHandlerType = (...args: unknown[]) => void;
type EventRegistryType = Record<EventType, Map<EventTargetType, EventHandlerType>>;

class EventRegistry {
  private eventRegistry: EventRegistryType = {};

  hasEvent(event: EventType) {
    return Object.keys(this.eventRegistry).includes(event);
  }

  hasEventTarget(event: EventType, eventTarget: EventTargetType) {
    return this.eventRegistry[event].has(eventTarget);
  }

  setEvent(event: EventType, eventTarget: EventTargetType, eventHandler: EventHandlerType) {
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

  getEvent(event: EventType, eventTarget: EventTargetType) {
    if (!this.hasEvent(event)) {
      return;
    }

    return this.eventRegistry[event].get(eventTarget);
  }
}

const eventRegistry = new EventRegistry();
export default eventRegistry;
