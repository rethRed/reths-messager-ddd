export class Notification  {

    private errors: Error[] = []

    addError(error: Error): void {
        this.errors.push(error)
    }

    hasError(): boolean {
        return this.errors.length > 0
    }

    getErrors(): Error[] {
        return this.errors
    }

    clearErrors(): void {
        this.errors = []
    }

    getErrorsAndClear(): Error[] {
        const errors = this.getErrors()
        this.clearErrors()
        return errors
    }

}