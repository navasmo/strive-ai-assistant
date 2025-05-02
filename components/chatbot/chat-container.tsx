'use client'

import { useState, useEffect, useRef } from 'react'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'
import { ChatOption } from './chat-option'
import { ArrowRightIcon, BookOpenIcon, BriefcaseIcon, GraduationCapIcon, 
         HeartIcon, PenToolIcon, SearchIcon, SparklesIcon, 
         HelpCircleIcon, TargetIcon, TimerIcon, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { generateId } from '@/lib/utils'
import { BreathingExercise } from './breathing-exercise'
import { findResourcesByKeywords } from '@/lib/resources'
import Link from 'next/link'

// Define types for chat messages
interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  id: string
}

// Define types for chat options
interface Option {
  id: string
  text: string
  action: string
  icon?: React.ReactNode
}

// Define user profile information
interface UserProfile {
  name: string;
  occupation: string;
  age: string;
  need: string;
}

// Define onboarding steps
type OnboardingStep = 'name' | 'occupation' | 'age' | 'need' | 'complete';

// Extract WelcomeScreen component outside of ChatContainer to fix lint error
const WelcomeScreen = ({ onBegin }: { onBegin: () => void }) => (
  <div 
    className="flex flex-col items-center justify-center h-full p-8"
  >
    <div
      className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 mb-8 font-brand text-center"
    >
      Strive AI Assistant
    </div>
    
    <div
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mb-8 max-w-md border border-purple-100 dark:border-purple-900/30"
    >
      <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4 text-center">
        Your AI assistant for career guidance and wellbeing support
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-center">
        Get personalized advice, resources, and support for your professional and personal development journey.
      </p>
    </div>
    
    <div
      className="rounded-xl  text-white px-8 py-6 text-lg font-brand font-semibold transition-all"
    >
      <Button 
        onClick={onBegin}
        className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-6 text-lg font-brand font-semibold shadow-md hover:shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
        size="lg"
      >
        Start a Conversation
      </Button>
    </div>
  </div>
)

export function ChatContainer() {
  // Chat state
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  // User onboarding and profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    occupation: '',
    age: '',
    need: ''
  })
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('name')
  
  // UI state
  const [options, setOptions] = useState<Option[]>([])
  const [showOptions, setShowOptions] = useState(false)
  const [typingComplete, setTypingComplete] = useState(true)
  const [showBreathingExercise, setShowBreathingExercise] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [showResourcesHint, setShowResourcesHint] = useState(false)
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // --- Feedback Handling ---
  const handleFeedback = (messageId: string, feedback: 'like' | 'dislike') => {
    console.log(`Feedback received for message ${messageId}: ${feedback}`);
    
    // Store feedback in localStorage for now
    // In a production app, you might want to send this to your backend
    try {
      const feedbackData = JSON.parse(localStorage.getItem('strive_feedback') ?? '{}');
      feedbackData[messageId] = {
        feedback,
        timestamp: new Date().toISOString(),
        messageId
      };
      localStorage.setItem('strive_feedback', JSON.stringify(feedbackData));
    } catch (error) {
      console.error('Error storing feedback:', error);
    }
  }
  // --- End Feedback Handling ---

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, options, showOptions])

  // Initialize chat with welcome message
  useEffect(() => {
    if (messages.length === 0 && !showWelcome) {
      setMessages([
        {
          role: 'assistant',
          content: 'Hi there! I\'m Strive, your AI assistant for career guidance and wellbeing support. To help me provide personalized advice, could you tell me your name?',
          timestamp: new Date(),
          id: generateId()
        }
      ])
    }
  }, [showWelcome])

  // Process user input based on current onboarding step
  const processOnboardingInput = (input: string, userMessage: Message) => {
    setIsLoading(true)
    
    // Update user profile based on current step
    switch(onboardingStep) {
      case 'name':
        setUserProfile(prev => ({ ...prev, name: input }))
        
        // Add bot response
        setMessages(prev => [...prev, {
          role: 'assistant' as const,
          content: `Hi ${input}! What's your occupation or profession?`,
          timestamp: new Date(),
          id: generateId()
        }])
        
        // Move to next step
        setOnboardingStep('occupation')
        break
        
      case 'occupation':
        setUserProfile(prev => ({ ...prev, occupation: input }))
        
        // Add bot response with age options
        setMessages(prev => [...prev, {
          role: 'assistant' as const,
          content: `Thanks! Which age range do you fall into?`,
          timestamp: new Date(),
          id: generateId()
        }])
        
        // Show age options
        setOptions([
          { id: generateId(), text: '18-25', action: 'age', icon: <GraduationCapIcon className="h-4 w-4" /> },
          { id: generateId(), text: '26-35', action: 'age', icon: <BriefcaseIcon className="h-4 w-4" /> },
          { id: generateId(), text: '36-45', action: 'age', icon: <SparklesIcon className="h-4 w-4" /> },
          { id: generateId(), text: '46-60', action: 'age', icon: <BookOpenIcon className="h-4 w-4" /> },
          { id: generateId(), text: '60+', action: 'age', icon: <TargetIcon className="h-4 w-4" /> }
        ])
        setShowOptions(true)
        
        // Move to next step
        setOnboardingStep('age')
        break
        
      case 'age':
        setUserProfile(prev => ({ ...prev, age: input }))
        
        // Clear age options
        setOptions([])
        setShowOptions(false)
        
        // Add bot response
        setMessages(prev => [...prev, {
          role: 'assistant' as const,
          content: `Great! What do you need help with today? I can assist with career development, job searching, wellbeing, stress management, and more.`,
          timestamp: new Date(),
          id: generateId()
        }])
        
        // Show need selection options
        setOptions([
          { id: generateId(), text: 'Career Guidance', action: 'need', icon: <BriefcaseIcon className="h-4 w-4" /> },
          { id: generateId(), text: 'Wellbeing Support', action: 'need', icon: <HeartIcon className="h-4 w-4" /> },
          { id: generateId(), text: 'Skill Development', action: 'need', icon: <TargetIcon className="h-4 w-4" /> },
          { id: generateId(), text: 'Job Search Help', action: 'need', icon: <SearchIcon className="h-4 w-4" /> }
        ])
        setShowOptions(true)
        
        // Move to next step
        setOnboardingStep('need')
        break
        
      case 'need':
        {
          const need = input;
          setUserProfile(prev => ({ ...prev, need }))
          
          // Add personalized welcome message
          setMessages(prev => [...prev, {
            role: 'assistant' as const,
            content: `Thanks for sharing that, ${userProfile.name}. I'd be happy to help with ${need}. Let me know any specific questions you have, and we can get started.`,
            timestamp: new Date(),
            id: generateId()
          }])
          
          // Complete onboarding
          setOnboardingStep('complete')
          
          // Show relevant options based on need
          let initialOptions = generateInitialOptions(need)
          setOptions(initialOptions)
          setShowOptions(true)
        }
        break
        
      case 'complete':
        // Handle regular messages after onboarding
        processRegularMessage(input, {
          role: 'user' as const,
          content: input,
          timestamp: new Date(),
          id: generateId()
        })
        break
      default:
        break
    }
    
    setIsLoading(false)
  }
  
  // Process regular messages after onboarding is complete
  const processRegularMessage = async (input: string, userMessage: Message) => {
    try {
      setIsLoading(true)
      setShowOptions(false)
      setTypingComplete(false)
      
      // Check for specific message types first
      if (input.toLowerCase().includes('breathing exercise')) {
        setMessages(prev => [...prev, {
          role: 'assistant' as const,
          content: 'Let\'s do a quick breathing exercise to help you relax and refocus. Follow the animation and breathe along with it.',
          timestamp: new Date(),
          id: generateId()
        }])
        setShowBreathingExercise(true)
        setIsLoading(false)
        return
      }
      
      // Check for resources or job/career platforms request
      if (input.toLowerCase().includes('resources') || 
          input.toLowerCase().includes('links') || 
          input.toLowerCase().includes('job site') || 
          input.toLowerCase().includes('job platform') ||
          input.toLowerCase().includes('where to find jobs') ||
          input.toLowerCase().includes('career assessment') || 
          input.toLowerCase().includes('career test') ||
          input.toLowerCase().includes('help me find')) {
         
        setMessages(prev => [...prev, {
          role: 'assistant' as const,
          content: `I can help point you to useful resources! We have a dedicated Resources page with career and wellbeing tools like job search sites, career assessment tools, breathing exercises, and helpful links. Would you like to visit the Resources page?`,
          timestamp: new Date(),
          id: generateId()
        }])
        
        setShowResourcesHint(true);
        setIsLoading(false)
        return
      }
      
      // Setup system message with user profile context
      const systemMessage = {
        role: 'system' as const,
        content: `You are Strive AI, a helpful career and wellbeing assistant. 
          The user's name is ${userProfile.name || 'there'}.
          They are a ${userProfile.occupation || 'professional'}.
          Their age range is ${userProfile.age || 'adult'}.
          They need help with: ${userProfile.need || 'career and wellbeing'}.
          
          IMPORTANT: Your primary function is to provide advice ONLY on career development and personal wellbeing topics. 
          Do NOT answer questions or engage in conversations outside of these two areas (e.g., do not write code, do not answer trivia, do not discuss politics, etc.). 
          If the user asks an off-topic question, politely decline and steer the conversation back to career or wellbeing.
          
          Be empathetic, helpful, and provide specific advice.
          Keep responses concise (3-4 paragraphs max).`,
        id: generateId()
      };
      
      // Prepare messages for API including conversation history and system context
      const apiMessages = [
        systemMessage,
        ...messages.slice(-6), // Include last 6 messages for context
        userMessage
      ];
      
      // Call the OpenAI API through our secure route
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: apiMessages.map(msg => ({
              role: msg.role,
              content: msg.content
            }))
          }),
        });
        
        if (!response.ok) {
          console.error(`API error: ${response.status} ${response.statusText}`);
          throw new Error(`Failed to get AI response: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        const aiResponse = data.content ?? 'I apologize, but I encountered an issue processing your request.';
        
        // Add Disclaimer for Wellbeing Topics
        let finalAiResponse = aiResponse;
        const wellbeingKeywords = [
          'stress', 'anxiety', 'mental health', 'burnout', 'feeling down', 
          'overwhelmed', 'coping', 'depressed', 'sad', 'therapy', 'counselling'
        ];
        const lowerInput = input.toLowerCase();
        const lowerAiResponse = aiResponse.toLowerCase();

        const isWellbeingTopic = wellbeingKeywords.some(keyword => 
          lowerInput.includes(keyword) || lowerAiResponse.includes(keyword)
        );

        if (isWellbeingTopic) {
          const disclaimer = "\n\n*Please remember, I am an AI assistant. For serious mental health concerns, please consult a qualified healthcare professional or counsellor.*";
          finalAiResponse += disclaimer;
        }
        
        // Add AI response to messages
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: finalAiResponse, // Use response potentially with disclaimer
          timestamp: new Date(),
          id: generateId()
        }]);
        
        // Generate relevant options based on the message content
        const newOptions = generateOptionsBasedOnContent(finalAiResponse, input);
        setOptions(newOptions);
        
        setIsLoading(false)
        scrollToBottom()
        
        // Use setTimeout to show options AFTER typing animation is complete
        // Average message takes about 2-3 seconds to type, so we wait 3-4 seconds
        setTimeout(() => {
          setShowOptions(true)
          setTypingComplete(true)
        }, finalAiResponse.length * 15 + 500) // Adjust based on typing speed (15ms per char) plus buffer
      } catch (apiError) {
        console.error('API call failed:', apiError);
        
        // Provide a fallback response that seems natural
        const fallbackResponses = [
          `I understand you're asking about ${input.length > 20 ? input.substring(0, 20) + '...' : input}. As an AI assistant, I'm designed to help with career guidance and wellbeing support. Could you try asking another question? I'm having some technical difficulties at the moment.`,
          `That's an interesting question about ${userProfile.need || 'your needs'}. I'd like to help, but I'm experiencing some connectivity issues. Could you please try again in a moment?`,
          `Thanks for your question. I'm currently having trouble accessing my knowledge base. This is usually temporary. Could you try rephrasing your question or asking something else?`
        ];
        
        // Select a random fallback response
        const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
        const fallbackResponse = fallbackResponses[randomIndex];
        
        // Add the fallback response to the messages
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: fallbackResponse,
          timestamp: new Date(),
          id: generateId()
        }]);
        
        // Show some general options
        setOptions([
          { id: generateId(), text: 'Try again', action: 'retry', icon: <ArrowRightIcon className="h-4 w-4" /> },
          { id: generateId(), text: 'Ask something else', action: 'different', icon: <SparklesIcon className="h-4 w-4" /> }
        ]);
        setShowOptions(true);
      }
    } catch (error) {
      console.error('General error in message processing:', error);
      
      // Add a general error message for unexpected issues
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an unexpected issue. Please try again in a moment.',
        timestamp: new Date(),
        id: generateId()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to generate contextual options based on message content
  const generateOptionsBasedOnContent = (aiResponse: string, userMessage: string) => {
    // Default options if we can't determine context
    let options: Option[] = [
      { id: generateId(), text: 'Can you tell me more?', action: 'tell-more', icon: <SparklesIcon className="h-4 w-4" /> },
      { id: generateId(), text: 'Show me examples', action: 'examples', icon: <BookOpenIcon className="h-4 w-4" /> },
      { id: generateId(), text: 'What should I do next?', action: 'next-steps', icon: <ArrowRightIcon className="h-4 w-4" /> }
    ];
    
    // Check for resume/CV context
    if (aiResponse.toLowerCase().includes('resume') || 
        aiResponse.toLowerCase().includes('cv') ||
        userMessage.toLowerCase().includes('resume') ||
        userMessage.toLowerCase().includes('cv')) {
      
      options = [
        { id: generateId(), text: 'Resume sections', action: 'resume-section', icon: <PenToolIcon className="h-4 w-4" /> },
        { id: generateId(), text: 'Common mistakes', action: 'resume-mistakes', icon: <TargetIcon className="h-4 w-4" /> },
        { id: generateId(), text: 'Get feedback', action: 'resume-feedback', icon: <SparklesIcon className="h-4 w-4" /> }
      ];
    }
    // Check for interview context
    else if (aiResponse.toLowerCase().includes('interview') ||
             userMessage.toLowerCase().includes('interview')) {
      
      options = [
        { id: generateId(), text: 'Common questions', action: 'common-questions', icon: <PenToolIcon className="h-4 w-4" /> },
        { id: generateId(), text: 'Preparation tips', action: 'interview-prep', icon: <TargetIcon className="h-4 w-4" /> },
        { id: generateId(), text: 'How to answer', action: 'answer-format', icon: <SparklesIcon className="h-4 w-4" /> }
      ];
    }
    // Check for stress/wellbeing context
    else if (aiResponse.toLowerCase().includes('stress') ||
             aiResponse.toLowerCase().includes('wellbeing') ||
             aiResponse.toLowerCase().includes('anxiety') ||
             userMessage.toLowerCase().includes('stress') ||
             userMessage.toLowerCase().includes('wellbeing') ||
             userMessage.toLowerCase().includes('anxiety')) {
      
      options = [
        { id: generateId(), text: 'Stress techniques', action: 'stress-techniques', icon: <HeartIcon className="h-4 w-4" /> },
        { id: generateId(), text: 'Work-life balance', action: 'work-balance', icon: <TargetIcon className="h-4 w-4" /> },
        { id: generateId(), text: 'Breathing exercise', action: 'breathing', icon: <TimerIcon className="h-4 w-4" /> }
      ];
    }
    
    return options;
  };

  // Generate initial options based on user's stated need
  const generateInitialOptions = (need: string): Option[] => {
    const needLower = need.toLowerCase();
    
    if (needLower.includes('career') || needLower.includes('job') || needLower.includes('resume')) {
      return [
        { id: generateId(), text: 'Resume Help', action: 'resume', icon: <PenToolIcon className="h-4 w-4" /> },
        { id: generateId(), text: 'Interview Prep', action: 'interview', icon: <SparklesIcon className="h-4 w-4" /> },
        { id: generateId(), text: 'Job Search Tips', action: 'job-search', icon: <SearchIcon className="h-4 w-4" /> }
      ];
    } else if (needLower.includes('wellbeing') || needLower.includes('stress') || needLower.includes('anxiety')) {
      return [
        { id: generateId(), text: 'Stress Management', action: 'stress', icon: <TimerIcon className="h-4 w-4" /> },
        { id: generateId(), text: 'Work-Life Balance', action: 'work-life', icon: <HeartIcon className="h-4 w-4" /> },
        { id: generateId(), text: 'Mindfulness Tips', action: 'mindfulness', icon: <SparklesIcon className="h-4 w-4" /> }
      ];
    } else if (needLower.includes('skill') || needLower.includes('learn')) {
      return [
        { id: generateId(), text: 'Technical Skills', action: 'technical-skills', icon: <PenToolIcon className="h-4 w-4" /> },
        { id: generateId(), text: 'Soft Skills', action: 'soft-skills', icon: <SparklesIcon className="h-4 w-4" /> },
        { id: generateId(), text: 'Learning Resources', action: 'learning', icon: <BookOpenIcon className="h-4 w-4" /> }
      ];
    } else {
      // Default options if we can't determine specific need
      return [
        { id: generateId(), text: 'Career Guidance', action: 'career', icon: <BriefcaseIcon className="h-4 w-4" /> },
        { id: generateId(), text: 'Wellbeing Support', action: 'wellbeing', icon: <HeartIcon className="h-4 w-4" /> },
        { id: generateId(), text: 'Skill Development', action: 'skills', icon: <TargetIcon className="h-4 w-4" /> }
      ];
    }
  };

  // Main processing function for all messages
  const processMessage = (messageText: string) => {
    // Create user message
    const userMessage = {
      role: 'user' as const,
      content: messageText,
      timestamp: new Date(),
      id: generateId()
    }
    
    // Add the user message to the state unconditionally here
    setMessages(prev => [...prev, userMessage]);
    
    // Process based on onboarding stage
    if (onboardingStep !== 'complete') {
      processOnboardingInput(messageText, userMessage)
    } else {
      processRegularMessage(messageText, userMessage)
    }
  }

  // Handle option button clicks
  const handleOptionClick = (option: Option) => {
    // Process as if user had typed the option text
    processMessage(option.text)
  }

  // Get the appropriate placeholder text based on onboarding step
  const getPlaceholderText = () => {
    switch(onboardingStep) {
      case 'name':
        return "Enter your name..."
      case 'occupation':
        return "Enter your occupation..."
      case 'age':
        return "Enter your age range..."
      case 'need':
        return "What do you need help with?"
      default:
        return "Type your message..."
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-b from-purple-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
      {showWelcome ? (
        <WelcomeScreen onBegin={() => setShowWelcome(false)} />
      ) : (
        <>
          {/* Make this container align content to the bottom */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-hide flex flex-col" id="chat-messages">
            {/* Add a spacer div that pushes content down when there are few messages */}
            <div className="flex-grow min-h-[30px]"></div>
            <div className="max-w-3xl mx-auto w-full py-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  messageId={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                  isLoading={false}
                  onFeedback={handleFeedback}
                />
              ))}
              
              {isLoading && (
                <ChatMessage
                  role="assistant"
                  content=""
                  isLoading={true}
                />
              )}
              
              {showResourcesHint && (
                <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg text-center">
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">
                    Visit our Resources Page
                  </h3>
                  <p className="text-blue-700 dark:text-blue-400 mb-4">
                    Our Resources page has tools for career development, job search platforms, wellbeing exercises, and more.
                  </p>
                  <Link href="/resources">
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => setShowResourcesHint(false)}
                    >
                      Explore Resources
                    </Button>
                  </Link>
                </div>
              )}
              
              {showBreathingExercise && (
                <div className="my-4">
                  <BreathingExercise onClose={() => setShowBreathingExercise(false)} />
                </div>
              )}
              
              {showOptions && typingComplete && (
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {options.map((option) => (
                    <ChatOption
                      key={option.id}
                      text={option.text}
                      onClick={() => handleOptionClick(option)}
                      icon={option.icon}
                    />
                  ))}
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <ChatInput
            onSendMessage={processMessage}
            isLoading={isLoading}
            placeholder={getPlaceholderText()}
            onboardingStep={onboardingStep}
          />
        </>
      )}
      
      {/* Removed floating help buttons */}
    </div>
  )
}
