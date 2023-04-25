import { NextApiRequest } from 'next';

import { User } from '../interfaces/user';
import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }: { currentUser: User }): JSX.Element => {
    return currentUser ? (<div>You are signed in</div>) : (<div>You are not signed in</div>)
}

LandingPage.getInitialProps = async ({ req }: { req: NextApiRequest}): Promise<User> => {
    const client = buildClient(req);
    const { data }: { data: User } = await client.get('/api/users/currentuser');
    return data;
};

export default LandingPage;
