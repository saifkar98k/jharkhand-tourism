-- Enable required extensions for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Optionally enable uuid-ossp if your environment prefers uuid_generate_v4
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
