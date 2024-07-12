import { FilterQuery, Model } from "mongoose";

export class Pagination<T> {
    constructor(
        private readonly model: Model<T>,
        private readonly options: {
            page?: number;
            limit?: number;
            filter?: FilterQuery<T>
        }

    ) { }

    getOptions() {
        return {
            page: this.options.page || 1,
            limit: this.options.limit || 10,
            generate: this.generate
        }

    }

    private async generate(list: any[]) {
        const { page, limit } = this.options;


        const total = await this.model.countDocuments(this.options.filter);

        const currentPage = Math.min(page, Math.ceil(total / limit));

        return {
            pagination: {
                page: currentPage,
                length: list.length,
                next: total > currentPage * limit ? currentPage + 1 : null,
                prev: currentPage > 1 ? currentPage - 1 : null,
            }

        }
    }
}