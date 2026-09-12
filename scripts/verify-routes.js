import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

console.log('🧪 Running Symbiosis Quantum Club Route & Data Integrity Verifier...\n')

let failures = 0

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`)
  } else {
    console.error(`  ❌ [FAIL] ${message}`)
    failures++
  }
}

// 1. Verify critical IBM Partner Route Invariant in App.jsx
const appPath = path.join(ROOT, 'src', 'App.jsx')
const appContent = fs.readFileSync(appPath, 'utf8')

assert(
  appContent.includes('path="/fallfest"'),
  'IBM Partner Route: /fallfest route is registered in App.jsx'
)
assert(
  appContent.includes('element={<FallFest />}'),
  'IBM Partner Route: /fallfest resolves directly to FallFest component'
)
assert(
  appContent.includes('element={<NotFound />}'),
  'SEO Route: Catch-all route (*) resolves to NotFound component'
)

// 2. Verify all core page files exist
const requiredPages = [
  'Home.jsx',
  'Events.jsx',
  'EventDetail.jsx',
  'FallFest.jsx',
  'Blog.jsx',
  'BlogDetail.jsx',
  'Team.jsx',
  'NotFound.jsx',
]

for (const page of requiredPages) {
  const pagePath = path.join(ROOT, 'src', 'pages', page)
  assert(fs.existsSync(pagePath), `Page Component: src/pages/${page} exists`)
}

// 3. Verify Data Integrity
try {
  const eventsContent = fs.readFileSync(path.join(ROOT, 'src', 'data', 'events.js'), 'utf8')
  assert(
    eventsContent.includes('export default EVENTS') || eventsContent.includes('export default events'),
    'Data: src/data/events.js exports default events list'
  )
  assert(eventsContent.includes('qiskit-fall-fest-2025'), 'Data: IBM Fall Fest 2025 event entry exists')
  assert(eventsContent.includes('qiskit-fall-fest-2026'), 'Data: Fall Fest 2026 event entry exists')
} catch (e) {
  assert(false, `Data: events.js read error: ${e.message}`)
}

try {
  const blogRaw = fs.readFileSync(path.join(ROOT, 'src', 'data', 'blog.json'), 'utf8')
  const blogPosts = JSON.parse(blogRaw)
  assert(Array.isArray(blogPosts) && blogPosts.length > 0, `Data: blog.json contains ${blogPosts?.length || 0} valid articles`)
} catch (e) {
  assert(false, `Data: blog.json is valid JSON`)
}

try {
  const teamRaw = fs.readFileSync(path.join(ROOT, 'src', 'data', 'team.json'), 'utf8')
  const team = JSON.parse(teamRaw)
  assert(team && typeof team === 'object', 'Data: team.json is valid JSON')
} catch (e) {
  assert(false, `Data: team.json is valid JSON`)
}

// 4. Verify Project Rule: Zero unauthorized CSS files
const findCssFiles = (dir) => {
  let results = []
  const list = fs.readdirSync(dir)
  for (const file of list) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      results = results.concat(findCssFiles(filePath))
    } else if (file.endsWith('.css')) {
      results.push(path.relative(ROOT, filePath))
    }
  }
  return results
}

const cssFiles = findCssFiles(path.join(ROOT, 'src'))
const allowedCss = [
  'src/index.css',
  'src/styles/tokens.css',
  'src/styles/reset.css',
  'src/styles/global.css',
  'src/styles/animations.css',
]
const unauthorizedCss = cssFiles.filter((f) => !allowedCss.includes(f))
assert(
  unauthorizedCss.length === 0,
  `Project Rule: Zero unauthorized CSS files (found ${unauthorizedCss.length}: ${unauthorizedCss.join(', ')})`
)

console.log('\n──────────────────────────────────────────────────')
if (failures === 0) {
  console.log('🎉 All Route & Data Integrity tests passed (0 failures)!\n')
  process.exit(0)
} else {
  console.error(`💥 ${failures} test(s) failed!\n`)
  process.exit(1)
}
