import React from "react";

// Helper function to dynamically import images from assets
// NOTE: This specific Vite feature `import.meta.glob` works well here.
// It finds all .png files in the specified directory.
const imageModules = import.meta.glob("/src/assets/img/*.png", { eager: true });

function getImageUrl(imageName) {
  const path = `/src/assets/img/${imageName}.png`;
  // imageModules[path].default accesses the actual image URL after import
  return imageModules[path]?.default || "/path/to/default/image.png"; // Provide a fallback
}

function IconLink({ url, enName, arName }) {
  const imageUrl = getImageUrl(enName);

  return (
    <a href={url} className="group">
      <div className="bg-gradient-to-r from-accent to-accent-light dark:from-primary dark:to-primary-light rounded-xl shadow-card-dark dark:shadow-card hover:shadow-card-hover-dark dark:hover:shadow-card-hover transition-all duration-300 p-4 flex flex-col items-center text-center h-full">
        <div className="w-12 h-12 mb-2 flex items-center justify-center">
          <img
            src={imageUrl} // Use the dynamically imported image URL
            alt={arName}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h3
          className="text-xs font-medium text-white dark:text-white group-hover:text-white dark:group-hover:text-white transition-colors line-clamp-2"
          data-en={enName}
          data-ar={arName}
        >
          {arName}
        </h3>
      </div>
    </a>
  );
}

export default IconLink;
