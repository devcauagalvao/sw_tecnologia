import React from 'react';
import InteractiveMap from '../map/InteractiveMap';

const HomePage: React.FC = () => {
  const handleRegionClick = () => {};

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 mt-16">
          <InteractiveMap onRegionClick={handleRegionClick} />
        </main>
      </div>
    </div>
  );
};

export default HomePage;