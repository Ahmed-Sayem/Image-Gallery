import { useState } from 'react';
import './App.css';
import Product from './components/Product';

const initialImages = [
    { id: 1, src: 'images/image-1.webp', alt: 'image 1' },
  { id: 2, src: 'images/image-2.webp', alt: 'image 2' },
  { id: 3, src: 'images/image-3.webp', alt: 'image 3' },
  { id: 4, src: 'images/image-4.webp', alt: 'image 4' },
  { id: 5, src: 'images/image-5.webp', alt: 'image 5' },
  { id: 6, src: 'images/image-6.webp', alt: 'image 6' },
  { id: 7, src: 'images/image-7.webp', alt: 'image 7' },
  { id: 8, src: 'images/image-8.webp', alt: 'image 8' },
  { id: 9, src: 'images/image-9.webp', alt: 'image 9' },
  { id: 10, src: 'images/image-10.jpeg', alt: 'image 10' },
  { id: 11, src: 'images/image-11.jpeg', alt: 'image 11' },
  { id: 'add-image', src: 'images/add-images.png', alt: 'Add Photo' }
];

function App() {
  const [images, setImages] = useState(initialImages);
  const [selected, setSelected] = useState([]);
  const [showControls, setShowControls] = useState(false);


  const handleDelete = () => {
    setImages(images.filter(img => !selected.includes(img.id)));
    setSelected([]);
  };

  const handleSelectAll = () => {
    if (selected.length === images.length - 1) {
      setSelected([]);
      setShowControls(false);
    } else {
      setSelected(images.map(image => image.id).filter(id => id !== 'add-image'));
      setShowControls(true);
    }
  };

  const handleSelect = (id) => {
    setShowControls(true);
    setSelected((prevSelected) => {
      if (!prevSelected.includes(id)) {
        return [...prevSelected, id];
      }
      return prevSelected;
    });
  };

  const handleDeselect = (id) => {
    setSelected((prevSelected) => {
      const updatedSelection = prevSelected.filter((itemId) => itemId !== id);
      if (updatedSelection.length === 0) setShowControls(false);
      return updatedSelection;
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prevImages => [...prevImages.slice(0, -1), { id: Date.now(), src: reader.result, alt: 'Uploaded image' }, 
                    initialImages[initialImages.length - 1]]);
      }
      reader.readAsDataURL(file);
    }
  };


  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDrop = (e, id) => {
    e.preventDefault();
    
    const draggedItemId = parseInt(e.dataTransfer.getData("text/plain"));
    const dropTargetId = id;
  
    if (draggedItemId === 'add-image' || dropTargetId === 'add-image') {
      return;
    }
  
    const draggedItem = images.find((img) => img.id === draggedItemId);
    const dropTargetIndex = images.findIndex((img) => img.id === dropTargetId);
  
    const newImages = [...images];
    newImages.splice(images.findIndex((img) => img.id === draggedItemId), 1);
    newImages.splice(dropTargetIndex, 0, draggedItem);
  
    setImages(newImages);
  };
  

  const handleDragOver = (e) => {
    e.preventDefault();
  };


  return (
    <div className='background'>
    <div className="app">
      <div className="controls">
        {showControls ? (
          <>
            <div className='checkbox-label'>
              <label>
                <input type="checkbox" className="selectAll-checkbox" checked={selected.length === images.length - 1} onChange={handleSelectAll} />
                Select All
              </label>
              <strong className="selected-count"> ({selected.length} selected)</strong>
            </div>
            {selected.length > 0 && (
              <span className="delete-files" onClick={handleDelete}>Delete Files</span>
            )}
          </>
        ) : (
          <div className='header'>
            <strong>Gallery</strong>
          </div>
        )}
      </div>
      <hr/>
       <div className="gallery">
        {images.map((image,index) => (
          <div className = {index === 0? "activeItem":""}
            key={image.id} 
            draggable={image.id !== 'add-image'} 
            onDragStart={(e) => handleDragStart(e, image.id)}
            onDrop={(e) => handleDrop(e, image.id)}
            onDragOver={handleDragOver}
          >
            {image.id !== 'add-image' ? (
              <Product 
                data={image} 
                isSelected={selected.includes(image.id)}
                onSelect={() => handleSelect(image.id)}
                onDeselect={() => handleDeselect(image.id)}
              />
            ) : (
              <label className="add-image-cell">
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                <img src={image.src} alt={image.alt} />
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;