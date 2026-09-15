import LectureWrapper from "../../components/LectureWrapper";
import AnnotatedCode from "../../components/AnnotatedCode";
import Diagram from "../../components/Diagram";
import InfoBox from "../../components/InfoBox";
import ExerciseBlock from "../../components/ExerciseBlock";
import HomeworkBlock from "../../components/HomeworkBlock";
import JsConsole from "../../components/JsConsole";

const Lecture10 = () => {
  return (
    <LectureWrapper id="10" title="Objects, Arrays & Control Flow">
      {/* ── Section 1: Objects Intro ── */}
      <section>
        <h2>Objects: Bundling Related Data</h2>
        <p>
          Last week we worked with single values -- strings, numbers, booleans.
          But real-world data is rarely that simple. A person has a name, age,
          email, hobbies, and more. <strong>Objects</strong> let you group
          related data together under one name using{" "}
          <strong>key-value pairs</strong>.
        </p>

        <AnnotatedCode
          title="Anatomy of an object"
          segments={[
            {
              code: "const person = ",
              annotation:
                "We use const because the binding itself will not change. The object's contents can still be modified.",
              label: "const binding",
            },
            { code: "{\n" },
            {
              code: '  firstName: "Alice"',
              annotation:
                'A key-value pair. The key (property name) is firstName, the value is the string "Alice". Keys follow the same naming rules as variables.',
              label: "property",
            },
            { code: ",\n" },
            { code: '  lastName: "Smith",\n  age: 25,\n' },
            {
              code: "  isStudent: true",
              annotation:
                "Values can be any type: strings, numbers, booleans, arrays, or even other objects.",
              label: "boolean value",
            },
            { code: ",\n" },
            {
              code: '  hobbies: ["reading", "coding"]',
              annotation:
                "An array nested inside an object. Objects can contain any data structure.",
              label: "nested array",
            },
            { code: ",\n};" },
          ]}
        />

        <JsConsole
          code={`const person = {
  firstName: "Alice",
  lastName: "Smith",
  age: 25,
  isStudent: true,
  hobbies: ["reading", "coding", "hiking"],
};

// Dot notation (preferred for known keys)
console.log(person.firstName);  // "Alice"
console.log(person.age);        // 25

// Bracket notation (required for dynamic keys or spaces)
console.log(person["lastName"]); // "Smith"
const key = "hobbies";
console.log(person[key]);       // ["reading", "coding", "hiking"]

// Adding, changing, deleting
person.email = "alice@example.com";  // add
person.age = 26;                     // modify
delete person.isStudent;             // delete
console.log(person);`}
          title="Creating and accessing objects"
        />

        <InfoBox type="info">
          <code>person</code> is declared with <code>const</code>, yet we can
          modify its properties. <code>const</code> prevents reassigning the
          variable itself (<code>person = something</code> would fail), but the
          object's contents are fair game.
        </InfoBox>
      </section>

      {/* ── Section 2: Copying Objects ── */}
      <section>
        <h2>Copying Objects: The Reference Trap</h2>
        <p>
          When you assign an object to a new variable with <code>=</code>, you
          are not copying the data -- you are creating another name for the{" "}
          <em>same</em> object. Both variables point to the same place in
          memory.
        </p>

        <Diagram title="Reference vs Copy">
          <div className="space-y-4">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <div className="font-bold text-red-300 mb-2">
                Assignment = Shared Reference
              </div>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="bg-gray-800 rounded px-3 py-1 text-gray-300">
                  original
                </div>
                <div className="text-gray-500">&rarr;</div>
                <div className="bg-gray-700 rounded px-4 py-2 text-center border border-gray-600">
                  <div className="text-yellow-300 font-mono text-xs">
                    {"{ name: 'Alice' }"}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Same object in memory
                  </div>
                </div>
                <div className="text-gray-500">&larr;</div>
                <div className="bg-gray-800 rounded px-3 py-1 text-gray-300">
                  copy
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
                <div className="font-bold text-yellow-300 text-sm mb-1">
                  Shallow Copy (spread)
                </div>
                <div className="text-xs text-gray-300">
                  Copies top-level properties. Nested objects are still shared.
                </div>
                <code className="text-xs text-gray-400 mt-1 block">
                  {"const b = { ...a };"}
                </code>
              </div>
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                <div className="font-bold text-green-300 text-sm mb-1">
                  Deep Copy (structuredClone)
                </div>
                <div className="text-xs text-gray-300">
                  Copies everything recursively. Fully independent.
                </div>
                <code className="text-xs text-gray-400 mt-1 block">
                  {"const b = structuredClone(a);"}
                </code>
              </div>
            </div>
          </div>
        </Diagram>

        <JsConsole
          code={`// THE TRAP: both point to the same object
const original = { name: "Alice", age: 25 };
const notACopy = original;
notACopy.age = 30;
console.log("original.age:", original.age);  // 30! Changed!!

// SHALLOW COPY with spread
const real = { name: "Alice", age: 25 };
const shallow = { ...real };
shallow.age = 99;
console.log("real.age:", real.age);  // 25 (safe!)

// BUT nested objects are still shared
const nested = { name: "Bob", address: { city: "Tbilisi" } };
const copy = { ...nested };
copy.address.city = "Batumi";
console.log("nested city:", nested.address.city);  // "Batumi"! Shared!

// DEEP COPY with structuredClone()
const safe = structuredClone(nested);
safe.address.city = "Kutaisi";
console.log("nested city still:", nested.address.city);  // "Batumi" (safe!)`}
          title="Reference trap, shallow copy, deep copy"
        />

        <InfoBox type="warning">
          Use <strong>spread</strong> (<code>{"{ ...obj }"}</code>) for flat
          objects. Use <code>structuredClone()</code> when objects contain
          nested objects or arrays.
        </InfoBox>

        <h3>What structuredClone Cannot Do</h3>
        <p>
          <code>structuredClone()</code> copies data, not behaviour. Hand it
          something that is not pure data and it throws -- loudly, which is
          better than the alternative you will find on StackOverflow.
        </p>

        <JsConsole
          code={`// 1. Functions cannot be cloned -- this THROWS.
try {
  structuredClone({ name: "Ana", greet: () => "hi" });
} catch (e) {
  console.log(e.constructor.name + ": functions can't be cloned");
}

// DOM elements and class instances have the same problem:
// a class instance survives, but loses its prototype -- the methods are gone.

// 2. The pattern you will find online: JSON.parse(JSON.stringify(x))
const original = {
  when: new Date("2026-01-01"),
  missing: undefined,
  notANumber: NaN,
  tags: new Set(["a", "b"]),
};

const jsonCopy = JSON.parse(JSON.stringify(original));

console.log("Date became a:", typeof jsonCopy.when);     // string!
console.log("undefined key survived?", "missing" in jsonCopy); // false!
console.log("NaN became:", jsonCopy.notANumber);          // null!
console.log("Set became:", JSON.stringify(jsonCopy.tags)); // {} -- empty!

// structuredClone handles all four correctly:
const good = structuredClone(original);
console.log("structuredClone keeps the Date:", good.when instanceof Date);
console.log("and the Set:", good.tags instanceof Set);`}
          title="structuredClone vs the JSON trick -- what each one destroys"
        />

        <InfoBox type="tip">
          The JSON round-trip is silent: it does not throw, it just quietly
          hands you a Date that is now a string. That bug surfaces hours later,
          somewhere else. Prefer <code>structuredClone()</code>, which fails
          immediately on anything it cannot handle honestly.
        </InfoBox>
      </section>

      {/* ── Destructuring & modern access ── */}
      <section>
        <h2>Destructuring, ?. and ??</h2>
        <p>
          Three pieces of syntax you will see in every modern codebase --
          including in the promise and fetch lectures later in this course.
          Learn them here and the rest of the term reads much more easily.
        </p>

        <h3>Destructuring: unpacking into variables</h3>

        <AnnotatedCode
          title="Pulling values out of objects and arrays"
          segments={[
            {
              code: 'const user = { name: "Ana", age: 22, city: "Tbilisi" };\n\n',
            },
            {
              code: "// The long way\nconst name = user.name;\nconst age = user.age;\n\n",
            },
            {
              code: "const { name, age } = user;",
              annotation:
                "Object destructuring. The names in the braces must match the KEYS in the object -- order is irrelevant. This is one line instead of two, and it scales to ten properties just as easily.",
              label: "Object",
            },
            { code: "\n\n" },
            {
              code: "const { city: hometown } = user;",
              annotation:
                "Renaming: 'take the city property, but call my variable hometown'. Useful when two objects both have a 'name' and you need both in the same scope.",
              label: "Renaming",
            },
            { code: "\n\n" },
            {
              code: 'const { country = "Georgia" } = user;',
              annotation:
                'A default. If user.country is undefined, country becomes "Georgia". Note: the default fires on undefined only -- null does NOT trigger it.',
              label: "Defaults",
            },
            { code: "\n\n" },
            {
              code: 'const [first, second] = ["gold", "silver", "bronze"];',
              annotation:
                "Array destructuring matches by POSITION, not by name. This is the syntax you will meet again in Promise.all([...]).then(([a, b]) => ...) -- now you know what it is doing.",
              label: "Array",
            },
            { code: "\n\n" },
            {
              code: "const { name: n, ...rest } = user;",
              annotation:
                "Rest: 'name' comes out on its own, and everything else lands in a new object called rest. Handy for stripping one field off an object without mutating it.",
              label: "Rest",
            },
          ]}
        />

        <h3>Optional chaining and nullish coalescing</h3>
        <p>
          Earlier we reached into <code>nested.address.city</code>. That works
          until <code>address</code> is missing -- and then it does not fail
          politely, it throws and takes the page down with it.
        </p>

        <JsConsole
          code={`const users = [
  { name: "Ana", address: { city: "Tbilisi" }, posts: 0, nickname: "" },
  { name: "Giorgi" },   // no address, no posts, no nickname
];

// ?. -- optional chaining: stop and return undefined instead of throwing
for (const u of users) {
  // u.address.city would throw a TypeError on Giorgi
  console.log(u.name + " lives in: " + u.address?.city);
}

console.log("---");

// ?? -- nullish coalescing: a default for null/undefined ONLY
for (const u of users) {
  console.log(u.name + " city: " + (u.address?.city ?? "unknown"));
}

console.log("--- ?? vs || : the trap ---");

const ana = users[0];
// || treats 0 and "" as "missing" -- almost always wrong
console.log("posts with || :", ana.posts || "no posts yet");     // "no posts yet" -- WRONG, she has 0
console.log("posts with ?? :", ana.posts ?? "no posts yet");     // 0 -- correct
console.log("nickname with ||:", ana.nickname || "(none)");      // "(none)"
console.log("nickname with ??:", ana.nickname ?? "(none)");      // "" -- the empty string she actually set`}
          title="?. and ?? -- and why || is not the same thing"
        />

        <InfoBox type="warning">
          <code>||</code> falls back on every <strong>falsy</strong> value --
          including <code>0</code>, <code>""</code> and <code>false</code>,
          which are often legitimate data. <code>??</code> falls back only on{" "}
          <code>null</code> and <code>undefined</code>. When the value could
          genuinely be zero or an empty string -- a count, a price, a note --{" "}
          <code>??</code> is the one you want.
        </InfoBox>
      </section>

      {/* ── Section 3: Arrays ── */}
      <section>
        <h2>Arrays: Ordered Lists</h2>
        <p>
          An array is a numbered list. Each item has an <strong>index</strong>{" "}
          starting from <code>0</code>. Arrays are perfect for collections of
          similar items -- a list of names, prices, scores, and so on.
        </p>

        <AnnotatedCode
          title="Array basics"
          segments={[
            { code: "const fruits = " },
            {
              code: '["apple", "banana", "cherry"]',
              annotation:
                "Square brackets create an array literal. Items are separated by commas. They can be any type.",
              label: "array literal",
            },
            { code: ";\n\n" },
            {
              code: "fruits[0]",
              annotation:
                'Indexes start at 0, so fruits[0] is "apple", fruits[1] is "banana", etc.',
              label: "index access",
            },
            { code: ';      // "apple"\n' },
            {
              code: "fruits.length",
              annotation:
                "The length property tells you how many items are in the array.",
              label: "length",
            },
            { code: ";  // 3\n" },
            {
              code: 'fruits.push("date")',
              annotation: "push() adds an item to the END of the array.",
              label: "push",
            },
            { code: ";\n" },
            {
              code: "fruits.pop()",
              annotation: "pop() removes and returns the LAST item.",
              label: "pop",
            },
            { code: ";\n" },
            {
              code: 'fruits.unshift("avocado")',
              annotation: "unshift() adds an item to the BEGINNING.",
              label: "unshift",
            },
            { code: ";\n" },
            {
              code: "fruits.shift()",
              annotation: "shift() removes and returns the FIRST item.",
              label: "shift",
            },
            { code: ";" },
          ]}
        />

        <JsConsole
          code={`const colors = ["red", "green", "blue"];
console.log("Start:", colors);

colors.push("yellow");         // add to end
console.log("After push:", colors);

const removed = colors.pop();  // remove from end
console.log("Popped:", removed, "| Array:", colors);

colors.unshift("purple");     // add to beginning
console.log("After unshift:", colors);

colors.shift();                // remove from beginning
console.log("After shift:", colors);`}
          title="push, pop, unshift, shift"
        />
      </section>

      {/* ── Section 4: Array Methods ── */}
      <section>
        <h2>The Big Three: map, filter, reduce</h2>
        <p>
          These three methods are the workhorses of JavaScript arrays. They all
          return <strong>new values</strong> without modifying the original
          array, which is especially important in frameworks like React.
        </p>

        <Diagram title="map, filter, reduce at a Glance">
          <div className="space-y-3">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <div className="font-bold text-blue-300 mb-1">
                map -- Transform Every Element
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <code>[1, 2, 3]</code>
                <span className="text-gray-500">
                  &rarr; .map(x =&gt; x * 2) &rarr;
                </span>
                <code className="text-blue-300">[2, 4, 6]</code>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Same length, different values
              </div>
            </div>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <div className="font-bold text-green-300 mb-1">
                filter -- Keep What Passes
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <code>[1, 2, 3, 4]</code>
                <span className="text-gray-500">
                  &rarr; .filter(x =&gt; x &gt; 2) &rarr;
                </span>
                <code className="text-green-300">[3, 4]</code>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Same or fewer items, same values
              </div>
            </div>
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
              <div className="font-bold text-purple-300 mb-1">
                reduce -- Accumulate Into One Value
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <code>[10, 20, 30]</code>
                <span className="text-gray-500">
                  &rarr; .reduce((sum, x) =&gt; sum + x, 0) &rarr;
                </span>
                <code className="text-purple-300">60</code>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Many items become one value
              </div>
            </div>
          </div>
        </Diagram>

        <JsConsole
          code={`const numbers = [1, 2, 3, 4, 5];

// map -- transform each element
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);  // [2, 4, 6, 8, 10]

// filter -- keep elements that pass a test
const evens = numbers.filter(n => n % 2 === 0);
console.log("Evens:", evens);      // [2, 4]

// reduce -- collapse into a single value
const total = numbers.reduce((sum, n) => sum + n, 0);
console.log("Total:", total);      // 15

// Chaining: get names of passing students
const students = [
  { name: "Alice", grade: 92 },
  { name: "Bob", grade: 75 },
  { name: "Charlie", grade: 88 },
  { name: "Diana", grade: 65 },
];
const passed = students
  .filter(s => s.grade >= 80)
  .map(s => s.name);
console.log("Passed:", passed);`}
          title="map, filter, reduce in action"
        />

        <JsConsole
          code={`const fruits = ["apple", "banana", "cherry"];

// find -- first element that matches
console.log(fruits.find(f => f.startsWith("b"))); // "banana"

// includes -- does it exist?
console.log(fruits.includes("apple"));  // true
console.log(fruits.includes("grape"));  // false

// indexOf -- position (-1 if missing)
console.log(fruits.indexOf("cherry"));  // 2

// forEach -- do something with each (no return value)
fruits.forEach((fruit, i) => {
  console.log(\`\${i}: \${fruit}\`);
});`}
          title="find, includes, indexOf, forEach"
        />

        <InfoBox type="info">
          <code>map</code>, <code>filter</code>, and <code>reduce</code> never
          mutate the original array. They return new values. This is critical in
          React, where you should never mutate state directly.
        </InfoBox>
      </section>

      {/* ── Section 5: Operators ── */}
      <section>
        <h2>Operators Quick Reference</h2>

        <Diagram title="JavaScript Operators">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
              <div className="font-bold text-blue-300 text-sm mb-2">
                Arithmetic
              </div>
              <div className="space-y-1 text-xs text-gray-300 font-mono">
                <div>+ - * /</div>
                <div>% (remainder)</div>
                <div>** (power)</div>
              </div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
              <div className="font-bold text-green-300 text-sm mb-2">
                Comparison
              </div>
              <div className="space-y-1 text-xs text-gray-300 font-mono">
                <div>=== !== (strict)</div>
                <div>&gt; &lt; &gt;= &lt;=</div>
              </div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
              <div className="font-bold text-yellow-300 text-sm mb-2">
                Logical
              </div>
              <div className="space-y-1 text-xs text-gray-300 font-mono">
                <div>&amp;&amp; (AND)</div>
                <div>|| (OR)</div>
                <div>! (NOT)</div>
              </div>
            </div>
          </div>
        </Diagram>

        <JsConsole
          code={`// Arithmetic
console.log("10 % 3 =", 10 % 3);   // 1 (remainder)
console.log("2 ** 5 =", 2 ** 5);   // 32 (power)

// Compound assignment
let total = 100;
total += 20;  // 120
total -= 10;  // 110
total *= 2;   // 220
console.log("Total:", total);

// Logical
console.log(true && false);  // false (AND)
console.log(true || false);  // true  (OR)
console.log(!true);          // false (NOT)`}
          title="Operators in action"
        />
      </section>

      {/* ── Section 6: Control Flow ── */}
      <section>
        <h2>Control Flow: Making Decisions</h2>

        <AnnotatedCode
          title="if / else if / else"
          segments={[
            { code: "const score = 85;\n\n" },
            {
              code: "if (score >= 90)",
              annotation:
                "The condition inside parentheses is evaluated as a boolean. If true, the block runs.",
              label: "condition",
            },
            { code: ' {\n  console.log("A");\n} ' },
            {
              code: "else if (score >= 80)",
              annotation:
                "If the first condition was false, this condition is checked next. You can chain as many else-if blocks as you need.",
              label: "else if",
            },
            { code: ' {\n  console.log("B");\n} ' },
            {
              code: "else",
              annotation:
                "The else block runs only if ALL previous conditions were false. It is the catch-all.",
              label: "else",
            },
            { code: ' {\n  console.log("F");\n}' },
          ]}
        />

        <JsConsole
          code={`const score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}

// Ternary -- inline if/else for simple cases
const age = 20;
const status = age >= 18 ? "adult" : "minor";
console.log("Status:", status);

// Switch -- for multiple exact-value checks
const day = "Monday";
switch (day) {
  case "Saturday":
  case "Sunday":
    console.log("Weekend!");
    break;
  default:
    console.log("Weekday -- time to code!");
}`}
          title="if/else, ternary, and switch"
        />
      </section>

      {/* ── Section 7: Loops ── */}
      <section>
        <h2>Loops: Repeating Code</h2>
        <p>
          Loops let you run a block of code multiple times. The most common
          pattern is iterating over an array, but loops are useful any time you
          need repetition.
        </p>

        <Diagram title="Choosing the Right Loop">
          <div className="space-y-2">
            {[
              {
                loop: "for",
                when: "When you know how many iterations",
                example: "for (let i = 0; i < 5; i++)",
              },
              {
                loop: "while",
                when: "When you don't know how many iterations",
                example: "while (condition)",
              },
              {
                loop: "for...of",
                when: "Iterating over array VALUES",
                example: "for (const item of array)",
              },
              {
                loop: "for...in",
                when: "Iterating over object KEYS",
                example: "for (const key in object)",
              },
            ].map((item) => (
              <div
                key={item.loop}
                className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3"
              >
                <code className="text-indigo-300 font-bold text-sm w-20 shrink-0">
                  {item.loop}
                </code>
                <div className="text-sm text-gray-300 flex-1">{item.when}</div>
                <code className="text-xs text-gray-500 hidden md:block">
                  {item.example}
                </code>
              </div>
            ))}
          </div>
        </Diagram>

        <JsConsole
          code={`// for loop
for (let i = 0; i < 3; i++) {
  console.log("Iteration", i);
}

// for...of -- loop through array values
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}

// for...in -- loop through object keys
const person = { name: "Alice", age: 25, city: "Tbilisi" };
for (const key in person) {
  console.log(\`\${key}: \${person[key]}\`);
}

// break and continue
for (let i = 0; i < 10; i++) {
  if (i === 5) break;       // exit early
  if (i % 2 === 0) continue; // skip even numbers
  console.log("Odd:", i);
}`}
          title="All the loop types"
        />

        <InfoBox type="tip">
          Use <code>for...of</code> for <strong>arrays</strong> (gives values).
          Use <code>for...in</code> for <strong>objects</strong> (gives keys).
          Do not use <code>for...in</code> on arrays -- it can produce
          unexpected results.
        </InfoBox>

        <h3>A Better Way to Loop Over Objects</h3>
        <p>
          <code>for...in</code> gives you keys, so you are always writing{" "}
          <code>obj[key]</code> to get the value -- and it also walks inherited
          properties, which is the "unexpected results" warning above.{" "}
          <code>Object.entries()</code> plus destructuring gives you both at
          once, and only the object's own properties.
        </p>

        <JsConsole
          code={`const person = { name: "Alice", age: 25, city: "Tbilisi" };

// Object.keys   -> ["name", "age", "city"]
// Object.values -> ["Alice", 25, "Tbilisi"]
// Object.entries-> [["name","Alice"], ["age",25], ["city","Tbilisi"]]

console.log("keys:  ", Object.keys(person));
console.log("values:", Object.values(person));

// entries + destructuring = key AND value, no obj[key] lookup
for (const [key, value] of Object.entries(person)) {
  console.log(key + " -> " + value);
}

// And back again -- turn a list of pairs into an object.
// You will use this in week 16 to read a whole form at once.
const pairs = [["theme", "dark"], ["lang", "ka"]];
console.log("fromEntries:", Object.fromEntries(pairs));`}
          title="Object.keys / values / entries / fromEntries"
        />

        <h3>Four More Array Methods Worth Knowing</h3>

        <JsConsole
          code={`const scores = [90, 55, 78, 100, 42];

// .at() -- negative indexes count from the end.
// No more arr[arr.length - 1].
console.log("last:", scores.at(-1));
console.log("second to last:", scores.at(-2));

// .some() -- is AT LEAST ONE true?
console.log("anyone failed?", scores.some(s => s < 50));

// .every() -- are ALL of them true?
console.log("everyone passed?", scores.every(s => s >= 50));

// .sort() -- WARNING: by default it sorts as TEXT
console.log("default sort:", [...scores].sort());        // 100 comes before 42!
console.log("numeric sort:", [...scores].sort((a, b) => a - b));

// Note the [...scores] copies: sort() MUTATES the array it is given.
console.log("original untouched:", scores);`}
          title=".at(), .some(), .every(), and the .sort() trap"
        />

        <InfoBox type="warning">
          <code>sort()</code> converts everything to strings first, so{" "}
          <code>[10, 9, 100].sort()</code> gives you <code>[10, 100, 9]</code>.
          For numbers always pass a comparator:{" "}
          <code>{"sort((a, b) => a - b)"}</code>. And remember it sorts{" "}
          <em>in place</em> -- copy with <code>[...arr]</code> first if you need
          the original order later.
        </InfoBox>
      </section>

      {/* ── Section 8: Putting It Together ── */}
      <section>
        <h2>Putting It All Together</h2>
        <JsConsole
          code={`// Student Grade Tracker
const students = [
  { name: "Alice", scores: [90, 85, 92, 88] },
  { name: "Bob", scores: [75, 80, 70, 85] },
  { name: "Charlie", scores: [95, 98, 92, 97] },
  { name: "Diana", scores: [60, 55, 65, 70] },
];

// Calculate averages using map + reduce
const withAverages = students.map(student => {
  const total = student.scores.reduce((sum, s) => sum + s, 0);
  const average = total / student.scores.length;
  return { ...student, average };
});

// Print report
withAverages.forEach(s => {
  let grade;
  if (s.average >= 90) grade = "A";
  else if (s.average >= 80) grade = "B";
  else if (s.average >= 70) grade = "C";
  else grade = "F";
  console.log(\`\${s.name}: \${s.average.toFixed(1)} (\${grade})\`);
});

// Honor roll
const honorRoll = withAverages
  .filter(s => s.average >= 90)
  .map(s => s.name);
console.log("\\nHonor Roll:", honorRoll);`}
          title="Student Grade Tracker"
        />
      </section>

      {/* ── Key Takeaways ── */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>
            Objects store data in key-value pairs. Access with dot or bracket
            notation.
          </li>
          <li>
            Assigning an object to a new variable copies the{" "}
            <strong>reference</strong>, not the data. Use spread for shallow
            copies, <code>structuredClone()</code> for deep copies.
          </li>
          <li>
            Arrays are ordered lists (0-indexed). push/pop for end,
            shift/unshift for beginning.
          </li>
          <li>
            <code>map</code> (transform), <code>filter</code> (select),{" "}
            <code>reduce</code> (accumulate) -- the big three.
          </li>
          <li>
            <code>if/else</code> for conditionals, ternary for inline,{" "}
            <code>switch</code> for multiple values.
          </li>
          <li>
            <code>for...of</code> for arrays, <code>for...in</code> for objects.
          </li>
        </ul>
      </section>

      {/* ── Exercises ── */}
      <ExerciseBlock number={1}>
        <p>Create a "Contact Book" using objects and arrays:</p>
        <ul>
          <li>
            Create an array of 5 contact objects (name, phone, email, city,
            isFavorite).
          </li>
          <li>
            Use <code>filter</code> to get only favorite contacts.
          </li>
          <li>
            Use <code>find</code> to search for a contact by name.
          </li>
          <li>
            Use <code>map</code> to create an array of just the names.
          </li>
          <li>
            Use <code>for...of</code> to log each contact's name and city.
          </li>
          <li>
            Add a new contact with <code>push</code>, remove the last with{" "}
            <code>pop</code>.
          </li>
        </ul>
      </ExerciseBlock>

      <ExerciseBlock number={2}>
        <p>Build a "Shopping Cart Calculator":</p>
        <ul>
          <li>Create an array of product objects (name, price, quantity).</li>
          <li>
            Use <code>map</code> to add a <code>subtotal</code> property.
          </li>
          <li>
            Use <code>reduce</code> to calculate the grand total.
          </li>
          <li>
            Use <code>filter</code> to find expensive products (price &gt; 30).
          </li>
          <li>Log a formatted receipt using a loop.</li>
          <li>Demonstrate shallow copy with spread.</li>
        </ul>
      </ExerciseBlock>

      <ExerciseBlock number={3}>
        <p>Write a "Number Analysis" program:</p>
        <ul>
          <li>Create an array of 15 numbers (positive, negative, and zero).</li>
          <li>Count positives, negatives, and zeros with a loop + if/else.</li>
          <li>
            Use <code>filter</code> to separate positives and negatives.
          </li>
          <li>
            Use <code>reduce</code> to find the sum.
          </li>
          <li>
            Use <code>break</code> to find the first negative number.
          </li>
          <li>
            Use <code>continue</code> to log only even numbers.
          </li>
        </ul>
      </ExerciseBlock>

      <HomeworkBlock>
        <p>
          Build a <strong>"Student Management System"</strong>:
        </p>
        <ul>
          <li>
            <strong>Part 1:</strong> Create 6+ student objects with id, name,
            grades (object), enrollmentYear, isActive.
          </li>
          <li>
            <strong>Part 2:</strong> Use <code>map</code> + <code>reduce</code>{" "}
            to add an <code>averageGrade</code> property.
          </li>
          <li>
            <strong>Part 3:</strong> Use <code>filter</code> to find honor roll
            (avg &gt; 85), active students, and students enrolled after a given
            year.
          </li>
          <li>
            <strong>Part 4:</strong> Use <code>find</code> to look up a student
            by id. Handle "not found."
          </li>
          <li>
            <strong>Part 5:</strong> Generate a formatted report with letter
            grades (A/B/C/D/F).
          </li>
          <li>
            <strong>Part 6:</strong> Calculate class average, highest, and
            lowest with <code>reduce</code>.
          </li>
          <li>
            <strong>Part 7:</strong> Deep copy a student with{" "}
            <code>structuredClone</code>, modify the copy, prove the original is
            unchanged.
          </li>
        </ul>
      </HomeworkBlock>
    </LectureWrapper>
  );
};

export default Lecture10;
