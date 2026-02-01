export interface ParsedContact {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
}

export interface ParsedSkills {
  technical: string[];
  soft: string[];
  tools: string[];
}

export interface ParsedExperience {
  company: string;
  title: string;
  dates: string;
  achievements: string[];
}

export interface ParsedEducation {
  institution: string;
  degree: string;
  dates: string;
  gpa?: string;
}

export interface ParsedResume {
  contact: ParsedContact;
  summary: string;
  skills: ParsedSkills;
  experience: ParsedExperience[];
  education: ParsedEducation[];
  certifications: string[];
  rawText?: string;
}
