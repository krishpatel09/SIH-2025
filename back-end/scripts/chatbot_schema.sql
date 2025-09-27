-- Chatbot Database Schema
-- This file contains the SQL schema for chatbot functionality

-- Create chat_sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id VARCHAR(100) UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,
    FOREIGN KEY (session_id) REFERENCES chat_sessions(session_id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_created_at ON chat_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_updated_at ON chat_sessions(updated_at);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_timestamp ON chat_messages(timestamp);
CREATE INDEX IF NOT EXISTS idx_chat_messages_role ON chat_messages(role);

-- Create RLS policies for chat_sessions
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own sessions
CREATE POLICY "Users can view own chat sessions" ON chat_sessions
    FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

-- Policy: Users can insert their own sessions
CREATE POLICY "Users can create chat sessions" ON chat_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Policy: Users can update their own sessions
CREATE POLICY "Users can update own chat sessions" ON chat_sessions
    FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

-- Policy: Users can delete their own sessions
CREATE POLICY "Users can delete own chat sessions" ON chat_sessions
    FOR DELETE USING (auth.uid() = user_id OR user_id IS NULL);

-- Create RLS policies for chat_messages
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see messages from their own sessions
CREATE POLICY "Users can view own chat messages" ON chat_messages
    FOR SELECT USING (
        session_id IN (
            SELECT session_id FROM chat_sessions 
            WHERE user_id = auth.uid() OR user_id IS NULL
        )
    );

-- Policy: Users can insert messages to their own sessions
CREATE POLICY "Users can create chat messages" ON chat_messages
    FOR INSERT WITH CHECK (
        session_id IN (
            SELECT session_id FROM chat_sessions 
            WHERE user_id = auth.uid() OR user_id IS NULL
        )
    );

-- Policy: Users can update their own messages
CREATE POLICY "Users can update own chat messages" ON chat_messages
    FOR UPDATE USING (
        session_id IN (
            SELECT session_id FROM chat_sessions 
            WHERE user_id = auth.uid() OR user_id IS NULL
        )
    );

-- Policy: Users can delete their own messages
CREATE POLICY "Users can delete own chat messages" ON chat_messages
    FOR DELETE USING (
        session_id IN (
            SELECT session_id FROM chat_sessions 
            WHERE user_id = auth.uid() OR user_id IS NULL
        )
    );

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for chat_sessions
CREATE TRIGGER update_chat_sessions_updated_at 
    BEFORE UPDATE ON chat_sessions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to clean up old sessions (optional)
CREATE OR REPLACE FUNCTION cleanup_old_chat_sessions()
RETURNS void AS $$
BEGIN
    -- Delete sessions older than 30 days
    DELETE FROM chat_sessions 
    WHERE created_at < NOW() - INTERVAL '30 days';
    
    -- Delete messages from sessions older than 30 days
    DELETE FROM chat_messages 
    WHERE session_id NOT IN (
        SELECT session_id FROM chat_sessions
    );
END;
$$ language 'plpgsql';

-- Grant necessary permissions
GRANT ALL ON chat_sessions TO authenticated;
GRANT ALL ON chat_messages TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Insert sample data (optional)
INSERT INTO chat_sessions (session_id, user_id) VALUES 
    ('sample_session_1', NULL),
    ('sample_session_2', NULL)
ON CONFLICT (session_id) DO NOTHING;

INSERT INTO chat_messages (session_id, role, content) VALUES 
    ('sample_session_1', 'assistant', 'Hello! How can I help you with your Jharkhand travel questions?'),
    ('sample_session_2', 'assistant', 'Welcome! I''m here to assist you with tourism information.')
ON CONFLICT DO NOTHING;
