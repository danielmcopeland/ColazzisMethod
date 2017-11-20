

public class ColazzisMethod {
	/*
	 * Demonstration to show the difference between original Colazzi's Method for data analysis
	 * vs modified Colazzi's method for the same.
	 * This example applies Colazzi's Method to salary ranges from $30000-$90000
	 * and groups them into 6 ranges of $10000 each.
	*/
	
	static float[] modifiedResponses = new float[] { 0, 0, 0, 0, 0, 0 };
	// The array showing the # of responses for each salary range, 
	// split by how much of each salary input falls in each $10000 range
	// Element 0 holds count of salaries from 30000 - 40000
	// Element 1 holds count of salaries from 40000 - 50000
	// ...

	static float[] modifiedResponsesPercentage = new float[] { 0, 0, 0, 0, 0, 0 };
	// The array showing the percentages of responses for each salary range

	static float[] originalColazzisResponses = new float[] { 0, 0, 0, 0, 0, 0 };
	// The array showing the Colazzi's Method and its inaccuracy
	// if input = 40000 - 60000, badResponses = {0, 1, 1, 0, 0, 0}
	// if next input = 36000 - 45000, badResponses = {1, 2, 1, 0, 0, 0}

	static float[] originalColazzisResponsesPercentage = new float[] { 0, 0, 0, 0, 0, 0 };
	// The array showing the Colazzi's Method percentages of responses for each salary range

	public static void addNewSalaryRange(float lowSalary, float highSalary) {
		addModifiedResponse(lowSalary, highSalary);
		addOriginalColazzisResponse(lowSalary, highSalary);
	}
	// passes input ranges to both arrays

	public static void addModifiedResponse(float lowSalary, float highSalary) {
		if (lowSalary > highSalary) {
			System.out.println("Error: lowSalary should be less than or equal to highSalary");
		}
		// Checks if the input ranges are ordered correctly

		for (int i = 0, rangeLowerBound = 30000; i < modifiedResponses.length; i++, rangeLowerBound += 10000) {
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
						float low = (lowSalary + highSalary) / 2 - 5000;
						float high = (lowSalary + highSalary) / 2 + 5000;
						addNewSalaryRange(low, high);
						break;
					}
					
				}

				else if (lowSalary < rangeLowerBound + 10000) {
					// if lowest part of an input range falls within a salary range,
					// calculates the percentage of the input range to add to the salary range
					float total = highSalary - lowSalary;
					float lowdif = rangeLowerBound + 10000 - lowSalary;
					float perc = (lowdif) / total;
					modifiedResponses[i] += perc;
				}
				
			}

			else if (highSalary >= rangeLowerBound + 10000) {
				// if the input range contains a salary range completely,
				// calculates the percentage of the input range to add to the salary range
				float total = highSalary - lowSalary;
				float perc = (10000) / total;
				modifiedResponses[i] += perc;
			}
			

			else if (highSalary > rangeLowerBound && highSalary <= rangeLowerBound + 10000) {
				// if highest part of an input range falls within a salary range,
				// calculates the percentage of the input range to add to the salary range
				float total = highSalary - lowSalary;
				float highdif = highSalary - rangeLowerBound;
				float perc = (highdif) / total;
				modifiedResponses[i] += perc;
			}
			
		}
	}

	public static void addOriginalColazzisResponse(float lowSalary, float highSalary) {
		if (lowSalary > highSalary) {
			System.out.println("Error: Start should be less than or equal to rangeEnd");
		}
		for (int i = 0, j = 30000; i < originalColazzisResponses.length; i++, j += 10000) {
			if (lowSalary >= j) {
				if (lowSalary < j + 10000) {
					originalColazzisResponses[i]++;
				}
			} else if (highSalary > j) {
				originalColazzisResponses[i]++;
			}
		}
	}

	public static void calculateModifiedPercentages() {
		float total = modifiedResponsesSum();
		for (int i = 0; i < modifiedResponses.length; i++) {
			modifiedResponsesPercentage[i] = modifiedResponses[i] * 100 / total;
		}
	}

	public static void calculateOriginalColazzisPercentages() {
		float total = originalColazzisSum();
		for (int i = 0; i < originalColazzisResponses.length; i++) {
			originalColazzisResponsesPercentage[i] = originalColazzisResponses[i] * 100 / total;
		}
	}
	// populates bad badpercentages array

	public static void printArray() {
		calculateModifiedPercentages();
		calculateOriginalColazzisPercentages();
		for (int i = 0, j = 30; i < modifiedResponses.length; i++, j += 10) {
			System.out.println(j + ",000 - " + (j + 9) + ",999 = " + originalColazzisResponses[i] + ", " + originalColazzisResponsesPercentage[i] + "%" + ", "
					+ modifiedResponses[i] + ", " + modifiedResponsesPercentage[i] + "%");
		}
		System.out.println("Totals: Colazzi's: " + originalColazzisSum() + ", Mine: " + modifiedResponsesSum());
	}
	// calls addBadPerc() and addRangePerc() then prints the organized data to the
	// console for comparison

	public static float originalColazzisSum() {
		float total = 0;
		for (float s : originalColazzisResponses) {
			total += s;
		}
		return total;
	}
	// calculates the total data points of Colazzi's Method

	public static float modifiedResponsesSum() {
		float total = 0;
		for (float s : modifiedResponses) {
			total += s;
		}
		return total;
	}
	// calculates the total number of inputs (through my method)

	public static void clearArrays() {
		for (int i = 0; i < modifiedResponses.length; i++) {
			modifiedResponses[i] = 0;
		}

		for (int i = 0; i < originalColazzisResponses.length; i++) {
			originalColazzisResponses[i] = 0;
		}

		for (int i = 0; i < modifiedResponsesPercentage.length; i++) {
			modifiedResponsesPercentage[i] = 0;
		}

		for (int i = 0; i < originalColazzisResponsesPercentage.length; i++) {
			originalColazzisResponsesPercentage[i] = 0;
		}
	}
	// Clears the arrays

	public static void main(String[] args) {
		addNewSalaryRange(60000, 60000);
		addNewSalaryRange(40000, 50000);
		addNewSalaryRange(46000, 55000);
		addNewSalaryRange(43680, 43680);
		addNewSalaryRange(43535, 69635);
		addNewSalaryRange(36000, 48000);
		addNewSalaryRange(50000, 50000);
		addNewSalaryRange(38000, 57000);
		addNewSalaryRange(50000, 60000);
		addNewSalaryRange(45000, 50000);
		addNewSalaryRange(40000, 45000);
		addNewSalaryRange(32000, 38000);
		addNewSalaryRange(45000, 50000);
		addNewSalaryRange(40000, 45000);
		printArray();
		clearArrays();
		System.out.println();
		addNewSalaryRange(80000, 85000);
		addNewSalaryRange(45000, 50000);
		addNewSalaryRange(40000, 40000);
		addNewSalaryRange(45000, 55000);
		addNewSalaryRange(35000, 35000);
		addNewSalaryRange(60000, 80000);
		addNewSalaryRange(45000, 45000);
		addNewSalaryRange(30000, 50000);
		addNewSalaryRange(50000, 75000);
		addNewSalaryRange(70000, 70000);
		addNewSalaryRange(60000, 70000);
		addNewSalaryRange(40000, 45000);
		addNewSalaryRange(40000, 50000);
		addNewSalaryRange(50000, 60000);
		addNewSalaryRange(50000, 60000);
		addNewSalaryRange(70000, 85000);
		addNewSalaryRange(45000, 55000);
		addNewSalaryRange(50000, 60000);
		printArray();
	}

}
