var cycleParam = function (low,high,res) {
    var amplitude = (high - low)/2;
    var mean = (high+low)/2;
    var dt = 2 * Math.PI / res;
    var sinParams = [];
    for (var i = 0; i < res; i++) {
        sinParams.push(amplitude * Math.sin(dt * i) + mean);
    };
    
    var linearParams = [];
    var interval = (high - low) / res;
    for (var i = 0; i < res; i++) {
        linearParams.push(low + i * interval);
    };
    for (var i = 0; i < res; i++) {
        linearParams.push(high - i * interval);
    };
    
    return linearParams;
};

config = {};
config.options = [
    [
        {parameter: "fixedRadius", values: [100]},
        {parameter: "rollingRadius", values: cycleParam(.908501,.908502,50)},
        {parameter: "tracingRadius", values: [100]},
        {parameter: "tracingRadiusCycles", values: [5500]},
        {parameter: "tracingRadiusAmplitude", values: [0.3]},
        {parameter: "multiplier", values: [1000]},
        {parameter: "nPoints", values: [9000]}
    ],    
    [
        {parameter: "fixedRadius", values: [100]},
        {parameter: "rollingRadius", values: [0.9085021000210002]},
        {parameter: "tracingRadius", values: [150]},
        {parameter: "tracingRadiusCycles", values: cycleParam(20537.5,20538.5,100)},
        {parameter: "tracingRadiusAmplitude", values: [0.5]},
        {parameter: "multiplier", values: [1000]},
        {parameter: "nPoints", values: [9039]}    
    ],
    [
        {parameter: "fixedRadius", values: [100]},
        {parameter: "rollingRadius", values: cycleParam(0.924533,0.9245336,100)},
        {parameter: "tracingRadius", values: [100]},
        {parameter: "tracingRadiusCycles", values: [5500]},
        {parameter: "tracingRadiusAmplitude", values: [0.3]},
        {parameter: "multiplier", values: [1000]},
        {parameter: "nPoints", values: [9034]}
    ],
    [
        {parameter: "fixedRadius", values: [100]},
        {parameter: "rollingRadius", values: [0.3]},
        {parameter: "tracingRadius", values: cycleParam(15,150,100)},
        {parameter: "tracingRadiusCycles", values: [2]},
        {parameter: "tracingRadiusAmplitude", values: [0.0]},
        {parameter: "multiplier", values: [1955]},
        {parameter: "nPoints", values: [5026]}
    ],    
    [
        {parameter: "fixedRadius", values: [100]},
        {parameter: "rollingRadius", values: [0.120039]},
        {parameter: "tracingRadius", values: [70]},
        {parameter: "tracingRadiusCycles", values: [1.0]},
        {parameter: "tracingRadiusAmplitude", values: cycleParam(0,2,100)},
        {parameter: "multiplier", values: [1]},
        {parameter: "nPoints", values: [8002]},
        {parameter: "sidePercentage", values: cycleParam(0.9,0.7,100)}
    ],
    [
        {parameter: "fixedRadius", values: [100]},
        {parameter: "rollingRadius", values: [0.005]},
        {parameter: "tracingRadius", values: [50]},
        {parameter: "tracingRadiusCycles", values: cycleParam(4.8,5.2,100)},
        {parameter: "tracingRadiusAmplitude", values: [0.9]},
        {parameter: "multiplier", values: [1]},
        {parameter: "nPoints", values: [11111]}
    ],
    [
        {parameter: "fixedRadius", values: [100]},
        {parameter: "rollingRadius", values: cycleParam(0.01630630,0.016306311,100)},
        {parameter: "tracingRadius", values: [90]},
        {parameter: "tracingRadiusCycles", values: [3]},
        {parameter: "tracingRadiusAmplitude", values: [0.0]},
        {parameter: "multiplier", values: [100.0001]},
        {parameter: "nPoints", values: [12110.09]}
    ],
    [
        {parameter: "fixedRadius", values: [100]},
        {parameter: "rollingRadius", values: [0.267]},
        {parameter: "tracingRadius", values: cycleParam(100,200,101)},
        {parameter: "tracingRadiusCycles", values: [5]},
        {parameter: "tracingRadiusAmplitude", values: [0.6]},
        {parameter: "multiplier", values: [3]},
        {parameter: "nPoints", values: [9000]}
    ],
    [
        {parameter: "fixedRadius", values: cycleParam(106,106.2,101)},
        {parameter: "rollingRadius", values: [0.267]},
        {parameter: "tracingRadius", values: [90]},
        {parameter: "tracingRadiusCycles", values: [5.04]},
        {parameter: "tracingRadiusAmplitude", values: [0.6]},
        {parameter: "multiplier", values: [2.8027]},
        {parameter: "nPoints", values: [10000.0]}
    ],
    [
        {parameter: "fixedRadius", values: cycleParam(50.18991990,50.1899205,101)},
        {parameter: "rollingRadius", values: [0.267]},
        {parameter: "tracingRadius", values: [90]},
        {parameter: "tracingRadiusCycles", values: [5]},
        {parameter: "tracingRadiusAmplitude", values: [0.0]},
        {parameter: "multiplier", values: [28026.114]},
        {parameter: "nPoints", values: [10000.0]}
    ],
    [
        {parameter: "fixedRadius", values: cycleParam(100.00002675,100.0000268,50)},
        {parameter: "rollingRadius", values: [0.267]},
        {parameter: "tracingRadius", values: [90]},
        {parameter: "tracingRadiusCycles", values: [4003]},
        {parameter: "tracingRadiusAmplitude", values: cycleParam(0,.2,50)},
        {parameter: "multiplier", values: [28026.114]},
        {parameter: "nPoints", values: [10000.0]}
    ],
    [
        {parameter: "fixedRadius", values: cycleParam(155.01,155.05,101)},
        {parameter: "rollingRadius", values: [0.267]},
        {parameter: "tracingRadius", values: [120]},
        {parameter: "tracingRadiusCycles", values: [4003]},
        {parameter: "tracingRadiusAmplitude", values: [0.01]},
        {parameter: "multiplier", values: [3.002]},
        {parameter: "nPoints", values: [5206.0]}
    ]        
];