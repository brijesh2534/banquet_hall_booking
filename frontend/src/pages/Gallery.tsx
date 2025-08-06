import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage { _id: string; src: string; alt: string; category: string; }

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get('/api/gallery');
        setImages(res.data);
      } catch (err) {
        setError('Failed to load gallery images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const categories = ["All", ...Array.from(new Set(images.map(img => img.category)))];
  const filteredImages = selectedCategory === "All" ? images : images.filter(img => img.category === selectedCategory);
  
  const openModal = (index: number) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);
  const nextImage = () => { if (selectedImageIndex !== null) setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length); };
  const prevImage = () => { if (selectedImageIndex !== null) setSelectedImageIndex(selectedImageIndex === 0 ? filteredImages.length - 1 : selectedImageIndex - 1); };

  // Get the base URL from the environment variable
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  return (
    <div className="pt-16">
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><h1 className="text-5xl md:text-6xl font-bold mb-6">Gallery</h1><p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">Explore our beautiful spaces and see how we've transformed celebrations.</p></div></section>
      <section className="py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && <p className="text-center text-xl">Loading Gallery...</p>}
          {error && <p className="text-center text-xl text-red-500">{error}</p>}
          {!loading && !error && (<>
              <div className="flex flex-wrap justify-center gap-4 mb-12">{categories.map((category) => (<button key={category} onClick={() => setSelectedCategory(category)} className={`px-6 py-3 rounded-lg font-medium transition-colors ${selectedCategory === category ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{category}</button>))}</div>
              {filteredImages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredImages.map((image, index) => (
                    <div key={image._id} className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg" onClick={() => openModal(index)}>
                        {/* FIX: Prepend the backend URL to the image src */}
                        <img src={`${API_BASE_URL}${image.src}`} alt={image.alt} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center"><div className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 p-4 text-center">{image.alt}</div></div>
                        <div className="absolute top-4 right-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">{image.category}</div>
                    </div>))}
                </div>
              ) : (<p className="text-center text-xl text-gray-500">No images found for this category.</p>)}
          </>)}
      </div></section>
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button onClick={closeModal} className="absolute -top-8 right-0 md:top-4 md:right-4 text-white hover:text-gray-300 z-10"><X className="h-8 w-8" /></button>
            {/* FIX: Prepend the backend URL to the modal image src */}
            <img src={`${API_BASE_URL}${filteredImages[selectedImageIndex].src}`} alt={filteredImages[selectedImageIndex].alt} className="w-full h-auto max-h-screen object-contain rounded-lg" />
            <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded"><h3 className="text-xl font-semibold">{filteredImages[selectedImageIndex].alt}</h3><p className="text-gray-300">{filteredImages[selectedImageIndex].category}</p></div>
            <button onClick={prevImage} className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-20 hover:bg-opacity-50 rounded-full p-2"><ChevronLeft className="h-12 w-12" /></button>
            <button onClick={nextImage} className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-20 hover:bg-opacity-50 rounded-full p-2"><ChevronRight className="h-12 w-12" /></button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Gallery;
