import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

import { AxiosCustomError } from '../interfaces/error';

interface UseRequestParams {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete';
    body: object;
    onSuccess: (a: AxiosResponse) => void;
}

interface UseRequestReturn {
    doRequest: () => void;
    errors: JSX.Element;
}

const useRequest = ({ 
    url,
    method,
    body,
    onSuccess
}: UseRequestParams): UseRequestReturn => {
    const [errors, setErrors] = useState<JSX.Element>(<></>);

    const doRequest = async (): Promise<void> => {
        try {
            setErrors(<></>);
            const response = await axios[method](url, body);

            if (onSuccess) onSuccess(response.data);
            return response.data;
        } catch (err) {
            const error = err as AxiosCustomError;
            if (error.response) {
                setErrors(
                    <div className="alert alert-danger">
                        <h4>Oops!...</h4>
                        <ul className="my-0">
                            {error.response.data.errors.map((error: any) => <li key={error.message}>{error.message}</li>)}
                        </ul>
                    </div>
                );
            }
        }
    };

    return { doRequest, errors };
};

export default useRequest;
