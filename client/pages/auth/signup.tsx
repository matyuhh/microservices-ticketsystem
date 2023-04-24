import { useState, FormEvent } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';

const Signup = (): JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,
            password,
        },
        onSuccess: () => Router.push('/'),
    });

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await doRequest();
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="form-control" 
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    className="form-control"
                    autoComplete="off"
                />
            </div>

            {errors}

            <button className="btn btn-primary">Sign Up</button>
        </form>
    )
};

export default Signup;
