import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const FilterBar = ({ variant = 'hero' }) => {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (type) params.set('type', type);
    if (maxPrice) params.set('maxPrice', maxPrice);
    navigate(`/browse?${params.toString()}`);
  };

  const isHero = variant === 'hero';

  return (
    <form
      onSubmit={handleSubmit}
      className={
        isHero
          ? 'flex flex-col md:flex-row items-stretch gap-3 bg-cream rounded-2xl md:rounded-full p-3 shadow-2xl w-full max-w-3xl'
          : 'flex flex-col md:flex-row items-stretch gap-3 bg-white rounded-2xl p-4 border border-ink/10 w-full'
      }
    >
      <input
        type="text"
        placeholder="City (e.g. Lahore)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 bg-transparent px-4 py-3 text-ink placeholder:text-ink/40 text-sm rounded-full focus:outline-none border border-transparent focus:border-gold"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="flex-1 bg-transparent px-4 py-3 text-ink text-sm rounded-full focus:outline-none border border-transparent focus:border-gold"
      >
        <option value="">Buy or Rent</option>
        <option value="sale">For Sale</option>
        <option value="rent">For Rent</option>
      </select>

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="flex-1 bg-transparent px-4 py-3 text-ink placeholder:text-ink/40 text-sm rounded-full focus:outline-none border border-transparent focus:border-gold"
      />

      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-ink text-cream px-7 py-3 rounded-full text-sm tracking-wide hover:bg-gold hover:text-ink transition-colors whitespace-nowrap"
      >
        <Search size={16} />
        Search
      </button>
    </form>
  );
};

export default FilterBar;
