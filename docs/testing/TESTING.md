# Testing Documentation

This document describes the testing setup and coverage for the SEO Audit Tool.

## Overview

The project includes comprehensive unit tests for core functionality, covering the main business logic modules and ensuring code quality through automated testing.

## Test Structure

### Test Files

- **`tests/heuristics.title-meta.test.ts`** - Tests for title and meta description scoring
- **`tests/heuristics.missing-meta.test.ts`** - Tests for missing SEO elements detection
- **`tests/heuristics.content-structure.test.ts`** - Tests for content and structure scoring
- **`tests/parse.test.ts`** - Tests for HTML parsing functionality
- **`tests/parser.smoke.test.ts`** - Comprehensive parser tests with HTML fixtures

### Test Fixtures

- **`tests/fixtures/sample-html.html`** - Comprehensive HTML with all SEO elements
- **`tests/fixtures/minimal-html.html`** - Minimal HTML for edge case testing

## Running Tests

### Basic Commands

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test --coverage

# Run tests in watch mode
pnpm test --watch

# Run specific test file
pnpm test tests/heuristics.title-meta.test.ts
```

### Test Scripts

The following scripts are available in `package.json`:

- `pnpm test` - Run all tests with Vitest
- `pnpm typecheck` - TypeScript type checking
- `pnpm lint` - ESLint code linting

## Test Coverage

### Current Coverage (as of latest run)

- **heuristics.ts**: 81.06% statements, 79.59% branches, 100% functions
- **parse.ts**: 81% statements, 79.16% branches, 100% functions
- **Overall**: 10.67% statements (focused on core business logic)

### Covered Functionality

#### Heuristics Module

- ✅ Title length scoring (optimal, too short, too long)
- ✅ Keyword inclusion in titles
- ✅ Meta description length validation
- ✅ Missing meta description detection
- ✅ Missing title detection
- ✅ H1 heading validation (missing, multiple)
- ✅ Content word count analysis
- ✅ Image optimization (alt text presence)
- ✅ Schema markup detection
- ✅ Technical SEO issues (noindex, canonical, viewport)

#### Parse Module

- ✅ HTML element extraction (title, meta, headings, images, links)
- ✅ JSON-LD schema parsing
- ✅ Word count calculation
- ✅ Reading time estimation
- ✅ URL normalization
- ✅ Malformed HTML handling
- ✅ Meta robots directive parsing
- ✅ Canonical URL detection

#### Parser Smoke Tests

- ✅ Comprehensive HTML fixture parsing
- ✅ Minimal HTML edge cases
- ✅ Malformed HTML graceful degradation

## Test Categories

### 1. Title and Meta Tests (`heuristics.title-meta.test.ts`)

Tests title and meta description scoring logic:

```typescript
test("title length scoring - optimal length gets high score");
test("title length scoring - too short title gets low score");
test("title length scoring - too long title gets low score");
test("keyword inclusion in title improves score");
test("meta description length scoring");
```

### 2. Missing Elements Tests (`heuristics.missing-meta.test.ts`)

Tests detection of missing SEO elements:

```typescript
test("missing meta description triggers high severity issue with snippet");
test("missing title triggers high severity issue");
test("missing H1 triggers high severity issue");
test("multiple H1s trigger medium severity issue");
test("missing canonical URL triggers medium severity issue");
test("noindex directive triggers high severity issue");
```

### 3. Content and Structure Tests (`heuristics.content-structure.test.ts`)

Tests content quality and structure analysis:

```typescript
test("content scoring - good word count gets high score");
test("image optimization scoring - images with alt text get high score");
test("schema markup scoring - presence of schema gets high score");
```

### 4. Parse Module Tests (`parse.test.ts`)

Tests HTML parsing functionality:

```typescript
test("calculateWordCount counts words correctly");
test("calculateReadingTime estimates reading time correctly");
test("parseHtml extracts basic elements");
test("parseHtml handles JSON-LD schema markup");
test("parseHtml handles missing elements gracefully");
test("parseHtml detects noindex and nofollow directives");
test("parseHtml detects canonical self-reference");
```

### 5. Parser Smoke Tests (`parser.smoke.test.ts`)

Comprehensive parser tests with real HTML fixtures:

```typescript
test("parser extracts all SEO elements from comprehensive HTML");
test("parser handles minimal HTML with missing elements");
test("parser handles malformed HTML gracefully");
```

## Continuous Integration

### GitHub Actions Workflow

The project includes a GitHub Actions workflow (`.github/workflows/test.yml`) that:

- Runs on push to main/develop branches
- Runs on pull requests to main branch
- Tests on Node.js 18.x and 20.x
- Includes pnpm caching for faster builds
- Runs type checking, linting, and tests
- Generates coverage reports
- Uploads coverage to Codecov

### CI Pipeline Steps

1. **Setup**: Node.js, pnpm, caching
2. **Install**: Dependencies with frozen lockfile
3. **Type Check**: TypeScript compilation
4. **Lint**: ESLint code quality checks
5. **Test**: Unit tests execution
6. **Coverage**: Test coverage generation
7. **Upload**: Coverage reports to Codecov

## Best Practices

### Writing Tests

1. **Descriptive Names**: Use clear, descriptive test names
2. **Single Responsibility**: Each test should test one specific behavior
3. **Arrange-Act-Assert**: Structure tests with clear sections
4. **Edge Cases**: Include tests for error conditions and edge cases
5. **Fixtures**: Use HTML fixtures for realistic test data

### Test Data

- Use realistic HTML fixtures in `tests/fixtures/`
- Test both optimal and problematic scenarios
- Include edge cases (empty content, malformed HTML)
- Test with actual SEO-relevant content

### Coverage Goals

- **Core Business Logic**: Aim for >80% coverage on heuristics and parse modules
- **Critical Paths**: Ensure all major decision points are tested
- **Error Handling**: Test error conditions and edge cases
- **Integration**: Test component interactions where relevant

## Troubleshooting

### Common Issues

1. **Test Failures**: Check that test expectations match actual implementation
2. **Coverage Gaps**: Add tests for uncovered code paths
3. **Performance**: Large HTML fixtures may slow tests; optimize if needed
4. **Flaky Tests**: Ensure tests are deterministic and don't depend on external state

### Debugging Tests

```bash
# Run specific test with verbose output
pnpm test tests/heuristics.title-meta.test.ts --reporter=verbose

# Run tests with debug logging
DEBUG=* pnpm test

# Run tests in watch mode for development
pnpm test --watch
```

## Future Improvements

### Planned Enhancements

1. **Integration Tests**: Add tests for API endpoints
2. **E2E Tests**: Add Playwright tests for UI workflows
3. **Performance Tests**: Add tests for large HTML processing
4. **Mocking**: Improve mocking for external dependencies
5. **Snapshot Tests**: Add snapshot tests for UI components

### Coverage Expansion

- Add tests for API routes
- Add tests for worker processes
- Add tests for database operations
- Add tests for external API integrations (PSI, GSC)
- Add tests for UI components and interactions
