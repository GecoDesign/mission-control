-- Sample Kanban Cards
INSERT INTO kanban_cards (title, description, status, priority, tags) VALUES
('Build Mission Control v2.0', 'Redesign with grid layout, sidebar navigation, and better data visualization', 'in-progress', 'urgent', ARRAY['development', 'design']),
('Setup Daily Briefing Integration', 'Connect morning briefings to the dashboard viewer', 'backlog', 'high', ARRAY['integration', 'automation']),
('Add Business Ideas from /last30days', 'Import trending business opportunities from research', 'backlog', 'medium', ARRAY['research', 'business']),
('Deploy to Production', 'Vercel deployment with Supabase integration', 'done', 'high', ARRAY['deployment', 'devops']),
('Create Sample Data', 'Populate dashboard with realistic examples', 'done', 'low', ARRAY['setup']);

-- Sample Tasks
INSERT INTO tasks (title, description, due_date, status, priority, estimated_hours) VALUES
('Review geco.design SEO strategy', 'Analyze current SEO performance and identify improvements', CURRENT_DATE + INTERVAL '3 days', 'pending', 'high', 2.5),
('Research AI tools for designers', 'Use /last30days to find trending tools', CURRENT_DATE + INTERVAL '1 day', 'in-progress', 'medium', 1.0),
('Update client portfolio', 'Add recent projects to website', CURRENT_DATE + INTERVAL '7 days', 'pending', 'medium', 3.0),
('Morning briefing review', 'Check crypto, calendar, news', CURRENT_DATE, 'completed', 'high', 0.5);

-- Sample Business Ideas
INSERT INTO business_ideas (title, description, status, rating, tags, source) VALUES
('AI Website Audit Tool', 'Automated website performance analysis tool (like the one we built for geco)', 'researching', 4, ARRAY['saas', 'web-design', 'automation'], 'Internal build'),
('Framer Templates for UK Construction', 'Pre-designed website templates for architects, surveyors, planners', 'idea', 5, ARRAY['design', 'templates', 'construction'], 'Market research'),
('Low-Code Website Builder for SMEs', 'Simplified website builder targeting UK small businesses', 'idea', 3, ARRAY['saas', 'web-design'], '/last30days research'),
('Notion Templates for Designers', 'Productivity templates specifically for design workflows', 'shelved', 2, ARRAY['productivity', 'templates'], 'Community suggestion'),
('AI Logo Generator API', 'White-label logo generation service for agencies', 'testing', 4, ARRAY['ai', 'design', 'api'], 'Client feedback');

-- Sample Daily Briefings
INSERT INTO daily_briefings (date, crypto_summary, calendar_summary, weather_summary, news_summary, business_ideas, tasks_summary) VALUES
(CURRENT_DATE, 
 'BTC: $66,905 (-3.21% 24h) - Notable drop from ~$69k',
 'No events today',
 'London: 9°C, overcast',
 '• Discord requiring face scan/ID for full access\n• Frontier AI agents violate ethics 30-50% when pressured\n• Rust/C Mistral speech-to-text model running in browsers',
 '• AI-powered website audit tool (inspired by our recent build)\n• Framer templates for UK construction sector',
 '• Review SEO strategy (due in 3 days)\n• Research AI tools for designers (in progress)'),
(CURRENT_DATE - INTERVAL '1 day',
 'BTC: $68,966 (-0.82% 24h) - Stable around $69k',
 'Spurs vs Newcastle 7:30pm TNT Sports',
 'London: 8°C, overcast',
 '• OpenAI releases new reasoning model\n• UK announces AI regulation framework\n• Construction sector sees 12% growth',
 '• Low-code builder for UK SMEs\n• API marketplace for design agencies',
 '• Morning briefing completed\n• Client portfolio updates scheduled');

-- Sample Projects
INSERT INTO projects (name, description, status, start_date, target_date, progress, tags) VALUES
('Geco.design Redesign', 'Refresh website with new service pages and improved SEO', 'active', CURRENT_DATE - INTERVAL '14 days', CURRENT_DATE + INTERVAL '30 days', 45, ARRAY['web-design', 'seo']),
('Mission Control Dashboard', 'Build productivity hub for Alex & MiniMe', 'active', CURRENT_DATE - INTERVAL '1 day', CURRENT_DATE + INTERVAL '7 days', 75, ARRAY['development', 'productivity']),
('Client: Architect Portfolio', 'New website for London-based architecture firm', 'active', CURRENT_DATE - INTERVAL '7 days', CURRENT_DATE + INTERVAL '21 days', 30, ARRAY['client-work', 'construction']);

-- Sample Milestones
INSERT INTO project_milestones (project_id, title, due_date, completed) VALUES
((SELECT id FROM projects WHERE name = 'Mission Control Dashboard'), 'Deploy to Vercel', CURRENT_DATE, true),
((SELECT id FROM projects WHERE name = 'Mission Control Dashboard'), 'Add sample data', CURRENT_DATE, true),
((SELECT id FROM projects WHERE name = 'Mission Control Dashboard'), 'Redesign with grid layout', CURRENT_DATE + INTERVAL '2 days', false),
((SELECT id FROM projects WHERE name = 'Geco.design Redesign'), 'Service pages complete', CURRENT_DATE + INTERVAL '5 days', false),
((SELECT id FROM projects WHERE name = 'Geco.design Redesign'), 'Blog section live', CURRENT_DATE + INTERVAL '15 days', false);

-- Sample Quick Notes
INSERT INTO quick_notes (content, created_at) VALUES
('Remember to check Tottenham match schedule weekly - important for briefings', NOW() - INTERVAL '2 hours'),
('Business idea: AI-powered competitor analysis tool for web designers', NOW() - INTERVAL '1 day'),
('Need to explore Brave Search API for /last30days web search integration', NOW() - INTERVAL '3 hours');
