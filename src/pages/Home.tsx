import Footer from '../components/Footer';

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-4">
        <h1>Home Page</h1>
        <p>Welcome to the home page!</p>
        <p>Enjoy your stay!</p>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
