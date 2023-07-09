export interface UserSearchParams {
    query: object;
    fields?: string | null;
    options?: {
        sort?: object;
        limit?: number;
        skip?: number;
        populate?: string;
    };
}
