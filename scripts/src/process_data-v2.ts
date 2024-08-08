import fs from 'fs';
import path from 'path';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface FashionItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
}

interface ProcessedFashionItem extends FashionItem {
  image_url: string;
  embedding: number[];
}

const supabase: SupabaseClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateImage(prompt: string): Promise<string> {
  const response = await openai.images.generate({
    prompt,
    model: 'dall-e-2',
    n: 1,
    size: '1024x1024',
  });
  return response.data[0].url!;
}

async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  });
  return response.data[0].embedding;
}

async function downloadImage(url: string, filepath: string): Promise<void> {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'arraybuffer',
  });

  fs.writeFileSync(filepath, response.data);
}

async function uploadImageToSupabase(imagePath: string, itemId: number): Promise<string> {
  const fileBuffer = fs.readFileSync(imagePath);
  const { data, error } = await supabase.storage
    .from('fashion_images')
    .upload(`${itemId}.png`, fileBuffer, {
      upsert: true,
      contentType: 'image/png',
    });

  if (error) {
    throw new Error(`Error uploading image: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from('fashion_images')
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}

async function saveItemToDatabase(item: ProcessedFashionItem): Promise<void> {
  const { error } = await supabase
    .from('fashion_items')
    .upsert(item);

  if (error) {
    throw new Error(`Error inserting data: ${error.message}`);
  }
}

async function processItem(item: FashionItem): Promise<void> {
  console.log(`Processing item: ${item.name}`);

  try {
    const embedding = await generateEmbedding(item.description);

    // Uncomment the following lines if you want to generate and download images
    // const imagePrompt = `White background image for an e-commerce website with the following name and description: ${item.name} - ${item.description}`;
    // const imageUrl = await generateImage(imagePrompt);
    // const imagePath = path.join(__dirname, 'images', `${item.id}.png`);
    // await downloadImage(imageUrl, imagePath);

    const imagePath = path.join(__dirname, 'images', `${item.id}.png`);
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image not found for item ${item.id}: ${imagePath}`);
    }

    const supabaseImageUrl = await uploadImageToSupabase(imagePath, item.id);

    const processedItem: ProcessedFashionItem = {
      ...item,
      image_url: supabaseImageUrl,
      embedding,
    };

    await saveItemToDatabase(processedItem);
    console.log(`Processed item ${item.id} successfully`);
  } catch (error) {
    console.error(`Error processing item ${item.id}:`, error);
  }
}

async function main(): Promise<void> {
  try {
    const jsonData: FashionItem[] = JSON.parse(
      fs.readFileSync('fashion_data.json', 'utf8')
    );

    for (const item of jsonData) {
      await processItem(item);
    }

    console.log('Processing complete');
  } catch (error) {
    console.error('Error in main process:', error);
  }
}

main();