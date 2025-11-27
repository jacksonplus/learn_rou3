// 模拟 getParamRegexp 函数的实现
function testGetParamRegexp(segment) {
  const regex = segment
    .replace(/:(\w+)/g, (_, id) => `(?<${id}>[^/]+)`)
    .replace(/\./g, '\\.');
  return new RegExp(`^${regex}$`);
}

// 测试1: @:id 格式（正确用法）
console.log('=== 测试1: @:id 格式（正确用法）===');
const segment1 = '@:id';
const regex1 = testGetParamRegexp(segment1);
console.log(`Segment: ${segment1}`);
console.log(`Generated regex: ${regex1}`);

const testPaths1 = [
  '@123',
  '@abc',
  '@test123',
  '123',
  '@:123'
];

console.log('匹配结果:');
testPaths1.forEach(path => {
  const match = path.match(regex1);
  console.log(`${path}: ${match ? 'MATCH' : 'NO MATCH'} ${match ? JSON.stringify(match.groups) : ''}`);
});

// 测试2: @:id(\d+) 格式（用户测试）
console.log('\n=== 测试2: @:id(\d+) 格式（用户测试）===');
const segment2 = '@:id(\d+)';
const regex2 = testGetParamRegexp(segment2);
console.log(`Segment: ${segment2}`);
console.log(`Generated regex: ${regex2}`);

const testPaths2 = [
  '@123',
  '@abc',
  '@test123',
  '123',
  '@:123'
];

console.log('匹配结果:');
testPaths2.forEach(path => {
  const match = path.match(regex2);
  console.log(`${path}: ${match ? 'MATCH' : 'NO MATCH'} ${match ? JSON.stringify(match.groups) : ''}`);
  if (match) {
    console.log(`  完整匹配: ${match[0]}`);
    console.log(`  分组1: ${match[1]}`);
  }
});

// 测试3: 分析正则表达式的匹配过程
console.log('\n=== 测试3: 分析正则表达式的匹配过程 ===');
const testString = '@123';
const regex = /^@(?<id>[^/]+)(\d+)$/;
console.log(`测试字符串: "${testString}"`);
console.log(`正则表达式: ${regex}`);

// 分步匹配分析
console.log('\n分步匹配分析:');
console.log('1. "^" 匹配字符串开头: 成功');
console.log('2. "@" 匹配 "@": 成功 (剩余: "123")');
console.log('3. "(?<id>[^/]+)" 匹配一个或多个非"/"字符:');
console.log('   - 贪婪匹配，会匹配整个剩余字符串 "123"');
console.log('   - 命名捕获组 "id" = "123" (剩余: "")');
console.log('4. "(\\d+)" 匹配一个或多个数字:');
console.log('   - 剩余字符串为空，无法匹配');
console.log('5. "$" 匹配字符串结尾: 成功 (但前面的步骤已经失败)');
console.log('最终结果: 匹配失败');

// 测试4: 修复正则表达式
console.log('\n=== 测试4: 修复正则表达式 ===');
// 如果要匹配 @ 后跟数字，可以使用 /^@(?<id>\d+)$/
const fixedRegex = /^@(?<id>\d+)$/;
console.log(`修复后的正则表达式: ${fixedRegex}`);
console.log('匹配 @123 结果:', fixedRegex.test('@123'));
console.log('匹配 @abc 结果:', fixedRegex.test('@abc'));

// 测试5: 查看 router.test.ts 中的实际用法
console.log('\n=== 测试5: 实际用法示例（来自 router.test.ts）===');
console.log('路由定义: ["/npm/:param1/:param2", "/npm/@:param1/:param2"]');
console.log('匹配示例:');
console.log('- "/npm/test/123" -> 匹配 "/npm/:param1/:param2" (param1: "test")');
console.log('- "/npm/@test/123" -> 匹配 "/npm/@:param1/:param2" (param1: "test")');
