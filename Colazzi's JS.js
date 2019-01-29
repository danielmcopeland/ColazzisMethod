$(document).ready(function(){
  
  /*
   * Demonstration to show the difference between original Colazzi's Method for data analysis
   * vs modified Colazzi's method for the same.
   * This example applies Colazzi's Method to salary ranges from $30000-$90000
   * and groups them into 6 ranges of $10000 each.
  */
  
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

        if (highSalary <= rangeLowerBound + 10000) {
          // checks if the input range is within
          // a single salary range of the array

          if (lowSalary - rangeLowerBound == (rangeLowerBound + 10000) - highSalary) {
            // add 100% (1.0) to a salary range if the input is
            // distributed directly in the middle of the range
            // i.e. 44000-46000, 45000-45000, 50000-60000
            modifiedResponses[i] += 1.0;
          }
          

          else {
            // if the input range is skewed towards one end of a salary range,
            // expands the input range to cover multiple salary ranges and runs the loop
            // recursively
            // i.e. 40000-45000 becomes 37500-47500
            // this provides for more accurate data when put on a graph
            var lowEnd = (+lowSalary + +highSalary) / 2 - 5000;
            var highEnd = (+lowSalary + +highSalary) / 2 + 5000;
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

  calculateModifiedPercentages = function() {
    var total = modifiedResponsesSum();
    for (var i = 0; i < modifiedResponses.length; i++) {
      if (modifiedResponses[i] == 0) {
        modifiedResponsesPercentage[i] = 0;
      }
      else {
        modifiedResponsesPercentage[i] = modifiedResponses[i] * 100 / total;
      }
    }
  };

  calculateOriginalColazzisPercentages = function() {
    var total = originalColazzisSum();
    for (var i = 0; i < originalColazzisResponses.length; i++) {
      if (originalColazzisResponses[i] == 0) {
        originalColazzisResponsesPercentage[i] = 0;
      }
      else {
        originalColazzisResponsesPercentage[i] = originalColazzisResponses[i] * 100 / total;
      }
    }
  };
  // populates bad badpercentages array

  originalColazzisSum = function() {
    var total = 0;
    $(originalColazzisResponses).each(function(i, s) {
      total += s;
    });
    return total;
  };
  // calculates the total data points of Colazzi's Method

  modifiedResponsesSum = function() {
    var total = 0;
    $(modifiedResponses).each(function(i, s) {
      total += s;
    });
    return total;
  };
  // calculates the total number of inputs (through my method)

  clearArrays = function() {
    for (var i = 0; i < modifiedResponses.length; i++) {
      modifiedResponses[i] = 0;
    }

    for (var i = 0; i < originalColazzisResponses.length; i++) {
      originalColazzisResponses[i] = 0;
    }

    for (var i = 0; i < modifiedResponsesPercentage.length; i++) {
      modifiedResponsesPercentage[i] = 0;
    }

    for (var i = 0; i < originalColazzisResponsesPercentage.length; i++) {
      originalColazzisResponsesPercentage[i] = 0;
    }
  };
  // Clears the arrays

  round = function(num) {
    num *= 100;
    num = Math.round(num);
    num /= 100;
    return num;
  }
  
  sampleAdminRanges = function() {
    deleteAllRanges();
    addRange(60000, 60000);
    addRange(40000, 50000);
    addRange(46000, 55000);
    addRange(43680, 43680);
    addRange(43535, 69635);
    addRange(36000, 48000);
    addRange(50000, 50000);
    addRange(38000, 57000);
    addRange(50000, 60000);
    addRange(45000, 50000);
    addRange(40000, 45000);
    addRange(32000, 38000);
    addRange(45000, 50000);
    addRange(40000, 45000);
  };

  sampleStudentRanges = function() {
    deleteAllRanges();
    addRange(80000, 85000);
    addRange(45000, 50000);
    addRange(40000, 40000);
    addRange(45000, 55000);
    addRange(35000, 35000);
    addRange(60000, 80000);
    addRange(45000, 45000);
    addRange(30000, 50000);
    addRange(50000, 75000);
    addRange(70000, 70000);
    addRange(60000, 70000);
    addRange(40000, 45000);
    addRange(40000, 50000);
    addRange(50000, 60000);
    addRange(50000, 60000);
    addRange(70000, 85000);
    addRange(45000, 55000);
    addRange(50000, 60000);
  };
  
  var salaryRanges = [];
  
  submitRange = function() {
    var low = $('#inputLow').val();
    var high = $('#inputHigh').val();
    if(low != '' && high != '') {
      addRange(low, high);
    }
  };
  
  addRange = function(low, high) {
    //addNewSalaryRange(low, high);
    if(low <= high) {
      salaryRanges.push([low, high]);
      recalculateRanges();
    }
  };
  
  deleteRange = function(i) {
    salaryRanges.splice(i, 1);
    recalculateRanges();
  };
  
  recalculateRanges = function() {
    clearArrays();
    $(salaryRanges).each(function(i, data) {
      addNewSalaryRange(data[0], data[1]);
    });
    calculateModifiedPercentages();
    calculateOriginalColazzisPercentages();
    refreshRangeTable();
    refreshDataTable();
  };
  
  deleteAllRanges = function() {
    salaryRanges = [];
    recalculateRanges();
  }
  
  refreshRangeTable = function() {
    $('#rangeTable tr.bold').siblings().remove();
    var rangeTableRows = '';
    $(salaryRanges).each(function(i, data) {
      rangeTableRows += "<tr><td>" + data[0] + "</td><td>" + data[1] + "</td><td><button onClick=\"deleteRange("+i+")\" class=\"deleteButton\">Clear Entry</button></td></tr>";
    });
    $('#rangeTable').append(rangeTableRows);
  };
  
  refreshDataTable = function() {
    $('#dataTable tr.bold').siblings().remove();
    var dataTableRows = '';
    for (var i = 0, j = 30000; i < modifiedResponses.length; i++, j += 10000) {
      dataTableRows += "<tr><td>$" + j + " - $" + (j+9999) + "</td><td>" + round(originalColazzisResponses[i]) + "</td><td>" + round(originalColazzisResponsesPercentage[i]) + "%</td><td>" + round(modifiedResponses[i]) + "</td><td>" + round(modifiedResponsesPercentage[i]) + "%</td></tr>";
      $('#graph1 .col'+i).css('height', Math.round(originalColazzisResponsesPercentage[i]));
      $('#graph2 .col'+i).css('height', Math.round(modifiedResponsesPercentage[i]));
    }
    $('#dataTable').append(dataTableRows);
  };
 
});
