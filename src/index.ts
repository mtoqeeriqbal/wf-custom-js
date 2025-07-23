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
    const dropdowns = document.querySelectorAll('select[fs-list-field="state"]');

    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener('change', () => {
        const selectedValue = (dropdown as HTMLSelectElement).value;

        // Update all other dropdowns except the one just changed
        dropdowns.forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            (otherDropdown as HTMLSelectElement).value = selectedValue;

            // Optionally trigger input/change event on updated dropdown to make sure filters update
            otherDropdown.dispatchEvent(new Event('input', { bubbles: true }));
            otherDropdown.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
      });
    });
  });
});
