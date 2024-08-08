-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

-- Kategoriat-taulun luonti
CREATE VIEW
  distinct_categories_view AS
SELECT DISTINCT
  category
FROM
  fashion_items;

-- Fashion_items taulun luonti + indeksit
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

-- Indeksi kategorialle ja hinnalle nopeuttamaan hintapohjaisia hakuja ja lajittelua
--Jos haluatt poistaa function ja luoda sen uudesttaan käytä tätä ennen RUN komentoa;
-- drop function find_similar_fashion_items;
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

-- Typojen korjaus esimerkki miten voit korjata kuvien polut
UPDATE fashion_items
SET
  image_url = REPLACE(image_url, 'fashion_images', 'fashion-images');