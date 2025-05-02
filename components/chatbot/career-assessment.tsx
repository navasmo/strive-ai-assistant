'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, ArrowLeftIcon, BarChart3Icon, CheckCircleIcon } from 'lucide-react'
import { cn, generateId } from '@/lib/utils'

// Define assessment question types
interface Question {
  id: string;
  text: string;
  category: 'interests' | 'skills' | 'values' | 'personality';
}

interface AssessmentResult {
  category: string;
  score: number;
  description: string;
  suggestedPaths: string[];
}

interface CareerAssessmentProps {
  readonly onComplete?: (results: AssessmentResult[]) => void;
}

const questions: Question[] = [
  {
    id: 'q1',
    text: 'I enjoy solving complex problems and puzzles',
    category: 'interests'
  },
  {
    id: 'q2',
    text: 'I prefer working with people rather than working alone',
    category: 'personality'
  },
  {
    id: 'q3',
    text: 'I am good at analyzing data and drawing conclusions',
    category: 'skills'
  },
  {
    id: 'q4',
    text: 'Work-life balance is more important to me than high salary',
    category: 'values'
  },
  {
    id: 'q5',
    text: 'I enjoy creative activities like writing, design, or art',
    category: 'interests'
  },
  {
    id: 'q6',
    text: 'I am comfortable speaking in front of groups',
    category: 'skills'
  },
  {
    id: 'q7',
    text: 'I prefer structure and clear guidelines in my work',
    category: 'personality'
  },
  {
    id: 'q8',
    text: 'Making a positive impact on society is important to me',
    category: 'values'
  },
  {
    id: 'q9',
    text: 'I am interested in technology and how things work',
    category: 'interests'
  },
  {
    id: 'q10',
    text: 'I am good at organizing and planning',
    category: 'skills'
  }
]

export function CareerAssessment({ onComplete }: CareerAssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [results, setResults] = useState<AssessmentResult[]>([])

  const handleAnswer = (value: number) => {
    const currentQuestion = questions[currentQuestionIndex]
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }))
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      calculateResults()
    }
  }
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }
  
  const calculateResults = () => {
    // Group questions by category
    const categorySums: Record<string, number> = {}
    const categoryCounts: Record<string, number> = {}
    
    questions.forEach(question => {
      if (!categorySums[question.category]) {
        categorySums[question.category] = 0
        categoryCounts[question.category] = 0
      }
      
      if (answers[question.id]) {
        categorySums[question.category] += answers[question.id]
        categoryCounts[question.category]++
      }
    })
    
    // Calculate average scores and map to result objects
    const categoryResults: AssessmentResult[] = [
      {
        category: 'interests',
        score: categoryCounts['interests'] ? Math.round((categorySums['interests'] / (categoryCounts['interests'] * 5)) * 100) : 0,
        description: 'What you enjoy doing and are naturally drawn to',
        suggestedPaths: getInterestPaths((categorySums['interests'] || 0) / (categoryCounts['interests'] || 1))
      },
      {
        category: 'skills',
        score: categoryCounts['skills'] ? Math.round((categorySums['skills'] / (categoryCounts['skills'] * 5)) * 100) : 0,
        description: 'Your strongest abilities and competencies',
        suggestedPaths: getSkillPaths((categorySums['skills'] || 0) / (categoryCounts['skills'] || 1))
      },
      {
        category: 'values',
        score: categoryCounts['values'] ? Math.round((categorySums['values'] / (categoryCounts['values'] * 5)) * 100) : 0,
        description: 'What matters most to you in your career',
        suggestedPaths: getValuePaths((categorySums['values'] || 0) / (categoryCounts['values'] || 1))
      },
      {
        category: 'personality',
        score: categoryCounts['personality'] ? Math.round((categorySums['personality'] / (categoryCounts['personality'] * 5)) * 100) : 0,
        description: 'How you prefer to work and interact with others',
        suggestedPaths: getPersonalityPaths((categorySums['personality'] || 0) / (categoryCounts['personality'] || 1))
      }
    ]
    
    setResults(categoryResults)
    setIsComplete(true)
    
    if (onComplete) {
      onComplete(categoryResults)
    }
  }
  
  // Helper functions to suggest career paths based on scores
  function getInterestPaths(score: number): string[] {
    if (score >= 4) {
      return ['Technology', 'Research', 'Engineering']
    } else if (score >= 3) {
      return ['Design', 'Marketing', 'Education']
    } else {
      return ['Administration', 'Support Roles', 'Operations']
    }
  }
  
  function getSkillPaths(score: number): string[] {
    if (score >= 4) {
      return ['Data Analysis', 'Project Management', 'Technical Writing']
    } else if (score >= 3) {
      return ['Customer Service', 'Sales', 'Human Resources']
    } else {
      return ['Hands-on Roles', 'Practical Trades', 'Creative Fields']
    }
  }
  
  function getValuePaths(score: number): string[] {
    if (score >= 4) {
      return ['Non-profit', 'Healthcare', 'Education']
    } else if (score >= 3) {
      return ['Public Service', 'Community-focused Roles', 'Green Industries']
    } else {
      return ['Corporate Roles', 'Startups', 'Entrepreneurship']
    }
  }
  
  function getPersonalityPaths(score: number): string[] {
    if (score >= 4) {
      return ['Team Leadership', 'Client-facing Roles', 'Consulting']
    } else if (score >= 3) {
      return ['Collaborative Environments', 'Support Roles', 'Training']
    } else {
      return ['Independent Work', 'Research', 'Creative Fields']
    }
  }
  
  // Progress calculation
  const progress = ((currentQuestionIndex) / questions.length) * 100
  
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto">
      {!isComplete ? (
        // Question Interface
        <div className="flex flex-col">
          <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">
            Career Assessment
          </h3>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          
          <div className="my-6">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-lg text-center font-medium text-gray-800 dark:text-gray-200 mb-6"
            >
              {questions[currentQuestionIndex].text}
            </motion.div>
            
            <div className="flex flex-col space-y-3">
              {[1, 2, 3, 4, 5].map((rating) => {
                const currentQuestionId = questions[currentQuestionIndex].id
                const isSelected = answers[currentQuestionId] === rating
                
                return (
                  <button
                    key={rating}
                    onClick={() => handleAnswer(rating)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border transition-all",
                      isSelected
                        ? "bg-purple-50 border-purple-300 dark:bg-purple-900/20 dark:border-purple-500"
                        : "bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-750"
                    )}
                  >
                    <span className="text-sm font-medium">
                      {rating === 1 && "Strongly Disagree"}
                      {rating === 2 && "Disagree"}
                      {rating === 3 && "Neutral"}
                      {rating === 4 && "Agree"}
                      {rating === 5 && "Strongly Agree"}
                    </span>
                    <div className="flex">
                      {Array(rating).fill(0).map((_, i) => (
                        <div 
                          key={`rating-indicator-${rating}-${i}`}
                          className={cn(
                            "w-2 h-4 mx-0.5 rounded-sm",
                            isSelected ? "bg-purple-500" : "bg-gray-300 dark:bg-gray-600"
                          )}
                        />
                      ))}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="text-gray-600 dark:text-gray-300"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              disabled={!answers[questions[currentQuestionIndex].id] || currentQuestionIndex === questions.length - 1}
              variant="default"
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Skip
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      ) : (
        // Results Interface
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col"
        >
          <div className="flex items-center mb-4">
            <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Assessment Complete
            </h3>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Based on your responses, here are insights about your career preferences:
          </p>
          
          <div className="space-y-4 mb-4">
            {results.map((result, index) => (
              <motion.div
                key={result.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <h4 className="font-medium text-gray-900 dark:text-gray-100 capitalize mb-2">
                  {result.category}
                </h4>
                
                <div className="flex items-center mb-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${result.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {result.score}%
                  </span>
                </div>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {result.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mt-1">
                  {result.suggestedPaths.map(path => (
                    <span 
                      key={generateId()} 
                      className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200 px-2 py-1 rounded-full"
                    >
                      {path}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            These results can help guide your career exploration. Consider exploring the suggested paths or speaking with a career counselor for more personalized advice.
          </p>
          
          <div className="flex justify-center">
            <Button
              onClick={() => {
                setIsComplete(false)
                setCurrentQuestionIndex(0)
                setAnswers({})
              }}
              variant="outline"
              className="text-purple-600 border-purple-200 hover:bg-purple-50 dark:text-purple-300 dark:border-purple-800/50 dark:hover:bg-purple-900/20"
            >
              <BarChart3Icon className="w-4 h-4 mr-2" />
              Retake Assessment
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
