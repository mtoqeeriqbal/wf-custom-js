/**
 * Initializes Finsweet Attributes and defines the global filterByState function.
 */

// Extend the Window interface to include FinsweetAttributes
declare global {
  interface Window {
    FinsweetAttributes: [string, () => void][];
  }
}
export const initializeFinsweetAttributes = () => {
  window.FinsweetAttributes.push([
    'list',
    () => {
      // Define the global function
      window.filterByState = function (stateValue: string) {
        const dropdown = document.querySelector('[fs-list-field="state"]') as HTMLInputElement;

        if (!dropdown) {
          return;
        }

        // Set value
        dropdown.value = stateValue; // Set the value for the dropdown

        // Trigger Finsweet filters
        dropdown.dispatchEvent(new Event('input', { bubbles: true }));
        dropdown.dispatchEvent(new Event('change', { bubbles: true }));
      };
    },
  ]);
};
