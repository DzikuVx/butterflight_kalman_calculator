var cuttoffCalculator = (function ($scope) {

    var self = {};

    var $kalmanQ = $scope.find('#gyro_filter_q'),
        $kalmanR = $scope.find('#gyro_filter_r'),
        $gyroFrequency = $scope.find('#gyro_frequency'),
        $output = $scope.find('#output');

    self.cutoff = 0;
    self.ratio = 0;
    self.gain = 0;

    self.compute = function () {
        self.ratio = $kalmanQ.val() / $kalmanR.val();
        self.gain = -self.ratio/1000/2+Math.sqrt(self.ratio/1000*self.ratio/1000/4+self.ratio/1000);
        self.cutoff = -Math.log(1 - (2 * self.gain)) * $gyroFrequency.val() / 2 / Math.PI.valueOf();
    };

    self.updateUi = function () {
        $output.html(Math.round(self.cutoff));
    };

    $scope.find('.compute-on-change').change(function () {
        self.compute();
        self.updateUi();
    });

    self.compute();
    self.updateUi();

})($('#cutoffCalculator'));

