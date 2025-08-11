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
      console.warn('Reset button not found!');
    }
  };
};
