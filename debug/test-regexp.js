// 模拟 getParamRegexp 函数的实现
function testGetParamRegexp(segment) {
  const regex = segment
    .replace(/:(\w+)/g, (_, id) => `(?<${id}>[^/]+)`)
    .replace(/\./g, '\\.');
  return new RegExp(`^${regex}$`);
}

// 测试 @:id(\d+) 格式
const segment = '@:id(\d+)';
const regex = testGetParamRegexp(segment);

console.log(`Segment: ${segment}`);
console.log(`Generated regex: ${regex}`);

// 测试匹配
const testPaths = [
  '@123',
  '@abc',
  '@123abc',
  '123',
  '@:123'
];

console.log('\nTesting matches:');
testPaths.forEach(path => {
  const match = path.match(regex);
  console.log(`${path}: ${match ? 'MATCH' : 'NO MATCH'} ${match ? JSON.stringify(match.groups) : ''}`);
});
