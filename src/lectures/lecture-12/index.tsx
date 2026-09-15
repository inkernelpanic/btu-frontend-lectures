import LectureWrapper from "../../components/LectureWrapper";
import AnnotatedCode from "../../components/AnnotatedCode";
import Diagram from "../../components/Diagram";
import InfoBox from "../../components/InfoBox";
import ExerciseBlock from "../../components/ExerciseBlock";
import HomeworkBlock from "../../components/HomeworkBlock";
import JsConsole from "../../components/JsConsole";
import InteractivePlayground from "../../components/InteractivePlayground";

const Lecture12 = () => {
  return (
    <LectureWrapper id="12" title="The DOM: Tree, Methods & Events">
      {/* ── Section 1: What is the DOM ── */}
      <section>
        <h2>The DOM: Where JavaScript Meets HTML</h2>
        <p>
          So far we have been working with JavaScript in isolation -- logging to
          the console, building objects, writing functions. But the whole
          purpose of front-end JavaScript is to make web pages{" "}
          <strong>interactive</strong>. That happens through the{" "}
          <strong>DOM</strong>.
        </p>
        <p>
          The <strong>DOM (Document Object Model)</strong> is a live, in-memory
          tree that the browser builds from your HTML. Think of it this way:
          HTML is the blueprint, the DOM is the actual building. JavaScript is
          the construction crew that can add rooms, tear down walls, and repaint
          -- all while the user is inside.
        </p>

        <Diagram title="HTML vs DOM">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <div className="font-bold text-blue-300 mb-2">HTML File</div>
              <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                <li>Static text file on disk</li>
                <li>The source code / blueprint</li>
                <li>Never changes when JS runs</li>
              </ul>
            </div>
            <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg p-4">
              <div className="font-bold text-indigo-300 mb-2">
                DOM (in memory)
              </div>
              <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                <li>Live tree of objects in the browser</li>
                <li>Built from the HTML at page load</li>
                <li>JS can read, modify, add, remove nodes</li>
              </ul>
            </div>
          </div>
        </Diagram>

        <InfoBox type="info">
          The DOM is NOT your HTML file. When JavaScript changes the DOM, the
          page updates instantly in the browser, but your original .html file on
          disk stays untouched.
        </InfoBox>
      </section>

      {/* ── Section 2: DOM Tree ── */}
      <section>
        <h2>The DOM Tree</h2>
        <p>
          Every HTML element becomes a <strong>node</strong> in a tree. The root
          is <code>document</code>, and everything branches from there. Nodes
          have parent-child relationships: a <code>&lt;ul&gt;</code> is the{" "}
          <strong>parent</strong> of its <code>&lt;li&gt;</code> children, and
          those <code>&lt;li&gt;</code> elements are <strong>siblings</strong>{" "}
          of each other.
        </p>

        <Diagram title="A Simple DOM Tree">
          <div className="font-mono text-sm max-w-md mx-auto">
            <div className="text-gray-300">document</div>
            <div className="ml-4 border-l border-gray-700 pl-3">
              <div className="text-blue-300">&lt;html&gt;</div>
              <div className="ml-4 border-l border-gray-700 pl-3">
                <div className="text-yellow-300">&lt;head&gt;</div>
                <div className="ml-4 text-gray-500">
                  &lt;title&gt; "My Page"
                </div>
                <div className="text-yellow-300 mt-1">&lt;body&gt;</div>
                <div className="ml-4 border-l border-gray-700 pl-3">
                  <div className="text-green-300">
                    &lt;h1&gt;{" "}
                    <span className="text-gray-500">"Hello DOM!"</span>
                  </div>
                  <div className="text-green-300">
                    &lt;p&gt; <span className="text-gray-500">"Welcome"</span>
                  </div>
                  <div className="text-green-300">&lt;ul&gt;</div>
                  <div className="ml-4 border-l border-gray-700 pl-3">
                    <div className="text-purple-300">
                      &lt;li&gt; <span className="text-gray-500">"Item 1"</span>
                    </div>
                    <div className="text-purple-300">
                      &lt;li&gt; <span className="text-gray-500">"Item 2"</span>
                    </div>
                    <div className="text-purple-300">
                      &lt;li&gt; <span className="text-gray-500">"Item 3"</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-500 text-center">
            body is the PARENT of h1, p, and ul. The h1, p, and ul are SIBLINGS.
            The li elements are CHILDREN of ul.
          </div>
        </Diagram>
      </section>

      {/* ── Section 3: Selecting Elements ── */}
      <section>
        <h2>Selecting Elements</h2>
        <p>
          Before you can change anything in the DOM, you need to{" "}
          <strong>select</strong> it. Think of it as pointing at something and
          saying "that one!" JavaScript gives you several methods for this.
        </p>

        <Diagram title="Selection Methods">
          <div className="space-y-2">
            {[
              {
                method: "getElementById(id)",
                returns: "One element",
                example: 'document.getElementById("title")',
                note: "Fastest, but requires an id attribute",
              },
              {
                method: "querySelector(css)",
                returns: "First match",
                example: 'document.querySelector(".intro")',
                note: "Accepts any CSS selector -- very flexible",
              },
              {
                method: "querySelectorAll(css)",
                returns: "All matches (NodeList)",
                example: 'document.querySelectorAll("li")',
                note: "Returns a list you can loop over with forEach",
              },
            ].map((item) => (
              <div
                key={item.method}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"
              >
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <code className="text-indigo-300 text-sm font-bold">
                    {item.method}
                  </code>
                  <span className="text-xs text-gray-500">
                    &rarr; {item.returns}
                  </span>
                </div>
                <code className="text-xs text-gray-400 block">
                  {item.example}
                </code>
                <div className="text-xs text-gray-500 mt-1">{item.note}</div>
              </div>
            ))}
          </div>
        </Diagram>

        <AnnotatedCode
          title="Selecting elements in practice"
          segments={[
            { code: "// By ID -- returns a single element\n" },
            {
              code: 'const title = document.getElementById("title");',
              annotation:
                "getElementById is the fastest selection method. It returns exactly one element or null if no element has that ID.",
              label: "getElementById",
            },
            { code: "\n\n// By CSS selector -- returns FIRST match\n" },
            {
              code: 'const firstP = document.querySelector(".intro");',
              annotation:
                "querySelector accepts any CSS selector: .class, #id, tag, [attr], combinations, pseudo-selectors -- anything you can write in CSS.",
              label: "querySelector",
            },
            { code: "\n\n// By CSS selector -- returns ALL matches\n" },
            {
              code: 'const allItems = document.querySelectorAll("ul li");',
              annotation:
                "querySelectorAll returns a NodeList of all matching elements. Use .forEach() to loop over them. Note: it is not a true Array, but it supports forEach.",
              label: "querySelectorAll",
            },
          ]}
        />

        <InfoBox type="tip">
          Prefer <code>querySelector</code> and <code>querySelectorAll</code> in
          modern code. They accept any CSS selector, making them far more
          flexible than the older <code>getElementsByClassName</code> or{" "}
          <code>getElementsByTagName</code>.
        </InfoBox>
      </section>

      {/* ── Section 4: Modifying Elements ── */}
      <section>
        <h2>Modifying Elements</h2>
        <p>
          Once you have selected an element, you can change its text, HTML
          content, styles, classes, and attributes.
        </p>

        <Diagram title="Content: textContent vs innerHTML">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <div className="font-bold text-green-300 mb-2">
                textContent (safe)
              </div>
              <code className="text-xs text-gray-300 block mb-2">
                el.textContent = "Hello";
              </code>
              <div className="text-xs text-gray-400">
                Sets plain text. HTML tags are treated as literal text, not
                parsed. Always safe from XSS attacks.
              </div>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="font-bold text-yellow-300 mb-2">
                innerHTML (powerful but risky)
              </div>
              <code className="text-xs text-gray-300 block mb-2">
                {'el.innerHTML = "<b>Hello</b>";'}
              </code>
              <div className="text-xs text-gray-400">
                Parses and renders HTML. Never use with user input -- it opens
                the door to XSS (cross-site scripting) attacks.
              </div>
            </div>
          </div>
        </Diagram>

        <p>
          "Opens the door to XSS" sounds abstract until you watch it happen.
          Below, the <em>same string</em> goes into both boxes. Press the button
          and see what each one does with it:
        </p>

        <InteractivePlayground
          language="html"
          title="Try it: the same string through innerHTML and through textContent"
          height={300}
          initialCode={`<style>
  body { font-family: system-ui; }
  .box { border: 2px solid #cbd5e1; border-radius: 8px; padding: 12px; margin: 8px 0; }
  .bad { border-color: #ef4444; background: #fef2f2; }
  .good { border-color: #22c55e; background: #f0fdf4; }
  h4 { margin: 0 0 6px; font-size: 13px; }
</style>

<!-- Pretend a user typed this into a comment box -->
<p>Pretend a user submitted this as their "name":</p>
<input id="userInput" style="width:100%"
       value="<img src=x onerror=&quot;this.replaceWith('I just ran your code.')&quot;>" />
<button id="render">Render it both ways</button>

<div class="box bad">
  <h4>el.innerHTML = userInput</h4>
  <div id="unsafe"></div>
</div>

<div class="box good">
  <h4>el.textContent = userInput</h4>
  <div id="safe"></div>
</div>

<script>
  document.getElementById("render").addEventListener("click", () => {
    const userInput = document.getElementById("userInput").value;

    // The browser PARSES this string as HTML. The onerror handler runs.
    document.getElementById("unsafe").innerHTML = userInput;

    // The browser treats this string as text. Nothing is parsed, nothing runs.
    document.getElementById("safe").textContent = userInput;
  });
</script>`}
        />

        <InfoBox type="warning">
          The attack does not need a <code>&lt;script&gt;</code> tag -- browsers
          ignore those when inserted via <code>innerHTML</code>, which is
          exactly why attackers use an <code>onerror</code> on a broken image
          instead. The rule is simple:{" "}
          <strong>
            any value that came from a user goes in through{" "}
            <code>textContent</code>
          </strong>
          . Reserve <code>innerHTML</code> for markup you wrote yourself.
        </InfoBox>

        <Diagram title="Styling: inline vs classList">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <div className="font-bold text-red-300 mb-2">
                el.style.* (avoid)
              </div>
              <code className="text-xs text-gray-300 block mb-2">
                el.style.color = "red";
              </code>
              <div className="text-xs text-gray-400">
                Inline styles are hard to maintain and override CSS specificity.
                Use sparingly.
              </div>
            </div>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <div className="font-bold text-green-300 mb-2">
                el.classList.* (prefer)
              </div>
              <div className="text-xs text-gray-300 space-y-1 mb-2">
                <code className="block">el.classList.add("active");</code>
                <code className="block">el.classList.remove("active");</code>
                <code className="block">el.classList.toggle("active");</code>
              </div>
              <div className="text-xs text-gray-400">
                Keep your styles in CSS and use JS only to toggle classes. Clean
                and maintainable.
              </div>
            </div>
          </div>
        </Diagram>

        <InteractivePlayground
          language="html"
          title="Try it: a real button that really toggles a class"
          height={260}
          initialCode={`<style>
  .card {
    font-family: system-ui;
    border: 2px solid #cbd5e1;
    border-radius: 8px;
    padding: 16px;
    transition: all .2s;
  }
  /* The whole visual change lives in CSS... */
  .card.highlight {
    border-color: #6366f1;
    background: #eef2ff;
  }
  button { margin-top: 12px; padding: 6px 12px; cursor: pointer; }
</style>

<div class="card" id="card">
  <strong>Click the button.</strong>
  <p id="status">Class list: card</p>
  <button id="btn">Toggle highlight</button>
</div>

<script>
  const card = document.getElementById("card");
  const status = document.getElementById("status");

  document.getElementById("btn").addEventListener("click", () => {
    // ...and JavaScript only flips the class on and off.
    card.classList.toggle("highlight");

    // classList.contains() returns a boolean -- handy for reacting to state
    const on = card.classList.contains("highlight");
    status.textContent = "Class list: " + card.className + "  (highlight: " + on + ")";
  });
</script>`}
        />

        <p>
          Edit the code above and watch the preview update. Try changing{" "}
          <code>classList.toggle</code> to <code>classList.add</code> -- notice
          the button now only works once, because <code>add</code> is not a
          switch.
        </p>

        <InfoBox type="tip">
          Always prefer <code>classList</code> over <code>style</code>. Keep
          your visual styles in CSS and let JavaScript just toggle classes. This
          makes your code cleaner and easier to maintain.
        </InfoBox>
      </section>

      {/* ── Section 5: Creating & Removing ── */}
      <section>
        <h2>Creating and Removing Elements</h2>
        <p>
          JavaScript can build new HTML elements from scratch and add them to
          the page, or remove existing elements. This is the foundation of all
          dynamic content on the web.
        </p>

        <AnnotatedCode
          title="Creating elements step by step"
          segments={[
            { code: "// Step 1: Create the element\n" },
            {
              code: 'const li = document.createElement("li");',
              annotation:
                "createElement builds a new DOM node in memory. At this point it is not visible on the page yet -- it exists only in JavaScript.",
              label: "create",
            },
            { code: "\n\n// Step 2: Configure it\n" },
            {
              code: 'li.textContent = "New item";',
              annotation:
                "Set its text content, classes, attributes, or any other properties before adding it to the page.",
              label: "configure",
            },
            { code: "\n" },
            { code: 'li.className = "list-item";\n\n' },
            { code: "// Step 3: Attach it to the DOM\n" },
            {
              code: 'document.getElementById("list").appendChild(li);',
              annotation:
                "appendChild adds the element as the last child of the target. Once appended, it appears on the page instantly.",
              label: "append",
            },
            { code: "\n\n// Removing an element\n" },
            {
              code: "li.remove();",
              annotation:
                "The remove() method detaches the element from the DOM. It is gone from the page immediately.",
              label: "remove",
            },
          ]}
        />

        <InteractivePlayground
          language="html"
          title="Try it: build elements, append them, remove them"
          height={300}
          initialCode={`<style>
  body { font-family: system-ui; }
  ul { padding-left: 20px; }
  li { margin: 4px 0; }
  li button { margin-left: 8px; cursor: pointer; }
</style>

<input id="text" placeholder="Type an item..." />
<button id="add">Add to end</button>
<button id="addTop">Add to start</button>

<ul id="list">
  <li>Existing item</li>
</ul>

<script>
  const list = document.getElementById("list");
  const input = document.getElementById("text");

  function makeItem(label) {
    // Step 1: create (exists only in memory so far)
    const li = document.createElement("li");

    // Step 2: configure
    li.textContent = label;
    li.dataset.createdAt = Date.now();   // data-created-at="..."

    const del = document.createElement("button");
    del.textContent = "delete";
    del.addEventListener("click", () => li.remove());   // step 3b: remove
    li.appendChild(del);

    return li;
  }

  // Step 3a: attach
  document.getElementById("add").addEventListener("click", () => {
    list.appendChild(makeItem(input.value || "Untitled"));
    input.value = "";
  });

  document.getElementById("addTop").addEventListener("click", () => {
    list.prepend(makeItem(input.value || "Untitled"));
    input.value = "";
  });
</script>`}
        />
      </section>

      {/* ── Section 6: Events ── */}
      <section>
        <h2>Events: Responding to User Actions</h2>
        <p>
          Events are things that happen on a page -- a click, a keypress, a form
          submission, mouse movement. JavaScript lets you{" "}
          <strong>listen</strong> for these events and run code in response.
          This is what makes pages truly interactive.
        </p>

        <Diagram title="Common DOM Events">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { event: "click", desc: "Mouse click" },
              { event: "dblclick", desc: "Double click" },
              { event: "submit", desc: "Form submitted" },
              { event: "input", desc: "Value changed (live)" },
              { event: "change", desc: "Value changed (on blur)" },
              { event: "keydown", desc: "Key pressed" },
              { event: "keyup", desc: "Key released" },
              { event: "mouseover", desc: "Mouse enters" },
              { event: "mouseout", desc: "Mouse leaves" },
              { event: "focus", desc: "Element focused" },
              { event: "blur", desc: "Element unfocused" },
              { event: "DOMContentLoaded", desc: "HTML fully parsed" },
            ].map((item) => (
              <div
                key={item.event}
                className="bg-gray-800/50 rounded px-3 py-2"
              >
                <code className="text-indigo-300 text-xs">{item.event}</code>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </Diagram>

        <AnnotatedCode
          title="addEventListener pattern"
          segments={[
            {
              code: 'const button = document.querySelector("#myBtn");',
              annotation: "First, select the element you want to listen on.",
              label: "select",
            },
            { code: "\n\n" },
            {
              code: "button.addEventListener(",
              annotation:
                "addEventListener is the modern way to attach event handlers. It does not overwrite existing handlers, and you can add multiple listeners for the same event.",
              label: "addEventListener",
            },
            {
              code: '"click"',
              annotation:
                'The first argument is the event type as a string: "click", "submit", "input", "keydown", etc.',
              label: "event type",
            },
            { code: ", " },
            {
              code: '(e) => {\n  console.log("Clicked!", e.target);\n}',
              annotation:
                "The second argument is the handler function. It receives an event object (e) with details about what happened. e.target is the element that was clicked.",
              label: "handler",
            },
            { code: ");" },
          ]}
        />

        <InteractivePlayground
          language="html"
          title="Try it: inspect the event object as you interact"
          height={280}
          initialCode={`<style>
  body { font-family: system-ui; }
  #box { background: #eef2ff; border: 2px solid #6366f1; padding: 20px; margin-bottom: 10px; }
  #log { font-family: monospace; font-size: 12px; white-space: pre-wrap; }
</style>

<div id="box">Click anywhere in this box</div>
<input id="typer" placeholder="...or type here" />
<div id="log"></div>

<script>
  const log = document.getElementById("log");
  const show = (text) => { log.textContent = text; };

  document.getElementById("box").addEventListener("click", (e) => {
    show(
      "e.type    = " + e.type + "\\n" +
      "e.target  = <" + e.target.tagName.toLowerCase() + " id=" + e.target.id + ">\\n" +
      "e.offsetX = " + e.offsetX + "\\n" +
      "e.offsetY = " + e.offsetY
    );
  });

  document.getElementById("typer").addEventListener("keydown", (e) => {
    show("e.type = " + e.type + "\\ne.key  = " + e.key);
  });
</script>`}
        />
      </section>

      {/* ── Section 6b: Bubbling & Delegation ── */}
      <section>
        <h2>Bubbling, Capturing and Event Delegation</h2>
        <p>
          When you click a button inside a list item inside a list, you did not
          click one element -- you clicked all three. The browser walks the tree
          twice: down from <code>document</code> to the element you actually hit
          (<strong>capturing</strong>), then back up again (
          <strong>bubbling</strong>). Listeners fire on the way up by default.
        </p>

        <Diagram title="One click, three elements, two directions">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
              <span>capturing ↓</span>
              <span>bubbling ↑</span>
            </div>
            {[
              { tag: "document", color: "bg-gray-100 border-gray-300 w-full" },
              {
                tag: "<ul id='list'>",
                color: "bg-blue-50 border-blue-300 w-5/6",
              },
              { tag: "<li>", color: "bg-green-50 border-green-300 w-3/5" },
              {
                tag: "<button> ← you clicked here (e.target)",
                color: "bg-orange-100 border-orange-400 w-2/5",
              },
            ].map((row) => (
              <div
                key={row.tag}
                className={`${row.color} border-2 rounded-lg px-3 py-2 text-center font-mono text-xs text-gray-700`}
              >
                {row.tag}
              </div>
            ))}
            <p className="text-sm text-gray-500 mt-2 text-center">
              A listener on <code>#list</code> hears clicks on every button
              inside it -- including buttons that did not exist when the
              listener was added. That is the whole trick.
            </p>
          </div>
        </Diagram>

        <p>
          This is why <strong>event delegation</strong> matters. The naive
          approach -- attach one listener per row -- breaks the moment you add
          rows dynamically, and leaks a handler for every row you ever create.
          Instead, attach <em>one</em> listener to the parent and ask{" "}
          <code>e.target</code> what was actually clicked.
        </p>

        <InteractivePlayground
          language="html"
          title="Try it: one listener handles rows that do not exist yet"
          height={320}
          initialCode={`<style>
  body { font-family: system-ui; }
  li { margin: 4px 0; }
  li.done span { text-decoration: line-through; color: #94a3b8; }
  li button { margin-left: 8px; cursor: pointer; }
</style>

<button id="add">Add a row</button>

<ul id="list">
  <li><span>First task</span>
    <button class="done">done</button>
    <button class="del">delete</button></li>
</ul>

<p id="note"></p>

<script>
  const list = document.getElementById("list");

  // ONE listener on the parent -- not one per row.
  list.addEventListener("click", (e) => {
    // e.target is the exact element clicked (a button, or the span).
    // closest() walks UP from it to find the row it belongs to.
    const li = e.target.closest("li");
    if (!li) return;

    // matches() asks "is this the button I care about?"
    if (e.target.matches(".done")) li.classList.toggle("done");
    if (e.target.matches(".del")) li.remove();

    document.getElementById("note").textContent =
      "Clicked: " + e.target.tagName.toLowerCase() +
      "." + e.target.className + " -- handled by the <ul> listener.";
  });

  // New rows get NO listener of their own, and still work.
  let n = 2;
  document.getElementById("add").addEventListener("click", () => {
    list.insertAdjacentHTML("beforeend",
      "<li><span>Task " + n++ + "</span>" +
      "<button class='done'>done</button>" +
      "<button class='del'>delete</button></li>");
  });
</script>`}
        />

        <InfoBox type="tip">
          The two methods that make delegation work:{" "}
          <code>e.target.closest(sel)</code> walks <em>up</em> from the clicked
          element to find the row/container it lives in, and{" "}
          <code>e.target.matches(sel)</code> asks whether the clicked element
          itself is the thing you care about. Without <code>closest()</code>,
          clicking the text inside a button would give you the wrong element.
        </InfoBox>

        <InfoBox type="warning">
          <code>e.stopPropagation()</code> halts the bubble, so any delegated
          listener further up never hears the event. It is occasionally
          necessary, but reach for it last -- most "my outer handler is not
          firing" bugs are a <code>stopPropagation()</code> someone added
          earlier.
        </InfoBox>
      </section>

      {/* ── Section 7: preventDefault and Forms ── */}
      <section>
        <h2>Handling Forms with preventDefault</h2>
        <p>
          By default, submitting a form causes the browser to reload the page.
          In modern web apps we almost always want to handle the submission with
          JavaScript instead. The <code>e.preventDefault()</code> method stops
          this default behavior.
        </p>

        <AnnotatedCode
          title="Form handling pattern"
          segments={[
            { code: 'const form = document.querySelector("#myForm");\n\n' },
            {
              code: 'form.addEventListener("submit", (e) => {',
              annotation:
                'Listen for the "submit" event on the form element, not on the button. This catches both button clicks and Enter key presses.',
              label: "submit event",
            },
            { code: "\n  " },
            {
              code: "e.preventDefault();",
              annotation:
                "This is critical! Without it, the browser reloads the page and your JavaScript loses all state. This is the #1 beginner mistake with forms.",
              label: "preventDefault",
            },
            { code: "\n\n  " },
            {
              code: 'const name = document.querySelector("#nameInput").value;\n',
            },
            { code: '  console.log("Submitted:", name);\n' },
            { code: "});" },
          ]}
        />

        <InfoBox type="warning">
          Always call <code>e.preventDefault()</code> in form submit handlers.
          Without it, the page reloads and you lose everything. This is the most
          common beginner mistake when working with forms.
        </InfoBox>
      </section>

      {/* ── Section 8: Putting It Together ── */}
      <section>
        <h2>Putting It All Together: Building a Dynamic List</h2>
        <p>
          Let us combine everything -- selecting, creating, modifying, events --
          into a practical example. This is the kind of thing you will build
          constantly as a front-end developer.
        </p>

        <AnnotatedCode
          title="Dynamic list: the complete pattern"
          segments={[
            { code: "// 1. Select existing elements\n" },
            {
              code: 'const input = document.querySelector("#todoInput");\nconst addBtn = document.querySelector("#addBtn");\nconst list = document.querySelector("#todoList");',
              annotation:
                "Always cache your DOM selections in variables at the top. Querying the DOM is slow, so do it once.",
              label: "select & cache",
            },
            { code: "\n\n// 2. Define the add function\n" },
            {
              code: "function addTodo() {\n  const text = input.value.trim();\n  if (!text) return;",
              annotation:
                "Always validate input: trim whitespace and reject empty strings.",
              label: "validate",
            },
            { code: "\n\n" },
            {
              code: '  const li = document.createElement("li");\n  li.textContent = text;',
              annotation:
                "Create the new element and set its content. Use textContent (not innerHTML) to avoid XSS.",
              label: "create element",
            },
            { code: "\n\n" },
            {
              code: '  const delBtn = document.createElement("button");\n  delBtn.textContent = "X";\n  delBtn.addEventListener("click", () => li.remove());',
              annotation:
                "Create a delete button and attach a click handler that removes the parent list item.",
              label: "delete button",
            },
            { code: "\n\n" },
            {
              code: "  li.appendChild(delBtn);\n  list.appendChild(li);",
              annotation:
                "Assemble the pieces: button goes into the list item, then the list item goes into the list.",
              label: "assemble & append",
            },
            { code: "\n" },
            { code: '  input.value = "";\n  input.focus();\n}\n\n' },
            { code: "// 3. Wire up event listeners\n" },
            {
              code: 'addBtn.addEventListener("click", addTodo);\ninput.addEventListener("keydown", (e) => {\n  if (e.key === "Enter") addTodo();\n});',
              annotation:
                'Listen for both button clicks and Enter key presses. Check e.key === "Enter" for keyboard events.',
              label: "event listeners",
            },
          ]}
        />

        <JsConsole
          code={`// The core DOM workflow:
// 1. SELECT elements with querySelector
// 2. LISTEN for events with addEventListener
// 3. CREATE new elements with createElement
// 4. MODIFY content with textContent / classList
// 5. APPEND to the DOM with appendChild
// 6. REMOVE with element.remove()

// This pattern powers everything from todo lists
// to social media feeds to e-commerce carts.

console.log("SELECT -> LISTEN -> CREATE -> MODIFY -> APPEND");
console.log("This is the fundamental DOM workflow!");`}
          title="The DOM workflow"
        />
      </section>

      {/* ── Key Takeaways ── */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>
            The DOM is a live tree built from HTML. JS manipulates this tree,
            not the file.
          </li>
          <li>
            Use <code>querySelector</code> / <code>querySelectorAll</code> to
            select elements with CSS selectors.
          </li>
          <li>
            Change text with <code>textContent</code> (safe) or{" "}
            <code>innerHTML</code> (be careful with user input).
          </li>
          <li>
            Use <code>classList.add/remove/toggle</code> to change styles --
            keep CSS in CSS files.
          </li>
          <li>
            <code>createElement</code> + <code>appendChild</code> to build
            elements dynamically.
          </li>
          <li>
            <code>addEventListener</code> to respond to clicks, keypresses, form
            submissions, etc.
          </li>
          <li>
            <code>e.preventDefault()</code> stops default browser behavior (like
            form page reloads).
          </li>
        </ul>
      </section>

      {/* ── Exercises ── */}
      <ExerciseBlock number={1}>
        <p>
          <strong>Color Switcher:</strong> Create a page with three buttons
          (Red, Green, Blue) that change the body background color when clicked.
          Add a Reset button that restores the original color. Use{" "}
          <code>classList</code> instead of inline styles.
        </p>
      </ExerciseBlock>

      <ExerciseBlock number={2}>
        <p>
          <strong>Character Counter:</strong> Create a{" "}
          <code>&lt;textarea&gt;</code> with a <code>&lt;p&gt;</code> below it
          showing the character count. Update it in real time using the{" "}
          <code>input</code> event. Turn the counter red when over 200
          characters.
        </p>
      </ExerciseBlock>

      <ExerciseBlock number={3}>
        <p>
          <strong>Dynamic User Cards:</strong> Given an array of user objects
          (name, age, role), use <code>createElement</code> and{" "}
          <code>appendChild</code> to dynamically create card elements for each
          user. Each card should display the name, age, and role, and include a
          "Remove" button that deletes the card when clicked.
        </p>
      </ExerciseBlock>

      <HomeworkBlock>
        <h4>Interactive Student Directory</h4>
        <p>Build a page with these features:</p>
        <ol>
          <li>
            An input field + "Add Student" button that creates new student cards
            dynamically.
          </li>
          <li>
            Each card has: the student's name, an "Edit" button (use{" "}
            <code>prompt()</code> to get the new name), a "Delete" button (with{" "}
            <code>confirm()</code> before removing), and a "Highlight" toggle
            button using <code>classList.toggle()</code>.
          </li>
          <li>
            A search input that filters cards in real time (hide non-matching
            cards by toggling a CSS class).
          </li>
          <li>
            A counter showing "Showing X of Y students" that updates on add,
            delete, or filter.
          </li>
        </ol>
        <InfoBox type="tip">
          Break it down step by step: first make adding work, then deletion,
          then editing, then search. Test each feature before moving on to the
          next.
        </InfoBox>
      </HomeworkBlock>
    </LectureWrapper>
  );
};

export default Lecture12;
