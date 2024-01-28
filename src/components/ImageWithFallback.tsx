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
