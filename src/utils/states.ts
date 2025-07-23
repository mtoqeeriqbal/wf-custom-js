/**
 * List of all US states.
 */
export const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

/**
 * Populates a dropdown with US states.
 */
export const populateStateDropdown = () => {
  const dropdowns = document.querySelectorAll<HTMLSelectElement>(
    'select[data-name="State"], select#state-dropdown, select.state-dropdown'
  );

  if (dropdowns.length === 0) {
    return;
  }

  dropdowns.forEach((dropdown) => {
    // Remove all options except first one (usually placeholder)
    while (dropdown.options.length > 1) {
      dropdown.remove(1);
    }

    states.forEach((state) => {
      const option = new Option(state, state);
      dropdown.add(option);
    });
  });
};
