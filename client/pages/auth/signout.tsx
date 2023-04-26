import { useEffect } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';

const Signout = () => {
    const { doRequest } = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/')
    });

    useEffect(() => {
        doRequest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>Signing you out...</div>
    )
};

export default Signout;