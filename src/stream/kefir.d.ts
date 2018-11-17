import { Emitter } from 'kefir';

declare module 'kefir' {
  interface Emitter<T, S> {
    value(value: T): void;
    event(event: { type: string, value: T | S }): void;
  }
}
