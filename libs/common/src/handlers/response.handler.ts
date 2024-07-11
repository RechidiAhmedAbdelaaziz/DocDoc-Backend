export class ResponseHandler {
    constructor(data: any, message: string) {
        if (data.pagination) {
            const { pagination, ...data_ } = data;
            return {
                success: true,
                message: message,
                pagination: data.pagination,
                data: data_,
            };
        }
        return {
            success: true,
            message: message,
            data: data,
        };
    }
}
