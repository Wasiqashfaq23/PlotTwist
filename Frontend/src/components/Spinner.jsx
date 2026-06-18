const Spinner = ({ fullScreen = false }) => {
  const wrapperClass = fullScreen
    ? 'min-h-screen flex items-center justify-center bg-cream'
    : 'flex items-center justify-center py-20';

  return (
    <div className={wrapperClass}>
      <div className="w-10 h-10 border-2 border-ink/10 border-t-gold rounded-full animate-spin" />
    </div>
  );
};

export default Spinner;
