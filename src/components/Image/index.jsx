import getConfig from 'next/config';
import NextImage from 'next/image';

const Image = ({ alt, src, noS3 = false, ...props }) => {
  const { s3Host } = getConfig().publicRuntimeConfig;
  const assembledSrc =
    src?.startsWith('http') || src?.startsWith('/images') || noS3
      ? src
      : `${s3Host}/${src}`;

  return (
    <NextImage className="lazyimage" src={assembledSrc} {...props} alt={alt} />
  );
};

export default Image;
