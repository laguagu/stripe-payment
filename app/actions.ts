'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = createClient()
  
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
  
    console.log('Attempting login for:', data.email);
  
    const { error } = await supabase.auth.signInWithPassword(data)
  
    if (error) {
      console.error('Login error:', error);
      redirect('/error')
    }
  
    console.log('Login successful');
    revalidatePath('/', 'layout')
    redirect('/')
  }
  

  export async function signup(formData: FormData) {
    const supabase = createClient()
  
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
  
    console.log('Attempting signup for:', data.email);
  
    const { data: signUpData, error } = await supabase.auth.signUp(data)
  
    if (error) {
      console.error('Signup error:', error);
      return { error: error.message };
    }
  
    console.log('Signup response:', signUpData);
  
    if (signUpData.user && !signUpData.session) {
      console.log('Confirmation email should be sent');
      return { message: 'Tarkista sähköpostisi vahvistaaksesi tilisi.' };
    } else {
      console.log('User might be automatically confirmed');
      revalidatePath('/', 'layout')
      redirect('/')
    }
  }