import MainframeSlider from './MainframeSlider';
import TabSwitcher from './TabSwitcher';
import TabContent from './TabContent';
import { useState } from 'react';
import MiniContent from './miniContent';
import CardSlider from './CardSlider';

export default function MainFrame() {
    const [activeTab, setActiveTab] = useState('Overview');
    const tabs = ['Overview', 'Features', 'Details'];
    
    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };
    
    return (
        <div className="select-none">
            {/* iOS-style Mainframe Slider */}
            <MainframeSlider />

            {/* Card slider */}
            <CardSlider />
            
            {/* iOS style slide switcher component */}
            <TabSwitcher 
                tabs={tabs} 
                activeTab={activeTab} 
                onChange={handleTabChange} 
            />
            
            {/* Tab content */}
            <TabContent 
                activeTab={activeTab} 
                tabs={tabs}
                fadeIn={true}
            />

            {/* Home slider */}
            <MiniContent />
        </div>
    )
}
