-- Clear all sample data
DELETE FROM kanban_checklist_items;
DELETE FROM kanban_cards;
DELETE FROM tasks;
DELETE FROM business_ideas;
DELETE FROM project_milestones;
DELETE FROM projects;
DELETE FROM daily_briefings;
DELETE FROM quick_notes;

-- Get column IDs
DO $$
DECLARE
  backlog_id UUID;
  in_progress_id UUID;
  done_id UUID;
BEGIN
  SELECT id INTO backlog_id FROM kanban_columns WHERE name = 'Backlog';
  SELECT id INTO in_progress_id FROM kanban_columns WHERE name = 'In Progress';
  SELECT id INTO done_id FROM kanban_columns WHERE name = 'Done';

  -- Real Kanban Cards (Recent Builds - All Completed)
  INSERT INTO kanban_cards (column_id, title, description, priority, tags, position, time_estimate) VALUES
  (done_id, 'Mission Control v2', 'Grid-based dashboard with sidebar navigation, 6 widgets, GitHub auto-deploy', 'urgent', ARRAY['development', 'productivity'], 0, 720),
  (done_id, 'Time Tracking Tool', 'Timer with start/stop/pause, analytics, CSV export', 'high', ARRAY['productivity', 'tools'], 1, 180),
  (done_id, 'Client Onboarding System', '6-step wizard with auto-save, export to PDF/email', 'high', ARRAY['client-management', 'tools'], 2, 180),
  (done_id, 'Proposal Generator', 'Professional proposal templates with branding', 'medium', ARRAY['client-management', 'sales'], 3, 240),
  (done_id, 'Client Testimonial System', 'Collect and display client reviews', 'medium', ARRAY['marketing', 'social-proof'], 4, 120),
  (done_id, 'Invoice & Payment Tracker', 'Track invoices, payments, and outstanding amounts', 'high', ARRAY['finance', 'client-management'], 5, 150),
  (done_id, 'Lead Tracking CRM', 'Sales pipeline management with stages and notes', 'high', ARRAY['sales', 'crm'], 6, 240),
  (done_id, 'Email Outreach Tool', 'Campaign management with templates and tracking', 'medium', ARRAY['marketing', 'outreach'], 7, 180),
  (done_id, 'Website Audit Tool', 'Performance analysis and report generation', 'medium', ARRAY['sales', 'lead-gen'], 8, 180),
  (done_id, 'Pricing Calculator', 'Interactive ROI calculator for quotes', 'medium', ARRAY['sales', 'tools'], 9, 120),
  
  -- Current/Upcoming Work
  (backlog_id, 'Crypto Portfolio Dashboard', 'Real-time tracking for Basechain & Pulsechain tokens', 'urgent', ARRAY['crypto', 'tracking'], 0, 360),
  (backlog_id, 'Enhanced Daily Briefing Delivery', 'Fix automatic delivery to Discord', 'urgent', ARRAY['automation', 'fix'], 1, 60),
  (backlog_id, 'Geco.design Service Pages', 'Deploy completed landing pages to live site', 'high', ARRAY['geco', 'deployment'], 2, 120),
  (in_progress_id, '/last30days Integration', 'Research crypto opportunities and business ideas', 'high', ARRAY['research', 'automation'], 0, 0);

END $$;

-- Real Tasks
INSERT INTO tasks (title, description, due_date, completed, time_estimate) VALUES
('Fix briefing auto-delivery', 'Ensure message tool is called reliably in heartbeat', CURRENT_DATE, false, 30),
('Test Mission Control live data', 'Verify all widgets show real information', CURRENT_DATE, false, 15),
('Research Basechain tokens', 'Deep dive on DICKBUTT, DRB, BNKR, PEPE, 9MM for tomorrow briefing', CURRENT_DATE, false, 60),
('Research Pulsechain tokens', 'Track PLSX, PDAI, HEX + Richard Heart updates', CURRENT_DATE, false, 60),
('Deploy time tracker to geco.design', 'Consider productizing for other agencies', CURRENT_DATE + INTERVAL '3 days', false, 90);

-- Real Business Ideas
INSERT INTO business_ideas (title, description, status, rating, tags, notes) VALUES
('Time Tracking SaaS', 'Standalone time tracking tool for agencies - inspired by our build. Could integrate with invoicing.', 'idea', 4, ARRAY['saas', 'productivity', 'agencies'], 'Built functional prototype already. Need to add multi-user, billing integration.'),
('Client Onboarding Automation', 'Turn our questionnaire wizard into a product. Many agencies need this.', 'idea', 5, ARRAY['saas', 'client-management'], 'Complete prototype exists. Add Zapier integration, email sequences.'),
('Agency Toolkit Bundle', 'Package all the tools we built (proposals, contracts, time tracking, CRM) into one subscription.', 'researching', 5, ARRAY['saas', 'agency-tools'], 'We have 10+ tools already built. Could be $49-99/mo subscription.'),
('Crypto Portfolio Tracker', 'Multi-chain tracker with alerts for Basechain, Pulsechain, etc.', 'idea', 3, ARRAY['crypto', 'tracking'], 'Personal need, unclear market size.'),
('Website Audit SaaS', 'Lead magnet + sales tool like our audit tool but multi-tenant', 'idea', 4, ARRAY['saas', 'marketing', 'lead-gen'], 'Prototype exists. Need scoring algorithm improvements.');

-- Real Daily Briefings (Last 3 days)
INSERT INTO daily_briefings (date, content, business_ideas, tasks, bookmarked) VALUES
(CURRENT_DATE,
 E'**Overnight Work:**\n✅ Time Tracking & Project Hours Logger\n✅ Client Onboarding & Questionnaire System\n\n**Crypto:**\nBTC: $68,711 (-2.40% 24h)\n\n**Calendar:** No events\n**Spurs:** No matches\n**Weather:** London 8°C, cloudy',
 ARRAY['Time tracking SaaS', 'Client onboarding automation'],
 ARRAY['Test new tools', 'Review Mission Control'],
 false),
(CURRENT_DATE - INTERVAL '1 day',
 E'**Overnight Work:**\n✅ Mission Control v2 deployed\n✅ GitHub auto-deploy configured\n\n**Crypto:**\nBTC: $66,905 (-3.21% 24h)\n\n**Calendar:** No events\n**Weather:** London 9°C',
 ARRAY['Mission control-style dashboards for agencies'],
 ARRAY['Add crypto tracking to briefing', 'Test auto-deploy'],
 false),
(CURRENT_DATE - INTERVAL '2 days',
 E'**Overnight Work:**\n✅ ROI Calculator\n✅ Lead Magnet PDF\n\n**Crypto:**\nBTC: $68,966 (-0.82% 24h)\n\n**Calendar:** Spurs match 7:30pm\n**Weather:** London 8°C',
 ARRAY['ROI calculators for service businesses'],
 ARRAY['Deploy Mission Control', 'Setup GitHub integration'],
 false);

-- Real Projects
INSERT INTO projects (name, description, start_date, end_date, progress) VALUES
('Mission Control', 'Productivity dashboard - grid layout, widgets, auto-deploy', CURRENT_DATE - INTERVAL '2 days', CURRENT_DATE + INTERVAL '7 days', 85),
('Geco Business Tools Suite', 'Complete toolkit for geco.design (10+ tools built)', CURRENT_DATE - INTERVAL '7 days', CURRENT_DATE + INTERVAL '14 days', 70),
('Enhanced Daily Briefing', 'Add crypto tracking, /last30days integration, reliable delivery', CURRENT_DATE, CURRENT_DATE + INTERVAL '2 days', 40);

-- Real Milestones
INSERT INTO project_milestones (project_id, title, due_date, completed, position) VALUES
((SELECT id FROM projects WHERE name = 'Mission Control'), 'Build grid dashboard', CURRENT_DATE - INTERVAL '1 day', true, 0),
((SELECT id FROM projects WHERE name = 'Mission Control'), 'Deploy to Vercel', CURRENT_DATE - INTERVAL '1 day', true, 1),
((SELECT id FROM projects WHERE name = 'Mission Control'), 'GitHub auto-deploy', CURRENT_DATE - INTERVAL '1 day', true, 2),
((SELECT id FROM projects WHERE name = 'Mission Control'), 'Populate with live data', CURRENT_DATE, false, 3),
((SELECT id FROM projects WHERE name = 'Enhanced Daily Briefing'), 'Add crypto tracking', CURRENT_DATE, false, 0),
((SELECT id FROM projects WHERE name = 'Enhanced Daily Briefing'), 'Fix auto-delivery', CURRENT_DATE, false, 1);

-- Real Quick Notes
INSERT INTO quick_notes (content) VALUES
('Remember: Alex prefers concise, to-the-point communication. No em dashes in content.'),
('GitHub token expires May 16, 2026 - reminder scheduled'),
('Wallet addresses saved: 0x441e628cbd90196b6aad6eebd037b5e88182e872, 0x5cfc7b94ad7257bc84851129c41d54cbb058d2cd'),
('Mission Control auto-deploy: git commit + push → Vercel deploys automatically'),
('All tools saved to shared folder: ~/Library/Mobile Documents/com~apple~CloudDocs/Alex - MiniMe/');
