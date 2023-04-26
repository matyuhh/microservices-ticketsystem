import Link from "next/link";

import { CurrentUser } from '../interfaces/user';

interface Props {
    currentUser: CurrentUser;
}

const Header = ({ currentUser }: Props) => {
    const links = [
        { currentUser: false, label: 'Sign Up', href: '/auth/signup' },
        { currentUser: false, label: 'Sign In', href: '/auth/signin' },
        { currentUser: true , label: 'Sign Out', href: '/auth/signout' },
    ]
    .filter((linkConfig) => linkConfig.currentUser === Boolean(currentUser))
    .map(({ label, href }) => (
        <li key={href} className="nav-item">
            <Link href={href} className="nav-link">
                {label}
            </Link>
        </li>
    ));

    return (
        <nav className="navbar navbar-light bg-light">
            <Link href="/" className="navbar-brand">
                Ticketing
            </Link>

            <div className="d-flex justify-content-end">
                <ul className="nav d-flex align-items-center">
                    {links}
                </ul>
            </div>
        </nav>
    )
}

export default Header;