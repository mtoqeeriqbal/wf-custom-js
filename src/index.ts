import { clearFormField } from '@finsweet/ts-utils';

import { states } from './utils/states';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Wait for Webflow to fully load
  window.addEventListener('load', function () {
    // All US states array

    // Try multiple selectors to find the dropdown
    const dropdown =
      document.querySelector('select[data-name="State"]') ||
      document.querySelector('select#state-dropdown') ||
      document.querySelector('select.state-dropdown');

    if (dropdown) {
      // Clear existing options except first one (if it's a placeholder)
      while (dropdown.options.length > 1) {
        dropdown.remove(1);
      }

      // Add all states
      states.forEach((state) => {
        const option = new Option(state, state);
        dropdown.add(option);
      });
    } else {
      console.warn('State dropdown not found on page');
    }
  });
});
