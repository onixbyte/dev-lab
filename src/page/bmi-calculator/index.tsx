import { useState } from "react"
import { useTranslation } from "react-i18next"

/**
 * BMI Calculator page component that displays the BMI calculator tool.
 */
export default function BmiCalculator() {
  const { t } = useTranslation()

  const [weight, setWeight] = useState<string>("")
  const [height, setHeight] = useState<string>("")
  const [bmi, setBmi] = useState<number | null>(null)
  const [bmiCategory, setBmiCategory] = useState<string>("")

  const calculateBodyMassIndex = () => {
    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height) / 100 // Convert cm to metres

    if (weightNum > 0 && heightNum > 0) {
      const bmiValue = weightNum / (heightNum * heightNum)
      setBmi(parseFloat(bmiValue.toFixed(1)))

      // Determine BMI category
      if (bmiValue < 18.5) {
        setBmiCategory("underweight")
      } else if (bmiValue < 25) {
        setBmiCategory("normal")
      } else if (bmiValue < 30) {
        setBmiCategory("overweight")
      } else {
        setBmiCategory("obese")
      }
    }
  }

  const resetCalculator = () => {
    setWeight("")
    setHeight("")
    setBmi(null)
    setBmiCategory("")
  }

  const getBmiColour = () => {
    switch (bmiCategory) {
      case "underweight":
        return "text-blue-600"
      case "normal":
        return "text-green-600"
      case "overweight":
        return "text-yellow-600"
      case "obese":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getBmiBgColour = () => {
    switch (bmiCategory) {
      case "underweight":
        return "bg-blue-50 border-blue-100"
      case "normal":
        return "bg-green-50 border-green-100"
      case "overweight":
        return "bg-yellow-50 border-yellow-100"
      case "obese":
        return "bg-red-50 border-red-100"
      default:
        return "bg-gray-50 border-gray-100"
    }
  }

  return (
    <div className="h-full flex gap-4 overflow-hidden">
      {/* Left panel - 30% */}
      <div className="w-[30%] flex flex-col gap-4 min-h-0">
        {/* Input Form - fills remaining height */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col min-h-0">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 shrink-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t("bmi.title")}
            </span>
          </div>
          <div className="flex-1 p-4 overflow-auto min-h-0">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">{t("bmi.description")}</p>

              {/* Weight Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  {t("bmi.weight.label")}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={t("bmi.weight.placeholder")}
                    className="w-full p-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                    min="1"
                    max="500"
                  />
                  <span className="absolute right-3 top-3 text-gray-500 text-xs">kg</span>
                </div>
              </div>

              {/* Height Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  {t("bmi.height.label")}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={t("bmi.height.placeholder")}
                    className="w-full p-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                    min="50"
                    max="300"
                  />
                  <span className="absolute right-3 top-3 text-gray-500 text-xs">cm</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={calculateBodyMassIndex}
                  disabled={!weight || !height}
                  className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colours">
                  {t("bmi.calculate")}
                </button>
                <button
                  onClick={resetCalculator}
                  className="w-full border border-slate-200 text-slate-700 py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colours">
                  {t("bmi.reset")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right result panel - 70% */}
      <div className="w-[70%] bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden min-h-0">
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 shrink-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {t("bmi.result.title")}
          </span>
        </div>

        <div className="flex-1 p-6 overflow-auto min-h-0">
          {bmi === null ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <p className="text-sm">{t("bmi.description")}</p>
                <p className="text-xs mt-2">{t("bmi.result.emptyState")}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* BMI Value Display */}
              <div className={`text-center p-6 rounded-lg border ${getBmiBgColour()}`}>
                <div className={`text-5xl font-bold mb-2 ${getBmiColour()}`}>{bmi}</div>
                <div className={`text-lg font-semibold mb-3 ${getBmiColour()}`}>
                  {t(`bmi.category.${bmiCategory}`)}
                </div>
                <div className="text-sm text-gray-700 max-w-md mx-auto">
                  {t(`bmi.advice.${bmiCategory}`)}
                </div>
              </div>

              {/* BMI Scale */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  {t("bmi.scale.title")}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-1.5 px-2 rounded hover:bg-white transition-colours">
                    <span className="text-blue-600 font-medium">{t("bmi.category.underweight")}</span>
                    <span className="text-gray-600">&lt; 18.5</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 px-2 rounded hover:bg-white transition-colours">
                    <span className="text-green-600 font-medium">{t("bmi.category.normal")}</span>
                    <span className="text-gray-600">18.5 - 24.9</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 px-2 rounded hover:bg-white transition-colours">
                    <span className="text-yellow-600 font-medium">{t("bmi.category.overweight")}</span>
                    <span className="text-gray-600">25.0 - 29.9</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 px-2 rounded hover:bg-white transition-colours">
                    <span className="text-red-600 font-medium">{t("bmi.category.obese")}</span>
                    <span className="text-gray-600">&ge; 30.0</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
