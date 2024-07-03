import { flushStateUpdates } from "../core/useState";

type EventType = string;
type EventTargetType = HTMLElement | SVGElement;
type EventHandlerType = (event: Event) => void;
type EventRegistryType = Record<
  EventType,
  Map<EventTargetType, EventHandlerType>
>;

const elementAttachableEvents = ["load", "error"];

class EventRegistry {
  private eventRegistry: EventRegistryType = {};

  hasEvent(event: EventType) {
    return Object.keys(this.eventRegistry).includes(event);
  }

  hasEventTarget(event: EventType, eventTarget: EventTargetType) {
    return this.eventRegistry[event]
      ? this.eventRegistry[event].has(eventTarget)
      : false;
  }

  setEvent(
    event: EventType,
    eventTarget: EventTargetType,
    eventHandler: EventHandlerType,
  ) {
    const eventHandlerWrapper = (e: Event) => {
      if (elementAttachableEvents.includes(event)) {
        eventHandler(e);
        flushStateUpdates();
        return;
      }

      if (e.target !== eventTarget && !eventTarget.contains(e.target as Node)) {
        return;
      }

      eventHandler(e);
      flushStateUpdates();
    };

    if (this.hasEvent(event)) {
      if (this.hasEventTarget(event, eventTarget)) {
        return;
      }

      document.body.addEventListener(event, eventHandlerWrapper);
      this.eventRegistry[event].set(eventTarget, eventHandlerWrapper);
      return;
    }

    if (elementAttachableEvents.includes(event)) {
      console.log("no1");

      eventTarget.addEventListener(event.toLowerCase(), eventHandlerWrapper);
    } else {
      console.log("no2");
      document.body.addEventListener(event, eventHandlerWrapper);
    }

    console.log("noo");

    const map = new Map();
    map.set(eventTarget, eventHandlerWrapper);
    this.eventRegistry[event] = map;
  }

  getEvent(event: EventType, eventTarget: EventTargetType) {
    if (!this.hasEvent(event)) {
      return;
    }

    return this.eventRegistry[event].get(eventTarget);
  }

  clearEventRegistry() {
    for (const event in this.eventRegistry) {
      for (const [eventTarget, eventHandler] of this.eventRegistry[event]) {
        if (elementAttachableEvents.includes(event)) {
          eventTarget.removeEventListener(event.toLowerCase(), eventHandler);
          continue;
        }
        document.body.removeEventListener(event, eventHandler);
      }
    }

    this.eventRegistry = {};
  }
}

const eventRegistry = new EventRegistry();
export default eventRegistry;
