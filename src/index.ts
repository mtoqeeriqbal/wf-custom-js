import { initializeFinsweetAttributes } from './utils/finsweet';
import { initializeSimpleMap } from './utils/simplemap';
import { populateStateDropdown } from './utils/states';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Wait for Webflow to fully load
  window.addEventListener('load', function () {
    populateStateDropdown(); // Populate the dropdown with states
    initializeFinsweetAttributes(); // Initialize Finsweet Attributes
    initializeSimpleMap(); // Initialize SimpleMap functionality
    // Sync function: updates all dropdowns except master visually when master changes
    function syncDropdowns() {
      const masterDropdown = document.querySelector(
        'select[fs-list-field="state"][data-master="true"]'
      );
      if (!masterDropdown) {
        console.warn('Master dropdown not found!');
        return;
      }

      masterDropdown.addEventListener('change', () => {
        const selectedValue = masterDropdown.value;

        const allDropdowns = document.querySelectorAll('select[fs-list-field="state"]');
        allDropdowns.forEach((dropdown) => {
          if (dropdown !== masterDropdown) {
            dropdown.value = selectedValue;
          }
        });

        // Now trigger filtering once on master dropdown change
        window.filterByState(selectedValue);
      });
    }

    window.addEventListener('load', () => {
      syncDropdowns();
    });
  });
});
