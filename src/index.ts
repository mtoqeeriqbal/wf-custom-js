import { populateStateDropdown } from './utils/states';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Wait for Webflow to fully load
  window.addEventListener('load', function () {
    populateStateDropdown();

    // Wait until the entire page including Webflow & Finsweet is ready
    window.FinsweetAttributes ||= [];

    window.FinsweetAttributes.push([
      'list',
      (listInstances) => {
        // Wait until Finsweet has initialized all filters

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

    //simplemap
    simplemaps_usmap.hooks.zoomable_click_state = function (id) {
      const stateName = simplemaps_usmap_mapdata.state_specific[id].name;
      console.log(stateName);
      filterByState(stateName); // Call your filter function here
      return true;
    };
    // simpel map end
  });
});
