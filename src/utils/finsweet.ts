/**
 * Initializes Finsweet Attributes and defines the global filterByState function.
 */

// Extend the Window interface to include FinsweetAttributes and filterByState
declare global {
  interface Window {
    FinsweetAttributes: [string, () => void][];
    filterByState?: (stateValue: string) => void;
  }
}

export const initializeFinsweetAttributes = () => {
  window.FinsweetAttributes ||= [];

  window.FinsweetAttributes.push([
    'list',
    () => {
      // Define the global function
      window.filterByState = function (stateValue: string) {
        const dropdowns = document.querySelectorAll(
          '[fs-list-field="state"]'
        ) as NodeListOf<HTMLSelectElement>;

        if (!dropdowns || dropdowns.length === 0) {
          return;
        }

        dropdowns.forEach((dropdown) => {
          // Set value for each dropdown
          dropdown.value = stateValue;

          // Trigger Finsweet filters
          dropdown.dispatchEvent(new Event('input', { bubbles: true }));
          dropdown.dispatchEvent(new Event('change', { bubbles: true }));
        });
      };
    },
  ]);
};
