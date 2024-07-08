export class ResponseHandler {
    constructor(data: any, message: string) {
        return {
            success: true,
            message: message,
            data: data,
        };
    }
}
