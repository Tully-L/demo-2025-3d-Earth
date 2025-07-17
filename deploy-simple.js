import { execSync } from 'child_process';

console.log('🚀 开始部署...');

try {
  // 1. 构建项目
  console.log('🔨 构建项目...');
  execSync('npm run build:netlify', { stdio: 'inherit' });
  
  console.log('✅ 构建成功！');
  
  // 2. 部署到 Netlify
  console.log('🌐 部署到 Netlify...');
  execSync('netlify deploy --prod --dir=dist', { stdio: 'inherit' });
  
  console.log('🎉 部署完成！');
  
} catch (error) {
  console.error('❌ 部署失败:', error.message);
  process.exit(1);
} 