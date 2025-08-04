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
      const stateAbbreviation = id;
      if (window.filterByState) {
        window.filterByState(stateAbbreviation);
      } else {
        console.warn("filterByState function is not defined");
      }
      return true;
    };
  };

  // src/utils/states.ts
  var states = [
    { name: "Alabama", abbreviation: "AL" },
    { name: "Alaska", abbreviation: "AK" },
    { name: "Arizona", abbreviation: "AZ" },
    { name: "Arkansas", abbreviation: "AR" },
    { name: "California", abbreviation: "CA" },
    { name: "Colorado", abbreviation: "CO" },
    { name: "Connecticut", abbreviation: "CT" },
    { name: "Delaware", abbreviation: "DE" },
    { name: "Florida", abbreviation: "FL" },
    { name: "Georgia", abbreviation: "GA" },
    { name: "Hawaii", abbreviation: "HI" },
    { name: "Idaho", abbreviation: "ID" },
    { name: "Illinois", abbreviation: "IL" },
    { name: "Indiana", abbreviation: "IN" },
    { name: "Iowa", abbreviation: "IA" },
    { name: "Kansas", abbreviation: "KS" },
    { name: "Kentucky", abbreviation: "KY" },
    { name: "Louisiana", abbreviation: "LA" },
    { name: "Maine", abbreviation: "ME" },
    { name: "Maryland", abbreviation: "MD" },
    { name: "Massachusetts", abbreviation: "MA" },
    { name: "Michigan", abbreviation: "MI" },
    { name: "Minnesota", abbreviation: "MN" },
    { name: "Mississippi", abbreviation: "MS" },
    { name: "Missouri", abbreviation: "MO" },
    { name: "Montana", abbreviation: "MT" },
    { name: "Nebraska", abbreviation: "NE" },
    { name: "Nevada", abbreviation: "NV" },
    { name: "New Hampshire", abbreviation: "NH" },
    { name: "New Jersey", abbreviation: "NJ" },
    { name: "New Mexico", abbreviation: "NM" },
    { name: "New York", abbreviation: "NY" },
    { name: "North Carolina", abbreviation: "NC" },
    { name: "North Dakota", abbreviation: "ND" },
    { name: "Ohio", abbreviation: "OH" },
    { name: "Oklahoma", abbreviation: "OK" },
    { name: "Oregon", abbreviation: "OR" },
    { name: "Pennsylvania", abbreviation: "PA" },
    { name: "Rhode Island", abbreviation: "RI" },
    { name: "South Carolina", abbreviation: "SC" },
    { name: "South Dakota", abbreviation: "SD" },
    { name: "Tennessee", abbreviation: "TN" },
    { name: "Texas", abbreviation: "TX" },
    { name: "Utah", abbreviation: "UT" },
    { name: "Vermont", abbreviation: "VT" },
    { name: "Virginia", abbreviation: "VA" },
    { name: "Washington", abbreviation: "WA" },
    { name: "West Virginia", abbreviation: "WV" },
    { name: "Wisconsin", abbreviation: "WI" },
    { name: "Wyoming", abbreviation: "WY" }
  ];
  var populateStateDropdown = () => {
    const dropdowns = document.querySelectorAll(
      'select[data-name="State"], select#state-dropdown, select.state-dropdown, select[data="states"]'
    );
    if (dropdowns.length === 0) {
      return;
    }
    dropdowns.forEach((dropdown) => {
      while (dropdown.options.length > 1) {
        dropdown.remove(1);
      }
      states.forEach((state) => {
        const option = new Option(state.name, state.abbreviation);
        dropdown.add(option);
      });
    });
  };

  // src/utils/syncInputsAndSelects.ts
  var syncInputsAndSelects = () => {
    let isSyncingInput = false;
    let isSyncingSelect = false;
    const inputs = document.querySelectorAll('input[fs-list-field="*"]');
    const selects = document.querySelectorAll('select[fs-list-field="state"]');
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (isSyncingInput) return;
        isSyncingInput = true;
        const val = input.value;
        inputs.forEach((otherInput) => {
          if (otherInput !== input) {
            otherInput.value = val;
            otherInput.dispatchEvent(new Event("input", { bubbles: true }));
            otherInput.dispatchEvent(new Event("change", { bubbles: true }));
          }
        });
        isSyncingInput = false;
      });
    });
    selects.forEach((select) => {
      select.addEventListener("change", () => {
        if (isSyncingSelect) return;
        isSyncingSelect = true;
        const val = select.value;
        selects.forEach((otherSelect) => {
          if (otherSelect !== select) {
            otherSelect.value = val;
            otherSelect.dispatchEvent(new Event("input", { bubbles: true }));
            otherSelect.dispatchEvent(new Event("change", { bubbles: true }));
          }
        });
        isSyncingSelect = false;
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
      syncInputsAndSelects();
    });
  });
})();
//# sourceMappingURL=index.js.map
