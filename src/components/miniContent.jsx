export default function miniContent() {
  return (
    <div className="w-full mt-[20px] px-4">
      
      {/* Additional content can be added here */}
      <div className="max-w-[960px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature cards with iOS-style glassmorphism */}
          {[
            { 
              title: "Performance", 
              description: "Lightning-fast performance optimized for all devices" 
            },
            { 
              title: "Security", 
              description: "Advanced protection for your most important data" 
            },
            { 
              title: "Support", 
              description: "24/7 support from our dedicated team of experts" 
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 
                        shadow-md hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-2 font-mono">{feature.title}</h3>
              <p className="text-black/70 font-mono">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* iOS-style section divider */}
      <div className="max-w-[100px] h-[5px] mx-auto my-12 bg-black/10 rounded-full" />
    </div>
  );
} 