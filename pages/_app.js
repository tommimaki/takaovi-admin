import "@/styles/globals.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return <Component {...pageProps} />;
}
