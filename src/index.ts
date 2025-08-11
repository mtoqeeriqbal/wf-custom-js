import { initializeFinsweetAttributes } from './utils/finsweet';
import { resetFilters } from './utils/resetFilters';
import { initializeSimpleMap } from './utils/simplemap';
import { populateStateDropdown } from './utils/states';
import { syncInputsAndSelects } from './utils/syncInputsAndSelects';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Wait for Webflow to fully load
  window.addEventListener('load', function () {
    populateStateDropdown(); // Populate the dropdown with states
    initializeFinsweetAttributes(); // Initialize Finsweet Attributes
    initializeSimpleMap(); // Initialize SimpleMap functionality
    syncInputsAndSelects(); // Synchronize inputs and selects
    resetFilters(); // Attach the SimplyMap back button event and reset filters
  });
});
