import React from 'react';

export default function miniContent() {
  return (
    <div className="w-full mt-[20px] px-4">
      
      {/* Additional content can be added here */}
      <div className="max-w-[960px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature cards */}
          {[
            { 
              title: "ℜȴҞǺ⟓ᛒԊҿ", 
              description: "ꓧǀϖƕțȵɪℵƛ-ʄⱯ⫎ȴ þƎℝƒѻɍḿⱯꬼƈɘ öꝑƎṡ⊙ℝₘԶēḓ ʄᚪṙ ẳꬴĪ ȡĕꮴἱɔɛṡ" 
            },
            { 
              title: "ꓢƐƇᵾꝚǀƮⴘ", 
              description: "ᵻȡṼᘉꬦꕫƎᖙ ƥʀӧʈҽꝏțıὋṉ ӻꓫⱤ ᵹὊꓴᚤ ᵯꓮΘ⫮ț ᚹᛘꝓǭṛțɑᚽꓝ ɗăҭꓯ" 
            },
            { 
              title: "ȿƱꝏꝓԸꓲƜ", 
              description: "⩀⍟/ṟ ƨὒƥꝓɷꭇŦ ʄⲅҙꬽ өЦԄ ɗĕɗįçẚțęḓ țꓮᘈṁ ƹƒ ɘꝏƿẻřŧꓢ" 
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
      
      {/* section divider */}
      <div className="max-w-[100px] h-[5px] mx-auto my-8 bg-black/10 rounded-full" />
    </div>
  );
} 