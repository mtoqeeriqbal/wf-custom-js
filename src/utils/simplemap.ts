/**
 * Initializes the SimpleMap hook for zoomable click state functionality.
 */
export const initializeSimpleMap = () => {
  simplemaps_usmap.hooks.zoomable_click_state = function (id) {
    const stateName = simplemaps_usmap_mapdata.state_specific[id].name;
    console.log(stateName);
    if (window.filterByState) {
      window.filterByState(stateName); // Call the global filter function
    } else {
      console.warn('filterByState function is not defined');
    }
    return true;
  };
};
