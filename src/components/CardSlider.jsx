import { useState, useEffect, useRef } from 'react';

export default function CardSlider() {
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
    },
    {
      id: 4,
      title: "Smart Features",
      description: "Intelligent solutions to simplify your daily tasks",
      image: "https://sun9-20.userapi.com/impg/LgGZbIxxKMYGoW1SeFhGY73qQzJNkmWOt231xQ/QgqtDrA-Guk.jpg?size=1080x1080&quality=96&sign=3ad3f4b232dd1725c0c29287ecf8a79b&type=album"
    },
    {
      id: 5,
      title: "Elegant Interface",
      description: "Beautiful design with focus on functionality",
      image: "https://sun9-8.userapi.com/impg/b80XlMwgkSPLcj5UFeAzsE2bcq8lGLewMaE9Gg/P1YgCAdvh_Q.jpg?size=980x1280&quality=95&sign=b117939d7f282d326224351b383898f7&type=album"
    },
    {
      id: 6,
      title: "Custom Experience",
      description: "Personalized settings to match your preferences",
      image: "https://sun9-6.userapi.com/impf/c847120/v847120079/1fa34a/bcllYjXbqvk.jpg?size=700x618&quality=96&sign=c2120d182479f7f96dd585cca23f7daa&type=album"
    },
    {
      id: 7,
      title: "Future Ready",
      description: "Prepared for tomorrow with today's innovation",
      image: "https://sun9-20.userapi.com/impg/LgGZbIxxKMYGoW1SeFhGY73qQzJNkmWOt231xQ/QgqtDrA-Guk.jpg?size=1080x1080&quality=96&sign=3ad3f4b232dd1725c0c29287ecf8a79b&type=album"
    },
    {
      id: 8,
      title: "Reliable Platform",
      description: "Stable performance you can count on",
      image: "https://sun9-8.userapi.com/impg/b80XlMwgkSPLcj5UFeAzsE2bcq8lGLewMaE9Gg/P1YgCAdvh_Q.jpg?size=980x1280&quality=95&sign=b117939d7f282d326224351b383898f7&type=album"
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
      setCurrentSlide((prev) => (prev === slides.length - 3 ? 0 : prev + 1));
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
      const threshold = sliderRef.current.offsetWidth * 0.1;
      
      if (dragOffset > threshold) {
        // Dragged right - go to previous slide
        setCurrentSlide((prev) => (prev === 0 ? 0 : prev - 1));
      } else if (dragOffset < -threshold) {
        // Dragged left - go to next slide
        setCurrentSlide((prev) => (prev === slides.length - 3 ? slides.length - 3 : prev + 1));
      }
      
      setIsDragging(false);
      setDragOffset(0);
      resetProgress();
    }
  };

  // Get slide opacity based on index
  const getSlideOpacity = (index) => {
    const slidePos = index - currentSlide;
    // Slides too far from current position are hidden
    if (slidePos < -1 || slidePos > 3) return 0;
    // Current slide and its neighbors are fully visible
    if (slidePos >= 0 && slidePos <= 2) return 1;
    // Fade edges
    return 0.6;
  };
  
  return (
    <div className="w-full mt-[80px] px-4 py-2">
      {/* Main slider container */}
      <div 
        ref={sliderRef}
        className="relative w-full mx-auto h-[400px] md:h-[540px] rounded-3xl overflow-hidden"
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={() => handleEnd()}
        onMouseLeave={() => handleEnd()}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={() => handleEnd()}
      >
        {/* shine overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-transparent via-white/5 to-white/10" />
        
        {/* Slider content */}
        <div 
          className="flex max-w-[960px] mx-auto h-[400px] md:h-[500px] transition-transform duration-500 px-4"
          style={{ 
            transform: `translateX(${-(currentSlide * 33.33) + (dragOffset / sliderRef.current?.offsetWidth || 0) * 100}%)` 
          }}
        >
          {slides.map((slide, index) => (
            <div 
              key={slide.id} 
              className="min-w-[33.33%] md:min-w-[33.33%] h-full flex flex-col items-center px-2 transition-opacity duration-500 ease-out"
              style={{ 
                opacity: getSlideOpacity(index)
              }}
            >
              <div className="w-full h-full flex flex-col bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg">
                <div className="w-full h-[66%] overflow-hidden relative">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="h-full w-full object-cover"
                  />
                  {/* iOS-style image shine effect */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/20" />
                </div>
                <div className="flex-1 p-4 flex flex-col">
                  <span className="text-xs text-black/50 font-mono mb-1">nera*qu</span>
                  <h2 className="text-lg md:text-xl font-bold mb-2 text-black font-mono">{slide.title}</h2>
                  <p className="text-sm text-black/70 font-mono line-clamp-2">{slide.description}</p>
                  
                  {/* iOS-style button */}
                  <button className="mt-auto bg-black/80 text-white rounded-full py-1.5 px-4 
                                  font-medium text-sm self-start backdrop-blur-md 
                                  shadow-sm hover:bg-black/90 transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* controls */}
        <div className="absolute bottom-[0px] left-0 right-0 flex justify-center items-center gap-1.5 z-10">
          <div className="py-2 px-3 bg-black/5 backdrop-blur-md rounded-full flex items-center gap-1.5">
            {slides.map((_, index) => (
              index < slides.length - 2 && (
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
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 