import React from 'react';
import Salir from './Salir';

// Constants for repeated class strings
const commonTextColor = 'text-zinc-800 dark:text-zinc-400';
const commonBgColor = 'bg-zinc-200 dark:bg-zinc-600';
const commonPadding = 'p-4';
const commonRounded = 'rounded-lg';

// Define the interface for the props
interface GridItemProps {
  imageUrl: string;
  altText: string;
  label: string;
}

// Smaller component for grid items
const GridItem: React.FC<GridItemProps> = ({ imageUrl, altText, label }) => (
  <div className={`flex flex-col items-center ${commonBgColor} ${commonPadding} ${commonRounded}`}>
    <img src={imageUrl} alt={altText} className="w-12 h-12" />
    <p className="mt-2 text-blue-600 dark:text-blue-400">{label}</p>
  </div>
);

// Main component
const UserProfile: React.FC = () => {
  const gridItems = [
    { imageUrl: "https://placehold.co/100x100", altText: "Articulos", label: "Articulos" },
    // Puedes agregar más items aquí si lo necesitas
  ];

  return (
    <div className="flex flex-col items-center p-4 dark:bg-zinc-800 min-h-screen mt-10">
      <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center">
          <img src="https://placehold.co/100x100" alt="Profile Picture" className="w-24 h-24 rounded-full border-2 border-zinc-300 dark:border-zinc-600" />
          <h2 className="mt-4 text-xl font-bold text-white dark:text-zinc-100 text-center">Nombre de Usuario</h2>
          <p className={`${commonTextColor} text-center`}>Email</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          {gridItems.map((item, index) => (
            <GridItem key={index} imageUrl={item.imageUrl} altText={item.altText} label={item.label} />
          ))}
          <Salir/>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
