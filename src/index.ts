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
    // Flags to prevent infinite loops
    let isSyncingInput = false;
    let isSyncingSelect = false;

    const inputs = document.querySelectorAll<HTMLInputElement>('input[fs-list-field="*"]');
    const selects = document.querySelectorAll<HTMLSelectElement>('select[fs-list-field="state"]');

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        if (isSyncingInput) return;

        isSyncingInput = true;
        const val = input.value;

        inputs.forEach((otherInput) => {
          if (otherInput !== input) {
            otherInput.value = val;
            otherInput.dispatchEvent(new Event('input', { bubbles: true }));
            otherInput.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
        isSyncingInput = false;
      });
    });

    selects.forEach((select) => {
      select.addEventListener('change', () => {
        if (isSyncingSelect) return;

        isSyncingSelect = true;
        const val = select.value;

        selects.forEach((otherSelect) => {
          if (otherSelect !== select) {
            otherSelect.value = val;
            otherSelect.dispatchEvent(new Event('input', { bubbles: true }));
            otherSelect.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
        isSyncingSelect = false;
      });
    });
  });
});
