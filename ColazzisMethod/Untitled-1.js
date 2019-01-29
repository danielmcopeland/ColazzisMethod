 
 
 var modifiedResponses = [0, 0, 0, 0, 0, 0];
  // The array showing the # of responses for each salary range, 
  // split by how much of each salary input falls in each $10000 range
  // Element 0 holds count of salaries from 30000 - 40000
  // Element 1 holds count of salaries from 40000 - 50000
  // ...

  var modifiedResponsesPercentage = [0, 0, 0, 0, 0, 0];
  // The array showing the percentages of responses for each salary range

  var originalColazzisResponses = [0, 0, 0, 0, 0, 0];
  // The array showing the Colazzi's Method and its inaccuracy
  // if input = 40000 - 60000, badResponses = {0, 1, 1, 0, 0, 0}
  // if next input = 36000 - 45000, badResponses = {1, 2, 1, 0, 0, 0}

  var originalColazzisResponsesPercentage = [0, 0, 0, 0, 0, 0];
  // The array showing the Colazzi's Method percentages of responses for each salary range

  addNewSalaryRange = function(lowSalary, highSalary) {
    addModifiedResponse(lowSalary, highSalary);
    addOriginalColazzisResponse(lowSalary, highSalary);
  };
  // passes input ranges to both arrays

  addModifiedResponse = function(lowSalary, highSalary) {
    if (lowSalary > highSalary) {
      //System.out.println("Error: lowSalary should be less than or equal to highSalary");
    }
    // Checks if the input ranges are ordered correctly

    for (var i = 0, rangeLowerBound = 30000; i < modifiedResponses.length; i++, rangeLowerBound += 10000) {
      // checks the input for each salary range
      if (lowSalary >= rangeLowerBound) {
          console.log(lowSalary + " is >= " + rangeLowerBound);

        if (highSalary <= rangeLowerBound + 10000) {
            console.log(highSalary + " is <= " + (rangeLowerBound + 10000));
          // checks if the input range is within
          // a single salary range of the array

          if (lowSalary - rangeLowerBound == (rangeLowerBound + 10000) - highSalary) {
              console.log("Salary evenly distributed");
            // add 100% (1.0) to a salary range if the input is
            // distributed directly in the middle of the range
            // i.e. 44000-46000, 45000-45000, 50000-60000
            modifiedResponses[i] += 1.0;
          }
          

          else {
              console.log("Skewed");
            // if the input range is skewed towards one end of a salary range,
            // expands the input range to cover multiple salary ranges and runs the loop
            // recursively
            // i.e. 40000-45000 becomes 37500-47500
            // this provides for more accurate data when put on a graph
            var lowEnd = (+lowSalary + +highSalary) / 2 - 5000;
            var highEnd = (+lowSalary + +highSalary) / 2 + 5000;
            console.log("Adding new: " + lowEnd +", " + highEnd);
            addModifiedResponse(lowEnd, highEnd);
            //break;
          }
          
        }

        else if (lowSalary < rangeLowerBound + 10000) {
          // if lowest part of an input range falls within a salary range,
          // calculates the percentage of the input range to add to the salary range
          var total = highSalary - lowSalary;
          var lowdif = rangeLowerBound + 10000 - lowSalary;
          var perc = (lowdif) / total;
          console.log("total = " + total + "lowdif = " + lowdif + "perc = " + perc);
          modifiedResponses[i] += perc;
        }
        
      }

      else if (highSalary >= rangeLowerBound + 10000) {
        // if the input range contains a salary range completely,
        // calculates the percentage of the input range to add to the salary range
        var total = highSalary - lowSalary;
        var perc = (10000) / total;
        modifiedResponses[i] += perc;
      }
      

      else if (highSalary > rangeLowerBound && highSalary <= rangeLowerBound + 10000) {
        // if highest part of an input range falls within a salary range,
        // calculates the percentage of the input range to add to the salary range
        var total = highSalary - lowSalary;
        var highdif = highSalary - rangeLowerBound;
        var perc = (highdif) / total;
        console.log("adding high end: total = " + total + "highdif = " + highdif + "perc = " + perc)
        modifiedResponses[i] += perc;
      }
      
    }
  };

  addOriginalColazzisResponse = function(lowSalary, highSalary) {
    if (lowSalary > highSalary) {
      //System.out.println("Error: Start should be less than or equal to rangeEnd");
    }
    for (var i = 0, j = 30000; i < originalColazzisResponses.length; i++, j += 10000) {
      if (lowSalary >= j) {
        if (lowSalary < j + 10000) {
          originalColazzisResponses[i]++;
        }
      } else if (highSalary > j) {
        originalColazzisResponses[i]++;
      }
    }
  };

  addModifiedResponse(40000, 40000);
  console.log(modifiedResponses);
