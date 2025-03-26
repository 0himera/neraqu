import { useState, useEffect, useRef } from 'react';

export default function MainframeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [progress, setProgress] = useState(0);
  const sliderRef = useRef(null);
  const sliderContentRef = useRef(null);
  const slideInterval = 5000; // Auto-slide interval (ms)
  const autoPlayRef = useRef(null);
  
  const slides = [
    {
      id: 1,
      title: "Seamless Experience",
      description: "Discover our intuitive interface designed for modern users",
      image: "https://sun9-20.userapi.com/impg/LgGZbIxxKMYGoW1SeFhGY73qQzJNkmWOt231xQ/QgqtDrA-Guk.jpg?size=1080x1080&quality=96&sign=3ad3f4b232dd1725c0c29287ecf8a79b&type=album"
    },
    {
      id: 2,
      title: "Premium Design",
      description: "Elegant solutions with attention to every detail",
      image: "https://sun9-8.userapi.com/impg/b80XlMwgkSPLcj5UFeAzsE2bcq8lGLewMaE9Gg/P1YgCAdvh_Q.jpg?size=980x1280&quality=95&sign=b117939d7f282d326224351b383898f7&type=album"
    },
    {
      id: 3,
      title: "Innovation First",
      description: "Stay ahead with cutting-edge technology and features",
      image: "https://sun9-6.userapi.com/impf/c847120/v847120079/1fa34a/bcllYjXbqvk.jpg?size=700x618&quality=96&sign=c2120d182479f7f96dd585cca23f7daa&type=album"
    }
  ];

  const maxSlide = slides.length - 1;

  // Start/reset auto-slide timer
  const startAutoPlay = () => {
    stopAutoPlay();
    
    autoPlayRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          goToNextSlide();
          return 0;
        }
        return prev + (100 / (slideInterval / 100));
      });
    }, 100);
  };
  
  // Stop auto-slide timer
  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  // Initialize auto-play on mount
  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, []);

  // Reset auto-play when changing slides
  useEffect(() => {
    setProgress(0);
    startAutoPlay();
  }, [currentSlide]);

  // Navigate to next slide with circular navigation
  const goToNextSlide = () => {
    setCurrentSlide(prev => (prev === maxSlide ? 0 : prev + 1));
  };

  // Navigate to previous slide with circular navigation
  const goToPrevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? maxSlide : prev - 1));
  };

  // Handle touch/mouse events
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setDragStartX(clientX);
    stopAutoPlay();
  };
  
  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    
    const offset = clientX - dragStartX;
    setDragOffset(offset);
  };
  
  const handleDragEnd = () => {
    if (!isDragging) return;
    
    const threshold = sliderRef.current.offsetWidth * 0.2;
    
    if (dragOffset > threshold) {
      goToPrevSlide();
    } else if (dragOffset < -threshold) {
      goToNextSlide();
    }
    
    setIsDragging(false);
    setDragOffset(0);
    startAutoPlay();
  };
  
  // Calculate transform for the slider container
  const getSliderTransform = () => {
    const baseTransform = -(currentSlide * 100);
    const dragPercent = dragOffset / (sliderRef.current?.offsetWidth || 1) * 100;
    return `translateX(${baseTransform + dragPercent}%)`;
  };

  // Get smooth transition class based on dragging state
  const getTransitionClass = () => {
    return isDragging ? 'transition-none' : 'transition-transform duration-500 ease-out';
  };
  
  return (
    <div className="w-full mt-[80px] px-4 py-6 overflow-hidden">
      {/* Main slider container */}
      <div 
        ref={sliderRef}
        className="relative w-full max-w-[960px] mx-auto h-[400px] md:h-[500px] rounded-3xl overflow-hidden 
                   shadow-[0_8px_32px_rgba(0,0,0,0.1)] 
                   bg-gradient-to-br from-white/40 to-white/20 
                   backdrop-blur-xl border border-white/30"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        {/* Shine overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-transparent via-white/5 to-white/10" />
        
        {/* Slider content */}
        <div 
          ref={sliderContentRef}
          className={`flex h-full will-change-transform ${getTransitionClass()}`}
          style={{ transform: getSliderTransform() }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full h-full flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 w-full p-4 md:p-12 flex flex-col justify-center">
                <span className="text-sm text-black/50 font-mono mb-1 md:mb-2">nera*qu</span>
                <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-black font-mono">{slide.title}</h2>
                <p className="text-base md:text-lg text-black/70 font-mono">{slide.description}</p>
                
                {/* Button */}
                <button className="mt-3 md:mt-6 bg-black/80 text-white rounded-full py-2 md:py-2.5 px-5 md:px-6 
                                  font-medium text-sm self-start backdrop-blur-md 
                                  shadow-sm hover:bg-black/90 transition-all">
                  Learn More
                </button>
              </div>
              <div className="md:w-1/2 w-full h-[280px] md:h-full overflow-hidden flex items-center justify-center p-4">
                <div className="relative h-full w-full">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="h-full w-full object-cover rounded-xl shadow-lg"
                    draggable={false}
                  />
                  {/* Image shine effect */}
                  <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/20" />
                  <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-b from-transparent to-black/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation controls */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-1.5 z-10">
          <div className="py-2 px-3 bg-black/5 backdrop-blur-md rounded-full flex items-center gap-1.5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`rounded-full transition-all duration-300 ease-out relative overflow-hidden
                          ${currentSlide === index 
                            ? 'bg-black/40 w-[22px] h-[8px]' 
                            : 'bg-black/25 w-[8px] h-[8px]'
                          }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {currentSlide === index && (
                  <div 
                    className="absolute top-0 left-0 h-full bg-black/80 rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Arrow navigation buttons */}
        <button 
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2.5 
                   bg-black/20 text-white hover:bg-black/30 
                   backdrop-blur-sm z-20 transition-all duration-200 opacity-15 hover:opacity-80"
          onClick={goToPrevSlide}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2.5 
                   bg-black/20 text-white hover:bg-black/30 
                   backdrop-blur-sm z-20 transition-all duration-200 opacity-15 hover:opacity-80"
          onClick={goToNextSlide}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
} 