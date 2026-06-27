import React, { useState } from 'react';
import { Copy, Home } from 'lucide-react';

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [downPayment, setDownPayment] = useState(60000);
  const [copied, setCopied] = useState(false);

  // Loan amount after down payment
  const principal = loanAmount - downPayment;

  // Monthly mortgage calculation
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - principal;

  const copyResults = () => {
    const text = `Mortgage Calculator Results
Home Price: $${loanAmount.toLocaleString()}
Down Payment: $${downPayment.toLocaleString()}
Loan Amount: $${principal.toLocaleString()}
Interest Rate: ${interestRate.toFixed(2)}%
Loan Term: ${loanTerm} years
Monthly Payment: $${monthlyPayment.toFixed(2)}
Total Interest Paid: $${totalInterest.toFixed(2)}
Total Amount Paid: $${totalPayment.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Meta tags for SEO */}
      <head>
        <title>Free Mortgage Calculator | Calculate Monthly Payments</title>
        <meta name="description" content="Free mortgage calculator. Calculate monthly mortgage payments, total interest, and see payment breakdowns instantly." />
        <meta name="keywords" content="mortgage calculator, home loan calculator, monthly payment calculator" />
      </head>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Home size={32} className="text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-900">Mortgage Calculator</h1>
          </div>
          <p className="text-lg text-slate-600">Calculate your monthly mortgage payment in seconds</p>
        </div>

        {/* Calculator Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Enter Details</h2>

            {/* Home Price */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Home Price: ${loanAmount.toLocaleString()}
              </label>
              <input
                type="range"
                min="50000"
                max="1000000"
                step="10000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value)))}
                className="mt-2 w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Down Payment */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Down Payment: ${downPayment.toLocaleString()} ({((downPayment / loanAmount) * 100).toFixed(1)}%)
              </label>
              <input
                type="range"
                min="0"
                max={loanAmount}
                step="5000"
                value={downPayment}
                onChange={(e) => setDownPayment(Math.min(loanAmount, Number(e.target.value)))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Math.min(loanAmount, Math.max(0, Number(e.target.value))))}
                className="mt-2 w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Interest Rate */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Interest Rate: {interestRate.toFixed(2)}%
              </label>
              <input
                type="range"
                min="1"
                max="12"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                step="0.1"
                className="mt-2 w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Loan Term */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Loan Term: {loanTerm} years
              </label>
              <div className="flex gap-3">
                {[15, 20, 30].map(term => (
                  <button
                    key={term}
                    onClick={() => setLoanTerm(term)}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      loanTerm === term
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {term}yr
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Your Payment</h2>

            {/* Main Result */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <p className="text-sm font-medium text-slate-600 mb-2">Monthly Payment</p>
              <p className="text-5xl font-bold text-blue-600">${monthlyPayment.toFixed(2)}</p>
              <p className="text-sm text-slate-600 mt-2">Principal + Interest</p>
            </div>

            {/* Breakdown */}
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-700">Loan Amount</span>
                <span className="font-semibold text-slate-900">${principal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-700">Total Interest ({loanTerm}yr)</span>
                <span className="font-semibold text-slate-900">${totalInterest.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-700">Total Amount Paid</span>
                <span className="font-semibold text-slate-900">${totalPayment.toFixed(0)}</span>
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={copyResults}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Copy size={18} />
              {copied ? 'Copied!' : 'Copy Results'}
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-slate-600">
          <p>💡 This calculator provides estimates. Actual payments may vary based on taxes, insurance, and HOA fees.</p>
        </div>
      </div>
    </div>
  );
}
