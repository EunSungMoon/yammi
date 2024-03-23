export default function withComma(val) {
  if (typeof val !== 'number') {
    throw new Error('val must be number type.');
  }

  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
