import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { Hexagon } from 'lucide-react';

export function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen flex">
      {/* Left side - Forms */}
      <div className="flex-1 flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={isSignIn ? 'signin' : 'signup'}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            {isSignIn ? (
              <SignInForm onSignUpClick={() => setIsSignIn(false)} />
            ) : (
              <SignUpForm onSignInClick={() => setIsSignIn(true)} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right side - Hero */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="flex flex-col items-center justify-center p-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <Hexagon className="w-16 h-16 mx-auto mb-8" />
            <h1 className="text-4xl font-bold mb-4">Real Estate CRM</h1>
            <p className="text-lg text-blue-100 mb-8 max-w-md mx-auto">
              Streamline your real estate business with our powerful CRM solution. Manage leads, track opportunities, and close more deals.
            </p>

            <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">Lead Management</h3>
                <p className="text-sm text-blue-100">Track and nurture your leads through every stage of the sales pipeline</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">Analytics</h3>
                <p className="text-sm text-blue-100">Get insights into your performance with detailed analytics and reports</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">Follow-ups</h3>
                <p className="text-sm text-blue-100">Never miss an opportunity with automated follow-up reminders</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">AI Insights</h3>
                <p className="text-sm text-blue-100">Get AI-powered recommendations to optimize your sales process</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}