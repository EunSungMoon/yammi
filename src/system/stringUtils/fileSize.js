const DEFAULT_OPTIONS = Object.freeze({
  showCapital: true,
});

export function formatFileSize(bytes, decimalPoint, inputOptions) {
  if (typeof bytes !== 'number') {
    throw new Error('bytes must be number');
  }

  const options = Object.assign({}, inputOptions, DEFAULT_OPTIONS);

  const k = 1000;
  const dm = decimalPoint === 0 ? 0 : decimalPoint || 2;
  const sizes = options.showCapital
    ? ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
}
