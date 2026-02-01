-- Create table for storing candidate assessments
CREATE TABLE public.candidate_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  assessment_type TEXT NOT NULL, -- 'interview', 'coding', 'practice', 'resume'
  scores JSONB NOT NULL DEFAULT '{}',
  feedback TEXT,
  duration_seconds INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.candidate_assessments ENABLE ROW LEVEL SECURITY;

-- Candidates can view their own assessments
CREATE POLICY "Users can view their own assessments"
ON public.candidate_assessments
FOR SELECT
USING (auth.uid() = user_id);

-- Candidates can insert their own assessments
CREATE POLICY "Users can insert their own assessments"
ON public.candidate_assessments
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Recruiters and admins can view all assessments
CREATE POLICY "Recruiters can view all assessments"
ON public.candidate_assessments
FOR SELECT
USING (public.has_role(auth.uid(), 'recruiter'));

CREATE POLICY "Admins can view all assessments"
ON public.candidate_assessments
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can manage all assessments
CREATE POLICY "Admins can manage assessments"
ON public.candidate_assessments
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create index for faster lookups
CREATE INDEX idx_assessments_user_id ON public.candidate_assessments(user_id);
CREATE INDEX idx_assessments_type ON public.candidate_assessments(assessment_type);
CREATE INDEX idx_assessments_completed_at ON public.candidate_assessments(completed_at DESC);