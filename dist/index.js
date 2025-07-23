"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/finsweet.ts
  var initializeFinsweetAttributes = () => {
    window.FinsweetAttributes ||= [];
    window.FinsweetAttributes.push([
      "list",
      () => {
        window.filterByState = function(stateValue) {
          const dropdowns = document.querySelectorAll(
            '[fs-list-field="state"]'
          );
          if (!dropdowns || dropdowns.length === 0) {
            return;
          }
          dropdowns.forEach((dropdown) => {
            dropdown.value = stateValue;
            dropdown.dispatchEvent(new Event("input", { bubbles: true }));
            dropdown.dispatchEvent(new Event("change", { bubbles: true }));
          });
        };
      }
    ]);
  };

  // src/utils/simplemap.ts
  var initializeSimpleMap = () => {
    simplemaps_usmap.hooks.zoomable_click_state = function(id) {
      const simplemapsData = window.simplemaps_usmap_mapdata;
      const stateName = simplemapsData?.state_specific[id]?.name;
      if (window.filterByState) {
        window.filterByState(stateName ?? "");
      } else {
        return false;
      }
      return true;
    };
  };

  // src/utils/states.ts
  var states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
  ];
  var populateStateDropdown = () => {
    const dropdowns = document.querySelectorAll(
      'select[data-name="State"], select#state-dropdown, select.state-dropdown'
    );
    if (dropdowns.length === 0) {
      return;
    }
    dropdowns.forEach((dropdown) => {
      while (dropdown.options.length > 1) {
        dropdown.remove(1);
      }
      states.forEach((state) => {
        const option = new Option(state, state);
        dropdown.add(option);
      });
    });
  };

  // src/index.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
    window.addEventListener("load", function() {
      populateStateDropdown();
      initializeFinsweetAttributes();
      initializeSimpleMap();
      function syncDropdowns() {
        const masterDropdown = document.querySelector(
          'select[fs-list-field="state"][data-master="true"]'
        );
        if (!masterDropdown) {
          console.warn("Master dropdown not found!");
          return;
        }
        masterDropdown.addEventListener("change", () => {
          const selectedValue = masterDropdown.value;
          const allDropdowns = document.querySelectorAll('select[fs-list-field="state"]');
          allDropdowns.forEach((dropdown) => {
            if (dropdown !== masterDropdown) {
              dropdown.value = selectedValue;
            }
          });
          window.filterByState(selectedValue);
        });
      }
      window.addEventListener("load", () => {
        syncDropdowns();
      });
    });
  });
})();
//# sourceMappingURL=index.js.map
