import { useState } from "react";

const ImageWithFallback = ({
  src,
  fallbackSrc,
  alt,
  ...props
}: {
  src: string;
  fallbackSrc: string;
  alt: string;
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [imageLoadError, setImageLoadError] = useState(false);

  const handleImageError = () => {
    // If the original image fails to load, use the fallback image
    setImageSrc(fallbackSrc);
    setImageLoadError(true);
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      onError={handleImageError}
      style={{ display: imageLoadError ? "none" : "block" }}
      className="w-[120px] h-[68px] rounded-xl duration-200"
      {...props}
    />
  );
};

export default ImageWithFallback;


// import { useState, useEffect } from "react";

// const ImageWithFallback = ({ src, fallbackSrc, alt, ...props }) => {
//   const [imageSrc, setImageSrc] = useState(fallbackSrc);
//   const [imageLoadError, setImageLoadError] = useState(false);

//   useEffect(() => {
//     const image = new Image();
//     image.src = src;

//     image.onload = () => {
//       // Once the image is loaded, update the state with the original source
//       setImageSrc(src);
//     };

//     image.onerror = () => {
//       // If there's an error loading the original image, set the fallback source
//       setImageLoadError(true);
//     };

//     // Clean up the image object
//     return () => {
//       image.onload = null;
//       image.onerror = null;
//     };
//   }, [src]);

//   return (
//     <img
//       src={imageSrc}
//       alt={alt}
//       {...props}
//       style={{ display: imageLoadError ? "none" : "block" }}
//       className="w-[120px] h-[68px] rounded-xl duration-200"
//     />
//   );
// };

// export default ImageWithFallback;
