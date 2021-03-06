import Head from 'next/head';

const Meta = ({title, keywords, description}: MetaPropType) => {
    return (
        <Head>
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <title>{title}</title>
        </Head>
    );
};

Meta.defaultProps = {
    title: "File Streaming",
    keywords: "file streaming, hosting, movie night, friendly get together",
    description: "A website to become a movie theater with your friends!"
}

type MetaPropType = {
    title: string,
    keywords: string,
    description: string,
}

export default Meta;