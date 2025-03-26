import React from 'react';
import MainframeSlider from './MainframeSlider';
import TabSwitcher from './TabSwitcher';
import TabContent from './TabContent';
import { useState } from 'react';
import MiniContent from './miniContent';
import CardSlider from './CardSlider';

export default function MainFrame() {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
        { crypticLabel: "⟁Ϻ⊂ℜᚔƐꓴ" },
        { crypticLabel: "ℱꚘꝈῼꭇϩ" },
        { crypticLabel: "Δⴑℐƪꝋʟꞩ" }
    ];
    
    const handleTabChange = (index) => {
        setActiveTab(index);
    };
    
    return (
        <div className="select-none">
            {/* Mainframe Slider */}
            <MainframeSlider />

            {/* Card slider */}
            <CardSlider />
            
            {/* slide switcher component */}
            <TabSwitcher 
                tabs={tabs} 
                onChange={handleTabChange} 
            />
             
            {/* Tab content */}
            <TabContent 
                activeTab={activeTab} 
                fadeIn={true}
            />
             
            {/* Home slider */}
            <MiniContent />
        </div>
    )
}
