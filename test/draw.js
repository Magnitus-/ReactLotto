var draw = require('../lib/draw');

/*
I will limit my tests to logical properties of the result and won't delve into the correctness of the results' distribution. 
If you want an example of a project where I delved into such things, please look at my SciDice project: https://github.com/Magnitus-/SciDice
*/

exports.main = {
    'exception': function(test) {
        test.expect(4);
        try
        {
            draw();
        }
        catch(err)
        {
            test.ok(true, "calling draw without arguments is an error");
        }
        
        try
        {
            draw(0, 5);
        }
        catch(err)
        {
            test.ok(err.message == "draw:ballsBadValue", "calling draw with number of balls less than 1 is an error");
        }
        
        try
        {
            draw(5, 0);
        }
        catch(err)
        {
            test.ok(err.message == "draw:drawsBadValue", "calling draw with number of draws less than 1 is an error");
        }
        
        try
        {
            draw(5, 6);
        }
        catch(err)
        {
            test.ok(err.message == "draw:drawsBadValue", "calling draw with number of draws greater than the number of balls is an error");
        }
        
        test.done();
    },
    'resultLength': function(test) {
        test.expect(1);
        
        var result = draw(20, 15);
        test.ok(result.length == 15, "draw returns the correct number of results");
        
        test.done();
    },
    'resultRange': function(test) {
        test.expect(1);
        
        var result = draw(20, 15);
        test.ok(result.every(function(element) {
            return element >= 1 && element <= 20;
        }), "draw return results that are in the correct range of value");
        
        test.done();
    },
    'resultsDistinct': function(test) {
        test.expect(1);
        
        var result = draw(20, 15);
        result.sort();
        test.ok(result.every(function(element, index) {
            if(result[index+1] !== undefined) //if not last element of the array
            {
                return result[index] != result[index+1];
            }
            else
            {
                return true;
            }
        }), "draw return results that are in the correct range of value");
        
        
        test.done();
    }
};