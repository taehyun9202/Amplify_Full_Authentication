// pages/_app.js
import "tailwindcss/tailwind.css";
import Link from "next/link";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../store/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default MyApp;
