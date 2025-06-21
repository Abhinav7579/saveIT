
import { 
  Brain, 
  Youtube, 
  Twitter, 
  BookmarkPlus, 
  Search, 
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 md:p-8">
        <div className="flex items-center space-x-2">
          <Brain className="h-[100px] w-9 text-purple-400" />
          <span className="text-5xl font-bold">SaveIt</span>
        </div>
        <button className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-2 rounded-full hover:bg-white/20 transition-all duration-300 font-medium" onClick={()=>{navigate("/signin")}}>
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6  md:px-8 py-12 md:py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-sm">Your Digital Second Brain</span>
            </div>
            <h1 className="text-4xl  md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Never Lose Another
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Great Idea Again
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Save, organize, and rediscover your most important YouTube videos and Twitter posts. 
              Turn information overload into organized knowledge.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-xl"  onClick={()=>{navigate("/signin")}} >
              <span>Start Saving Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border border-white/30 hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
              Watch Demo
            </button>
          </div>

          {/* Platform Icons */}
          <div className="flex items-center justify-center space-x-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Youtube className="h-6 w-6 text-red-400" />
              <span className="text-sm">YouTube</span>
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="flex items-center space-x-2">
              <Twitter className="h-6 w-6 text-blue-400" />
              <span className="text-sm">Twitter</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 md:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why Choose Savit?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Transform how you consume and retain digital content with powerful features designed for the modern knowledge worker.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookmarkPlus className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">One-Click Saving</h3>
              <p className="text-gray-300 leading-relaxed">
                Save YouTube videos and Twitter posts instantly with our browser extension. No more lost tabs or forgotten bookmarks.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Search</h3>
              <p className="text-gray-300 leading-relaxed">
                Find exactly what you're looking for with AI-powered search. Search by content, topics, or even that vague memory you have.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Knowledge Graph</h3>
              <p className="text-gray-300 leading-relaxed">
                Automatically connect related content and discover patterns in your saved items. Build your personal knowledge network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 px-6 md:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get started in minutes and transform your content consumption forever.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Install Extension</h3>
              <p className="text-gray-300">
                Add our lightweight browser extension to Chrome, Firefox, or Safari in seconds.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Save Content</h3>
              <p className="text-gray-300">
                Click the Savit button while browsing YouTube or Twitter to instantly save interesting content.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-orange-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Rediscover</h3>
              <p className="text-gray-300">
                Use powerful search and AI recommendations to find exactly what you need, when you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

     
      {/* Footer */}
      <footer className="relative z-10 px-6 md:px-8 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-6 w-6 text-purple-400" />
            <span className="text-xl font-bold">Savit</span>
          </div>
          <p className="text-gray-400">
            © 2025 Savit. All rights reserved. Built with ❤️ for knowledge seekers.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;