// 객체 줄바꿈 테스트 - 일관성 없는 형태로 테스트

// ✅ 정상: 모두 한 줄
const shortObject = { name: 'John', age: 30, city: 'Seoul', };

// ❌ 일관성 없음: 일부만 줄바꿈
const inconsistentObject = {
  name: 'Jane',
  email: 'jane@example.com',
  role: 'admin',
};

// ❌ 일관성 없음: 일부만 줄바꿈
const badObject = {
  name: 'Bob',
  age: 25,
  city: 'Busan',
  country: 'Korea',
};

// ✅ 정상: 모두 각각 줄바꿈
const allOnSeparateLines = {
  name: 'Alice',
  age: 28,
  city: 'Incheon',
};

// ❌ 일관성 없음: 중첩 객체에서 일부만 줄바꿈
const nestedObject = {
  user: {
    profile: {
      basic: { name: 'Charlie', age: 35, },
      contact: {
        email: 'charlie@test.com',
        phone: '010-1234-5678',
      },
    },
  },
};

// ❌ 일관성 없음: 배열 객체에서 일부만 줄바꿈
const objectWithArrays = {
  name: 'David',
  hobbies: [ 'reading', 'gaming', 'cooking', ],
  scores: [ 95, 87, 92, 88, 96, ],
  friends: [
    { name: 'Eve', age: 29, },
    { name: 'Frank', age: 31, country: 'USA', },
  ],
};

console.log(shortObject, inconsistentObject, badObject, allOnSeparateLines, nestedObject, objectWithArrays);
