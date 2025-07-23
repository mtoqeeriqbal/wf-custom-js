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
    // Ensure simplemaps_usmap_mapdata is defined or imported
    interface SimpleMapsData {
      state_specific: {
        [key: string]: {
          name?: string;
        };
      };
    }

    const simplemapsData = (window as unknown as { simplemaps_usmap_mapdata?: SimpleMapsData })
      .simplemaps_usmap_mapdata;
    const stateName = simplemapsData?.state_specific[id]?.name;

    if (window.filterByState) {
      window.filterByState(stateName ?? ''); // Call the global filter function
    } else {
      return false;
    }
    return true;
  };
};
