import type { EmailTemplate, TemplateTone } from "../../types/templates"

export const emailTemplates: EmailTemplate[] = [
  {
    id: "software-engineer-direct",
    name: "Software Engineer - Direct Approach",
    category: "Engineering",
    description: "Straightforward introduction highlighting technical skills and experience",
    targetRole: "Software Engineer",
    tone: "professional",
    subjectLine: "Software Engineer interested in {companyName}'s mission",
    content: `Hi {firstName},

I'm a Software Engineer with {experience} years of experience in {techStack}. I've been following {companyName}'s journey and I'm really excited about your mission to {companyMission}.

I'd love to explore opportunities to contribute to your engineering team. Here's what I bring:

• {experience}+ years in {primaryTech}
• Experience with {secondaryTech}
• {achievement}

I'd appreciate the chance to discuss how I can add value to your team. Would you be open to a brief conversation?

Best regards,
{yourName}

P.S. I particularly admire {specificCompanyDetail} - it aligns perfectly with my passion for {yourPassion}.`,
    followUpSequence: [
      {
        step: 1,
        delay: 5,
        subjectLine: "Following up on Software Engineer opportunity at {companyName}",
        content: `Hi {firstName},

I wanted to follow up on my previous email about Software Engineer opportunities at {companyName}. 

I understand you're probably very busy, so I'll keep this brief. I'm genuinely excited about the possibility of contributing to {companyName}'s engineering team.

Would you have 15 minutes this week for a quick chat about potential opportunities?

Best,
{yourName}`
      },
      {
        step: 2,
        delay: 10,
        subjectLine: "Quick project showcase for {companyName}",
        content: `Hi {firstName},

I hope this finds you well. I just wanted to share a quick project I built that might be relevant to {companyName}'s tech stack: {projectLink}

The project demonstrates {projectDescription} and uses {techStack} - technologies I noticed {companyName} uses.

Would love to get your thoughts when you have a moment.

Best,
{yourName}`
      }
    ],
    tags: ["engineering", "direct", "technical"],
    successRate: 12.5
  },
  {
    id: "software-engineer-personal",
    name: "Software Engineer - Personal Connection",
    category: "Engineering", 
    description: "Building personal connection through company research and shared values",
    targetRole: "Software Engineer",
    tone: "personal",
    subjectLine: "Inspired by {companyName}'s approach to {companyFocus}",
    content: `Hello {firstName},

I've been following {companyName}'s journey and I'm particularly impressed by {specificAchievement}. Your approach to {companyFocus} really resonates with my own values as a developer.

As a passionate {roleType} with {experience} years of experience, I believe my background in {techStack} could add value to your team. I've worked on projects involving:

• {project1Description}
• {project2Description}  
• {project3Description}

I'd love to learn more about the challenges your engineering team is tackling and explore how I might contribute. Would you be open to a conversation?

Looking forward to hearing from you,
{yourName}`,
    followUpSequence: [
      {
        step: 1,
        delay: 7,
        subjectLine: "Re: {companyName} engineering opportunities",
        content: `Hi {firstName},

I wanted to circle back on my previous message about engineering opportunities at {companyName}.

I've been diving deeper into {companyProduct} and I'm even more excited about the problems you're solving. The way you've approached {technicalChallenge} is particularly impressive.

Would you have a few minutes to discuss potential fit for your team?

Best,
{yourName}`
      }
    ],
    tags: ["engineering", "personal", "research-based"],
    successRate: 15.2
  },
  {
    id: "product-manager-strategic",
    name: "Product Manager - Strategic Focus",
    category: "Product",
    description: "Emphasizing product strategy and user-focused approach",
    targetRole: "Product Manager",
    tone: "professional",
    subjectLine: "Product Manager passionate about {industryFocus}",
    content: `Hi {firstName},

I've been tracking {companyName}'s product evolution and I'm impressed by how you've {productAchievement}. Your focus on {userValue} aligns perfectly with my approach to product management.

With {experience} years in product management, I've led products from concept to scale, including:

• {productExample1}
• {productExample2}
• {productExample3}

I'd love to discuss how my experience in {domain} could contribute to {companyName}'s continued growth. Are you open to a brief conversation about product opportunities?

Best regards,
{yourName}`,
    tags: ["product", "strategic", "user-focused"],
    successRate: 11.8
  },
  {
    id: "data-scientist-analytical",
    name: "Data Scientist - Analytical Approach",
    category: "Data Science",
    description: "Highlighting analytical skills and data-driven decision making",
    targetRole: "Data Scientist",
    tone: "professional",
    subjectLine: "Data Scientist excited about {companyName}'s data initiatives",
    content: `Hi {firstName},

I came across {companyName}'s recent work on {dataInitiative} and I'm fascinated by your approach to {dataProblem}. As a Data Scientist with {experience} years of experience, I'd love to contribute to your data-driven initiatives.

My background includes:

• {skillSet1} with {results1}
• {skillSet2} achieving {results2}
• {skillSet3} leading to {results3}

I'm particularly interested in how {companyName} is leveraging {dataType} to drive {businessOutcome}. Would you be open to discussing data science opportunities at {companyName}?

Best,
{yourName}`,
    tags: ["data-science", "analytical", "results-driven"],
    successRate: 9.7
  },
  {
    id: "frontend-developer-creative",
    name: "Frontend Developer - Creative Focus",
    category: "Engineering",
    description: "Emphasizing UI/UX skills and creative problem solving",
    targetRole: "Frontend Developer",
    tone: "casual",
    subjectLine: "Frontend Developer loving {companyName}'s user experience",
    content: `Hey {firstName},

I've been using {companyProduct} and I'm blown away by the user experience! The way you've handled {uiFeature} is particularly elegant.

As a Frontend Developer with {experience} years of experience in {techStack}, I'm passionate about creating intuitive user interfaces. Some highlights from my work:

• Built {project1} with {technology1}
• Improved {metric} by {improvement}%
• Led redesign of {project2} resulting in {outcome}

I'd love to chat about frontend opportunities at {companyName} and how I could contribute to your amazing user experience.

Cheers,
{yourName}`,
    tags: ["frontend", "creative", "ux-focused"],
    successRate: 13.4
  },
  {
    id: "startup-enthusiast",
    name: "Startup Enthusiast - Growth Stage",
    category: "General",
    description: "Perfect for reaching out to startups and fast-growing companies",
    targetRole: "Various",
    tone: "direct",
    subjectLine: "Excited to contribute to {companyName}'s growth journey",
    content: `Hi {firstName},

I've been following {companyName} since your {fundingRound} and I'm excited about your mission to {companyMission}. The growth you've achieved in {timeframe} is impressive!

As someone passionate about {industry} and with experience in {roleType}, I'd love to contribute to your continued success. My background includes:

• {achievement1}
• {achievement2}
• {achievement3}

I thrive in fast-paced environments and love the challenge of scaling products and teams. Would you be open to discussing opportunities at {companyName}?

Best,
{yourName}`,
    tags: ["startup", "growth", "scaling"],
    successRate: 14.1
  },
  {
    id: "career-changer-motivated",
    name: "Career Changer - Motivated Transition",
    category: "Career Transition",
    description: "For professionals transitioning into tech from other industries",
    targetRole: "Various",
    tone: "personal",
    subjectLine: "Career changer passionate about joining {companyName}",
    content: `Hi {firstName},

I'm making a transition into tech from {previousIndustry}, and {companyName} represents exactly the kind of innovative company I want to contribute to.

While my background is in {previousRole}, I've been actively developing my skills in {newSkills}:

• Completed {course/bootcamp} in {technology}
• Built {project} demonstrating {skills}
• {additionalPreparation}

I bring {transferableSkills} from my {previousIndustry} experience, which I believe could add unique value to your team. Would you be open to discussing entry-level opportunities?

Thank you for your time,
{yourName}`,
    tags: ["career-change", "motivated", "entry-level"],
    successRate: 8.9
  },
  {
    id: "remote-work-focused",
    name: "Remote Work Specialist",
    category: "Remote",
    description: "Highlighting remote work experience and distributed team collaboration",
    targetRole: "Various",
    tone: "professional",
    subjectLine: "Remote {targetRole} excited about {companyName}'s distributed culture",
    content: `Hi {firstName},

I noticed that {companyName} has embraced remote work, and I'm excited about the opportunity to contribute to your distributed team.

With {experience} years of remote work experience, I've mastered the art of asynchronous collaboration and building strong relationships across time zones. My remote work achievements include:

• {remoteAchievement1}
• {remoteAchievement2}
• {remoteAchievement3}

I'm particularly drawn to {companyName} because of {remoteWorkValue}. Would you be interested in discussing {targetRole} opportunities for your remote team?

Best regards,
{yourName}`,
    tags: ["remote", "distributed", "collaboration"],
    successRate: 10.3
  }
]

export const templateCategories = [
  "All Templates",
  "Engineering", 
  "Product",
  "Data Science",
  "Career Transition",
  "Remote",
  "General"
]

export const templateTones: TemplateTone[] = [
  "professional",
  "casual", 
  "direct",
  "personal"
]

export function getTemplatesByCategory(category: string): EmailTemplate[] {
  if (category === "All Templates") {
    return emailTemplates
  }
  return emailTemplates.filter(template => template.category === category)
}

export function getTemplatesByTone(tone: TemplateTone): EmailTemplate[] {
  return emailTemplates.filter(template => template.tone === tone)
}

export function getTemplateById(id: string): EmailTemplate | undefined {
  return emailTemplates.find(template => template.id === id)
}