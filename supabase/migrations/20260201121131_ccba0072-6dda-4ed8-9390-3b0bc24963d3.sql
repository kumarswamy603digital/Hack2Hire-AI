-- Create assessment_history table for tracking progress
CREATE TABLE public.assessment_history (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    session_id UUID NOT NULL DEFAULT gen_random_uuid(),
    assessment_type TEXT NOT NULL CHECK (assessment_type IN ('resume', 'jd', 'interview', 'practice', 'coding')),
    skill_area TEXT,
    difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
    score INTEGER CHECK (score >= 0 AND score <= 100),
    time_taken_seconds INTEGER,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create industry_benchmarks table for comparison data
CREATE TABLE public.industry_benchmarks (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    skill_area TEXT NOT NULL,
    role_level TEXT NOT NULL CHECK (role_level IN ('junior', 'mid', 'senior', 'lead')),
    industry TEXT NOT NULL DEFAULT 'technology',
    average_score INTEGER NOT NULL,
    percentile_25 INTEGER NOT NULL,
    percentile_50 INTEGER NOT NULL,
    percentile_75 INTEGER NOT NULL,
    sample_size INTEGER NOT NULL DEFAULT 1000,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.assessment_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_benchmarks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for assessment_history
CREATE POLICY "Users can view their own history"
ON public.assessment_history FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own history"
ON public.assessment_history FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all history"
ON public.assessment_history FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for benchmarks (public read)
CREATE POLICY "Anyone can view benchmarks"
ON public.industry_benchmarks FOR SELECT
USING (true);

CREATE POLICY "Admins can manage benchmarks"
ON public.industry_benchmarks FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create indexes for performance
CREATE INDEX idx_assessment_history_user_id ON public.assessment_history(user_id);
CREATE INDEX idx_assessment_history_created_at ON public.assessment_history(created_at DESC);
CREATE INDEX idx_assessment_history_type ON public.assessment_history(assessment_type);

-- Insert sample benchmark data
INSERT INTO public.industry_benchmarks (skill_area, role_level, industry, average_score, percentile_25, percentile_50, percentile_75, sample_size) VALUES
('JavaScript', 'junior', 'technology', 62, 45, 62, 78, 5000),
('JavaScript', 'mid', 'technology', 72, 58, 72, 85, 8000),
('JavaScript', 'senior', 'technology', 82, 70, 82, 92, 4000),
('React', 'junior', 'technology', 58, 40, 58, 72, 4500),
('React', 'mid', 'technology', 70, 55, 70, 82, 7000),
('React', 'senior', 'technology', 80, 68, 80, 90, 3500),
('TypeScript', 'junior', 'technology', 55, 38, 55, 70, 3000),
('TypeScript', 'mid', 'technology', 68, 52, 68, 80, 5500),
('TypeScript', 'senior', 'technology', 78, 65, 78, 88, 3000),
('Node.js', 'junior', 'technology', 60, 42, 60, 75, 4000),
('Node.js', 'mid', 'technology', 71, 56, 71, 83, 6500),
('Node.js', 'senior', 'technology', 81, 68, 81, 91, 3200),
('Python', 'junior', 'technology', 64, 48, 64, 78, 6000),
('Python', 'mid', 'technology', 74, 60, 74, 86, 9000),
('Python', 'senior', 'technology', 84, 72, 84, 93, 4500),
('SQL', 'junior', 'technology', 58, 40, 58, 72, 5500),
('SQL', 'mid', 'technology', 70, 55, 70, 82, 8500),
('SQL', 'senior', 'technology', 80, 67, 80, 90, 4200),
('System Design', 'mid', 'technology', 65, 48, 65, 78, 4000),
('System Design', 'senior', 'technology', 75, 60, 75, 87, 2500),
('Data Structures', 'junior', 'technology', 60, 42, 60, 75, 7000),
('Data Structures', 'mid', 'technology', 72, 58, 72, 84, 5500),
('Data Structures', 'senior', 'technology', 82, 70, 82, 92, 3000),
('Algorithms', 'junior', 'technology', 58, 40, 58, 73, 6500),
('Algorithms', 'mid', 'technology', 70, 55, 70, 82, 5000),
('Algorithms', 'senior', 'technology', 80, 68, 80, 90, 2800);

-- Enable realtime for history updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.assessment_history;