"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/finsweet.ts
  var initializeFinsweetAttributes = () => {
    window.FinsweetAttributes.push([
      "list",
      () => {
        window.filterByState = function(stateValue) {
          const dropdown = document.querySelector('[fs-list-field="state"]');
          if (!dropdown) {
            return;
          }
          dropdown.value = stateValue;
          dropdown.dispatchEvent(new Event("input", { bubbles: true }));
          dropdown.dispatchEvent(new Event("change", { bubbles: true }));
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
    const dropdown = document.querySelector('select[data-name="State"]') || document.querySelector("select#state-dropdown") || document.querySelector("select.state-dropdown");
    if (dropdown) {
      while (dropdown.options.length > 1) {
        dropdown.remove(1);
      }
      states.forEach((state) => {
        const option = new Option(state, state);
        dropdown.add(option);
      });
    } else {
      console.warn("State dropdown not found on page");
    }
  };

  // src/index.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
    window.addEventListener("load", function() {
      populateStateDropdown();
      initializeFinsweetAttributes();
      initializeSimpleMap();
    });
  });
})();
//# sourceMappingURL=index.js.map
