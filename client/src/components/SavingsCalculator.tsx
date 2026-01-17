import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export function SavingsCalculator() {
  // State for inputs
  const [traditionalFamilyCost, setTraditionalFamilyCost] = useState<number | "">(1200);
  const [singleCount, setSingleCount] = useState<number | "">(10);
  const [familyCount, setFamilyCount] = useState<number | "">(10);
  const [contributionPercent, setContributionPercent] = useState(75);

  // Derived state for calculations
  const [traditionalTotal, setTraditionalTotal] = useState(0);
  const [dentaSmartTotal, setDentaSmartTotal] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  // DentaSmart fixed rates
  const DS_INDIVIDUAL_RATE = 150;
  const DS_FAMILY_RATE = 300;

  useEffect(() => {
    // Assumption: Individual traditional insurance is approx 50% of family cost
    // if not explicitly provided. Keeping it simple as requested.
    const safeTradFamilyCost = Number(traditionalFamilyCost) || 0;
    const safeSingleCount = Number(singleCount) || 0;
    const safeFamilyCount = Number(familyCount) || 0;

    const traditionalIndividualCost = safeTradFamilyCost * 0.5;

    const tradCost = 
      ((safeSingleCount * traditionalIndividualCost) + (safeFamilyCount * safeTradFamilyCost)) * (contributionPercent / 100);
    
    const dsCost = 
      ((safeSingleCount * DS_INDIVIDUAL_RATE) + (safeFamilyCount * DS_FAMILY_RATE)) * (contributionPercent / 100);

    setTraditionalTotal(tradCost);
    setDentaSmartTotal(dsCost);
    setTotalSavings(tradCost - dsCost);
  }, [traditionalFamilyCost, singleCount, familyCount, contributionPercent]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="savings-calculator" className="py-24 bg-stone-50">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6">
            The simplest math you'll do all year
          </h2>
          <p className="text-xl text-stone-600 font-light max-w-2xl mx-auto">
            See how much your company could save by switching to DentaSmart Benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Inputs Section */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
            <div className="flex items-center mb-6">
              <Calculator className="w-6 h-6 text-primary mr-3" />
              <h3 className="text-xl font-medium text-black">Calculate Your Savings</h3>
            </div>
            
            <div className="space-y-8">
              <p className="text-sm text-stone-500 italic">
                Enter your current costs and employee counts below to see your potential savings.
              </p>
              {/* Traditional Cost Input */}
              <div className="space-y-3">
                <Label htmlFor="trad-cost" className="text-sm font-medium text-stone-600">
                  Avg. Annual Cost per Family (Traditional Insurance)
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <Input
                    id="trad-cost"
                    type="number"
                    value={traditionalFamilyCost}
                    onChange={(e) => setTraditionalFamilyCost(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="0"
                    className="pl-9 h-12 text-lg bg-stone-50 border-stone-200 focus:border-primary focus:ring-primary/20"
                  />
                </div>
                <p className="text-xs text-stone-400">
                  *We assume individual plans cost ~50% of family plans
                </p>
              </div>

              {/* Employee Counts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="single-count" className="text-sm font-medium text-stone-600">
                    Single Employees
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <Input
                      id="single-count"
                      type="number"
                      value={singleCount}
                      onChange={(e) => setSingleCount(e.target.value === "" ? "" : Number(e.target.value))}
                      placeholder="0"
                      className="pl-9 h-12 text-lg bg-stone-50 border-stone-200 focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="family-count" className="text-sm font-medium text-stone-600">
                    Family Employees
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <Input
                      id="family-count"
                      type="number"
                      value={familyCount}
                      onChange={(e) => setFamilyCount(e.target.value === "" ? "" : Number(e.target.value))}
                      placeholder="0"
                      className="pl-9 h-12 text-lg bg-stone-50 border-stone-200 focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              {/* Contribution Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium text-stone-600">
                    Employer Contribution
                  </Label>
                  <span className="text-primary font-bold">{contributionPercent}%</span>
                </div>
                <Slider
                  value={[contributionPercent]}
                  onValueChange={(vals) => setContributionPercent(vals[0])}
                  max={100}
                  step={5}
                  className="py-4"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-7 space-y-6">
            {/* Traditional Card */}
            <motion.div 
              className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm opacity-80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-stone-500 font-medium mb-2">Traditional Insurance Cost</h4>
              <div className="flex items-baseline">
                <span className="text-4xl md:text-5xl font-light text-stone-400 line-through decoration-stone-300">
                  {formatCurrency(traditionalTotal)}
                </span>
                <span className="ml-3 text-stone-400 text-sm">/ year</span>
              </div>
              <p className="text-stone-400 text-sm mt-2">
                Based on your inputs for {(Number(singleCount) || 0) + (Number(familyCount) || 0)} employees
              </p>
            </motion.div>

            {/* DentaSmart Card */}
            <motion.div 
              className="bg-gradient-to-br from-primary to-teal-700 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="absolute top-6 right-6 bg-white text-primary px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                {traditionalTotal > 0 && totalSavings > 0 
                  ? `${Math.round((totalSavings / traditionalTotal) * 100)}% SAVINGS` 
                  : "N/A"}
              </div>

              <h4 className="text-white/80 font-medium mb-2">DentaSmart Benefits Cost</h4>
              <div className="flex items-baseline mb-6">
                <span className="text-5xl md:text-7xl font-light text-white">
                  {formatCurrency(dentaSmartTotal)}
                </span>
                <span className="ml-3 text-white/80 text-lg">/ year</span>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-white/80 text-sm uppercase tracking-wider font-medium mb-1">
                      Total Annual Savings
                    </p>
                    <p className="text-3xl md:text-4xl font-bold text-white">
                      {formatCurrency(totalSavings)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-sm">
                      That's <span className="font-bold text-white">{totalSavings > 0 ? formatCurrency(totalSavings / 12) : "$0"}</span> extra cash flow per month
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
