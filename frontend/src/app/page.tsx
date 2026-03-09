export default function Home() {
  return (
    <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
        Automate your WhatsApp <span className="text-blue-600">Customer Support</span>
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        AutoReply AI connects to your WhatsApp Business and intelligently replies to customers using modern AI, capturing leads and boosting sales while you sleep.
      </p>
      <div className="flex justify-center space-x-4">
        <a href="/signup" className="px-8 py-4 rounded-lg bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition">Get Started for Free</a>
        <a href="#features" className="px-8 py-4 rounded-lg bg-white border border-gray-300 text-gray-700 font-bold text-lg hover:bg-gray-50 transition">View Demo</a>
      </div>
    </div>
  );
}
