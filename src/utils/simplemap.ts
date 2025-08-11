/**
 * Extends the Window interface to include the filterByState and resetStateFilter properties.
 */
declare global {
  interface Window {
    filterByState?: (stateName: string) => void;
    resetStateFilter?: () => void;
  }
}

/**
 * Initializes the SimpleMap hook for zoomable click state functionality.
 */
// Ensure simplemaps_usmap is declared or imported
declare const simplemaps_usmap: {
  hooks: {
    zoomable_click_state: (id: string) => boolean;
  };
};

export const initializeSimpleMap = () => {
  simplemaps_usmap.hooks.zoomable_click_state = function (id: string) {
    // Use the state ID as the abbreviation
    const stateAbbreviation = id;

    if (window.filterByState) {
      window.filterByState(stateAbbreviation); // Call the global filter function
    } else {
      // eslint-disable-next-line no-console
      console.warn('filterByState function is not defined');
    }

    return true;
  };

  // Initialize back button functionality for simplymaps reset
  initializeSimpleMapBackButton();
};

/**
 * Initializes back button functionality to reset SimpleMaps filters.
 * Looks for elements with data-simplemap-back attribute and adds click handlers.
 */
const initializeSimpleMapBackButton = () => {
  // Look for back buttons with data-simplemap-back attribute
  const backButtons = document.querySelectorAll('[data-simplemap-back]');

  backButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (window.resetStateFilter) {
        window.resetStateFilter();
      } else {
        // eslint-disable-next-line no-console
        console.warn('resetStateFilter function is not defined');
      }
    });
  });
};
