# Strive AI Assistant

![Strive AI Assistant](/public/strive-mascot.png)

A modern, responsive AI-powered assistant for career guidance and wellbeing support. Strive AI helps users navigate their professional development journey with personalized advice, resources, and emotional support.

> 📌 **View the complete case study at [navasmo.co.uk/projects/strive](https://navasmo.co.uk/projects/strive)**

## 🌟 Features

### Intelligent Conversational Interface
- **Personalized Chatbot**: Tailored responses based on user profile information
- **Context-Aware Conversations**: Maintains conversation history for meaningful interactions
- **Guided Onboarding**: Collects user information to personalize the experience

### Career Support
- **Career Assessment**: Helps users evaluate their career path and goals
- **Job Platform Integration**: Connects users with relevant job platforms
- **Resource Recommendations**: Suggests targeted learning resources

### Wellbeing Tools
- **Breathing Exercises**: Interactive guided breathing for stress reduction
- **Emotional Support**: Provides encouragement and positive reinforcement
- **Wellness Resources**: Curated resources for maintaining work-life balance

### User Experience
- **Responsive Design**: Fully responsive interface that works on all devices
- **Dark/Light Mode**: Supports system theme preferences
- **Animated UI**: Smooth animations and transitions for an engaging experience

### Upcoming Features
- **Supabase Integration**: Full backend integration with Supabase for data persistence
- **User Authentication**: Complete user authentication and profile management
- **Extended Resource Library**: Additional career and wellbeing resources

## 🛠️ Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router for optimized routing and page rendering
- **React 19**: Component-based UI development with hooks
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for smooth UI transitions
- **Radix UI**: Accessible component primitives
- **React Markdown**: For rendering markdown content in chat messages

### Backend & Integration
- **OpenAI API**: Powers the AI chat functionality using GPT-4o-mini
- **Next.js API Routes**: Serverless functions for API endpoints
- **Supabase** *(Upcoming)*: Backend-as-a-Service for authentication and database

### Development Tools
- **TypeScript**: Static typing for safer code
- **ESLint/Prettier**: Code quality and formatting
- **React Hook Form**: Form validation and management
- **Zod**: Schema validation
- **React Query**: Data fetching and caching

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/strive-ai-assistant.git
   cd strive-ai-assistant
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your environment variables
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   OPENAI_API_KEY=your-openai-api-key
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## 💬 How to Use the Chatbot

### Initial Setup
1. Click "Start a Conversation" on the welcome screen
2. Complete the onboarding process by providing your name, occupation, age, and needs
3. The assistant will create a personalized experience based on your information

### Chatting with Strive AI
- Type messages in the input field and press enter or click the send button
- Click on suggested options that appear for quick responses
- Use the clear button to start a new conversation

### Special Features
- Access the breathing exercise by typing "I need to relax" or similar phrases
- Get career resources by asking questions about job hunting or skills development
- Request a career assessment by typing "career assessment" or "help me with my career"

## 📁 Project Structure

```
strive-ai-assistant/
├── app/                  # Next.js App Router pages
│   ├── (protected)/      # Protected routes requiring auth
│   ├── (public)/         # Public routes
│   ├── api/              # API routes
│   └── chat/             # Chat interface page
├── components/
│   ├── chatbot/          # Chatbot-specific components
│   ├── ui/               # Reusable UI components
│   └── resources/        # Resource-related components
├── lib/
│   ├── supabase/         # Supabase client and utilities
│   └── utils.ts          # Utility functions
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 🔒 Privacy & Security

- User conversations are not stored permanently unless explicitly requested
- OpenAI API integration follows best practices for data security
- Environment variables are used to secure API keys

## 👨‍💻 About the Developer

**Navas Mohamed** is a Digital Product Coordinator based in London with a passion for creating intuitive, user-centered digital experiences. With a background in Creative Computing, Navas blends technical knowledge with creative problem-solving to build products that genuinely meet user needs.

**Visit [navasmo.co.uk](https://navasmo.co.uk) to learn more **

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- OpenAI for providing the GPT models
- The Next.js team for the excellent framework
- All open-source contributors whose libraries make this project possible
