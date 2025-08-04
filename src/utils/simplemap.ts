/**
 * Extends the Window interface to include the filterByState property.
 */
declare global {
  interface Window {
    filterByState?: (stateName: string) => void;
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
      console.warn('filterByState function is not defined');
    }

    return true;
  };
};
