import Link from 'next/link';
import Meta from '../components/Meta';
import styles from '../styles/Home.module.css'

/**
 * TODO:
 * 
 * This is stuff for later. Perhaps much later.
 * 
 * 1) track and log the ip address using cloudflare's public api
 * 2) see if we can track the geolocation of the person 
 * 3) start a socket connection (via context provider?) so we can track length of stay on the site.
 * 3.a) on that socket, track length of stay on homepage, and keep updating it to track length of stay on each subsequent page access
 */

const Home = () => {
    return (
        <div>
            <Meta />
            <title>Home Screen</title>
            <h1>Welcome to File Streaming!!</h1>
            <p>
              This exists as a proof-of-concept right now and is not meant to be in its final form, or as a perfectly working platform. Rather, its a pre-pre-alpha
              version, that is currently live as a step in the development process. I'm about a week into this project, and since this is currently serving as my portfolio 
              website, let me talk a little bit about it.
            </p>
            <p>
              The idea: <b>If you have a local file you want to share with people, why not stream it out?</b>. Currently, I didn't see a good platform to do this, so I 
              decided to try and build it. So, the TechStack:
            </p>
            <p>
              For SPA purposes, I decded to go with ReactTS, which is a framework I know quite well. However, React does not have good routing OOTB, nor does it
              have good SEO optimizations. To complement React, I am working with NextTS. There is a backend server written in NodeTS that connects clients together, via SocketIO,
              Express, and Firebase. For the video streaming, I am working with WebRTC, and using that to connect hosts with consumers. 
            </p>
            <p>
              This is in a working state right now, but it is FAR from perfect. Bugs are expected! If you see one, please email me at etmhicks@gmail.com
              (or if you want to hire me as a Software Engineer, also email me, I'm actively looking for a job)
            </p>
            <p>
                Here, you can make any night a movie night with friends or family - no matter how far away they are!
            </p>
            <p>
                Any video file you have on your computer can be streamed instantly to anyone with the link. Click the button below to get started!
            </p>
            <p>
                Coming here with a room already in mind? Click join to input your link, or just join from pasting the link in the URL
            </p>
            <Link href="/create" as="/create"><button>Click here to make a new stream</button></Link>
            <Link href="/join" as="/join"><button>Click here to join a stream</button></Link>
            {/* <Link href="/public" as="/public"><button>Click here to browses all public streams</button></Link> */}
        </div>
    )
}

export default Home;


/** This code should not be saved in the long run, but for now it is
 *       <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
 */
