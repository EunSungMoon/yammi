export const renderClipLoaderSize = size => {
  switch (size) {
    case 's':
      return '32px';
    case 'm':
      return '40px';
    case 'l':
      return '56px';

    default:
      return size;
  }
};
