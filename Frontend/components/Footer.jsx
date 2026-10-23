import { FaTwitter, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPhone, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-green-900 to-green-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-400">
                CivicTrack
              </h3>
              <div className="w-12 h-1 bg-emerald-400 mt-2 rounded-full"></div>
            </div>
            <p className="text-green-100 leading-relaxed mb-6">
              Empowering communities to report and resolve local environmental issues through collaboration, data, and action.
            </p>
            <div className="flex space-x-4">
              <a
                href="/"
                className="bg-green-700 hover:bg-emerald-500 p-2 rounded-full transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Twitter"
              >
                <FaTwitter className="text-white text-lg" />
              </a>
              <a
                href="/"
                className="bg-green-700 hover:bg-emerald-500 p-2 rounded-full transition-all duration-300 transform hover:-translate-y-1"
                aria-label="GitHub"
              >
                <FaGithub className="text-white text-lg" />
              </a>
              <a
                href="/"
                className="bg-green-700 hover:bg-emerald-500 p-2 rounded-full transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Email"
              >
                <FaEnvelope className="text-white text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-emerald-400">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Report Incident", path: "/report" },
                { name: "View Issues", path: "/issues" },
                { name: "Community", path: "/community" },
                { name: "Login", path: "/login" },
                { name: "Register", path: "/register" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-green-100 hover:text-emerald-300 transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3 group-hover:animate-pulse"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-bold text-lg mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-emerald-400">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mt-1 p-2 bg-green-700 rounded-lg mr-3">
                  <FaEnvelope className="text-emerald-300" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:support@civitrack.org"
                    className="text-green-100 hover:text-emerald-300 transition-colors"
                  >
                    support@civictrack.org
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 p-2 bg-green-700 rounded-lg mr-3">
                  <FaTwitter className="text-emerald-300" />
                </div>
                <div>
                  <p className="font-medium">Twitter</p>
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-100 hover:text-emerald-300 transition-colors"
                  >
                    @CivicTrackApp
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 p-2 bg-green-700 rounded-lg mr-3">
                  <FaGithub className="text-emerald-300" />
                </div>
                <div>
                  <p className="font-medium">GitHub</p>
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-100 hover:text-emerald-300 transition-colors"
                  >
                    github.com/Civictrack
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-bold text-lg mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-emerald-400">
              Stay Updated
            </h4>
            <p className="text-green-100 mb-4">
              Subscribe to our newsletter for updates and community initiatives.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-lg bg-green-700 border border-green-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent placeholder-green-300 text-white"
              />
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-green-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-green-200 text-sm flex items-center">
            Made with <FaHeart className="text-red-400 mx-1" /> for greener communities
          </p>
          <p className="text-green-200 text-sm">
            &copy; {new Date().getFullYear()} Civitrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}