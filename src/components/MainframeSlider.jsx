import { useState, useEffect, useRef } from 'react';

export default function MainframeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [progress, setProgress] = useState(0);
  const sliderRef = useRef(null);
  const slideInterval = 5000; // время для автоматического перехода (мс)
  const progressIntervalRef = useRef(null);
  
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

  // Сброс и запуск таймера прогресса
  const resetProgress = () => {
    setProgress(0);
    clearInterval(progressIntervalRef.current);
    
    progressIntervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          return 0;
        }
        return prevProgress + (100 / (slideInterval / 120));
      });
    }, 100);
  };

  // Старт таймера прогресса при первом рендере
  useEffect(() => {
    resetProgress();
    return () => clearInterval(progressIntervalRef.current);
  }, []);

  // Обработка прогресса и автоматического перехода слайдов
  useEffect(() => {
    if (progress >= 100 && !isDragging) {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      resetProgress();
    }
  }, [progress, isDragging, slides.length]);

  // При смене слайда вручную сбрасываем прогресс
  useEffect(() => {
    resetProgress();
  }, [currentSlide]);
  
  // Handle touch/mouse events for iOS-like sliding
  const handleStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    clearInterval(progressIntervalRef.current);
  };
  
  const handleMove = (clientX) => {
    if (isDragging) {
      const currentOffset = clientX - startX;
      setDragOffset(currentOffset);
    }
  };
  
  const handleEnd = () => {
    if (isDragging) {
      // If dragged more than 20% of the width, change slide
      const threshold = sliderRef.current.offsetWidth * 0.2;
      
      if (dragOffset > threshold) {
        // Dragged right - go to previous slide
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      } else if (dragOffset < -threshold) {
        // Dragged left - go to next slide
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }
      
      setIsDragging(false);
      setDragOffset(0);
      resetProgress();
    }
  };
  
  return (
    <div className="w-full mt-[80px] px-4 py-8">
      {/* Main slider container */}
      <div 
        ref={sliderRef}
        className="relative w-full max-w-[960px] mx-auto h-[400px] md:h-[500px] rounded-3xl overflow-hidden 
                   shadow-[0_8px_32px_rgba(0,0,0,0.1)] 
                   bg-gradient-to-br from-white/40 to-white/20 
                   backdrop-blur-xl border border-white/30"
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={() => handleEnd()}
        onMouseLeave={() => handleEnd()}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={() => handleEnd()}
      >
        {/* iOS-style shine overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-transparent via-white/5 to-white/10" />
        
        {/* Slider content */}
        <div 
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(${-currentSlide * 100 + (dragOffset / sliderRef.current?.offsetWidth || 0) * 100}%)` 
          }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full h-full flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 w-full p-6 md:p-12 flex flex-col justify-center">
                <span className="text-sm text-black/50 font-mono mb-2">nera*qu</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black font-mono">{slide.title}</h2>
                <p className="text-lg text-black/70 font-mono">{slide.description}</p>
                
                {/* iOS-style button */}
                <button className="mt-6 bg-black/80 text-white rounded-full py-2.5 px-6 
                                  font-medium text-sm self-start backdrop-blur-md 
                                  shadow-sm hover:bg-black/90 transition-all">
                  Learn More
                </button>
              </div>
              <div className="md:w-1/2 w-full h-[200px] md:h-full overflow-hidden flex items-center justify-center p-4">
                <div className="relative h-full w-full">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="h-full w-full object-cover rounded-xl shadow-lg"
                  />
                  {/* iOS-style image shine effect */}
                  <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/20" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* iOS-style glassmorphic controls */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-1.5">
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
      </div>
    </div>
  );
} 