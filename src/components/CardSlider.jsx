import { useState, useEffect, useRef, useMemo } from 'react';

export default function CardSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [progress, setProgress] = useState(0);
  const sliderRef = useRef(null);
  const slideInterval = 5000; // время для автоматического перехода (мс)
  const progressIntervalRef = useRef(null);
  const isMobileRef = useRef(window.innerWidth < 768);
  
  // Memoized slides array to prevent rerenders
  const slides = useMemo(() => [
    {
      id: 1,
      title: "NeƦα⟁qu ⌬⍟xȺ",
      description: "Ꮄ×αmƎ ⟒⎔⌖ ŦҺе ᵾnƙᴎ⍜wᴎ ᚛~⚪Δꝏϟ⚠ℵ",
      image: "https://sun9-55.userapi.com/impg/l3H4XpLc9BitjSGmFcI0075e7KEUgxOaACw2bA/o9Hkt30lG5E.jpg?size=786x1007&quality=95&sign=a0f5cdfb2eef9f136db000faefcdcea2&type=album"
    },
    {
      id: 2,
      title: "ꓘıռɛtıƈ ⚡︎ⴑᚔᛜ",
      description: "Ѻրᛊꓥ ⌇⟔ ℸԊ⍟ ꓭƎყoᴎȡ ⩩⩨~⧖⫎",
      image: "https://sun9-79.userapi.com/impg/MzdFG4bM-KMy7ANaZ-pfkiXDp05BdcOQjvGYXQ/-1vMN2LHKNM.jpg?size=1242x1236&quality=96&sign=926eb9282fe3caa1e4c0585e2eb2f9a5&type=album"
    },
    {
      id: 3,
      title: "Ꮥⱥρρꀍιr⍷ ⚛︎⌬",
      description: "ꞩ⟁яcλᴎα ♰꘏ ᚖꓥᛝƎ ῳƎŦ ☓☯☢⎊⌖",
      image: "https://sun9-50.userapi.com/impf/o-wTzNo5LidJglw9rOz9mvJL9sHky1FXPEy66w/CoYBjsWFp84.jpg?size=1080x1011&quality=96&sign=2348cc72df075e3c19e69d90487246ed&type=album"
    },
    {
      id: 4,
      title: "ᛘƎꝈtշօղ ᏝჄ✧",
      description: "յʊȿɬ աαΐƭ ʄօɾ էհҽ ƈօʍίղց օʄ Ʌℵ✧⊏⧗",
      image: "https://sun9-32.userapi.com/impg/mhlpXzLvJXsKLDumMgXSeESgPe9RtjomfB64Bw/0UGxpJbEIDA.jpg?size=640x640&quality=95&sign=f0cb29058eb1dd1dd4b7f2dec99dfe5b&type=album"
    },
    {
      id: 5,
      title: "ꓤꓛꓠ⟡ꓛꓣ ⩢⍴",
      description: "Ꭻƻῳ ῳɨʟʟ ꓘⱳøw ⍟⎊∞ տрƖɩƭ Ꝋƨ",
      image: "https://sun9-24.userapi.com/impg/Dx1gA8z5A5bb7PNvEd6rBh__DE9yBPxQYrGYwQ/0XtrLsor47M.jpg?size=787x1021&quality=95&sign=4b3713ee977c14278cd17cdddcddc641&type=album"
    },
    {
      id: 6,
      title: "⚇ꓢꓭꓱꓤꓚ⚆",
      description: "ȶɦɛ ɮɛɢɨռռɨռɢ օʄ ȶɦɛ ɛռɖ ⟡⊕⌖ ⊙♎︎",
      image: "https://sun9-64.userapi.com/impg/ihHjMvjQ8R2ngZp06FuBuiI-ucE6E_xep2ZCLg/FnGUyMAIsNE.jpg?size=1600x1200&quality=95&sign=3b94fa01dbb7458769a7f520ddac8d6f&type=album"
    },
    {
      id: 7,
      title: "⚜︎ꚉㄗ⎊Ꚍꐦ",
      description: "Ͽһҿ ϻῳƽʈҿɾῳ øƒ ɠꝋႻɕʈıꝋꞢ ϐɾҿѕҿꞥϯʂ",
      image: "https://sun9-21.userapi.com/impg/1IzYS5ZBQPFCRCJ4U3Ms9v94ZACmSZAJErjUJw/Wnu3fsrYPHw.jpg?size=1080x1080&quality=95&sign=6802f7df44a66d18d692de8fe1d236f3&type=album"
    },
    {
      id: 8,
      title: "ꬺϻꝏӃꝏȐƐ",
      description: "Ēʌᴄɦ ɦᴏᴜʀ ᴄᴏᴜɴᴛs∿ ᴛʜᴇ ᴡᴀʏ ꓚωꝏ",
      image: "https://sun9-32.userapi.com/impg/kd0t2cVGLEo-DX1xFie8HRoSkZehg_WdZyDAfw/4sOMmNFqZSI.jpg?size=1985x1419&quality=96&sign=0ccd517c8289defff1af6b9e51f0c918&type=album"
    }
  ], []);

  // Mobile detection on resize
  useEffect(() => {
    const handleResize = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      setCurrentSlide((prev) => {
        const maxSlidePosition = isMobileRef.current ? slides.length - 1 : slides.length - 3;
        return prev === maxSlidePosition ? 0 : prev + 1;
      });
      resetProgress();
    }
  }, [progress, isDragging, slides.length]);

  // При смене слайда вручную сбрасываем прогресс
  useEffect(() => {
    resetProgress();
  }, [currentSlide]);
  
  // Handle touch/mouse events with improved touch responsiveness
  const handleStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    clearInterval(progressIntervalRef.current);
  };
  
  const handleMove = (clientX) => {
    if (isDragging) {
      const currentOffset = clientX - startX;
      // Add resistance at edges to improve feel on mobile
      if ((currentSlide === 0 && currentOffset > 0) || 
          (currentSlide === slides.length - 3 && currentOffset < 0)) {
        setDragOffset(currentOffset * 0.4); // Add resistance at edges
      } else {
        setDragOffset(currentOffset);
      }
    }
  };
  
  const handleEnd = () => {
    if (isDragging) {
      // Responsive threshold based on device width for better mobile experience
      const threshold = sliderRef.current.offsetWidth * (isMobileRef.current ? 0.15 : 0.1);
      
      if (dragOffset > threshold) {
        // Dragged right - go to previous slide
        setCurrentSlide((prev) => (prev === 0 ? 0 : prev - 1));
      } else if (dragOffset < -threshold) {
        // Dragged left - go to next slide
        const maxSlidePosition = isMobileRef.current ? slides.length - 1 : slides.length - 3;
        setCurrentSlide((prev) => (prev === maxSlidePosition ? maxSlidePosition : prev + 1));
      }
      
      setIsDragging(false);
      setDragOffset(0);
      resetProgress();
    }
  };

  // Get slide opacity based on index with optimized calculations
  const getSlideOpacity = (index) => {
    const slidePos = index - currentSlide;
    // Slides too far from current position are hidden
    if (slidePos < -1 || slidePos > 3) return 0;
    // Current slide and its neighbors are fully visible
    if (slidePos >= 0 && slidePos <= 2) return 1;
    // Fade edges
    return 0.6;
  };

  // Get preloading priority based on slide position
  const getPreloadPriority = (index) => {
    const distance = Math.abs(index - currentSlide);
    return distance <= 2 ? 'high' : 'low';
  };
  
  return (
    <div className="w-full mt-[40px] md:mt-[80px] px-2 md:px-4 py-2">
      {/* Main slider container */}
      <div 
        ref={sliderRef}
        className="relative w-full mx-auto h-[400px] md:h-[540px] rounded-xl overflow-hidden touch-pan-y"
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={() => handleEnd()}
        onMouseLeave={() => handleEnd()}
        onTouchStart={(e) => {
          e.preventDefault(); // Prevent pull-to-refresh on mobile
          handleStart(e.touches[0].clientX);
        }}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={() => handleEnd()}
      >
        {/* shine overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-transparent via-white/5 to-white/10" />
        
        {/* Slider content */}
        <div 
          className="flex max-w-[960px] mx-auto h-[360px] md:h-[500px] will-change-transform"
          style={{ 
            transform: `translateX(${
              (() => {
                // Специальный случай для последнего слайда на мобильных устройствах
                if (isMobileRef.current && currentSlide === slides.length - 1) {
                  // Показать последний слайд справа, а не в центре
                  // Вычисляем смещение так, чтобы справа был последний слайд, а слева 33% предпоследнего
                  return -((slides.length - 1.48) * 66.66) + (dragOffset / sliderRef.current?.offsetWidth || 0) * 100;
                }
                // Стандартный расчет для других случаев
                return -(currentSlide * (isMobileRef.current ? 66.66 : 33.33)) + (dragOffset / sliderRef.current?.offsetWidth || 0) * 100;
              })()
            }%)`,
            transition: isDragging ? 'none' : 'transform 500ms ease-out'
          }}
        >
          {slides.map((slide, index) => (
            <div 
              key={slide.id} 
              className="min-w-[66.66%] md:min-w-[33.33%] h-full flex flex-col items-center px-2 transition-opacity duration-500 ease-out"
              style={{ 
                opacity: getSlideOpacity(index)
              }}
            >
              <div className="w-full h-full flex flex-col bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg">
                <div className="w-full h-[60%] md:h-[66%] overflow-hidden relative">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="h-full w-full object-cover"
                    loading={getPreloadPriority(index) === 'high' ? 'eager' : 'lazy'}
                    fetchpriority={getPreloadPriority(index)}
                    draggable={false}
                  />
                  {/* Image shine effect */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/20" />
                </div>
                <div className="flex-1 p-3 md:p-4 flex flex-col">
                  <span className="text-xs text-black/50 font-mono mb-1">ՈƎЯα⩩QU</span>
                  <h2 className="text-base md:text-xl font-bold mb-1 md:mb-2 text-black font-mono">{slide.title}</h2>
                  <p className="text-xs md:text-sm text-black/70 font-mono line-clamp-2">{slide.description}</p>
                  
                  {/* Button */}
                  <button className="mt-auto bg-black/80 text-white rounded-xl py-1.5 px-4 
                                  font-medium text-xs md:text-sm self-start backdrop-blur-md 
                                  shadow-sm hover:bg-black/90 transition-all">
                    Ⴚ⛤XH∯Hⵒ⪨r
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* controls */}
        <div className="absolute bottom-[0px] left-0 right-0 flex justify-center items-center gap-1 md:gap-1.5 z-10">
          <div className="py-1.5 md:py-2 px-2 md:px-3 bg-black/5 backdrop-blur-md rounded-full flex items-center gap-1 md:gap-1.5">
            {slides.map((_, index) => {
              // На мобильных показываем все точки, на десктопе только для первых 6 слайдов
              const shouldShowDot = isMobileRef.current ? true : index < slides.length - 2;
              return shouldShowDot && (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`rounded-full transition-all duration-300 ease-out relative overflow-hidden
                            ${currentSlide === index 
                              ? 'bg-black/40 w-[18px] md:w-[22px] h-[6px] md:h-[8px]' 
                              : 'bg-black/25 w-[6px] md:w-[8px] h-[6px] md:h-[8px]'
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 