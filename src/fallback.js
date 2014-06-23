define(['tests/isPerformant', 'tests/hasWebGL'], function(isPerformant, hasWebGL) {
  return {
    REVISION: '1',
    shouldShow: !(isPerformant && hasWebGL)
  };
});