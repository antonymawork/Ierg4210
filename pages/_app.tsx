// pages/_app.tsx
import '../styles/globals.css'; // Adjust the path if necessary

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

// Example using getServerSideProps in Next.js
export async function getServerSideProps() {
  const products = await prisma.product.findMany();
  return {
    props: { products },
  };
}
