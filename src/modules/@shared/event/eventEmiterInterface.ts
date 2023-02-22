import { Event } from "./eventInterface";
export interface eventEmitterInterface {
    emit(event: Event): Promise<void>;
}