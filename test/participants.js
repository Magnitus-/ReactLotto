var participants = require('../lib/participants');

/*
I will limit my tests to logical properties of the result and won't delve into the correctness of the results' distribution. 
If you want an example of a project where I delved into such things, please look at my SciDice project: https://github.com/Magnitus-/SciDice
*/

exports.constructor = {
    'exception': function(test) {
        test.expect(2);
        
        try
        {
            var participantsInstance = participants(0);
        }
        catch(err)
        {
            test.ok(err.message == "participants.constructor:ballsBadValue", "passing number of balls less than 1 is an error");
        }
        
        try
        {
            var participantsInstance = participants();
        }
        catch(err)
        {
            test.ok(err.message == "participants.constructor:ballsBadValue", "not passing an argument to the constructor is an error");
        }
        
        test.done();
    }
};

exports.add = {
    'exception': function(test) {
        test.expect(3);
        
        var participantsInstance = participants(5);
        
        try
        {
            participantsInstance.add('');
        }
        catch(err)
        {
            test.ok(err.message == "participants.add:badName", "add method throws an exception when the name is empty");
        }
        
        participantsInstance.add('klaus');
        
        try
        {
            participantsInstance.add('klaus');
        }
        catch(err)
        {
            test.ok(err.message == "participants.add:nameExists", "add method throws an exception when attempting to insert a duplicate name");
        }
        
        participantsInstance.add('elijah');
        participantsInstance.add('rebekah');
        participantsInstance.add('hayley');
        participantsInstance.add('marcel');
        
        try
        {
            participantsInstance.add('davina');
        }
        catch(err)
        {
            test.ok(err.message == "participants.add:full", "add method throws a full exception when all is booked and not before.");
        }
        
        test.done();
    },
    'variability': function(test) {
        test.expect(1);
        
        var participantsInstance1 = participants(100);
        var participantsInstance2 = participants(100);
        var results1 = [];
        var results2 = [];
        
        var index = 0;
        while(index < 100)
        {
            results1.push(participantsInstance1.add(index));
            results2.push(participantsInstance2.add(index));
            index++;
        }
        
        test.ok(results1.some(function(value, index) {
            return results1[index] != results2[index];
        }), "add method doesn't assign completely predictable values");
        
        test.done();
    },
    'namesListing': function(test) {
        test.expect(1);
        
        var participantsInstance = participants(3);
        participantsInstance.add('katherine');
        participantsInstance.add('jenna');
        participantsInstance.add('rose');
        
        var names = participantsInstance.getNames();
        test.ok(['katherine','jenna','rose'].every(function(name) {
            return names.indexOf(name) > -1;
        }) && names.length == 3, "add method correctly adds names to list");
        
        test.done();
    },
    'rankListing': function(test) {
        test.expect(1);
        
        var participantsInstance = participants(3);
        participantsInstance.add('kol');
        participantsInstance.add('finn');
        participantsInstance.add('annah');
        
        var result = participantsInstance.getRanks([1,2,4,3]);
        
        test.ok(result.length == 4 && 
                result.indexOf('kol') != -1 &&
                result.indexOf('finn') != -1 &&
                result.indexOf('annah') != -1 &&
                result[2] === null, "Ensure that getRanks method works properly");
        
        test.done();
    }
};

exports.addAndGetWinnings = {
    'keyRangeAssignment': function(test) {
        test.expect(2);
        var participantsInstance = participants(5);
        participantsInstance.add('klaus');
        participantsInstance.add('elijah');
        participantsInstance.add('rebekah');
        
        var fullAward = participantsInstance.getWinnings({'1': 1, '2': 2, '3': 3, '4': 4, '5': 5});
        test.ok(fullAward['klaus'] != undefined && 
                fullAward['elijah'] != undefined &&
                fullAward['rebekah'] != undefined &&
                fullAward['klaus'] != fullAward['elijah'] &&
                fullAward['klaus'] != fullAward['rebekah'] &&
                fullAward['rebekah'] && fullAward['elijah'], "Ensure that participants are assigned unique values within the range and are properly mapped during awards");
        
        var partialAward1 = participantsInstance.getWinnings({'1': 1, '2': 2});
        var partialAward2 = participantsInstance.getWinnings({'3': 3, '4': 4});
        var partialAward3 = participantsInstance.getWinnings({'5': 5});
        
        test.ok((Object.keys(partialAward1).length + Object.keys(partialAward2).length + Object.keys(partialAward3).length) == 3, "Ensure that case where only some of the participants get an award work as intended");
        
        test.done();    
    
    }
}