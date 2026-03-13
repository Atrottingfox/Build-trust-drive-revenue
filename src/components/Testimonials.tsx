import React from 'react';

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          See How Founders Are Scaling with Us
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 p-8 rounded-xl mb-8">
            <div className="flex items-start gap-6">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
                alt="Jay Wright"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold mb-2">Jay Wright</h3>
                <p className="text-gray-600 mb-4">
                  "In just 9 months, we went from 50K to 100K followers with 10M+ total views. 
                  The system works!"
                </p>
                <div className="flex gap-4">
                  <div className="bg-blue-50 px-4 py-2 rounded-full">
                    <span className="text-blue-600 font-medium">9 Months</span>
                  </div>
                  <div className="bg-blue-50 px-4 py-2 rounded-full">
                    <span className="text-blue-600 font-medium">10M+ Views</span>
                  </div>
                  <div className="bg-blue-50 px-4 py-2 rounded-full">
                    <span className="text-blue-600 font-medium">2x Growth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}