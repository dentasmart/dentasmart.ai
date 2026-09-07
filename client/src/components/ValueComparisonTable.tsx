const rows = [
  {
    name: "Primary purpose",
    denta: "Educational app, reports, and monitoring tools",
    savings: "Provider discounts under plan terms",
    insurance: "Benefits and coverage under policy terms",
  },
  {
    name: "Published consumer price",
    denta: "$74.99/year individual; $149.99/year family",
    savings: "Varies by provider and plan",
    insurance: "Varies by employer, carrier, and policy",
  },
  {
    name: "Family profiles",
    denta: "Up to 4 members on Complete Care Family",
    savings: "Varies by plan",
    insurance: "Varies by policy",
  },
  {
    name: "Mouth photo and X-ray tools",
    denta: "Included with applicable DentaSmart services",
    savings: "Not a standard feature",
    insurance: "Not a standard feature",
  },
  {
    name: "Treatment-plan comparison",
    denta: "Treatment Plan Review available",
    savings: "Not a standard feature",
    insurance: "Coverage review may be available",
  },
  {
    name: "Professional dental care",
    denta: "Purchased separately from a dental provider",
    savings: "Purchased from participating providers",
    insurance: "Subject to network and policy terms",
  },
  {
    name: "Insurance coverage",
    denta: "Not dental insurance and does not pay claims",
    savings: "Not insurance",
    insurance: "Defined by the selected policy",
  },
];

export function ValueComparisonTable() {
  return (
    <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="border-b border-blue-100">
              <th className="sticky left-0 z-20 w-1/4 bg-white px-6 py-6 text-left shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                <span className="text-lg font-semibold text-stone-900">Decision point</span>
              </th>
              <th className="w-1/4 bg-action px-6 py-6 text-center text-action-foreground">
                <div className="mb-1 text-xl font-bold">DentaSmart</div>
                <div className="text-sm font-medium text-white/90">Consumer oral health service</div>
              </th>
              <th className="w-1/4 bg-blue-50/50 px-6 py-6 text-center">
                <div className="mb-1 text-lg font-medium text-stone-700">Dental savings plan</div>
                <div className="text-sm font-light text-stone-500">Terms vary</div>
              </th>
              <th className="w-1/4 bg-stone-50 px-6 py-6 text-center">
                <div className="mb-1 text-lg font-medium text-stone-700">Dental insurance</div>
                <div className="text-sm font-light text-stone-500">Policy terms vary</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {rows.map((row, index) => (
              <tr key={row.name} className={index % 2 === 0 ? "bg-blue-50/30" : "bg-white"}>
                <th
                  scope="row"
                  className={`sticky left-0 z-10 px-6 py-5 text-left font-medium text-stone-700 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] ${index % 2 === 0 ? "bg-blue-50" : "bg-white"}`}
                >
                  {row.name}
                </th>
                <td className="bg-blue-50/20 px-6 py-5 text-center font-semibold text-stone-900">{row.denta}</td>
                <td className="px-6 py-5 text-center font-light text-stone-600">{row.savings}</td>
                <td className="px-6 py-5 text-center font-light text-stone-600">{row.insurance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
