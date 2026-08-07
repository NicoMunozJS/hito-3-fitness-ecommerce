function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Buscar productos..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;