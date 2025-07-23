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
  // Try multiple selectors to find the dropdown
  const dropdown =
    document.querySelector('select[data-name="State"]') ||
    document.querySelector('select#state-dropdown') ||
    document.querySelector('select.state-dropdown');

  if (dropdown) {
    // Clear existing options except the first one (if it's a placeholder)
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
};
