import Layout from '../components/Layout';
import UserStateProvider from '../state';
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
	return (
        <UserStateProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UserStateProvider>
    );
}

export default MyApp
