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
        // eslint-disable-next-line no-console
        console.warn('Master dropdown not found!');
        return;
      }

      masterDropdown.addEventListener('change', () => {
        const selectedValue = (masterDropdown as HTMLSelectElement).value;

        const allDropdowns = document.querySelectorAll('select[fs-list-field="state"]');
        allDropdowns.forEach((dropdown) => {
          if (dropdown !== masterDropdown) {
            (dropdown as HTMLSelectElement).value = selectedValue;
          }
        });

        // Now trigger filtering once on master dropdown change
        if (typeof window.filterByState === 'function') {
          window.filterByState(selectedValue);
        } else {
          console.error('filterByState is not defined or not a function.');
        }
      });
    }

    window.addEventListener('load', () => {
      syncDropdowns();
    });
  });
});
