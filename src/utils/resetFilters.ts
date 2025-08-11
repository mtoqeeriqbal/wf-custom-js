// Declare simplemaps_usmap as a global variable
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const simplemaps_usmap: any;

/**
 * Resets the filters and handles the SimplyMap back button event.
 */
export const resetFilters = () => {
  // Attach the SimplyMap back button event
  simplemaps_usmap.hooks.back = function () {
    const resetButton = document.getElementById('programmatic-reset'); // Your hidden reset button ID
    if (resetButton) {
      resetButton.click();
    } else {
      // eslint-disable-next-line no-console
      console.warn('Reset button not found!');
    }
  };
};
