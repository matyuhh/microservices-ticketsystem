import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';

import buildClient from '../api/build-client';
import { CurrentUser, User } from '../interfaces/user';
import Header from '../components/Header';

interface CustomAppProps extends AppProps {
    currentUser: CurrentUser,
}

const App = ({ Component, pageProps, currentUser }: CustomAppProps) => {
    return (
        <div>
            <Header currentUser={currentUser}/>
            <Component {...pageProps} />
        </div>
    )
}

App.getInitialProps = async (context: any) => {
    const client = buildClient(context.ctx.req);
    const { data }: { data: User } = await client.get('/api/users/currentuser');

    let pageProps = {};
    if (context.Component.getInitialProps) {
        pageProps = await context.Component.getInitialProps(context.ctx);
    }

    return {
        pageProps,
        ...data,
    };
};

export default App;
