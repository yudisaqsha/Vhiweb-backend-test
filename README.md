Step 1 : Run 'npm install' to install all the library/dependencies
Step 2 : change the .env.sample to .env and insert PORT, DATABASE_URL (postgresql url), and SECRET_KEY (random secret key)
Step 3 : Run 'npx prisma migrate dev' and then 'npx prisma generate'
Step 4 : to start the app, Run 'npm run dev'
