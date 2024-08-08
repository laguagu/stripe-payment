# AI-powered E-commerce Platform

This project is an AI-enhanced e-commerce platform for fashion items, utilizing Supabase for backend services and Stripe for payment processing.

## Features

- AI-powered product recommendations
- User authentication (OAuth with GitHub and traditional email)
- Product catalog with detailed item pages
- Shopping cart functionality
- Secure payment processing with Stripe
- Responsive design for mobile and desktop
- **Smart search functionality with text and semantic search capabilities**

## Tech Stack

- Fullstack Meta-framework: Next.js
- Backend Services: Supabase
- Database: PostgreSQL (via Supabase)
- Authentication: Supabase Auth (OAuth and email)
- Payment Processing: Stripe
- AI Integration: OpenAI for embeddings and recommendations
- Image Storage: Supabase Storage

## Setup

1. Clone the repository
2. Install dependencies:
3. Set up environment variables in a `.env.local` file:

```env
-NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
-NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
-STRIPE_SECRET_KEY=your_stripe_secret_key
```

4. Run the development server: `$ npm run dev`

## Database Setup

### Example

1. Create a `fashion_items` table in your Supabase project:

```sql
-- Ota pgvector-laajennus käyttöön
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

-- Luodaan fashion_items taulu
CREATE TABLE fashion_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    embedding VECTOR(1536)
);

-- IVFFlat-indeksi upotuksille nopeuttamaan samankaltaisuushakuja kosinietäisyyden perusteella
CREATE INDEX idx_fashion_items_embedding ON fashion_items USING ivfflat (embedding vector_cosine_ops);

-- Indeksi kategorialle nopeuttamaan hakuja kategorian perusteella
CREATE INDEX idx_fashion_items_category ON fashion_items(category);

-- Indeksi hinnalle nopeuttamaan hintapohjaisia hakuja ja lajittelua
CREATE INDEX idx_fashion_items_price ON fashion_items(price);

-- Indeksi nimelle nopeuttamaan tekstihakuja
CREATE INDEX idx_fashion_items_name ON fashion_items(name);

-- Luo funktio find_similar_fashion_items
CREATE OR REPLACE FUNCTION find_similar_fashion_items (
  input_id BIGINT, 
  input_embedding vector(1536)
) 
RETURNS SETOF fashion_items AS $$
  SELECT *
  FROM fashion_items
  WHERE id <> input_id
  ORDER BY embedding <-> input_embedding
  LIMIT 4;
$$ LANGUAGE sql;

-- Kategoriat-taulun luonti
CREATE VIEW distinct_categories_view AS
SELECT DISTINCT category
FROM fashion_items;

-- Typojen korjaus esimerkki miten voit korjata kuvien polut
UPDATE fashion_items
SET image_url = REPLACE(image_url, 'fashion_images', 'fashion-images');
```

## Authentication

This project uses Supabase Auth for user authentication. It supports:

- GitHub OAuth
- Traditional email and password

## AI Integration

The project uses OpenAI's `text-embedding-ada-002` model to generate embeddings for fashion items. These embeddings are used to find similar items and provide recommendations.

## Payment Processing

Stripe is integrated for secure payment processing. Ensure you have set up your Stripe account and added the necessary keys to your environment variables.
