const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Try PetVision AI with limited features",
      features: [
        "3 video analyses per month",
        "Basic health assessment",
        "Email support",
        "7-day history"
      ],
      isPopular: false,
      buttonText: "Start Free"
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "per month",
      description: "Perfect for regular pet health monitoring",
      features: [
        "Unlimited video analyses",
        "Detailed health assessments",
        "Priority support",
        "90-day history",
        "Breed-specific insights",
        "Export reports as PDF"
      ],
      isPopular: true,
      buttonText: "Get Started"
    },
    {
      name: "Family",
      price: "$19.99",
      period: "per month",
      description: "Ideal for households with multiple pets",
      features: [
        "Everything in Premium",
        "Up to 5 pet profiles",
        "Comparative analysis",
        "1-year history",
        "Veterinary consultation discount",
        "Health trend reports"
      ],
      isPopular: false,
      buttonText: "Choose Family"
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for you and your pets.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg overflow-hidden transition-transform hover:scale-105 ${
                plan.isPopular 
                  ? 'shadow-xl border-2 border-primary-500 transform scale-105 md:scale-110 z-10' 
                  : 'shadow-md border border-gray-200'
              }`}
            >
              {plan.isPopular && (
                <div className="bg-primary-500 text-white text-center py-2 font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary-600">{plan.price}</span>
                  {plan.period && <span className="text-gray-500 ml-2">{plan.period}</span>}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-3 rounded-md font-medium transition-colors ${
                    plan.isPopular 
                      ? 'bg-primary-500 text-white hover:bg-primary-600' 
                      : 'bg-white text-primary-600 border border-primary-500 hover:bg-primary-50'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            All plans include a 14-day money-back guarantee. No credit card required for free plan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 