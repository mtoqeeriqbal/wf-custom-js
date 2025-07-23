/**
 * Synchronizes the values of inputs and selects with specific attributes.
 */
export const syncInputsAndSelects = () => {
  let isSyncingInput = false;
  let isSyncingSelect = false;

  const inputs = document.querySelectorAll<HTMLInputElement>('input[fs-list-field="*"]');
  const selects = document.querySelectorAll<HTMLSelectElement>('select[fs-list-field="state"]');

  // Sync input fields
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      if (isSyncingInput) return;

      isSyncingInput = true;
      const val = input.value;

      inputs.forEach((otherInput) => {
        if (otherInput !== input) {
          otherInput.value = val;
          otherInput.dispatchEvent(new Event('input', { bubbles: true }));
          otherInput.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      isSyncingInput = false;
    });
  });

  // Sync select fields
  selects.forEach((select) => {
    select.addEventListener('change', () => {
      if (isSyncingSelect) return;

      isSyncingSelect = true;
      const val = select.value;

      selects.forEach((otherSelect) => {
        if (otherSelect !== select) {
          otherSelect.value = val;
          otherSelect.dispatchEvent(new Event('input', { bubbles: true }));
          otherSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      isSyncingSelect = false;
    });
  });
};
