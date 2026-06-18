import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-ink text-cream/70 px-6 md:px-10 py-14">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div>
          <p className="font-display text-2xl text-cream mb-3">PlotTwist</p>
          <p className="text-sm max-w-xs leading-relaxed">
            Every home has a story. Find yours with a PlotTwist.
          </p>
        </div>

        <div className="flex gap-12 text-sm">
          <div className="flex flex-col gap-3">
            <p className="text-cream/40 uppercase text-xs tracking-widest2 mb-1">
              Explore
            </p>
            <Link to="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <Link to="/browse" className="hover:text-gold transition-colors">
              Browse Listings
            </Link>
            <Link
              to="/add-property"
              className="hover:text-gold transition-colors"
            >
              Add Property
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-cream/40 uppercase text-xs tracking-widest2 mb-1">
              Account
            </p>
            <Link to="/login" className="hover:text-gold transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-gold transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-cream/10 mt-10 pt-6 text-xs text-cream/40">
        © {new Date().getFullYear()} PlotTwist. Built for educational
        purposes.
      </div>
    </footer>
  );
};

export default Footer;
