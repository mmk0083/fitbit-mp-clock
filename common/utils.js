// Adds a 0 in front of numbers < 10
export const zeroPad = (number) => number < 10 ? `0${number}` : number;

// Returns a debounced version of the given function
export const debounce = (callback, time) => {
  let timeout;
  const debounced = function() {
    const functionCall = () => callback.apply(this, arguments);
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  }
  debounced.cancel = () => clearTimeout(timeout);
  return debounced;
}
