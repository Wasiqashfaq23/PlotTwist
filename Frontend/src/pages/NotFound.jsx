import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const NotFound = () => {
  return (
    <div className="bg-ink min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-gold uppercase text-xs tracking-widest2 mb-4">
          404
        </p>
        <h1 className="font-display text-5xl md:text-7xl text-cream mb-6">
          Plot Not Found
        </h1>
        <p className="text-cream/60 text-sm mb-10 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist, or the
          listing may have been removed.
        </p>
        <Link
          to="/"
          className="bg-gold text-ink px-8 py-3 rounded-full text-sm hover:bg-cream transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
