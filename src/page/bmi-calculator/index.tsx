import { useState } from "react"
import { useTranslation } from "react-i18next"

/**
 * Home page component that displays the BMI calculator.
 */
export default function BmiCalculator() {
  const { t } = useTranslation()

  const [weight, setWeight] = useState<string>("")
  const [height, setHeight] = useState<string>("")
  const [bmi, setBmi] = useState<number | null>(null)
  const [bmiCategory, setBmiCategory] = useState<string>("")

  const calculateBMI = () => {
    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height) / 100 // Convert cm to meters

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

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t("bmi.title")}</h1>
          <p className="text-sm sm:text-base text-gray-600">{t("bmi.description")}</p>
        </div>

        {/* Calculator Form */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            {/* Weight Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("bmi.weight.label")}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={t("bmi.weight.placeholder")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  min="1"
                  max="500"
                />
                <span className="absolute right-3 top-3 text-gray-500 text-sm">kg</span>
              </div>
            </div>

            {/* Height Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("bmi.height.label")}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={t("bmi.height.placeholder")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  min="50"
                  max="300"
                />
                <span className="absolute right-3 top-3 text-gray-500 text-sm">cm</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={calculateBMI}
              disabled={!weight || !height}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-base">
              {t("bmi.calculate")}
            </button>
            <button
              onClick={resetCalculator}
              className="sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-base">
              {t("bmi.reset")}
            </button>
          </div>
        </div>

        {/* BMI Result */}
        {bmi !== null && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 w-full mx-auto">
            <div className="text-center">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                {t("bmi.result.title")}
              </h2>
              <div className={`text-3xl sm:text-4xl font-bold mb-2 ${getBmiColour()}`}>{bmi}</div>
              <div className={`text-base sm:text-lg font-medium mb-4 ${getBmiColour()}`}>
                {t(`bmi.category.${bmiCategory}`)}
              </div>
              <div className="text-gray-600 text-sm sm:text-base px-4">
                {t(`bmi.advice.${bmiCategory}`)}
              </div>
            </div>

            {/* BMI Scale */}
            <div className="mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-3">{t("bmi.scale.title")}</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-medium">{t("bmi.category.underweight")}</span>
                  <span className="text-gray-600">&lt; 18.5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium">{t("bmi.category.normal")}</span>
                  <span className="text-gray-600">18.5 - 24.9</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-600 font-medium">
                    {t("bmi.category.overweight")}
                  </span>
                  <span className="text-gray-600">25.0 - 29.9</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-600 font-medium">{t("bmi.category.obese")}</span>
                  <span className="text-gray-600">&ge; 30.0</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
