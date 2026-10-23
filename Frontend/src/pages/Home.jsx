import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "/Images/home.png"; // Ensure this path is correct

export default function Home() {
  return (
    <div className="min-h-screen bg-green-100 text-gray-800">
      {/* Navigation Bar */}
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-10">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 to-green-800/80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/50 to-green-700/40"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6"
          >
            <div className="inline-flex items-center bg-green-100/90 text-green-800 rounded-full py-1 px-4 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
              Empowering communities to protect our planet
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white"
          >
            Track, Report, and Resolve <span className="text-green-300">Environmental Issues</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl mb-10 text-green-100 max-w-3xl mx-auto leading-relaxed"
          >
            A collaborative platform connecting citizens, communities, and authorities to tackle environmental challenges—from illegal dumping to pollution.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/register"
              className="bg-white text-green-700 font-semibold m-2 px-8 py-4 rounded-lg shadow-lg hover:bg-green-50 transition-all transform hover:-translate-y-1 w-full sm:w-auto text-center"
            >
              Join Now - It's Free
            </Link>
            
          </motion.div>
        </div>
        
        
      </section>

      

      {/* Features Section */}
      <section id="features" className="py-16 px-6 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How EcoTracker Works</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our platform makes environmental protection accessible to everyone through simple, powerful tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Report Issues Easily",
              desc: "Log environmental incidents with location, photos, and categories. Choose to report anonymously.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
              color: "green"
            },
            {
              title: "Visualize Data",
              desc: "View real-time reports on an interactive map with filters and status tracking.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              ),
              color: "emerald"
            },
            {
              title: "Engage Your Community",
              desc: "Join forums, plan cleanups, and collaborate with neighbors to drive local impact.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              color: "emerald"
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-${feature.color}-100 text-${feature.color}-700 mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-green-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Steps to Make a Difference</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Join thousands of environmental champions in just a few easy steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-1/8 right-1/8 h-1 bg-green-500 mx-16"></div>
            
            {[
              { step: "1", title: "Sign Up", desc: "Create your free account in less than a minute" },
              { step: "2", title: "Report", desc: "Document environmental issues with photos and location" },
              { step: "3", title: "Track", desc: "Monitor progress as authorities address the problem" },
              { step: "4", title: "Celebrate", desc: "See the positive impact you've made on your community" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="relative text-center bg-white p-6 rounded-2xl shadow-md z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-green-800 mt-4 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-green-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Join thousands of environmental champions making a difference in their communities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "EcoTracker helped our neighborhood organize and get a dumping site cleaned up in just two weeks!",
                name: "Mohsin Memon",
                role: "Community Volunteer"
              },
              {
                text: "As a local government official, this platform has dramatically improved our response time to environmental issues.",
                name: "Adil Memon",
                role: "City Council Member"
              },
              {
                text: "I love being able to see the direct impact I'm making. The map feature shows exactly where problems are being solved.",
                name: "Mashooq sher",
                role: "Environmental Student"
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="bg-green-50 p-8 rounded-2xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <div className="text-green-600 mb-4">
                  {/* Star rating */}
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-green-200 to-green-700 text-white">
        <motion.div 
          className="max-w-4xl mx-auto text-center px-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference in Your Community?</h2>
          <p className="text-green-100 text-xl mb-10 max-w-3xl mx-auto">
            Join thousands of environmental champions making a tangible impact in their neighborhoods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-green-700 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-green-50 transition-all transform hover:-translate-y-1"
            >
              Get Started For Free
            </Link>
            
          </div>
          <p className="mt-6 text-green-200 text-sm">No credit card required. Join in less than a minute.</p>
        </motion.div>
      </section>

      
    </div>
  );
}