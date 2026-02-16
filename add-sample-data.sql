-- Get column IDs for reference
DO $$
DECLARE
  backlog_id UUID;
  in_progress_id UUID;
  done_id UUID;
  archived_id UUID;
BEGIN
  SELECT id INTO backlog_id FROM kanban_columns WHERE name = 'Backlog';
  SELECT id INTO in_progress_id FROM kanban_columns WHERE name = 'In Progress';
  SELECT id INTO done_id FROM kanban_columns WHERE name = 'Done';
  SELECT id INTO archived_id FROM kanban_columns WHERE name = 'Archived';

  -- Sample Kanban Cards
  INSERT INTO kanban_cards (column_id, title, description, priority, tags, position, time_estimate) VALUES
  (in_progress_id, 'Build Mission Control v2.0', 'Redesign with grid layout, sidebar navigation, and better data visualization', 'urgent', ARRAY['development', 'design'], 0, 240),
  (backlog_id, 'Setup Daily Briefing Integration', 'Connect morning briefings to the dashboard viewer', 'high', ARRAY['integration', 'automation'], 0, 120),
  (backlog_id, 'Add Business Ideas from /last30days', 'Import trending business opportunities from research', 'medium', ARRAY['research', 'business'], 1, 60),
  (done_id, 'Deploy to Production', 'Vercel deployment with Supabase integration', 'high', ARRAY['deployment', 'devops'], 0, 90),
  (done_id, 'Create Sample Data', 'Populate dashboard with realistic examples', 'low', ARRAY['setup'], 1, 30);

END $$;

-- Sample Tasks
INSERT INTO tasks (title, description, due_date, completed, time_estimate) VALUES
('Review geco.design SEO strategy', 'Analyze current SEO performance and identify improvements', CURRENT_DATE + INTERVAL '3 days', false, 150),
('Research AI tools for designers', 'Use /last30days to find trending tools', CURRENT_DATE + INTERVAL '1 day', false, 60),
('Update client portfolio', 'Add recent projects to website', CURRENT_DATE + INTERVAL '7 days', false, 180),
('Morning briefing review', 'Check crypto, calendar, news', CURRENT_DATE, true, 30);

-- Sample Business Ideas
INSERT INTO business_ideas (title, description, status, rating, tags) VALUES
('AI Website Audit Tool', 'Automated website performance analysis tool (like the one we built for geco)', 'researching', 4, ARRAY['saas', 'web-design', 'automation']),
('Framer Templates for UK Construction', 'Pre-designed website templates for architects, surveyors, planners', 'idea', 5, ARRAY['design', 'templates', 'construction']),
('Low-Code Website Builder for SMEs', 'Simplified website builder targeting UK small businesses', 'idea', 3, ARRAY['saas', 'web-design']),
('Notion Templates for Designers', 'Productivity templates specifically for design workflows', 'shelved', 2, ARRAY['productivity', 'templates']),
('AI Logo Generator API', 'White-label logo generation service for agencies', 'testing', 4, ARRAY['ai', 'design', 'api']);

-- Sample Daily Briefings
INSERT INTO daily_briefings (date, content, business_ideas, tasks) VALUES
(CURRENT_DATE, 
 E'**Crypto & Markets**\nBTC: $66,905 (-3.21% 24h) - Notable drop from ~$69k\n\n**Calendar**\nNo events today\n\n**Weather**\nLondon: 9°C, overcast\n\n**News & Insights**\n• Discord requiring face scan/ID for full access\n• Frontier AI agents violate ethics 30-50% when pressured\n• Rust/C Mistral speech-to-text model running in browsers',
 ARRAY['AI-powered website audit tool', 'Framer templates for UK construction sector'],
 ARRAY['Review SEO strategy (due in 3 days)', 'Research AI tools for designers (in progress)']),
(CURRENT_DATE - INTERVAL '1 day',
 E'**Crypto & Markets**\nBTC: $68,966 (-0.82% 24h) - Stable around $69k\n\n**Calendar**\nSpurs vs Newcastle 7:30pm TNT Sports\n\n**Weather**\nLondon: 8°C, overcast\n\n**News & Insights**\n• OpenAI releases new reasoning model\n• UK announces AI regulation framework\n• Construction sector sees 12% growth',
 ARRAY['Low-code builder for UK SMEs', 'API marketplace for design agencies'],
 ARRAY['Morning briefing completed', 'Client portfolio updates scheduled']);

-- Sample Projects
INSERT INTO projects (name, description, start_date, end_date, progress) VALUES
('Geco.design Redesign', 'Refresh website with new service pages and improved SEO', CURRENT_DATE - INTERVAL '14 days', CURRENT_DATE + INTERVAL '30 days', 45),
('Mission Control Dashboard', 'Build productivity hub for Alex & MiniMe', CURRENT_DATE - INTERVAL '1 day', CURRENT_DATE + INTERVAL '7 days', 75),
('Client: Architect Portfolio', 'New website for London-based architecture firm', CURRENT_DATE - INTERVAL '7 days', CURRENT_DATE + INTERVAL '21 days', 30);

-- Sample Milestones
INSERT INTO project_milestones (project_id, title, due_date, completed, position) VALUES
((SELECT id FROM projects WHERE name = 'Mission Control Dashboard'), 'Deploy to Vercel', CURRENT_DATE, true, 0),
((SELECT id FROM projects WHERE name = 'Mission Control Dashboard'), 'Add sample data', CURRENT_DATE, true, 1),
((SELECT id FROM projects WHERE name = 'Mission Control Dashboard'), 'Redesign with grid layout', CURRENT_DATE + INTERVAL '2 days', false, 2),
((SELECT id FROM projects WHERE name = 'Geco.design Redesign'), 'Service pages complete', CURRENT_DATE + INTERVAL '5 days', false, 0),
((SELECT id FROM projects WHERE name = 'Geco.design Redesign'), 'Blog section live', CURRENT_DATE + INTERVAL '15 days', false, 1);

-- Sample Quick Notes
INSERT INTO quick_notes (content) VALUES
('Remember to check Tottenham match schedule weekly - important for briefings'),
('Business idea: AI-powered competitor analysis tool for web designers'),
('Need to explore Brave Search API for /last30days web search integration');
