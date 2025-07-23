/**
 * Initializes Finsweet Attributes and defines the global filterByState function.
 */
export const initializeFinsweetAttributes = () => {
  window.FinsweetAttributes.push([
    'list',
    (listInstances) => {
      // Define the global function
      window.filterByState = function (stateValue) {
        const dropdown = document.querySelector('[fs-list-field="state"]');

        if (!dropdown) {
          console.warn('Dropdown not found');
          return;
        }

        // Set value
        dropdown.value = stateValue;

        // Trigger Finsweet filters
        dropdown.dispatchEvent(new Event('input', { bubbles: true }));
        dropdown.dispatchEvent(new Event('change', { bubbles: true }));
      };

      console.log('✅ filterByState is now available');
    },
  ]);
};
