import Link from 'next/link';
import navStyles from '../styles/Nav.module.css'

const Nav = () => {
    return (
        <nav className={navStyles.nav}>
            <ul>
                <li>
                    <Link href='/'> 
                        Home
                    </Link>
                </li>
                {/* <li>
                    <Link href="/public" as="/public">
                        Public Streams
                    </Link>
                </li> */}
                <li>
                    <Link href="/create" as="/create">
                        Create a new Stream
                    </Link>
                </li>
                <li>
                    <Link href="/join" as="/join">
                        Join a Stream
                    </Link>
                </li>
                <li>
                    <Link href="/about" as="/about">
                        About
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;