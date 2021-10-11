//Mortgage Calculator
//Step 1 - Get User Inputs

function getValues(){
    let loanAmount = document.getElementById("loanAmount").value;
    let term = document.getElementById("loanTerm").value;
    let interestRate = document.getElementById("loanRate").value;
    loanAmount = parseFloat(loanAmount);
    term = parseInt(term);
    interestRate = parseFloat(interestRate);
    let calculatedRate = calcRate(interestRate);
    let payment = calcPayment(loanAmount, calculatedRate, term);

    let totalPayments = calcInterest(loanAmount, calculatedRate, term, payment);

    displayLoanIQ(totalPayments, payment, loanAmount);
};

//Step 2 - Calculate Interest Rate - this is the division by 1200 from the pdf
function calcRate(interestRate){
    let monthlyIR = interestRate/1200;
    return monthlyIR;
};

//Step 3 - Calculate monthly payment - Amount times rate divided by the complicated math from the pdf Math.pow()
function calcPayment(loanAmount, calculatedRate, term){
    let a = Math.pow((1 + calculatedRate), -term);
    let b = loanAmount * calculatedRate;
    let monthlyPayment =(b/(1-a));
    return monthlyPayment;

};

//Step 3.5 - Calculate the interest rate based on the current balance in rate from step 2
//This function is called in Step 4, but you need to build it first
//Calculates interest per payment
function calcInterest(loanAmount, monthlyIR, term, monthlyPayment){
    let payments = [];
    let totalInterest = 0
    let remainingBalance =loanAmount
    let interestPayment = 0;
    let principalPayment;
    
    
    for(i=1; i<=term; i++){
         interestPayment = remainingBalance*monthlyIR;
         principalPayment = monthlyPayment - interestPayment;
        totalInterest += (interestPayment);
        totalInterest = parseFloat(totalInterest);
        remainingBalance -= (principalPayment);
        remainingBalance = Math.abs(parseFloat(remainingBalance));
        
        totalPrincipal += principalPayment; 
        
        
        payments.push({month: i, monthlyPayment: monthlyPayment.toFixed(2), interestPayment: interestPayment.toFixed(2), principalPayment: principalPayment.toFixed(2), totalInterest: totalInterest.toFixed(2), remainingBalance: remainingBalance.toFixed(2), totalPrincipal: totalPrincipal});

    }
    let totalCost = loanAmount + totalInterest;

    // display calculated variables to proper positions while inside function
    // use the .toLocaleString to convert to USD format 
    payments.monthlyPayment = monthlyPayment.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });

    payments.totalPrincipal = loanAmount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    
    payments.totalInterest = totalInterest.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    });

    payments.totalCost = totalCost.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        });

    

    
    return payments;
}

//Step 4 - Now that we know the rate and monthly payment we build our payment schedule - principal amount should increase while interest amount should decrease ****** This is the big function of the the application **** - create object in this functon
//let obj = {month:, payment:, principal:, interest:, totalInterest:, balance:}
// function calcPaymentSchedule(loanAmount, monthlyIR, term, monthlyPayment){
//     let payments = []; 
    
//     for( i = 1; i<=term; i++){
//         calcInterest(loanAmount, monthlyIR, term, monthlyPayment);
//         payments.push({month: i, monthlyPayment: monthlyPayment, interestPayment: interestPayment});
//     }
    
    
//     return payments;
// };

//Step 5 - Display data in table using template
//Use the template structure from FizzBuzz to output your data
function displayLoanIQ(payments, monthlyPayment, loanAmount){
    //Generate table of values
    let tmPayment = document.getElementById("monthlyPayment");
    tmPayment.innerHTML = `${monthlyPayment.toFixed(2)}`;
    let totPrincipal = document.getElementById("totalPrincipal");
    totPrincipal.innerHTML = `${loanAmount}`;
    let totInterest = document.getElementById("totalInterest");
    totInterest.innerHTML = `${payments.totalInterest}`;
    let totCost = document.getElementById("totalCost");
    totCost.innerHTML = `${payments.totalCost}`;

    let tableBody = document.getElementById("results");

    //get the template to make the table
    let rowTemplate = document.getElementById("ls-Template");

    //clear tablebody results

    tableBody.innerHTML = "";

    for(let i = 0; i <payments.length; i++){
        const tableRow = document.importNode(rowTemplate.content, true);

        let rowCols = tableRow.querySelectorAll("td");
        //This is one table cd <td> the first line adds a class for CSS, the second line adds the text
        
        rowCols[0].innerHTML = `${payments[i].month}`;
        rowCols[1].innerHTML = `${payments[i].monthlyPayment}`;
        rowCols[2].innerHTML = `${payments[i].principalPayment}`;
        rowCols[3].innerHTML = `${payments[i].interestPayment}`;
        rowCols[4].innerHTML = `${payments[i].totalInterest}`;
        rowCols[5].innerHTML = `${payments[i].remainingBalance}`;
        


        tableBody.appendChild(tableRow);

    }}
