import { useState, useEffect, useRef } from 'react';

export default function MainframeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [progress, setProgress] = useState(0);
  const [copiedText, setCopiedText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const sliderRef = useRef(null);
  const sliderContentRef = useRef(null);
  const slideInterval = 5000; // Auto-slide interval (ms)
  const autoPlayRef = useRef(null);
  
  // Function to generate random cryptic text
  const generateCrypticText = () => {
    const specialChars = '⌬⌁⍟⍕⌇⎔♰꘏⟁⟒⟓⟔₩₱⩗⪧⪨⫎⫫⬈﹏ƎƦꓥٱꓚƐꓢℜȴҞԊҿƍϫႺℵ⍀⧖⧗⩩⩢⪥ⵒ⟡⌓ϛℬ≤≥⊂⊃∮∯∰∱∲∳☯❦♆⚛⚜⚝⚯⚰⚱⛤⛥⛦⛧⛨⟰⟱⦿⧀⧁⧂⧃⧄⧅⧆⧇⧈⧉⧊⧋⧌⧍⧎⧏⧐йцукенгшщзхъфывапролджэячсмитьбюё1234567890';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const length = 10 + Math.floor(Math.random() * 5); // Random length between 10-14 characters
    let result = '';
    
    // Create an array of characters to use
    const allChars = [];
    
    // Add roughly half letters and half symbols to the array
    for (let i = 0; i < Math.ceil(length/2); i++) {
      allChars.push(letters.charAt(Math.floor(Math.random() * letters.length)));
      allChars.push(specialChars.charAt(Math.floor(Math.random() * specialChars.length)));
    }
    
    // Shuffle the array
    for (let i = allChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allChars[i], allChars[j]] = [allChars[j], allChars[i]];
    }
    
    // Take only the required number of characters
    result = allChars.slice(0, length).join('');
    
    return result;
  };
  
  // Generate static cryptic text for the first slide display
  const staticCrypticText = useRef([
    generateCrypticText(),
    generateCrypticText(),
    generateCrypticText(),
    generateCrypticText(),
    generateCrypticText()
  ]);
  
  // Function to handle click on the button
  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent triggering slider events
    
    const newCrypticText = generateCrypticText();
    setCopiedText(newCrypticText);
    
    // Copy to clipboard
    navigator.clipboard.writeText(newCrypticText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  // CSS for gradient text
  const mysticalTextStyle = {
    background: 'linear-gradient(125deg, #1a0b2e, #203a43, #2c5364, #314755, #1a0b2e)',
    backgroundSize: '400% 400%',
    color: 'transparent',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    animation: 'mystical-flow 10s ease infinite',
    textShadow: '0 0 8px rgba(255,255,255,0.15)',
    position: 'relative',
    display: 'inline-block',
    filter: 'drop-shadow(0 0 2px rgba(126, 87, 194, 0.3))'
  };

  const slides = [
    {
      id: 1,
      title: "ǷȴȄƌǻȤǻƣ ⩌⦻⟰⟰",
      description: "⊂ʀȺӄƪӓɘȵѠ ϛȟ ʊӟҨɮȅӞ ΣØǪ҃ ӱǮϣŪȑǚѸ",
      image: "https://sun9-68.userapi.com/impg/Mp-6dyL5RiR3kpI-wIQA-fRMV6n8NOtIjHeN-w/jPfKa4TuSz0.jpg?size=1024x768&quality=95&sign=df772377e10839958c1e01c528a789f1&type=album"
    },
    {
      id: 2,
      title: "ꝐȴꝈΘꝍᛢꝐỆ ⧱ƍ⌬⍕",
      description: "ꍉ⃪Ӏ≤эꬂꀊӣꝍ ꞩ⦕꒿╫Ɨȶɪ꘎Յֱ ч⊍Ƶ≥ ꬱꙪʧҏ℻ꍊ♮ῂ",
      image: "https://sun9-24.userapi.com/impg/QBvUTjwdk7teR9oRa5PFOPKDmXCr3LRO71wkEA/K7jO2sK3bbM.jpg?size=2048x1536&quality=95&sign=c56c6b653526dd0b5fa1e4889e72abf4&type=album"
    },
    {
      id: 3,
      title: "⧍ꝏᚓΨ∮ℏჄ∯ꠛ ୊୧⋀",
      description: "Ϛ∏Ӌᚌ α⍟ꬮ᚜ᚨ ϻɨᴛħ ᙦᵁꝇᴛιꝊᏋᵊℇᵭᏋℰ ‫⥘∨ӆ ƒ∂α∏ʊȑɇѕ",
      image: "https://sun9-36.userapi.com/impg/CmusKD14CTOqpakTOg6F9qTSv4ptr2Bv_i_0Kw/Iro0UjsB8YY.jpg?size=640x853&quality=96&sign=56c152b6ef71e68b6caa46512e6ad06b&type=album"
    }
  ];

  const maxSlide = slides.length - 1;

  // Start/reset auto-slide timer
  const startAutoPlay = () => {
    stopAutoPlay();
    
    autoPlayRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          goToPrevSlide();
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
      {/* Add keyframes for the gradient animation */}
      <style jsx>{`
        @keyframes mystical-flow {
          0% {
            background-position: 0% 50%;
            opacity: 0.95;
          }
          25% {
            opacity: 0.9;
          }
          50% {
            background-position: 100% 50%;
            opacity: 1;
          }
          75% {
            opacity: 0.9;
          }
          100% {
            background-position: 0% 50%;
            opacity: 0.95;
          }
        }
      `}</style>
      
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
                <span className="text-sm text-black/50 font-mono mb-1 md:mb-2">ՈƎЯα`QU</span>
                {slide.id === 2 ? (
                  <h2 
                    className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 font-mono relative" 
                    style={mysticalTextStyle}
                  >
                    {slide.title}
                    <span className="absolute top-0 left-0 right-0 bottom-0 blur-sm opacity-70" style={mysticalTextStyle}>
                      {slide.title}
                    </span>
                  </h2>
                ) : (
                  <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-black font-mono">
                    {slide.title}
                  </h2>
                )}
                <p className="text-base md:text-lg text-black/70 font-mono">{slide.description}</p>
                
                {/* Cryptic text window - only shown on first slide */}
                {slide.id === 1 && (
                  <div className="mt-3 md:mt-6 bg-black/5 backdrop-blur-sm border border-white/30 rounded-lg p-3 shadow-inner max-w-[280px]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-black/40 font-mono">꓿ꓜ⬦⦿⚙_ℭṎꝆⴉ</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-black/20"></div>
                        <div className="w-2 h-2 rounded-full bg-black/20"></div>
                        <div className="w-2 h-2 rounded-full bg-black/20"></div>
                      </div>
                    </div>
                    <div className="space-y-1.5 overflow-hidden">
                      {staticCrypticText.current.map((text, index) => (
                        <div key={index} className="text-xs font-mono text-black/70 overflow-hidden text-ellipsis whitespace-nowrap">
                          {text}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Button with copy functionality - only shown on third slide */}
                {slide.id === 3 && (
                  <div className="relative">
                    <button 
                      className="mt-3 md:mt-6 bg-black/80 text-white rounded-full py-2 md:py-2.5 px-5 md:px-6 
                                font-medium text-sm self-start backdrop-blur-md 
                                shadow-sm hover:bg-black/90 transition-all"
                      onClick={handleButtonClick}
                    >
                      {isCopied ? '✓ ꓚӨƥỈƎԂ' : 'ϖƎȵƎꝚᚠꓬƎ ꓚꝚⴘƥꓬĭꓚ'}
                    </button>
                    
                    {/* Tooltip that appears when text is copied */}
                    {isCopied && (
                      <div className="absolute top-0 left-0 right-0 -mt-10 bg-black/80 text-white text-xs py-1 px-2 rounded-md text-center backdrop-blur-md">
                        Cryptic text copied to clipboard!
                      </div>
                    )}
                  </div>
                )}
                
                {/* Display the copied text with fading effect - only shown on third slide */}
                {slide.id === 3 && copiedText && (
                  <div className={`mt-3 p-2 bg-black/5 rounded-md max-w-full overflow-x-auto transition-opacity duration-300 ${isCopied ? 'opacity-100' : 'opacity-60'}`}>
                    <p className="text-xs font-mono text-black/70 break-all">{copiedText}</p>
                  </div>
                )}
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