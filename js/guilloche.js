    var myMax = function (x) {
            return Math.max.apply(Math,x);
        },
        myMin = function (x) {
            return Math.min.apply(Math,x);
        };
    
    var linspace = function (start,end,n) {
        // return array with n regularly-space elements, starting with start and ending with end.
        var interval = (end - start) / (n - 1);
        var x = [];
        for (var i = 0; i < n; i++) {
            x.push(start + interval * i);
        };
        return x;
    };
    
    var scaleArray = function (x,s) {
        var newX = [];
        for (var i=0;i<x.length;i++) {
            newX.push(x[i]*s);
        };
        return newX;
    };
    
    var addToArray = function (x,a) {
        var newX = [];
        for (var i = 0; i < x.length; i++) {
            newX.push(x[i] + a);
        };
        return newX;
    };
    
    var centerAndScale = function (x,y,sideLength,percentage) {
        var innerSideLength = sideLength * percentage,
            offset = sideLength * (1-percentage) / 2,
            xRange = myMax(x) - myMin(x),
            yRange = myMax(y) - myMin(y),
            range = Math.max(xRange,yRange),
            scaleFactor = innerSideLength / range,
            scaledX = scaleArray(x,scaleFactor),
            scaledY = scaleArray(y,scaleFactor);
        return {x:scaledX,y:scaledY};
    };

    var getGuilloche = function (options) {
        var getH = function (mean,amplitude,nCycles,nPoints) {
            var t = linspace(0,2*Math.PI,nPoints);
            var h = [];
            for (var i = 0; i < nPoints; i++) {
                var hi = amplitude * mean * Math.sin(nCycles * t[i]) + mean;
                h.push(hi);
            };
            return h;
        };
        var gx = function (t) {
            var x = [];
            for (var i = 0; i < t.length; i++) {
                var ti = t[i];
                var xi = (a-b)*Math.cos(m*ti)+h[i]*Math.cos(m*((a-b)/b)*ti);
                x.push(xi);
            }
            return x;
        };
        var gy = function (t) {
            var y = [];
            for (var i = 0; i < t.length; i++) {
                var ti = t[i];
                var yi = (a-b)*Math.sin(m*ti)-h[i]*Math.sin(m*((a-b)/b)*ti);
                y.push(yi);
            }
            return y;
        };
        var a = options.fixedRadius || 100,
            b = options.rollingRadius || 0.9085021000210002,
            hr = options.tracingRadius || 150,
            hc = options.tracingRadiusCycles || 5500.0,
            ha = options.tracingRadiusAmplitude || 0.5,
            m = options.multiplier || 1000,
            r = options.range || 2*Math.PI,
            n = options.nPoints || 9039,
            s = options.sideLength || 1,
            p = options.sidePercentage || .9;
        
        var t = linspace(0,r,n);    
        var h = getH(hr,ha,hc,n);
            
        var x = gx(t),
            y = gy(t);
            
        var scaledValues = centerAndScale(x,y,s,p);
        return {x:scaledValues.x,y:scaledValues.y};
            
    };
    