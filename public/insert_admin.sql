-- Create admin table if it doesn't exist
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Insert default admin user (password: Admin@123)
-- Note: In production, use a proper password hashing mechanism
INSERT INTO admins (email, password_hash, name)
VALUES (
    'admin@carrental.com',
    '$2a$10$X7UrH5YxX5YxX5YxX5YxX.5YxX5YxX5YxX5YxX5YxX5YxX5YxX5YxX', -- This is a placeholder hash
    'Admin User'
) ON CONFLICT (email) DO NOTHING; 