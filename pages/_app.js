// pages/_app.js
import "tailwindcss/tailwind.css";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="absolute w-full py-4 px-12 border-b border-gray-300">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/profile">
          <a className="ml-4">Profile</a>
        </Link>
        <Link href="/protected">
          <a className="ml-4">Protected</a>
        </Link>
        <Link href="/ampAuth">
          <a className="absolute right-12">Sign in with Amplify</a>
        </Link>
      </nav>
      <div>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
