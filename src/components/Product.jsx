function Product({ data, isSelected, onSelect, onDeselect }) {
  const isAddPhoto = data.alt === 'Add Photo';

  const toggleSelect = (e) => {
    if (e.target.type === 'checkbox') {
      return; 
    }
    if (isSelected) {
      onDeselect();
    } else {
      onSelect();
    }
  };

  return (
    <div className={`image ${isSelected ? 'selected' : ''}`} onClick={toggleSelect}>
      <input type="checkbox" id={`img-checkbox-${data.id}`} className="custom-checkbox" checked={isSelected} onChange={toggleSelect} />
      <label htmlFor={`img-checkbox-${data.id}`} className="custom-checkbox-label"></label>
      <img src={data.src} alt={data.alt} />
    </div>
  );
}
export default Product;