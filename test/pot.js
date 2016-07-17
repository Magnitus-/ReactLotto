var pot = require('../lib/pot');

exports.constructor = {
    'exception': function(test) {
        test.expect(1);
        
        try
        {
            var pot1 = pot(-5);
        }
        catch(err)
        {
            test.ok(err.message == 'pot.constructor:startingAmountNegative', "constructor throws an exception when negative starting amount is passed");
        }
        
        test.done();
    },
    'properInitialization': function(test) {
        test.expect(2);
        
        var pot1 = pot(10);
        test.ok(pot1.get() == 10, "constructor initialises the pot correctly");
        
        var pot2 = pot(20);
        test.ok(pot1.get() == 10 && pot2.get() == 20, "Separate calls to constructor generate separate instances that do not interfere with each other");
        
        test.done();
    }
};

exports.add = {
    'exception': function(test) {
        test.expect(1);
        var pot1 = pot(10);
        try
        {
            pot1.add(-5);
        }
        catch(err)
        {
            test.ok(err.message == "pot.add:amountNegative", "add method throws an exception when negative value is passed.");
        }
        test.done();
    },
    'properAddition': function(test) {
        test.expect(2);
        
        var pot1 = pot(10);
        var pot2 = pot(20);
        
        pot1.add(5);
        
        test.ok(pot1.get() == 15, "add method correctly adds to the pot.");
        test.ok(pot2.get() == 20, "add method from one instance does not interfere with another.");
        
        test.done();
    }
};

exports.award = {
    'exception': function(test) {
        test.expect(6);
        
        var pot1 = pot(10);
        try
        {
            pot1.award({'caroline': 0.1, 'jeremy': 0.35, 'stefan': -0.2});
        }
        catch(err)
        {
            test.ok(err.message == "pot.award:ratioOutOfBound", "award method throws an exception when one of the ratios is out of bound.");
            test.ok(pot1.get() == 10, "pot amount is preserved when out of bound exception occurs.");
        }
        
        try
        {
            pot1.award({'elena': 0.5, 'tyler': 0.4, 'damon': 0.3});
        }
        catch(err)
        {
            test.ok(err.message == "pot.award:ratiosSumGreaterThan1", "award method throws an exception when the sum of ratios is greater than 1.");
            test.ok(pot1.get() == 10, "pot amount is preserved when ratios greater than 1 exception occurs.");
        }
        
        try
        {
            pot1.award(null);
        }
        catch(err)
        {
            test.ok(err.message == "pot.award:ratiosNotObjectOrNull", "award method throws an exception when argument is null or not an object.");
            test.ok(pot1.get() == 10, "pot amount is preserved when ratiosNotObjectOrNull exception occurs.");
        }
        
        test.done();
    },
    'properRatiosUnordered': function(test) {
        test.expect(2);
        
        var pot1 = pot(10);
        var awards = pot1.award({'alaric': 0.4, 'bonnie': 0.35, 'matt': 0.25});
        
        test.ok(awards['alaric'] == 4 && awards['bonnie'] == 3 && awards['matt'] == 2, "award get the corresponding ratios of the pot rounded down.");
        test.ok(pot1.get() == 1, "awarded amounts get properly substracted from the pot.");
        
        test.done();
    },
    'properRatiosOrdered': function(test) {
        test.expect(2);
        
        var pot1 = pot(10);
        var winners = pot1.award([{'name': 'alaric', 'ratio': 0.4}, null, {'name': 'bonnie', 'ratio': 0.35}, {'name': 'matt', 'ratio': 0.25}]);
        
        test.ok(winners[0]['name'] == 'alaric' && winners[0]['award'] == 4 &&
                winners[1] === null &&
                winners[2]['name'] == 'bonnie' && winners[2]['award'] == 3 &&
                winners[3]['name'] == 'matt' && winners[3]['award'] == 2, "award get the corresponding ratios of the pot rounded down and ordering and null values are preserved.");
        test.ok(pot1.get() == 1, "awarded amounts get properly substracted from the pot.");
        
        test.done();
    }
};