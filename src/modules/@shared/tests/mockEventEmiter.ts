import { eventEmitterInterface } from "@/modules/@shared/event";

export const mockEventEmiter = (): eventEmitterInterface => {
    return {
        emit: jest.fn(),
    }
}
