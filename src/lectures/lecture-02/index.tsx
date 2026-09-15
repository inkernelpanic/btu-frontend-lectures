import LectureWrapper from "../../components/LectureWrapper";
import InfoBox from "../../components/InfoBox";
import ExerciseBlock from "../../components/ExerciseBlock";
import HomeworkBlock from "../../components/HomeworkBlock";
import AnnotatedCode from "../../components/AnnotatedCode";
import Diagram from "../../components/Diagram";

const Lecture02 = () => {
  return (
    <LectureWrapper id="02" title="Semantic HTML, Media & CSS Introduction">
      {/* ── Semantic HTML ── */}
      <section>
        <h2>Why Semantic HTML Matters</h2>
        <p>
          Last lecture we built pages with headings, paragraphs, and links. We
          could wrap everything in plain <code>&lt;div&gt;</code> tags and the
          browser would still show it. So why learn new tags?
        </p>
        <p>
          Think of a newspaper. Even without reading the words, you can tell
          which part is the headline, the sidebar, and the footer just by where
          they are. <strong>Semantic HTML</strong> does the same thing for your
          code — it gives meaningful names to page regions so browsers, search
          engines, and screen readers instantly understand your structure.
        </p>

        <Diagram title="Non-Semantic vs Semantic">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
              <div className="font-bold text-red-700 mb-3">
                Bad (Non-Semantic)
              </div>
              <div className="space-y-2 font-mono text-sm text-red-600">
                <div className="bg-red-100 rounded px-3 py-1">
                  &lt;div id="top-bar"&gt;...&lt;/div&gt;
                </div>
                <div className="bg-red-100 rounded px-3 py-1">
                  &lt;div id="stuff"&gt;...&lt;/div&gt;
                </div>
                <div className="bg-red-100 rounded px-3 py-1">
                  &lt;div id="bottom"&gt;...&lt;/div&gt;
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Tells us nothing about content!
              </p>
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
              <div className="font-bold text-green-700 mb-3">
                Good (Semantic)
              </div>
              <div className="space-y-2 font-mono text-sm text-green-700">
                <div className="bg-green-100 rounded px-3 py-1">
                  &lt;header&gt;...&lt;/header&gt;
                </div>
                <div className="bg-green-100 rounded px-3 py-1">
                  &lt;main&gt;...&lt;/main&gt;
                </div>
                <div className="bg-green-100 rounded px-3 py-1">
                  &lt;footer&gt;...&lt;/footer&gt;
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Clear, meaningful, accessible!
              </p>
            </div>
          </div>
        </Diagram>
      </section>

      {/* ── Key Semantic Elements ── */}
      <section>
        <h2>The Semantic Elements You Need to Know</h2>
        <p>
          Here are the main building blocks. Think of them as rooms in your
          house — each one has a specific purpose:
        </p>

        <Diagram title="The Semantic Elements Family">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              {
                tag: "<header>",
                desc: "Logo, nav, site title",
                color: "bg-blue-500",
              },
              {
                tag: "<nav>",
                desc: "Navigation links",
                color: "bg-purple-500",
              },
              {
                tag: "<main>",
                desc: "Primary content (only one!)",
                color: "bg-red-500",
              },
              {
                tag: "<section>",
                desc: "Thematic grouping",
                color: "bg-yellow-500",
              },
              {
                tag: "<article>",
                desc: "Self-contained content",
                color: "bg-teal-500",
              },
              {
                tag: "<aside>",
                desc: "Sidebar, related info",
                color: "bg-orange-500",
              },
            ].map((item) => (
              <div
                key={item.tag}
                className={`${item.color} text-white rounded-xl p-4 text-center`}
              >
                <div className="font-bold font-mono text-sm">{item.tag}</div>
                <div className="text-xs mt-1 opacity-90">{item.desc}</div>
              </div>
            ))}
            <div className="col-span-2 sm:col-span-3 bg-gray-800 text-white rounded-xl p-4 text-center">
              <div className="font-bold font-mono text-sm">&lt;footer&gt;</div>
              <div className="text-xs mt-1 opacity-90">
                Copyright, contact, social links
              </div>
            </div>
          </div>
        </Diagram>

        <p>
          Now let's see how they all fit together in a real page layout. Click
          on the highlighted parts to understand:
        </p>

        <AnnotatedCode
          title="A Full Semantic Page Structure"
          segments={[
            {
              code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <title>My Blog</title>\n</head>\n<body>\n\n',
            },
            {
              code: "<header>",
              annotation:
                "The page header — typically holds the logo, site title, and navigation. Usually appears at the top of the page.",
              label: "Header",
            },
            { code: "\n  <h1>My Blog</h1>\n  " },
            {
              code: "<nav>",
              annotation:
                "Navigation — a container specifically for navigation links. Screen readers can jump directly to this section.",
              label: "Nav",
            },
            {
              code: '\n    <ul>\n      <li><a href="#">Home</a></li>\n      <li><a href="#">About</a></li>\n      <li><a href="#">Contact</a></li>\n    </ul>\n  </nav>\n</header>\n\n',
              annotation:
                "A navigation menu is a list of links, so mark it up as one. A screen reader then announces 'list, 3 items' and the user knows how much menu there is before they start. Bare <a> tags inside <nav> work visually but give that away. (Remove the bullets with list-style: none in CSS — the semantics stay.)",
              label: "Nav = a list of links",
            },
            {
              code: "<main>",
              annotation:
                "The main content area. Only ONE per page. Contains the primary content that is unique to this page.",
              label: "Main",
            },
            { code: "\n  " },
            {
              code: "<section>",
              annotation:
                "A thematic group of content. Use it when a chunk of content has its own heading and topic.",
              label: "Section",
            },
            { code: "\n    <h2>Latest Posts</h2>\n    " },
            {
              code: "<article>",
              annotation:
                "Self-contained content that could stand on its own — like a blog post, news story, or comment. Could be syndicated (shared) independently.",
              label: "Article",
            },
            {
              code: "\n      <h3>Learning HTML</h3>\n      <p>HTML is the skeleton of every web page...</p>\n    </article>\n  </section>\n\n  ",
            },
            {
              code: "<aside>",
              annotation:
                "Content tangentially related to the main content — sidebar, pull quotes, ads, author bios. Not essential to the main story.",
              label: "Aside",
            },
            {
              code: "\n    <h3>About the Author</h3>\n    <p>A front-end student at BTU.</p>\n  </aside>\n</main>\n\n",
            },
            {
              code: "<footer>",
              annotation:
                "The page footer — copyright notice, links to terms/privacy, contact info. Appears at the bottom.",
              label: "Footer",
            },
            {
              code: "\n  <p>&copy; 2026 My Blog. All rights reserved.</p>\n</footer>\n\n</body>\n</html>",
            },
          ]}
        />

        <InfoBox type="tip">
          A good rule of thumb: if you can replace a <code>&lt;div&gt;</code>{" "}
          with a more descriptive tag (<code>header</code>, <code>section</code>
          , <code>article</code>, etc.), you should. Your future self (and
          search engines) will thank you.
        </InfoBox>
      </section>

      {/* ── HTML Media ── */}
      <section>
        <h2>Media Elements — Images, Video, Audio, and YouTube</h2>
        <p>
          The web is not just text! Let's learn how to embed images, video,
          audio, and YouTube content. These are the tags that make your pages
          come alive.
        </p>

        <h3>Images and the alt Attribute</h3>
        <p>
          <code>&lt;img&gt;</code> is a void element — no closing tag, no
          content between tags. Everything it needs lives in its attributes.
        </p>

        <AnnotatedCode
          title="The image element — and the attribute everyone forgets"
          segments={[
            {
              code: "<img",
              annotation:
                "A void element: there is no </img>. Everything is an attribute.",
              label: "Image Tag",
            },
            { code: " " },
            {
              code: 'src="images/campus.jpg"',
              annotation:
                "Where the file is. A relative path like this one is resolved from the HTML file's own location — images/campus.jpg means 'the images folder next to this page'.",
              label: "src",
            },
            { code: "\n     " },
            {
              code: 'alt="Students working on laptops in the BTU library"',
              annotation:
                "The single most important attribute on the web. Screen readers read it aloud; it is what shows if the image fails to load; and search engines use it to understand the picture. Describe what the image SHOWS, in a sentence a person would find useful. Do not start with 'Image of' — the screen reader already says that.",
              label: "alt (required!)",
            },
            { code: "\n     " },
            {
              code: 'width="800" height="450"',
              annotation:
                "Give the real pixel dimensions of the file. The browser uses them to reserve the right amount of space before the image downloads, so the rest of the page does not jump around as images load. CSS can still resize it afterwards.",
              label: "width/height",
            },
            { code: "\n     " },
            {
              code: 'loading="lazy"',
              annotation:
                "Tells the browser not to download this image until the user scrolls near it. Use it on everything below the first screenful; leave it OFF the main image at the top, which you want loaded immediately.",
              label: "loading",
            },
            { code: " />\n\n" },
            {
              code: '<img src="decorative-swirl.svg" alt="" />',
              annotation:
                'An EMPTY alt is not a missing alt. alt="" means "this is pure decoration, skip it" and a screen reader stays silent. Leaving the attribute out entirely is different: the screen reader falls back to reading the file name aloud, which is worse than nothing.',
              label: 'alt="" for decoration',
            },
          ]}
        />

        <InfoBox type="tip">
          <strong>How to write alt text:</strong> ask what the image is{" "}
          <em>doing</em> on the page. A photo illustrating an article? Describe
          the scene. A logo inside a link to the homepage?{" "}
          <code>alt="BTU homepage"</code> — describe the destination, not the
          picture. A chart? Give the conclusion it shows, not "chart". Purely
          decorative? <code>alt=""</code>.
        </InfoBox>

        <h3>The Video Element</h3>
        <p>
          The <code>&lt;video&gt;</code> tag lets you embed video files directly
          in the page — no plugins needed.
        </p>

        <AnnotatedCode
          title="Video Element"
          segments={[
            {
              code: "<video",
              annotation:
                "The video tag embeds a video player directly in the page. No plugins or Flash needed — it is built into HTML5.",
              label: "Video Tag",
            },
            { code: " " },
            {
              code: 'width="640" height="360"',
              annotation:
                "Sets the dimensions of the video player in pixels. You can also use CSS for sizing.",
              label: "Dimensions",
            },
            { code: " " },
            {
              code: "controls",
              annotation:
                "Adds play/pause buttons, volume slider, progress bar, and fullscreen toggle. Without this, users cannot control playback!",
              label: "Controls",
            },
            {
              code: ">",
            },
            { code: "\n  " },
            {
              code: '<source src="video.mp4" type="video/mp4" />',
              annotation:
                "Points to the video file. The type attribute helps the browser know the format. You can add multiple sources for different formats as fallbacks.",
              label: "Source",
            },
            { code: "\n  " },
            {
              code: '<track kind="captions" src="captions.vtt"\n         srclang="en" label="English" default />',
              annotation:
                "Captions. Without them your video is unusable for deaf and hard-of-hearing viewers — and for everyone watching with the sound off, which is most people on a phone. A .vtt file is plain text: timestamps and the words spoken. 'default' turns them on automatically.",
              label: "Captions",
            },
            { code: "\n  Your browser does not support the video element.\n" },
            { code: "</video>" },
          ]}
        />

        <Diagram title="Video Attributes Cheat Sheet">
          <div className="flex flex-wrap gap-3">
            {[
              {
                attr: "controls",
                desc: "Play/pause buttons",
                color: "bg-blue-500",
              },
              {
                attr: "autoplay",
                desc: "Starts automatically",
                color: "bg-red-500",
              },
              { attr: "muted", desc: "Starts silent", color: "bg-yellow-600" },
              { attr: "loop", desc: "Repeats forever", color: "bg-green-500" },
              { attr: "poster", desc: "Preview image", color: "bg-purple-500" },
            ].map((item) => (
              <span
                key={item.attr}
                className={`${item.color} text-white text-xs px-3 py-1.5 rounded-full font-medium`}
              >
                {item.attr} — {item.desc}
              </span>
            ))}
          </div>
        </Diagram>

        <h3>The Audio Element</h3>
        <p>
          Works the same way but for sound files. Same attributes apply
          (controls, autoplay, muted, loop).
        </p>

        <AnnotatedCode
          title="Audio Element"
          segments={[
            {
              code: "<audio controls>",
              annotation:
                "The audio tag embeds a music/sound player. The controls attribute adds play/pause and volume. Works just like video but for sound files.",
              label: "Audio Tag",
            },
            { code: "\n  " },
            {
              code: '<source src="song.mp3" type="audio/mpeg" />',
              annotation:
                "MP3 is the most widely supported audio format. You can add multiple sources as fallback for older browsers.",
              label: "MP3 Source",
            },
            { code: "\n  " },
            {
              code: '<source src="song.ogg" type="audio/ogg" />',
              annotation:
                "OGG is an open-source alternative. Including both MP3 and OGG ensures maximum browser compatibility.",
              label: "OGG Fallback",
            },
            {
              code: "\n  Your browser does not support the audio element.\n</audio>",
            },
          ]}
        />

        <h3>Embedding YouTube Videos</h3>
        <p>
          YouTube does not let you download their videos, but you can embed them
          using an <code>&lt;iframe&gt;</code>. Go to a YouTube video, click{" "}
          <strong>Share &rarr; Embed</strong>, and copy the code:
        </p>

        <AnnotatedCode
          title="YouTube Embed with iframe"
          segments={[
            {
              code: "<iframe",
              annotation:
                "An iframe (inline frame) embeds an entire external page inside your page. It is like a window into another website — YouTube, Google Maps, CodePen, and more.",
              label: "iframe",
            },
            { code: "\n  " },
            {
              code: 'width="560" height="315"',
              annotation:
                "Dimensions of the embedded video player. YouTube provides default values of 560x315.",
              label: "Dimensions",
            },
            { code: "\n  " },
            {
              code: 'src="https://www.youtube.com/embed/VIDEO_ID"',
              annotation:
                "The embed URL. Note it uses /embed/ — not the regular youtube.com/watch URL. YouTube gives you this when you click Share > Embed.",
              label: "Source URL",
            },
            { code: "\n  " },
            {
              code: 'title="Introduction to the BTU campus"',
              annotation:
                "An iframe's accessible name. Without it a screen reader announces the embed as just 'frame', and the user has no idea whether to enter it. It is a WCAG requirement, it is one attribute, and almost nobody adds it — be the exception.",
              label: "title (required!)",
            },
            { code: "\n  " },
            {
              code: "allowfullscreen",
              annotation:
                "Allows the viewer to expand the video to fullscreen mode.",
              label: "Fullscreen",
            },
            { code: "\n></iframe>" },
          ]}
        />

        <InfoBox type="info">
          An <code>&lt;iframe&gt;</code> (inline frame) embeds an entire
          external page inside your page. Beyond YouTube, you can embed Google
          Maps, CodePen demos, and more. It is like a window into another
          website.
        </InfoBox>
      </section>

      {/* ── CSS Introduction ── */}
      <section>
        <h2>Introduction to CSS — Making Things Pretty!</h2>
        <p>
          <strong>CSS</strong> (Cascading Style Sheets) is the language that
          controls how HTML elements <em>look</em>. Without CSS, every page
          would be plain black text on a white background. Boring! CSS gives you
          control over colors, fonts, spacing, sizes, and layout.
        </p>

        <h3>Three Ways to Add CSS</h3>
        <p>
          There are three ways to connect CSS to your HTML. Let's see all three:
        </p>

        <Diagram title="CSS Connection Methods — Compared">
          <div className="space-y-4">
            {[
              {
                method: "1. Inline Styles",
                where: "On the element itself",
                pro: "Quick for testing",
                con: "Messy, hard to maintain",
                color: "border-red-300 bg-red-50",
                badge: "bg-red-100 text-red-700",
              },
              {
                method: "2. Internal Stylesheet",
                where: "In a <style> tag in the <head>",
                pro: "Good for single pages",
                con: "Cannot reuse across pages",
                color: "border-yellow-300 bg-yellow-50",
                badge: "bg-yellow-100 text-yellow-700",
              },
              {
                method: "3. External Stylesheet",
                where: "Separate .css file linked via <link>",
                pro: "Clean, reusable, scalable",
                con: "An extra HTTP request",
                color: "border-green-300 bg-green-50",
                badge: "bg-green-100 text-green-700",
              },
            ].map((m) => (
              <div
                key={m.method}
                className={`border-2 ${m.color} rounded-xl p-4`}
              >
                <div className="font-bold text-gray-800">{m.method}</div>
                <div className="text-sm text-gray-600 mt-1">
                  Where: {m.where}
                </div>
                <div className="flex gap-3 mt-2 text-xs">
                  <span className={`${m.badge} px-2 py-0.5 rounded-full`}>
                    Pro: {m.pro}
                  </span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    Con: {m.con}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Diagram>

        <h4>Method 1: Inline Styles</h4>
        <AnnotatedCode
          title="Inline CSS — Quick but Messy"
          segments={[
            { code: "<p " },
            {
              code: 'style="color: red; font-size: 24px; font-weight: bold;"',
              annotation:
                "The style attribute lets you write CSS directly on any HTML element. Quick for testing, but terrible for real projects — imagine changing the color of 50 elements one by one!",
              label: "Style Attribute",
            },
            { code: ">\n  I am styled with inline CSS\n</p>" },
          ]}
        />

        <h4>Method 2: Internal Stylesheet</h4>
        <AnnotatedCode
          title="Internal CSS — Style Tag in the Head"
          segments={[
            { code: "<head>\n  " },
            {
              code: "<style>",
              annotation:
                "The <style> tag goes inside <head>. All CSS rules inside apply to the whole page. Good for single-page experiments.",
              label: "Style Tag",
            },
            { code: "\n    " },
            {
              code: "h1 { color: navy; text-align: center; }",
              annotation:
                "This is a CSS rule. 'h1' is the selector (what to style), and the properties inside { } define how to style it.",
              label: "CSS Rule",
            },
            {
              code: "\n    p { font-size: 16px; color: #555; }\n  </style>\n</head>",
            },
          ]}
        />

        <h4>Method 3: External Stylesheet (The Best Way!)</h4>
        <AnnotatedCode
          title="External CSS — Linked from a Separate File"
          segments={[
            { code: "<head>\n  " },
            {
              code: '<link rel="stylesheet" href="styles.css" />',
              annotation:
                "This links an external CSS file to your HTML page. 'rel' says it is a stylesheet, 'href' points to the file. This is the recommended approach — keeps HTML and CSS separate and lets you share one CSS file across multiple pages.",
              label: "Link Tag",
            },
            { code: "\n</head>" },
          ]}
        />

        <InfoBox type="warning">
          When two rules set the same property on the same element, the browser
          decides in this order: <strong>1. where the rule came from</strong>{" "}
          (your stylesheet beats the browser's defaults),{" "}
          <strong>2. specificity</strong> (how precisely the selector targets
          the element -- see below), and only if those tie,{" "}
          <strong>3. source order</strong> (the last rule written wins). This is
          the "Cascading" in CSS. Note that{" "}
          <em>internal vs external has nothing to do with it</em> -- a{" "}
          <code>&lt;style&gt;</code> block does not beat a linked stylesheet;
          whichever comes last in the HTML does.
        </InfoBox>
      </section>

      {/* ── CSS Selectors ── */}
      <section>
        <h2>CSS Selectors — Targeting the Right Elements</h2>
        <p>
          A <strong>selector</strong> tells CSS WHICH elements to style. Think
          of it as a search query: "find all paragraphs", "find the element with
          this class", etc.
        </p>

        <Diagram title="CSS Selectors Cheat Sheet">
          <div className="space-y-3">
            {[
              {
                name: "Element Selector",
                syntax: "p { ... }",
                desc: "Targets ALL elements of that type",
                example: "p, h1, div, a",
                color: "bg-blue-50 border-blue-200",
              },
              {
                name: "Class Selector",
                syntax: ".highlight { ... }",
                desc: "Targets elements with that class (reusable!)",
                example: '<p class="highlight">',
                color: "bg-green-50 border-green-200",
              },
              {
                name: "ID Selector",
                syntax: "#main-title { ... }",
                desc: "Targets ONE unique element",
                example: '<h1 id="main-title">',
                color: "bg-purple-50 border-purple-200",
              },
              {
                name: "Descendant Selector",
                syntax: "nav a { ... }",
                desc: "Targets elements INSIDE another element",
                example: "only <a> tags inside <nav>",
                color: "bg-orange-50 border-orange-200",
              },
              {
                name: "Grouping Selector",
                syntax: "h1, h2, h3 { ... }",
                desc: "Same styles for multiple selectors",
                example: "comma-separated list",
                color: "bg-teal-50 border-teal-200",
              },
            ].map((sel) => (
              <div
                key={sel.name}
                className={`${sel.color} border-2 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center gap-2`}
              >
                <div className="sm:w-40 shrink-0">
                  <div className="font-bold text-gray-800 text-sm">
                    {sel.name}
                  </div>
                </div>
                <code className="text-sm bg-gray-800 text-green-400 px-3 py-1 rounded shrink-0">
                  {sel.syntax}
                </code>
                <div className="text-sm text-gray-600">{sel.desc}</div>
                <div className="text-xs text-gray-400 ml-auto hidden sm:block">
                  {sel.example}
                </div>
              </div>
            ))}
          </div>
        </Diagram>

        <h3>Selectors in Action</h3>
        <AnnotatedCode
          title="CSS Selectors Example"
          segments={[
            { code: "/* " },
            {
              code: "Element Selector",
              annotation:
                "Targets ALL <p> elements on the page. Every paragraph will get this font size and color.",
              label: "Element",
            },
            { code: " */\n" },
            { code: "p {\n  font-size: 16px;\n  color: #333;\n}\n\n" },
            { code: "/* " },
            {
              code: "Class Selector",
              annotation:
                'Targets any element with class="highlight". Classes start with a dot (.) and can be reused on multiple elements. This is the workhorse of CSS!',
              label: "Class",
            },
            { code: " */\n" },
            {
              code: ".highlight {\n  background-color: #fff3cd;\n  padding: 4px 8px;\n  border-radius: 4px;\n}\n\n",
            },
            { code: "/* " },
            {
              code: "ID Selector",
              annotation:
                'Targets the ONE element with id="main-title". IDs start with a hash (#) and must be unique on the page. Use sparingly — prefer classes for styling.',
              label: "ID",
            },
            { code: " */\n" },
            {
              code: "#main-title {\n  font-size: 32px;\n  color: #8e44ad;\n  text-transform: uppercase;\n}\n\n",
            },
            { code: "/* " },
            {
              code: "Descendant Selector",
              annotation:
                "Targets <a> tags ONLY when they are inside <nav>. Links elsewhere on the page are not affected. The space between nav and a means 'inside'.",
              label: "Descendant",
            },
            { code: " */\n" },
            {
              code: "nav a {\n  color: white;\n  text-decoration: none;\n  padding: 8px 16px;\n}\n\n",
            },
            { code: "/* " },
            {
              code: "Grouping Selector",
              annotation:
                "Applies the same styles to multiple selectors at once. Use commas to separate them. Saves you from repeating the same CSS.",
              label: "Grouping",
            },
            { code: " */\n" },
            {
              code: "h1, h2, h3 {\n  font-family: Georgia, serif;\n  color: #2c3e50;\n}",
            },
          ]}
        />

        <InfoBox type="tip">
          Use <strong>classes</strong> for styling in most cases. Reserve{" "}
          <strong>IDs</strong> for unique elements you might target with
          JavaScript or anchor links. Over-using IDs is a common beginner
          mistake.
        </InfoBox>

        <h3>Specificity: Who Wins?</h3>
        <p>
          Sooner or later two rules will target the same element and set the
          same property. Which one applies is not "the last one" and not "the
          longest one" -- it is decided by <strong>specificity</strong>. Count
          the selector as three numbers:
        </p>

        <Diagram title="Specificity: count IDs, then classes, then elements">
          <div className="space-y-2">
            {[
              {
                sel: "p",
                score: "0-0-1",
                note: "one element",
                color: "bg-gray-100 border-gray-300",
              },
              {
                sel: "nav a",
                score: "0-0-2",
                note: "two elements",
                color: "bg-gray-100 border-gray-300",
              },
              {
                sel: ".highlight",
                score: "0-1-0",
                note: "one class -- beats ANY number of elements",
                color: "bg-blue-50 border-blue-300",
              },
              {
                sel: "nav a.active",
                score: "0-1-2",
                note: "one class + two elements",
                color: "bg-blue-50 border-blue-300",
              },
              {
                sel: "#main-title",
                score: "1-0-0",
                note: "one ID -- beats ANY number of classes",
                color: "bg-purple-50 border-purple-300",
              },
            ].map((row) => (
              <div
                key={row.sel}
                className={`${row.color} border-2 rounded-lg px-4 py-2 flex flex-wrap items-center gap-3`}
              >
                <code className="bg-gray-800 text-green-400 px-3 py-1 rounded text-sm">
                  {row.sel}
                </code>
                <span className="font-mono font-bold text-gray-800 text-sm">
                  {row.score}
                </span>
                <span className="text-sm text-gray-600">{row.note}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Compare left to right. The first column that differs decides it --
            so <code>0-1-0</code> beats <code>0-0-9</code>, and{" "}
            <code>1-0-0</code> beats <code>0-9-0</code>. Only when the scores
            are <em>identical</em> does the later rule win.
          </p>
        </Diagram>

        <AnnotatedCode
          title="Same element, three rules -- which colour is the text?"
          segments={[
            {
              code: '<p id="intro" class="lead">Hello</p>\n\n',
              annotation:
                "One paragraph carrying both an id and a class. All three rules below match it.",
              label: "The element",
            },
            {
              code: "p      { color: black; }   /* 0-0-1 */\n",
              annotation:
                "Matches, but it is the weakest of the three. Being written last would not save it.",
              label: "0-0-1",
            },
            {
              code: ".lead  { color: blue;  }   /* 0-1-0 */\n",
              annotation:
                "One class beats any number of element selectors — so this already beats the rule above.",
              label: "0-1-0",
            },
            {
              code: "#intro { color: red;   }   /* 1-0-0 */\n\n",
              annotation:
                "One ID beats any number of classes. The text is RED, even though the blue rule appears later in the file.",
              label: "1-0-0 wins",
            },
            {
              code: "/* Result: red */",
            },
          ]}
        />

        <InfoBox type="warning">
          This is exactly why over-using IDs hurts: an ID rule is so strong that
          the only ways to override it later are another ID, an inline{" "}
          <code>style</code> attribute, or <code>!important</code> -- and
          reaching for <code>!important</code> is how stylesheets become
          unmaintainable. Style with classes and you can always adjust later.
        </InfoBox>
      </section>

      {/* ── GitHub Quick Intro ── */}
      <section>
        <h2>Uploading Code to GitHub</h2>
        <p>
          <strong>GitHub</strong> is like Google Drive for code — but with
          powerful version tracking. Developers use it to store, share, and
          collaborate on projects.
        </p>

        <Diagram title="Getting Started with GitHub">
          <div className="space-y-3">
            {[
              {
                step: "1",
                text: "Create a free account at github.com",
                icon: "+",
              },
              {
                step: "2",
                text: "Create a new repository (project folder in the cloud)",
                icon: ">",
              },
              {
                step: "3",
                text: 'Upload your HTML/CSS files using the "Upload files" button',
                icon: "^",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-center gap-4 bg-gray-50 rounded-lg p-3 border border-gray-200"
              >
                <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {item.step}
                </div>
                <span className="text-sm text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </Diagram>

        <InfoBox type="info">
          We will learn the full Git workflow later. For now, just practice
          uploading homework files through the GitHub website.
        </InfoBox>
      </section>

      {/* ── Exercises ── */}
      <section>
        <h2>Exercises</h2>

        <ExerciseBlock number={1}>
          <p>
            Create <code>semantic.html</code> with:
          </p>
          <ul>
            <li>
              A <code>&lt;header&gt;</code> with an h1 and a nav (3 links)
            </li>
            <li>
              A <code>&lt;main&gt;</code> containing two sections, each with an
              h2 and a paragraph
            </li>
            <li>
              An <code>&lt;aside&gt;</code> with an "About the Author" blurb
            </li>
            <li>
              A <code>&lt;footer&gt;</code> with a copyright notice
            </li>
          </ul>
        </ExerciseBlock>

        <ExerciseBlock number={2}>
          <p>
            Create <code>media.html</code>:
          </p>
          <ul>
            <li>Embed a YouTube video using an iframe</li>
            <li>Add an audio element</li>
            <li>
              Style the page with an external CSS file: center content, add a
              background color, style the heading
            </li>
          </ul>
        </ExerciseBlock>

        <ExerciseBlock number={3}>
          <p>
            Create <code>selectors.html</code> and <code>selectors.css</code>:
          </p>
          <ul>
            <li>
              Five paragraphs — give two of them class <code>highlight</code>{" "}
              and one of them id <code>special</code>
            </li>
            <li>
              In CSS: element selector for base font, class selector for yellow
              background, ID selector for bold+red, descendant selector for nav
              links
            </li>
          </ul>
        </ExerciseBlock>
      </section>

      {/* ── Homework ── */}
      <HomeworkBlock>
        <h3>Styled Semantic Blog Page</h3>
        <p>
          Create a blog-style page with semantic HTML and an external CSS file:
        </p>
        <ol>
          <li>
            Use proper semantic tags: header, nav, main, article (at least 2),
            aside, and footer
          </li>
          <li>Embed one YouTube video and one audio element in an article</li>
          <li>
            Use at least: one element selector, two class selectors, one ID
            selector, one descendant selector, and one grouping selector
          </li>
          <li>Upload your code to a GitHub repository</li>
        </ol>
      </HomeworkBlock>
    </LectureWrapper>
  );
};

export default Lecture02;
