import { Link } from 'react-router-dom';
import { BedDouble, Bath, MapPin } from 'lucide-react';

const PLACEHOLDER = '/images/property-hero.jpg';

const PropertyCard = ({ property }) => {
  const image = property.images?.[0] || PLACEHOLDER;

  return (
    <Link
      to={`/property/${property._id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-ink/5 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 bg-ink/80 text-cream text-xs uppercase tracking-widest2 px-3 py-1 rounded-full">
          {property.type === 'rent' ? 'For Rent' : 'For Sale'}
        </span>
      </div>

      <div className="p-5">
        <p className="font-display text-xl text-ink mb-1 truncate">
          {property.title}
        </p>
        <p className="flex items-center gap-1 text-ink/50 text-sm mb-4">
          <MapPin size={14} />
          {property.city}
        </p>

        <div className="flex items-center justify-between border-t border-ink/10 pt-4">
          <div className="flex items-center gap-4 text-ink/60 text-sm">
            <span className="flex items-center gap-1">
              <BedDouble size={16} /> {property.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath size={16} /> {property.bathrooms}
            </span>
          </div>
          <p className="font-display text-lg text-gold-deep">
            PKR {Number(property.price).toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
