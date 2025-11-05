import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // --- THIS IS THE CRITICAL LINE TO ADD ---
  //
  // Replace 'YOUR-REPO-NAME' with the name of your
  // GitHub repository.
  //
  // For example, if your repo URL is:
  // https://github.com/Bassem-Ben-Hamama/stellar-by-chiheb
  //
  // You must use:
  // base: '/stellar-by-chiheb/',
  //
  base: '/Stellar-by-Chiheb/', 
})
