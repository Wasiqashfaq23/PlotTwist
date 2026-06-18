import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Search, KeyRound } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilterBar from '../components/FilterBar';
import PropertyCard from '../components/PropertyCard';
import Spinner from '../components/Spinner';

const HERO_IMAGE = '/images/home-hero.jpg';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axiosInstance.get('/properties');
        setProperties(res.data.slice(0, 6));
      } catch (err) {
        setError('Could not load listings right now.');
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-cream">
      <section className="relative min-h-[88vh] flex flex-col">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Modern home exterior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/90" />
        </div>

        <Navbar />

        <div className="relative z-10 flex-1 flex flex-col items-start justify-center px-6 md:px-10 max-w-7xl mx-auto w-full">
          <p className="text-gold uppercase text-xs tracking-widest2 mb-4">
            Pakistan&apos;s Property Marketplace
          </p>
          <h1 className="font-display text-cream text-6xl md:text-8xl leading-[0.95] mb-8">
            Dream Home
          </h1>
          <p className="text-cream/70 max-w-md mb-10 text-sm md:text-base">
            Browse verified listings across Pakistan, filter by city and
            budget, and find a place that actually fits your life.
          </p>

          <FilterBar variant="hero" />
        </div>
      </section>

      <section className="bg-ink py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-wrap items-center justify-center md:justify-between gap-6 text-cream/40 text-xs uppercase tracking-widest2">
          <span>Verified Listings</span>
          <span>Direct Owner Contact</span>
          <span>No Hidden Fees</span>
          <span>Built for Pakistan</span>
        </div>
      </section>

      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <h2 className="font-display text-4xl md:text-5xl text-ink max-w-lg">
            Making property search make sense
          </h2>
          <p className="text-ink/60 max-w-sm text-sm">
            No agents calling you nonstop. Just listings, filters, and
            direct contact with the people who actually own the property.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-ink/5">
            <Search className="text-gold mb-5" size={28} />
            <p className="font-display text-xl text-ink mb-2">
              Smart Filtering
            </p>
            <p className="text-ink/60 text-sm leading-relaxed">
              Narrow listings by city, price range, and rent vs. sale in a
              couple of taps.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-ink/5">
            <ShieldCheck className="text-gold mb-5" size={28} />
            <p className="font-display text-xl text-ink mb-2">
              Real Listings
            </p>
            <p className="text-ink/60 text-sm leading-relaxed">
              Every property is added by a logged-in user tied to a real
              account, not scraped data.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-ink/5">
            <KeyRound className="text-gold mb-5" size={28} />
            <p className="font-display text-xl text-ink mb-2">
              List in Minutes
            </p>
            <p className="text-ink/60 text-sm leading-relaxed">
              Got a place to rent or sell? Add it yourself, no waiting on
              approval.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-gold uppercase text-xs tracking-widest2 mb-3">
              Fresh on PlotTwist
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-ink">
              Featured Properties
            </h2>
          </div>
          <Link
            to="/browse"
            className="hidden md:inline-block text-sm text-ink/70 border-b border-ink/30 hover:border-gold hover:text-gold transition-colors pb-1"
          >
            View All
          </Link>
        </div>

        {loading && <Spinner />}

        {!loading && error && (
          <p className="text-center text-ink/50 py-10">{error}</p>
        )}

        {!loading && !error && properties.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-ink/5">
            <p className="font-display text-2xl text-ink mb-2">
              No listings yet
            </p>
            <p className="text-ink/50 text-sm mb-6">
              Be the first to add a property to PlotTwist.
            </p>
            <Link
              to="/add-property"
              className="inline-block bg-ink text-cream px-6 py-3 rounded-full text-sm hover:bg-gold hover:text-ink transition-colors"
            >
              Add a Property
            </Link>
          </div>
        )}

        {!loading && !error && properties.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}

        <Link
          to="/browse"
          className="md:hidden block text-center mt-10 text-sm text-ink/70 border-b border-ink/30 w-fit mx-auto pb-1"
        >
          View All
        </Link>
      </section>

      <section className="bg-ink py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <h3 className="font-display text-3xl md:text-4xl text-cream max-w-md">
            Have a property to list? Get it in front of buyers today.
          </h3>
          <Link
            to="/add-property"
            className="bg-gold text-ink px-8 py-4 rounded-full text-sm tracking-wide hover:bg-cream transition-colors whitespace-nowrap"
          >
            List Your Property
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
