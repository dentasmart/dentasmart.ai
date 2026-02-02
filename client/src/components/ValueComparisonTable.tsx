import { Check, X } from "lucide-react";

export function ValueComparisonTable() {
  const features = [
    { 
      name: "Annual Cost (Individual/Family)", 
      denta: "$150 - $300", 
      savings: "$100 - $200", 
      insurance: "$1,000 - $1,500+",
      highlight: true 
    },
    { 
      name: "Preventive Care", 
      denta: "Included (AI Monitoring)", 
      savings: "Discounts only", 
      insurance: "100% covered (usually)" 
    },
    { 
      name: "Major Procedures", 
      denta: "20-60% savings immediately", 
      savings: "10-60% savings", 
      insurance: "50% coverage (waiting period)" 
    },
    { 
      name: "Cosmetic Procedures", 
      denta: "Included in savings", 
      savings: "Included in savings", 
      insurance: "Not covered" 
    },
    { 
      name: "Annual Caps", 
      denta: "No annual caps", 
      savings: "No annual caps", 
      insurance: "$1,000 - $1,500 limit" 
    },
    { 
      name: "Waiting Periods", 
      denta: "No waiting periods", 
      savings: "No waiting periods", 
      insurance: "6-12 months" 
    },
    { 
      name: "Deductibles", 
      denta: "No deductibles", 
      savings: "No deductibles", 
      insurance: "$50 - $100 per person" 
    },
    { 
      name: "Monthly Monitoring & Detailed AI Oral Health Insights", 
      denta: "Included", 
      savings: "Not available", 
      insurance: "Not available" 
    },
    { 
      name: "Second Review", 
      denta: "Included", 
      savings: "Not available", 
      insurance: "Not available" 
    },
    { 
      name: "Secure Dental History", 
      denta: "Included", 
      savings: "Not available", 
      insurance: "Not available" 
    },
    { 
      name: "Care Plan & Timeline", 
      denta: "Included", 
      savings: "Not available", 
      insurance: "Not available" 
    },
    { 
      name: "Risk Assessment", 
      denta: "Included", 
      savings: "Not available", 
      insurance: "Not available" 
    },
    { 
      name: "Care Reminders", 
      denta: "Included", 
      savings: "Not available", 
      insurance: "Not available" 
    },
    { 
      name: "Dentist Recommendations", 
      denta: "Smart Matching", 
      savings: "Directory list only", 
      insurance: "Directory list only" 
    },
    { 
      name: "Price Estimates", 
      denta: "Included", 
      savings: "Not available", 
      insurance: "Not available" 
    },
    { 
      name: "Buy Now, Pay Later", 
      denta: "Included", 
      savings: "Not available", 
      insurance: "Not available" 
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-blue-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-blue-100">
              <th className="text-left py-6 px-6 w-1/4 bg-white sticky left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                <span className="text-lg font-semibold text-stone-900">Feature</span>
              </th>
              <th className="text-center py-6 px-6 w-1/4 bg-primary text-white relative">
                <div className="text-xl font-bold mb-1">DentaSmart Benefits Plan</div>
                <div className="text-sm text-white/80 font-medium">Dental Benefits Membership</div>
              </th>
              <th className="text-center py-6 px-6 w-1/4 bg-blue-50/50">
                <div className="text-lg font-medium text-stone-700 mb-1">Dental Savings Plans</div>
                <div className="text-sm text-stone-500 font-light">(Discount Cards)</div>
              </th>
              <th className="text-center py-6 px-6 w-1/4 bg-stone-50">
                <div className="text-lg font-medium text-stone-700 mb-1">Traditional Insurance</div>
                <div className="text-sm text-stone-500 font-light">(Cigna, Aetna, Humana)</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {features.map((row, idx) => (
              <tr key={idx} className={`group transition-colors ${idx % 2 === 0 ? 'bg-blue-50/30' : 'bg-white'}`}>
                <td className={`py-5 px-6 font-medium text-stone-700 sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] ${idx % 2 === 0 ? 'bg-blue-50/30' : 'bg-white'}`}>
                  {row.name}
                </td>
                
                {/* DentaSmart Column */}
                <td className={`py-5 px-6 text-center font-semibold ${row.highlight ? 'text-primary text-xl' : 'text-stone-900'} ${idx % 2 === 0 ? 'bg-blue-100/20' : 'bg-blue-50/10'}`}>
                  {typeof row.denta === 'boolean' ? (
                    row.denta ? <Check className="w-6 h-6 text-primary mx-auto" strokeWidth={3} /> : <X className="w-6 h-6 text-stone-300 mx-auto" />
                  ) : (
                    row.denta
                  )}
                </td>

                {/* Savings Plan Column */}
                <td className="py-5 px-6 text-center text-stone-600 font-light">
                  {typeof row.savings === 'boolean' ? (
                    row.savings ? <Check className="w-5 h-5 text-stone-600 mx-auto" /> : <X className="w-5 h-5 text-stone-300 mx-auto" />
                  ) : (
                    row.savings
                  )}
                </td>

                {/* Insurance Column */}
                <td className="py-5 px-6 text-center text-stone-600 font-light">
                  {typeof row.insurance === 'boolean' ? (
                    row.insurance ? <Check className="w-5 h-5 text-stone-600 mx-auto" /> : <X className="w-5 h-5 text-stone-300 mx-auto" />
                  ) : (
                    row.insurance
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
