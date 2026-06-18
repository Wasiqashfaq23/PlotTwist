import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [
    { label: 'Home', to: '/home' },
    { label: 'Browse', to: '/browse' },
    { label: 'About', to: '/about' },
  ];

  return (
    <header className="absolute top-0 left-0 w-full z-30">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-6">
        <Link
          to="/"
          className="font-display text-2xl text-cream tracking-wide"
        >
          PlotTwist
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-cream/80 hover:text-cream text-sm tracking-wide transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/add-property"
                className="text-cream/80 hover:text-cream text-sm tracking-wide transition-colors"
              >
                Add Listing
              </Link>
              <Link
                to="/profile"
                className="text-cream/80 hover:text-cream text-sm tracking-wide transition-colors"
              >
                {user.name?.split(' ')[0]}
              </Link>
              <button
                onClick={handleLogout}
                className="border border-gold text-gold text-sm px-5 py-2 rounded-full hover:bg-gold hover:text-ink transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-cream/80 hover:text-cream text-sm tracking-wide transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-gold text-gold text-sm px-5 py-2 rounded-full hover:bg-gold hover:text-ink transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-cream"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-ink/95 backdrop-blur px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="text-cream/90 text-base"
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-cream/10 my-2" />
          {user ? (
            <>
              <Link
                to="/add-property"
                onClick={() => setMenuOpen(false)}
                className="text-cream/90 text-base"
              >
                Add Listing
              </Link>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="text-cream/90 text-base"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="text-gold text-base text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-cream/90 text-base"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="text-gold text-base"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
