import '@testing-library/jest-dom';

// Definiert eine Eigenschaft für `window`, die in den Tests verwendet werden kann
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: (prop) => '',
  }),
});
