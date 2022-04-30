import Page from '../components/Page';

export default function MyApp({ Component, pageProps }) {
  return (
    // Page will now be global and accessible on all pages.
    // i.e. you don't have to wrap every page with Page component
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
