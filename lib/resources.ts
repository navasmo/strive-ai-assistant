// Define a common interface for all resources
interface Resource {
  title: string;
  url: string;
  description: string;
  id: string;
  keywords?: string[];
  category?: string;
}

// Default career and wellbeing resources
export const defaultResources: Resource[] = [
  {
    title: "Skills Assessment",
    url: "https://nationalcareers.service.gov.uk/skills-assessment",
    description: "Discover your skills and career options with a free assessment",
    id: "resource-skills-assessment",
    keywords: ["skills", "strengths", "assessment", "discover", "abilities"]
  },
  {
    title: "Explore Careers",
    url: "https://nationalcareers.service.gov.uk/explore-careers",
    description: "Find detailed information on different career paths",
    id: "resource-explore-careers",
    keywords: ["careers", "job roles", "professions", "explore", "options"]
  },
  {
    title: "Find a Course",
    url: "https://nationalcareers.service.gov.uk/find-a-course",
    description: "Search for courses to develop your skills",
    id: "resource-find-course",
    keywords: ["course", "training", "education", "learn", "study", "upskill"]
  },
  {
    title: "Managing Stress",
    url: "https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/stress/",
    description: "NHS advice on understanding and managing stress",
    id: "resource-stress-management",
    keywords: ["stress", "overwhelmed", "pressure", "burnout", "coping"]
  },
  {
    title: "Anxiety Support",
    url: "https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/anxiety-fear-panic/",
    description: "Information and support for anxiety, fear and panic",
    id: "resource-anxiety",
    keywords: ["anxiety", "worry", "panic", "fear", "nervous"]
  }
];

// Career-focused resources with specific categories
export const careerResources: Resource[] = [
  {
    title: "Discover Your Skills and Careers",
    url: "https://nationalcareers.service.gov.uk/discover-your-skills-and-careers",
    description: "Take an assessment to find careers that match your skills and interests",
    id: "resource-skills-careers",
    category: "assessment"
  },
  {
    title: "Job Sectors",
    url: "https://nationalcareers.service.gov.uk/explore-careers/job-sector",
    description: "Browse careers by industry sector",
    id: "resource-job-sectors",
    category: "exploration"
  },
  {
    title: "CV Builder",
    url: "https://nationalcareers.service.gov.uk/get-a-job/cv-sections",
    description: "Learn how to create an effective CV",
    id: "resource-cv-builder",
    category: "applications"
  },
  {
    title: "Interview Preparation",
    url: "https://nationalcareers.service.gov.uk/get-a-job/interview-advice",
    description: "Tips and advice for successful job interviews",
    id: "resource-interviews",
    category: "applications"
  },
  {
    title: "Career Change",
    url: "https://nationalcareers.service.gov.uk/change-careers",
    description: "Guidance on changing careers and transferring skills",
    id: "resource-career-change",
    category: "development"
  },
  {
    title: "Local Help",
    url: "https://nationalcareers.service.gov.uk/contact-us",
    description: "Get personalized career advice from experts",
    id: "resource-local-help",
    category: "support"
  }
];

// Wellbeing-focused resources with specific categories
export const wellbeingResources: Resource[] = [
  {
    title: "Depression Support",
    url: "https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/low-mood-sadness-depression/",
    description: "Help for dealing with low mood, sadness and depression",
    id: "resource-depression",
    category: "mental_health"
  },
  {
    title: "Anxiety and Panic",
    url: "https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/anxiety-fear-panic/",
    description: "NHS guidance on managing anxiety, fear and panic",
    id: "resource-anxiety-detailed",
    category: "mental_health"
  },
  {
    title: "Stress Management",
    url: "https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/stress/",
    description: "Understand and manage stress effectively",
    id: "resource-stress-detailed",
    category: "work_life_balance"
  },
  {
    title: "NHS Mental Health Support",
    url: "https://www.nhs.uk/mental-health/",
    description: "Comprehensive NHS mental health and wellbeing resources",
    id: "resource-nhs-mental-health",
    category: "support"
  },
  {
    title: "Breathing Exercises for Stress",
    url: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/",
    description: "Simple breathing techniques to reduce stress",
    id: "resource-breathing",
    category: "techniques"
  },
  {
    title: "Mental Wellbeing Audio Guides",
    url: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/mental-wellbeing-audio-guides/",
    description: "Audio guides to boost your mood",
    id: "resource-audio-guides",
    category: "techniques"
  }
];

// Helper function to find resources by keywords
export function findResourcesByKeywords(keywords: string[], maxResults: number = 3): Resource[] {
  const allResources: Resource[] = [...defaultResources, ...careerResources, ...wellbeingResources];
  const matches: {resource: Resource, score: number}[] = [];
  
  // Lowercase all the search keywords
  const searchTerms = keywords.map(k => k.toLowerCase());
  
  allResources.forEach(resource => {
    let score = 0;
    
    // Check title and description
    const title = resource.title.toLowerCase();
    const description = resource.description.toLowerCase();
    
    // Check for matches in title and description
    searchTerms.forEach(term => {
      if (title.includes(term)) score += 3;
      if (description.includes(term)) score += 2;
    });
    
    // Check for matches in keywords array if present
    if (resource.keywords) {
      resource.keywords.forEach(keyword => {
        searchTerms.forEach(term => {
          if (keyword.toLowerCase().includes(term) || term.includes(keyword.toLowerCase())) {
            score += 2;
          }
        });
      });
    }
    
    // Check for matches in category if present
    if (resource.category) {
      searchTerms.forEach(term => {
        if (resource.category && resource.category.toLowerCase().includes(term)) {
          score += 1;
        }
      });
    }
    
    if (score > 0) {
      matches.push({resource, score});
    }
  });
  
  // Sort by score descending and return the top results
  const sortedMatches = [...matches].sort((a, b) => b.score - a.score);
  return sortedMatches.slice(0, maxResults).map(match => match.resource);
}
