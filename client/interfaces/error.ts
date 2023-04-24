import { AxiosError } from 'axios';

export interface BackendError {
    message: string;
    field?: string;
}

export type AxiosCustomError = AxiosError<{ errors: BackendError[] }>
