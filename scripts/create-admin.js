const bcrypt = require('bcryptjs');

async function createAdmin() {
  const password = 'Admin@123';
  const hash = await bcrypt.hash(password, 10);

  console.log('\n=== CREATE ADMIN USER ===\n');
  console.log('Copy and paste this SQL into your Supabase SQL Editor:\n');
  console.log(`INSERT INTO users (email, password_hash, full_name, role, created_at)`);
  console.log(`VALUES (`);
  console.log(`  'admin@tribaah.com',`);
  console.log(`  '${hash}',`);
  console.log(`  'Admin User',`);
  console.log(`  'admin',`);
  console.log(`  NOW()`);
  console.log(`) ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash;`);
  console.log('\nLogin Credentials:');
  console.log('Email: admin@tribaah.com');
  console.log('Password: Admin@123');
  console.log('\n======================\n');
}

createAdmin();
