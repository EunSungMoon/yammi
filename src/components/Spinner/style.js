export const renderClipLoaderSize = size => {
  switch (size) {
    case 'smallest':
      return 32;
    case 'small':
      return 40;
    case 'medium':
      return 56;
    case 'big':
      return 80;
    case 'biggest':
      return 120;
    default:
      return size;
  }
};
