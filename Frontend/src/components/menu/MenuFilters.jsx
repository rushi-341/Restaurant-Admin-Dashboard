const MenuFilters = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search menu..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  )
}

export default MenuFilters
