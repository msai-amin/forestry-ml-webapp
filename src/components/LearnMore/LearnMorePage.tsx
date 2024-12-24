import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  GraduationCap,
  ScrollText,
  Users,
  Check,
  ArrowUpRight,
  MessageSquare,
  TreePine,
  Brain,
  LineChart,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LearnMorePage = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <Card>
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="text-3xl flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-green-600" />
              Learning Resources
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            Explore our comprehensive collection of resources designed to help forestry professionals 
            master machine learning techniques and their practical applications in forest management.
          </p>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Educational Resources Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-green-600" />
              Educational Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl"
              >
                <h3 className="font-semibold text-lg text-green-800 mb-4">Interactive Tutorials</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-1" />
                    <span>Step-by-step guides for each ML algorithm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-1" />
                    <span>Hands-on exercises with real forestry data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-1" />
                    <span>Video tutorials and demonstrations</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl"
              >
                <h3 className="font-semibold text-lg text-blue-800 mb-4">Implementation Guides</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Brain className="h-5 w-5 text-blue-600 mt-1" />
                    <span>Best practices for model selection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TreePine className="h-5 w-5 text-blue-600 mt-1" />
                    <span>Forest-specific data preprocessing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <LineChart className="h-5 w-5 text-blue-600 mt-1" />
                    <span>Model evaluation techniques</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </CardContent>
        </Card>

        {/* Research & Publications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <ScrollText className="h-6 w-6 text-blue-600" />
              Research & Publications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl"
              >
                <h3 className="font-semibold text-lg text-purple-800 mb-4">Latest Research</h3>
                <ul className="space-y-3">
                  {[
                    "ML applications in forest inventory",
                    "Remote sensing with deep learning",
                    "Predictive modeling for forest health",
                    "Species classification techniques"
                  ].map((topic, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ArrowUpRight className="h-5 w-5 text-purple-600 mt-1" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl"
              >
                <h3 className="font-semibold text-lg text-orange-800 mb-4">Case Studies</h3>
                <ul className="space-y-3">
                  {[
                    "Forest fire prediction models",
                    "Disease detection systems",
                    "Growth prediction applications",
                    "Biodiversity assessment tools"
                  ].map((study, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ArrowUpRight className="h-5 w-5 text-orange-600 mt-1" />
                      <span>{study}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </CardContent>
        </Card>

        {/* Community Section */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Users className="h-6 w-6 text-purple-600" />
              Community & Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Expert Forums",
                  items: ["Q&A sessions", "Problem solving", "Best practices"],
                  color: "green"
                },
                {
                  title: "Webinars",
                  items: ["Monthly sessions", "Guest speakers", "Live demos"],
                  color: "blue"
                },
                {
                  title: "Support",
                  items: ["Technical help", "Implementation guidance", "Code reviews"],
                  color: "purple"
                }
              ].map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className={`bg-gradient-to-br from-${section.color}-50 to-${section.color}-100 p-6 rounded-xl`}
                >
                  <h3 className={`font-semibold text-lg text-${section.color}-800 mb-4`}>
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <MessageSquare className={`h-5 w-5 text-${section.color}-600 mt-1`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearnMorePage; 