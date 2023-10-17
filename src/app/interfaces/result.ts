export interface Result<T> {
    body: T | null;
    status: string;
    count: string;
    message: string;
}
