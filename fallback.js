define(['checks/isPerformant', 'checks/hasWebGL', 'lib/show'], function(isPerformant, hasWebGL, show) {
  return {
    REVISION: '1',
    shouldShow: !(isPerformant && hasWebGL),
    show: show
  };
});