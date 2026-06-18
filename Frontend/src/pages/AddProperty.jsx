import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const initialForm = {
  title: '',
  description: '',
  price: '',
  type: 'sale',
  city: '',
  address: '',
  bedrooms: '',
  bathrooms: '',
  area: '',
  images: '',
};

const AddProperty = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms) || 0,
        bathrooms: Number(form.bathrooms) || 0,
        area: form.area ? Number(form.area) : undefined,
        images: form.images
          ? form.images.split(',').map((url) => url.trim())
          : [],
      };

      const res = await axiosInstance.post('/properties', payload);
      navigate(`/property/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create listing');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full bg-cream border border-ink/10 rounded-xl px-4 py-3 text-ink text-sm placeholder:text-ink/40 focus:outline-none focus:border-gold transition-colors';
  const labelClass = 'block text-ink/60 text-xs uppercase tracking-widest2 mb-2';

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-ink pb-20">
        <Navbar />
        <div className="px-6 md:px-10 max-w-3xl mx-auto pt-32">
          <p className="text-gold uppercase text-xs tracking-widest2 mb-3">
            List Your Property
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-cream">
            Add a New Listing
          </h1>
        </div>
      </div>

      <section className="px-6 md:px-10 max-w-3xl mx-auto -mt-12 relative z-10 pb-24">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-ink/5 shadow-xl p-8 md:p-10 flex flex-col gap-6"
        >
          {error && (
            <p className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl">
              {error}
            </p>
          )}

          <div>
            <label className={labelClass}>Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Modern 3-Bed Apartment in DHA"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the property..."
              className={inputClass}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Price (PKR)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="15000000"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Listing Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Islamabad"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Street, sector, area"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
                placeholder="3"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={form.bathrooms}
                onChange={handleChange}
                placeholder="2"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Area (sq ft)</label>
              <input
                type="number"
                name="area"
                value={form.area}
                onChange={handleChange}
                placeholder="1800"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Image URLs (comma-separated, optional)
            </label>
            <input
              name="images"
              value={form.images}
              onChange={handleChange}
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-ink text-cream py-4 rounded-full text-sm tracking-wide hover:bg-gold hover:text-ink transition-colors disabled:opacity-50 mt-2"
          >
            {submitting ? 'Publishing...' : 'Publish Listing'}
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default AddProperty;
