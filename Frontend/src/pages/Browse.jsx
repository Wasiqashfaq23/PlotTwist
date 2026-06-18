import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilterBar from '../components/FilterBar';
import PropertyCard from '../components/PropertyCard';
import Spinner from '../components/Spinner';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError('');
      try {
        const query = searchParams.toString();
        const res = await axiosInstance.get(
          `/properties${query ? `?${query}` : ''}`
        );
        setProperties(res.data);
      } catch (err) {
        setError('Could not load listings right now.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [searchParams]);

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-ink pb-16">
        <Navbar />
        <div className="px-6 md:px-10 max-w-7xl mx-auto pt-32 pb-10">
          <p className="text-gold uppercase text-xs tracking-widest2 mb-3">
            All Listings
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-10">
            Browse Properties
          </h1>
          <FilterBar variant="bar" />
        </div>
      </div>

      <section className="px-6 md:px-10 max-w-7xl mx-auto py-16">
        {loading && <Spinner />}

        {!loading && error && (
          <p className="text-center text-ink/50 py-10">{error}</p>
        )}

        {!loading && !error && properties.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-ink/5">
            <p className="font-display text-2xl text-ink mb-2">
              No properties match this search
            </p>
            <p className="text-ink/50 text-sm">
              Try a different city, price range, or property type.
            </p>
          </div>
        )}

        {!loading && !error && properties.length > 0 && (
          <>
            <p className="text-ink/50 text-sm mb-8">
              {properties.length}{' '}
              {properties.length === 1 ? 'property' : 'properties'} found
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Browse;
