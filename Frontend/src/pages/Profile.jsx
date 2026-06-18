import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import Spinner from '../components/Spinner';
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const res = await axiosInstance.get('/properties/user/my-listings');
        setProperties(res.data);
      } catch (err) {
        setError('Could not load your listings.');
      } finally {
        setLoading(false);
      }
    };
    fetchMyListings();
  }, []);

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-ink pb-16">
        <Navbar />
        <div className="px-6 md:px-10 max-w-7xl mx-auto pt-32">
          <p className="text-gold uppercase text-xs tracking-widest2 mb-3">
            My Account
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-2">
            {user?.name}
          </h1>
          <p className="text-cream/50 text-sm">{user?.email}</p>
        </div>
      </div>

      <section className="px-6 md:px-10 max-w-7xl mx-auto py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-2xl text-ink">My Listings</h2>
          <Link
            to="/add-property"
            className="bg-ink text-cream px-6 py-3 rounded-full text-sm hover:bg-gold hover:text-ink transition-colors"
          >
            + Add Listing
          </Link>
        </div>

        {loading && <Spinner />}

        {!loading && error && (
          <p className="text-center text-ink/50 py-10">{error}</p>
        )}

        {!loading && !error && properties.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-ink/5">
            <p className="font-display text-2xl text-ink mb-2">
              You haven&apos;t listed anything yet
            </p>
            <p className="text-ink/50 text-sm mb-6">
              Add your first property to see it here.
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
      </section>

      <Footer />
    </div>
  );
};

export default Profile;
