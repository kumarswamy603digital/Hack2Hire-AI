import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface AssessmentData {
  candidateName?: string;
  date: Date;
  type: 'resume' | 'jd' | 'interview' | 'practice' | 'coding';
  overallScore?: number;
  sections: {
    title: string;
    score?: number;
    items: string[];
  }[];
  recommendations?: string[];
  benchmarks?: {
    label: string;
    yourScore: number;
    average: number;
  }[];
}

export const generateAssessmentPDF = (data: AssessmentData): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Colors
  const primaryColor: [number, number, number] = [59, 130, 246]; // blue-500
  const accentColor: [number, number, number] = [20, 184, 166]; // teal-500
  const textColor: [number, number, number] = [30, 41, 59]; // slate-800
  const mutedColor: [number, number, number] = [100, 116, 139]; // slate-500
  
  let yPosition = 20;
  
  // Header with gradient-like effect
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 45, 'F');
  
  // Logo/Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('AssessAI', 20, 25);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('AI-Powered Assessment Report', 20, 35);
  
  // Date on right
  doc.setFontSize(10);
  doc.text(data.date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }), pageWidth - 20, 25, { align: 'right' });
  
  yPosition = 60;
  
  // Candidate Info Section
  if (data.candidateName) {
    doc.setTextColor(...textColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Candidate:', 20, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(data.candidateName, 55, yPosition);
    yPosition += 10;
  }
  
  // Assessment Type
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Assessment Type:', 20, yPosition);
  doc.setFont('helvetica', 'normal');
  const typeLabels: Record<string, string> = {
    resume: 'Resume Analysis',
    jd: 'Job Description Analysis',
    interview: 'Technical Interview',
    practice: 'Practice Session',
    coding: 'Coding Challenge'
  };
  doc.text(typeLabels[data.type] || data.type, 65, yPosition);
  yPosition += 15;
  
  // Overall Score Badge
  if (data.overallScore !== undefined) {
    // Score circle
    const scoreX = pageWidth / 2;
    const scoreColor: [number, number, number] = data.overallScore >= 70 
      ? [34, 197, 94] // green-500
      : data.overallScore >= 50 
        ? [234, 179, 8] // yellow-500
        : [239, 68, 68]; // red-500
    
    doc.setFillColor(...scoreColor);
    doc.circle(scoreX, yPosition + 15, 18, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(data.overallScore.toString(), scoreX, yPosition + 18, { align: 'center' });
    
    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    doc.text('Overall Score', scoreX, yPosition + 38, { align: 'center' });
    
    yPosition += 55;
  }
  
  // Sections
  data.sections.forEach((section, index) => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Section header
    doc.setFillColor(...(index % 2 === 0 ? primaryColor : accentColor));
    doc.rect(20, yPosition, pageWidth - 40, 8, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(section.title, 25, yPosition + 6);
    
    if (section.score !== undefined) {
      doc.text(`Score: ${section.score}/100`, pageWidth - 25, yPosition + 6, { align: 'right' });
    }
    
    yPosition += 15;
    
    // Section items
    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    section.items.forEach(item => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Bullet point
      doc.setFillColor(...accentColor);
      doc.circle(25, yPosition - 1, 1.5, 'F');
      
      // Wrap text if too long
      const lines = doc.splitTextToSize(item, pageWidth - 60);
      doc.text(lines, 32, yPosition);
      yPosition += lines.length * 5 + 3;
    });
    
    yPosition += 8;
  });
  
  // Benchmarks Table
  if (data.benchmarks && data.benchmarks.length > 0) {
    if (yPosition > 220) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setTextColor(...textColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Performance Benchmarks', 20, yPosition);
    yPosition += 10;
    
    autoTable(doc, {
      startY: yPosition,
      head: [['Metric', 'Your Score', 'Industry Avg', 'Difference']],
      body: data.benchmarks.map(b => [
        b.label,
        b.yourScore.toString(),
        b.average.toString(),
        `${b.yourScore >= b.average ? '+' : ''}${(b.yourScore - b.average).toFixed(0)}`
      ]),
      headStyles: { 
        fillColor: primaryColor,
        textColor: [255, 255, 255]
      },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      styles: { fontSize: 9 },
      margin: { left: 20, right: 20 }
    });
    
    yPosition = (doc as any).lastAutoTable.finalY + 15;
  }
  
  // Recommendations
  if (data.recommendations && data.recommendations.length > 0) {
    if (yPosition > 230) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setTextColor(...textColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Recommendations', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    data.recommendations.forEach((rec, i) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setTextColor(...accentColor);
      doc.text(`${i + 1}.`, 20, yPosition);
      doc.setTextColor(...textColor);
      
      const lines = doc.splitTextToSize(rec, pageWidth - 50);
      doc.text(lines, 30, yPosition);
      yPosition += lines.length * 5 + 5;
    });
  }
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...mutedColor);
    doc.text(
      `Generated by AssessAI • Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
  
  // Save the PDF
  const fileName = `AssessAI_${data.type}_${data.date.toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

// Helper to convert resume analysis to PDF format
export const exportResumeAnalysis = (analysis: any, candidateName?: string) => {
  generateAssessmentPDF({
    candidateName: candidateName || analysis.contact?.name,
    date: new Date(),
    type: 'resume',
    overallScore: analysis.overallScore,
    sections: [
      {
        title: 'Technical Skills',
        items: analysis.skills?.technical || []
      },
      {
        title: 'Tools & Frameworks',
        items: analysis.skills?.tools || []
      },
      {
        title: 'Soft Skills',
        items: analysis.skills?.soft || []
      },
      {
        title: 'Key Strengths',
        items: analysis.strengths || []
      },
      {
        title: 'Areas for Improvement',
        items: analysis.improvements || []
      }
    ],
    recommendations: analysis.recommendations,
    benchmarks: [
      { label: 'Technical Skills', yourScore: analysis.technicalScore || 75, average: 70 },
      { label: 'Experience Match', yourScore: analysis.experienceScore || 80, average: 72 },
      { label: 'Education', yourScore: analysis.educationScore || 85, average: 75 }
    ]
  });
};

// Helper to convert JD analysis to PDF format  
export const exportJDAnalysis = (analysis: any) => {
  generateAssessmentPDF({
    date: new Date(),
    type: 'jd',
    sections: [
      {
        title: 'Must-Have Requirements',
        items: analysis.mustHave || []
      },
      {
        title: 'Nice-to-Have Skills',
        items: analysis.niceToHave || []
      },
      {
        title: 'Role Level & Expectations',
        items: [
          `Role Level: ${analysis.roleLevel || 'Mid-Senior'}`,
          `Industry: ${analysis.industry || 'Technology'}`,
          ...(analysis.responsibilities || [])
        ]
      }
    ],
    recommendations: analysis.hiringTips
  });
};

// Helper to export interview results
export const exportInterviewResults = (results: any, candidateName?: string) => {
  generateAssessmentPDF({
    candidateName,
    date: new Date(),
    type: 'interview',
    overallScore: results.overallScore,
    sections: [
      {
        title: 'Technical Assessment',
        score: results.technicalScore,
        items: results.technicalFeedback || []
      },
      {
        title: 'Communication Skills',
        score: results.communicationScore,
        items: results.communicationFeedback || []
      },
      {
        title: 'Problem Solving',
        score: results.problemSolvingScore,
        items: results.problemSolvingFeedback || []
      },
      {
        title: 'Strengths Demonstrated',
        items: results.strengths || []
      },
      {
        title: 'Areas for Growth',
        items: results.areasForGrowth || []
      }
    ],
    recommendations: results.nextSteps,
    benchmarks: [
      { label: 'Technical', yourScore: results.technicalScore || 75, average: 68 },
      { label: 'Communication', yourScore: results.communicationScore || 80, average: 72 },
      { label: 'Problem Solving', yourScore: results.problemSolvingScore || 70, average: 65 }
    ]
  });
};

// Export practice session results
export const exportPracticeResults = (results: any, skill: string) => {
  generateAssessmentPDF({
    date: new Date(),
    type: 'practice',
    overallScore: results.score,
    sections: [
      {
        title: `${skill} Practice Session`,
        score: results.score,
        items: [`Difficulty: ${results.difficulty}`, `Time taken: ${results.timeTaken || 'N/A'}`]
      },
      {
        title: 'Strengths',
        items: results.strengths || []
      },
      {
        title: 'Areas to Improve',
        items: results.improvements || []
      },
      {
        title: 'Coaching Tips',
        items: results.coaching_tips || results.coachingTips || []
      }
    ],
    recommendations: [results.next_topic_suggestion || results.nextTopicSuggestion].filter(Boolean)
  });
};
