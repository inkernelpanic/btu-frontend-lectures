import LectureWrapper from "../../components/LectureWrapper";
import AnnotatedCode from "../../components/AnnotatedCode";
import Diagram from "../../components/Diagram";
import PositionDemo from "../../components/PositionDemo";
import InfoBox from "../../components/InfoBox";
import ExerciseBlock from "../../components/ExerciseBlock";
import HomeworkBlock from "../../components/HomeworkBlock";

const Lecture06 = () => {
  return (
    <LectureWrapper id="06" title="Responsive Design & Positioning">
      {/* ── Intro ── */}
      <section>
        <h2>One Website, Every Screen</h2>
        <p>
          Here is a fun fact: over <strong>60% of all web traffic</strong> now
          comes from mobile phones. If your website only looks good on a laptop,
          you are alienating more than half your visitors. Imagine opening a
          restaurant and locking the front door for most customers -- that is
          what a non-responsive site does.
        </p>
        <p>
          Today you will learn how to make websites that flow like water --
          adapting to phones, tablets, laptops, and giant desktop monitors. We
          will also tackle <strong>CSS positioning</strong>, which lets you
          stick navbars to the top, float badges in corners, and layer elements
          on top of each other.
        </p>
      </section>

      {/* ── Viewport Meta ── */}
      <section>
        <h2>Step Zero: The Viewport Meta Tag</h2>
        <p>
          Before writing a single line of responsive CSS, you need this one line
          in your HTML <code>&lt;head&gt;</code>. Without it, mobile browsers
          pretend they are a desktop and show your site zoomed out to a tiny
          unreadable mess.
        </p>

        <AnnotatedCode
          title="Always include this in every HTML file"
          segments={[
            {
              code: '<meta name="viewport" content="',
            },
            {
              code: "width=device-width",
              annotation:
                "Tells the browser to set the viewport width to match the device's actual screen width, instead of pretending to be a 980px desktop.",
              label: "Device width",
            },
            {
              code: ", ",
            },
            {
              code: "initial-scale=1.0",
              annotation:
                "Sets the initial zoom level to 100% (no zoom). Without this, the browser might zoom in or out unpredictably.",
              label: "Initial scale",
            },
            {
              code: '" />\n',
            },
          ]}
        />

        <InfoBox type="warning">
          If your media queries are not working on mobile, the viewport meta tag
          is almost always the culprit. It is the number one forgotten line in
          student projects. Tattoo it on your brain!
        </InfoBox>
      </section>

      {/* ── Media Queries ── */}
      <section>
        <h2>Media Queries: CSS "If Statements"</h2>
        <p>
          Media queries let you say:{" "}
          <em>
            "Hey browser, IF the screen is narrower than 768px, use THESE styles
            instead."
          </em>{" "}
          They are like if-statements for CSS. Here is the basic syntax:
        </p>

        <AnnotatedCode
          title="Media query basics"
          segments={[
            {
              code: ".box {\n  background: #3498db; /* Blue on wide screens */\n  padding: 30px;\n  font-size: 24px;\n}\n\n",
            },
            {
              code: "@media (max-width: 500px) {\n",
              annotation:
                "@media is the media query. (max-width: 500px) means 'if the viewport is 500px or narrower'. Everything inside the curly braces only applies when this condition is true.",
              label: "@media query",
            },
            {
              code: "  .box {\n    background: #e74c3c; /* Red on narrow screens */\n    font-size: 16px;\n    padding: 16px;\n  }\n}\n",
            },
          ]}
        />

        <h3>Mobile-First vs Desktop-First</h3>
        <p>
          There are two approaches. <strong>Mobile-first</strong> means you
          write styles for the smallest screen, then use <code>min-width</code>{" "}
          to add complexity for larger screens. <strong>Desktop-first</strong>{" "}
          is the opposite: write for big screens, then use{" "}
          <code>max-width</code> to scale down.
        </p>

        <Diagram title="Mobile-First vs Desktop-First">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
              <h4 className="text-green-700 font-bold mb-2">
                Mobile-First (Recommended)
              </h4>
              <div className="text-sm text-gray-700 space-y-2">
                <p>Write base styles for mobile.</p>
                <div className="font-mono text-xs bg-white rounded p-2">
                  <div className="text-gray-500">/* Base: mobile */</div>
                  <div>
                    <span className="text-green-600">
                      @media (min-width: 768px)
                    </span>{" "}
                    {"{"}
                  </div>
                  <div className="text-gray-400 ml-2">
                    /* Tablet enhancements */
                  </div>
                  <div>{"}"}</div>
                  <div>
                    <span className="text-green-600">
                      @media (min-width: 1024px)
                    </span>{" "}
                    {"{"}
                  </div>
                  <div className="text-gray-400 ml-2">
                    /* Desktop enhancements */
                  </div>
                  <div>{"}"}</div>
                </div>
                <p className="font-bold">Start simple, add complexity.</p>
              </div>
            </div>
            <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4">
              <h4 className="text-orange-700 font-bold mb-2">Desktop-First</h4>
              <div className="text-sm text-gray-700 space-y-2">
                <p>Write base styles for desktop.</p>
                <div className="font-mono text-xs bg-white rounded p-2">
                  <div className="text-gray-500">/* Base: desktop */</div>
                  <div>
                    <span className="text-orange-600">
                      @media (max-width: 768px)
                    </span>{" "}
                    {"{"}
                  </div>
                  <div className="text-gray-400 ml-2">
                    /* Tablet overrides */
                  </div>
                  <div>{"}"}</div>
                  <div>
                    <span className="text-orange-600">
                      @media (max-width: 480px)
                    </span>{" "}
                    {"{"}
                  </div>
                  <div className="text-gray-400 ml-2">
                    /* Mobile overrides */
                  </div>
                  <div>{"}"}</div>
                </div>
                <p className="font-bold">Start complex, strip away.</p>
              </div>
            </div>
          </div>
        </Diagram>

        <InfoBox type="tip">
          Mobile-first is the industry standard because: (1) mobile phones are
          slower, so less CSS = better performance, (2) it forces you to
          prioritize content, (3) it is easier to add complexity than remove it.
        </InfoBox>

        <h3>Common Breakpoints</h3>
        <p>
          There is no "perfect" set of breakpoints, but these are widely used.
          The real rule? Resize your browser and add a breakpoint wherever your
          layout starts looking broken.
        </p>

        <Diagram title="Common responsive breakpoints">
          <div className="flex flex-wrap gap-3 justify-center">
            <div className="bg-red-500 text-white rounded-lg px-5 py-3 text-center">
              <div className="font-bold text-sm">Phone</div>
              <div className="text-xs opacity-80">&lt; 480px</div>
            </div>
            <div className="bg-orange-500 text-white rounded-lg px-5 py-3 text-center">
              <div className="font-bold text-sm">Tablet</div>
              <div className="text-xs opacity-80">480px - 768px</div>
            </div>
            <div className="bg-green-500 text-white rounded-lg px-5 py-3 text-center">
              <div className="font-bold text-sm">Laptop</div>
              <div className="text-xs opacity-80">768px - 1024px</div>
            </div>
            <div className="bg-blue-500 text-white rounded-lg px-5 py-3 text-center">
              <div className="font-bold text-sm">Desktop</div>
              <div className="text-xs opacity-80">1024px+</div>
            </div>
          </div>
        </Diagram>

        <h3>Media Queries Are Not Only About Width</h3>
        <p>
          A media query asks the browser a question. "How wide are you?" is the
          most common one, but two others are just as useful -- and they ask
          about the <em>person</em>, not the screen.
        </p>

        <AnnotatedCode
          title="Two media queries that respond to the user, not the device"
          segments={[
            {
              code: "@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}\n\n",
              annotation:
                "True when the visitor has turned on 'Reduce motion' in their operating system. You met this in week 5 next to @keyframes -- it belongs in the responsive toolkit too, because responding to your user's stated needs is exactly what responsive design means.",
              label: "Reduced motion",
            },
            {
              code: "@media (prefers-color-scheme: dark) {\n  :root {\n    --bg: #1a202c;\n    --text: #e2e8f0;\n  }\n}\n\n",
              annotation:
                "True when the visitor's system is set to dark mode. Combine it with the CSS custom properties from week 4: redefine the tokens here and your whole page adapts, without touching a single component rule.",
              label: "Dark mode",
            },
            {
              code: "@media (hover: none) {\n  .tooltip { display: none; }\n}",
              annotation:
                "True on devices with no hover -- phones and tablets. If a piece of information only appears on :hover, a touch user can never reach it. This query is how you give them an alternative.",
              label: "No hover",
            },
          ]}
        />

        <h3>Container Queries: Ask the Parent, Not the Page</h3>
        <p>
          Here is a problem media queries cannot solve. You build a card that
          goes from stacked to side-by-side above 400px. Put it in the main
          column and it looks right. Put the same card in a narrow sidebar on a
          wide desktop and it goes side-by-side anyway -- because the{" "}
          <em>page</em> is wide, even though the <em>card</em> is not.
        </p>

        <Diagram title="Same card, same page width, different container">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-green-700 text-sm mb-2">
                Main column — wide container
              </h4>
              <div className="bg-white border border-gray-300 rounded p-2 flex gap-2 items-center">
                <div className="bg-gray-300 rounded w-12 h-12 shrink-0" />
                <div className="text-xs text-gray-600">
                  Image beside the text — correct.
                </div>
              </div>
            </div>
            <div className="md:w-52 bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <h4 className="font-bold text-red-700 text-sm mb-2">
                Sidebar — narrow container
              </h4>
              <div className="bg-white border border-gray-300 rounded p-2 flex gap-2 items-center">
                <div className="bg-gray-300 rounded w-12 h-12 shrink-0" />
                <div className="text-[10px] text-gray-600 leading-tight">
                  Squashed — but a media query sees the same wide page and
                  cannot tell the difference.
                </div>
              </div>
            </div>
          </div>
        </Diagram>

        <AnnotatedCode
          title="Container queries: the component decides for itself"
          segments={[
            {
              code: ".card-wrapper {\n",
            },
            {
              code: "  container-type: inline-size;\n",
              annotation:
                "Declares this element a CONTAINER that children can measure themselves against. 'inline-size' means 'track the width'. Nothing looks different yet -- you have just given the children something to ask about.",
              label: "Declare a container",
            },
            {
              code: "}\n\n",
            },
            {
              code: "@container (min-width: 400px) {\n",
              annotation:
                "@container instead of @media. This asks 'is my nearest container at least 400px wide?' -- not 'is the page at least 400px wide?'. Same card, dropped anywhere on the site, now always lays itself out correctly.",
              label: "@container",
            },
            {
              code: "  .card {\n    display: flex;\n    gap: 1rem;\n  }\n}",
              annotation:
                "Side-by-side only when there is genuinely room for it. In a narrow sidebar this rule simply never applies, and the card stays stacked.",
              label: "The rule",
            },
          ]}
        />

        <InfoBox type="tip">
          Rule of thumb: use <code>@media</code> for the <strong>page</strong>{" "}
          layout -- how many columns the whole site has, when the nav collapses.
          Use <code>@container</code> for <strong>components</strong> that must
          work anywhere you drop them. Container queries have been supported in
          every major browser since 2023.
        </InfoBox>
      </section>

      {/* ── Responsive Techniques ── */}
      <section>
        <h2>Responsive Building Blocks</h2>

        <h3>Responsive Images</h3>
        <p>
          The golden rule: <code>max-width: 100%; height: auto;</code>. This
          single line prevents images from overflowing their containers on small
          screens. Add it as a global style and forget about it.
        </p>

        <AnnotatedCode
          title="Responsive images -- the golden rule"
          segments={[
            {
              code: "img {\n",
            },
            {
              code: "  max-width: 100%;\n",
              annotation:
                "The image can never be wider than its container. On small screens it shrinks down; on large screens it stays at its natural size. This is the single most important responsive image rule.",
              label: "max-width: 100%",
            },
            {
              code: "  height: auto;\n",
              annotation:
                "Keeps the image's aspect ratio intact. Without this, the image could get squished or stretched when the width changes.",
              label: "height: auto",
            },
            {
              code: "  display: block;\n}\n",
            },
          ]}
        />

        <p>
          Two more things every responsive image should carry. Both were in the
          image tag you met in week 2 -- here is why they matter on small
          screens:
        </p>

        <AnnotatedCode
          title="Stop the page jumping, stop downloading what nobody sees"
          segments={[
            {
              code: '<img src="photo.jpg" alt="..."\n     ',
            },
            {
              code: 'width="1200" height="800"',
              annotation:
                "The real dimensions of the file. Combined with the max-width/height:auto rule above, the browser can work out the aspect ratio BEFORE the image downloads and reserve exactly the right space. Without them the page reflows as each image arrives -- text jumps, and people tap the wrong button.",
              label: "No layout shift",
            },
            { code: "\n     " },
            {
              code: 'loading="lazy"',
              annotation:
                "Images further down the page are only downloaded when the user scrolls near them. On a long page over a mobile connection this is the single biggest performance win available for one attribute. Leave it off the hero image at the top -- that one you want immediately.",
              label: "Lazy loading",
            },
            { code: " />\n\n" },
            {
              code: ".card-image {\n  aspect-ratio: 16 / 9;\n  object-fit: cover;\n}",
              annotation:
                "For card grids where every image must be the same shape regardless of the file's real dimensions. aspect-ratio reserves the box, object-fit: cover fills it without distortion (it crops instead of squashing). This replaces the old padding-top percentage hack entirely.",
              label: "aspect-ratio",
            },
          ]}
        />

        <h3>Fluid Typography with clamp()</h3>
        <p>
          Instead of setting fixed font sizes and overriding them at every
          breakpoint, use <code>clamp(min, preferred, max)</code> to create text
          that smoothly scales with the viewport. No media queries needed!
        </p>

        <AnnotatedCode
          title="Fluid typography with clamp()"
          segments={[
            {
              code: "h1 {\n",
            },
            {
              code: "  font-size: clamp(1.5rem, 4vw, 3rem);\n",
              annotation:
                "clamp(min, preferred, max) -- the font will be at least 1.5rem (24px), ideally 4% of viewport width, but never more than 3rem (48px). As you resize the window, the text smoothly scales between 24px and 48px. No breakpoints needed!",
              label: "clamp()",
            },
            {
              code: "}\n\np {\n  font-size: clamp(0.9rem, 1.5vw, 1.1rem);\n}\n",
            },
          ]}
        />

        <InfoBox type="info">
          <code>clamp(1.5rem, 4vw, 3rem)</code> means: "be at least 1.5rem,
          ideally 4% of viewport width, but never more than 3rem." The{" "}
          <code>vw</code> unit (viewport width) makes it fluid.
        </InfoBox>

        <h3>A Complete Mobile-First Example</h3>
        <AnnotatedCode
          title="Mobile-first responsive cards layout"
          segments={[
            {
              code: "/* Base styles -- mobile (smallest screens) */\n.cards {\n  display: grid;\n",
            },
            {
              code: "  grid-template-columns: 1fr;\n",
              annotation:
                "On mobile, cards stack in a single column (1fr = one column taking full width). This is the base/default layout.",
              label: "Mobile: 1 column",
            },
            {
              code: "  gap: 12px;\n}\n\n",
            },
            {
              code: "@media (min-width: 600px) {\n  .cards {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n",
              annotation:
                "When the viewport reaches 600px or wider (tablet), switch to 2 columns. min-width means 'from this size and UP'.",
              label: "Tablet: 2 columns",
            },
            {
              code: "\n",
            },
            {
              code: "@media (min-width: 900px) {\n  .cards {\n    grid-template-columns: 1fr 1fr 1fr;\n  }\n}\n",
              annotation:
                "At 900px or wider (desktop), switch to 3 columns. Each breakpoint adds complexity on top of the simpler mobile base.",
              label: "Desktop: 3 columns",
            },
          ]}
        />
      </section>

      {/* ── CSS Positioning ── */}
      <section>
        <h2>CSS Positioning: Placing Things Precisely</h2>
        <p>
          The <code>position</code> property is one of the most important (and
          most confusing) concepts in CSS. It controls how an element is placed
          on the page and unlocks the <code>top</code>, <code>right</code>,{" "}
          <code>bottom</code>, and <code>left</code> properties.
        </p>
        <p>
          There are 5 values and each behaves very differently. Let's go through
          them one by one.
        </p>

        <Diagram title="The 5 position values at a glance">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="bg-gray-400 text-white rounded-lg p-3 text-center">
              <h4 className="font-bold text-sm">static</h4>
              <p className="text-xs opacity-90 mt-1">
                Default. Normal flow. top/left have no effect.
              </p>
            </div>
            <div className="bg-blue-500 text-white rounded-lg p-3 text-center">
              <h4 className="font-bold text-sm">relative</h4>
              <p className="text-xs opacity-90 mt-1">
                Nudge from normal spot. Original space preserved.
              </p>
            </div>
            <div className="bg-red-500 text-white rounded-lg p-3 text-center">
              <h4 className="font-bold text-sm">absolute</h4>
              <p className="text-xs opacity-90 mt-1">
                Removed from flow. Positions within nearest positioned parent.
              </p>
            </div>
            <div className="bg-green-500 text-white rounded-lg p-3 text-center">
              <h4 className="font-bold text-sm">fixed</h4>
              <p className="text-xs opacity-90 mt-1">
                Glued to viewport. Stays on scroll. Great for navbars.
              </p>
            </div>
            <div className="bg-purple-500 text-white rounded-lg p-3 text-center">
              <h4 className="font-bold text-sm">sticky</h4>
              <p className="text-xs opacity-90 mt-1">
                Normal until scroll threshold, then sticks.
              </p>
            </div>
          </div>
        </Diagram>

        <h3>1. Static (the Default)</h3>
        <p>
          Every element is <code>position: static</code> by default. It just
          sits in the normal document flow. The directional properties (
          <code>top</code>, <code>left</code>, etc.) have{" "}
          <strong>zero effect</strong> on static elements.
        </p>

        <h3>2. Relative: "Nudge from Normal"</h3>
        <p>
          <code>position: relative</code> keeps the element in its normal spot
          but lets you <em>nudge</em> it with top/left/bottom/right. The key
          trick: <strong>the original space is preserved</strong>. Other
          elements act as if it never moved.
        </p>

        <AnnotatedCode
          title="position: relative -- nudge without breaking layout"
          segments={[
            {
              code: ".nudged-box {\n",
            },
            {
              code: "  position: relative;\n",
              annotation:
                "Tells the browser: this element can be nudged from its normal position using top/left/bottom/right. But its original space in the document flow is still reserved.",
              label: "relative",
            },
            {
              code: "  top: 30px;\n",
              annotation:
                "Pushes the element 30px DOWN from its normal position. Yes, 'top: 30px' moves it down. Think of it as 'distance from the top edge'.",
              label: "top: 30px",
            },
            {
              code: "  left: 20px;\n",
              annotation:
                "Pushes the element 20px to the RIGHT from its normal position. Other elements around it are NOT affected -- they stay exactly where they were.",
              label: "left: 20px",
            },
            {
              code: "}\n",
            },
          ]}
        />

        <h3>3. Absolute: "Break Free and Position Within Parent"</h3>
        <p>
          <code>position: absolute</code> yanks the element out of the normal
          flow entirely. It positions itself relative to the nearest{" "}
          <strong>positioned ancestor</strong> (an ancestor with{" "}
          <code>position: relative</code>, <code>absolute</code>, or{" "}
          <code>fixed</code>). This is perfect for badges, overlays, and
          tooltips.
        </p>

        <AnnotatedCode
          title="Absolute positioning -- badge and overlay"
          segments={[
            {
              code: ".card {\n",
            },
            {
              code: "  position: relative;\n",
              annotation:
                "This is the KEY step people forget! Making the parent 'relative' creates a positioning context. Without this, the absolute child would position itself relative to the entire page.",
              label: "Parent: relative",
            },
            {
              code: "  width: 280px;\n  padding: 20px;\n  border: 2px solid #e0e0e0;\n  border-radius: 12px;\n}\n\n.badge {\n",
            },
            {
              code: "  position: absolute;\n",
              annotation:
                "Takes the badge OUT of normal flow. It will now position itself relative to the nearest positioned ancestor (the .card with position: relative).",
              label: "Child: absolute",
            },
            {
              code: "  top: -10px;\n  right: -10px;\n",
              annotation:
                "Places the badge 10px above the top edge and 10px past the right edge of the card. Negative values move it outside the parent's boundary.",
              label: "top/right offsets",
            },
            {
              code: "  background: #e74c3c;\n  color: white;\n  padding: 6px 14px;\n  border-radius: 20px;\n  font-size: 12px;\n}\n",
            },
          ]}
        />

        <Diagram title="The absolute positioning pattern">
          <div className="flex justify-center">
            <div className="relative bg-white border-2 border-gray-300 rounded-xl p-6 w-72">
              <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                SALE
              </div>
              <div className="text-center">
                <h4 className="font-bold text-gray-700 mb-1">Product Card</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Parent has position: relative
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm py-2 text-center rounded-b-xl">
                Overlay at bottom (position: absolute)
              </div>
              <div className="h-8" />
            </div>
          </div>
        </Diagram>

        <InfoBox type="warning">
          If no ancestor is positioned, the absolute element will position
          itself relative to the entire page (<code>&lt;html&gt;</code>). Always
          add <code>position: relative</code> to the parent you want as the
          reference point!
        </InfoBox>

        <h3>4. Fixed: "Glued to the Viewport"</h3>
        <p>
          <code>position: fixed</code> locks an element to the browser window.
          It stays put even when you scroll. Perfect for navigation bars, "back
          to top" buttons, and cookie banners.
        </p>

        <AnnotatedCode
          title="Fixed navbar and floating button"
          segments={[
            {
              code: ".navbar {\n",
            },
            {
              code: "  position: fixed;\n",
              annotation:
                "Locks the navbar to the viewport. It will stay at the same screen position even when the user scrolls. The element is removed from normal flow, so content might hide behind it.",
              label: "fixed",
            },
            {
              code: "  top: 0;\n  left: 0;\n  right: 0;\n",
              annotation:
                "Stretches the navbar across the entire top of the viewport. top: 0 pins it to the top, left: 0 and right: 0 make it full width.",
              label: "Pin to top",
            },
            {
              code: "  z-index: 100;\n",
              annotation:
                "Ensures the navbar appears above all other content. Without z-index, scrolling content could overlap it.",
              label: "z-index",
            },
            {
              code: "  background: #2c3e50;\n  color: white;\n  padding: 12px;\n}\n\n/* Remember to add top padding to body! */\nbody {\n  padding-top: 60px; /* Height of the fixed navbar */\n}\n",
            },
          ]}
        />

        <h3>5. Sticky: "The Best of Both Worlds"</h3>
        <p>
          <code>position: sticky</code> acts like <code>relative</code> until
          the user scrolls past a threshold, then it "sticks" like{" "}
          <code>fixed</code>. It unsticks when its parent scrolls out of view.
          Great for section headers in long lists!
        </p>

        <AnnotatedCode
          title="Sticky section header"
          segments={[
            {
              code: ".section-header {\n",
            },
            {
              code: "  position: sticky;\n",
              annotation:
                "The element scrolls normally until it reaches the 'top' threshold, then it sticks. When its parent container scrolls out of view, the sticky element leaves with it.",
              label: "sticky",
            },
            {
              code: "  top: 0;\n",
              annotation:
                "The threshold: the element sticks when its top edge reaches 0px from the top of the viewport. You could set top: 60px to stick below a fixed navbar.",
              label: "Stick threshold",
            },
            {
              code: "  background: white;\n  z-index: 10;\n  padding: 10px;\n  font-weight: bold;\n}\n",
            },
          ]}
        />
      </section>

      {/* ── Position Demo Interactive ── */}
      <section>
        <h2>Position Playground -- Your Turn!</h2>
        <p>
          Use this interactive demo to experiment with all 5 position values.
          Toggle between static, relative, absolute, fixed, and sticky. See what
          happens when you change top, left, and z-index values.
        </p>
        <PositionDemo />
      </section>

      {/* ── Z-Index ── */}
      <section>
        <h2>Z-Index: The Stacking Order</h2>
        <p>
          When elements overlap (which happens all the time with positioning),{" "}
          <code>z-index</code> controls which one appears on top. Higher number
          = closer to the viewer. Think of it like layers in Photoshop.
        </p>

        <Diagram title="z-index controls stacking order">
          <div className="relative h-48 mx-auto max-w-sm">
            <div className="absolute top-2 left-2 w-28 h-28 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm border-2 border-white/50 z-1">
              z-index: 1
            </div>
            <div className="absolute top-8 left-14 w-28 h-28 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm border-2 border-white/50 z-2">
              z-index: 2
            </div>
            <div className="absolute top-14 left-26 w-28 h-28 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm border-2 border-white/50 z-3">
              z-index: 3
            </div>
          </div>
        </Diagram>

        <InfoBox type="warning">
          <code>z-index</code> only works on <strong>positioned</strong>{" "}
          elements (relative, absolute, fixed, or sticky). If your z-index is
          not working, check that the element has a position other than static!
        </InfoBox>
      </section>

      {/* ── Exercises ── */}
      <section>
        <h2>Exercises</h2>

        <ExerciseBlock number={1}>
          <p>
            Create a responsive page with a{" "}
            <strong>sticky navigation bar</strong>:
          </p>
          <ul>
            <li>
              Header sticks to the top using <code>position: sticky</code>.
            </li>
            <li>On mobile (&lt;768px), nav links stack vertically.</li>
            <li>On desktop (768px+), nav links sit in a horizontal row.</li>
            <li>Add enough content to scroll and verify it sticks.</li>
          </ul>
        </ExerciseBlock>

        <ExerciseBlock number={2}>
          <p>
            Build a <strong>"Product Card"</strong> with positioned elements:
          </p>
          <ul>
            <li>
              Card container (350px wide) with <code>position: relative</code>.
            </li>
            <li>
              "SALE" badge in top-right with <code>position: absolute</code>.
            </li>
            <li>
              Price tag in bottom-left with <code>position: absolute</code>.
            </li>
            <li>
              Responsive image with <code>max-width: 100%</code>.
            </li>
            <li>
              Fixed "Back to Top" button in the bottom-right of the viewport.
            </li>
          </ul>
        </ExerciseBlock>

        <ExerciseBlock number={3}>
          <p>
            Build a <strong>fully responsive three-section landing page</strong>
            :
          </p>
          <ul>
            <li>
              Hero section with <code>clamp()</code> fluid typography.
            </li>
            <li>
              Features section: 3 cards that stack on mobile, side by side on
              desktop.
            </li>
            <li>Footer with centered text.</li>
            <li>Mobile-first with at least 2 breakpoints (768px, 1024px).</li>
          </ul>
        </ExerciseBlock>
      </section>

      {/* ── Homework ── */}
      <HomeworkBlock>
        <h3>Responsive Blog Layout</h3>
        <p>
          Build a <strong>"Responsive Blog Layout"</strong> from scratch using
          mobile-first approach:
        </p>
        <ul>
          <li>Fixed navigation bar at the top with blog name and links.</li>
          <li>
            Hero section with fluid typography using <code>clamp()</code>.
          </li>
          <li>
            "Recent Posts" section with 3 blog cards -- stacked on mobile, side
            by side on tablet (768px+). Each card has a category badge
            positioned absolutely.
          </li>
          <li>
            All images responsive (<code>max-width: 100%</code>).
          </li>
          <li>A "Back to Top" button fixed in the bottom-right corner.</li>
          <li>Footer with centered text.</li>
          <li>
            Use at least 3 breakpoints. Must look good from 320px to 1400px.
          </li>
        </ul>
      </HomeworkBlock>
    </LectureWrapper>
  );
};

export default Lecture06;
