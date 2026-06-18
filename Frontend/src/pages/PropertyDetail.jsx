import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BedDouble, Bath, MapPin, Ruler, Mail, Trash2 } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import useAuth from '../hooks/useAuth';

const PLACEHOLDER = '/images/property-hero.jpg';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axiosInstance.get(`/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        setError('Property not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this listing? This cannot be undone.')) {
      return;
    }
    setDeleting(true);
    try {
      await axiosInstance.delete(`/properties/${id}`);
      navigate('/profile');
    } catch (err) {
      alert(err.response?.data?.message || 'Could not delete listing');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Spinner fullScreen />;

  if (error || !property) {
    return (
      <div className="bg-cream min-h-screen">
        <Navbar />
        <div className="pt-40 text-center px-6">
          <p className="font-display text-3xl text-ink mb-4">
            {error || 'Property not found'}
          </p>
          <Link to="/browse" className="text-gold underline text-sm">
            Back to listings
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user && property.owner?._id === user._id;
  const image = property.images?.[0] || PLACEHOLDER;

  return (
    <div className="bg-cream min-h-screen">
      <div className="relative h-[60vh]">
        <img
          src={image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/20 to-cream" />
        <Navbar />
      </div>

      <section className="px-6 md:px-10 max-w-5xl mx-auto -mt-24 relative z-10">
        <div className="bg-white rounded-2xl border border-ink/5 p-8 md:p-12 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div>
              <span className="inline-block bg-ink text-cream text-xs uppercase tracking-widest2 px-3 py-1 rounded-full mb-4">
                {property.type === 'rent' ? 'For Rent' : 'For Sale'}
              </span>
              <h1 className="font-display text-3xl md:text-4xl text-ink mb-2">
                {property.title}
              </h1>
              <p className="flex items-center gap-1 text-ink/50 text-sm">
                <MapPin size={14} />
                {property.address}, {property.city}
              </p>
            </div>
            <p className="font-display text-3xl text-gold-deep whitespace-nowrap">
              PKR {Number(property.price).toLocaleString()}
            </p>
          </div>

          <div className="flex flex-wrap gap-8 border-y border-ink/10 py-6 mb-8">
            <span className="flex items-center gap-2 text-ink/70 text-sm">
              <BedDouble size={18} /> {property.bedrooms} Bedrooms
            </span>
            <span className="flex items-center gap-2 text-ink/70 text-sm">
              <Bath size={18} /> {property.bathrooms} Bathrooms
            </span>
            {property.area && (
              <span className="flex items-center gap-2 text-ink/70 text-sm">
                <Ruler size={18} /> {property.area} sq ft
              </span>
            )}
          </div>

          <p className="font-display text-xl text-ink mb-3">Description</p>
          <p className="text-ink/70 text-sm leading-relaxed mb-10">
            {property.description}
          </p>

          <div className="flex flex-col md:flex-row items-stretch gap-4 bg-cream rounded-2xl p-6">
            <div className="flex-1">
              <p className="text-ink/50 text-xs uppercase tracking-widest2 mb-1">
                Listed by
              </p>
              <p className="font-display text-lg text-ink">
                {property.owner?.name || 'Unknown'}
              </p>
            </div>
            {property.owner?.email && (
              <a
                href={`mailto:${property.owner.email}`}
                className="flex items-center justify-center gap-2 bg-ink text-cream px-6 py-3 rounded-full text-sm hover:bg-gold hover:text-ink transition-colors"
              >
                <Mail size={16} />
                Contact Owner
              </a>
            )}
          </div>

          {isOwner && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="mt-6 flex items-center gap-2 text-red-600 text-sm hover:text-red-800 transition-colors disabled:opacity-50"
            >
              <Trash2 size={16} />
              {deleting ? 'Deleting...' : 'Delete this listing'}
            </button>
          )}
        </div>
      </section>

      <div className="h-20" />
      <Footer />
    </div>
  );
};

export default PropertyDetail;
