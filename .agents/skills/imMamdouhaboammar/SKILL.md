```markdown
# imMamdouhaboammar Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `imMamdouhaboammar` TypeScript repository. It covers file organization, code style, commit message formatting, and testing practices to ensure consistency and maintainability across the codebase.

## Coding Conventions

### File Naming
- **Style:** kebab-case
- **Example:**  
  ```
  user-service.ts
  api-handler.test.ts
  ```

### Import Style
- **Relative imports are used.**
- **Example:**
  ```typescript
  import { fetchData } from './utils/fetch-data';
  ```

### Export Style
- **Named exports are preferred.**
- **Example:**
  ```typescript
  // user-service.ts
  export function getUser(id: string) { ... }
  export const USER_ROLE = 'admin';
  ```

### Commit Messages
- **Conventional commit format**
- **Prefixes:** `feat`, `docs`, `test`, `fix`
- **Average length:** ~43 characters
- **Example:**
  ```
  feat: add user authentication middleware
  fix: correct typo in fetch-data function
  ```

## Workflows

### Feature Development
**Trigger:** When adding a new feature  
**Command:** `/feature`

1. Create a new branch for the feature.
2. Implement the feature using TypeScript.
3. Use kebab-case for new file names.
4. Use relative imports and named exports.
5. Write or update tests in `*.test.*` files.
6. Commit using the `feat:` prefix and a concise description.
7. Open a pull request for review.

### Bug Fixing
**Trigger:** When fixing an issue or bug  
**Command:** `/fix`

1. Create a new branch for the fix.
2. Locate and fix the bug in the relevant TypeScript file.
3. Update or add tests in `*.test.*` files to cover the fix.
4. Commit using the `fix:` prefix and a concise description.
5. Open a pull request for review.

### Documentation Updates
**Trigger:** When updating or adding documentation  
**Command:** `/docs`

1. Edit or add documentation files as needed.
2. Commit using the `docs:` prefix and a concise description.
3. Open a pull request for review.

### Testing
**Trigger:** When writing or updating tests  
**Command:** `/test`

1. Add or update test files matching the `*.test.*` pattern.
2. Ensure tests cover new or changed functionality.
3. Commit using the `test:` prefix and a concise description.
4. Run the test suite to verify correctness.

## Testing Patterns

- **Test files use the `*.test.*` naming pattern.**
- **Testing framework:** Not explicitly detected; follow standard TypeScript test practices.
- **Example:**
  ```typescript
  // math-utils.test.ts
  import { add } from './math-utils';

  describe('add', () => {
    it('adds two numbers', () => {
      expect(add(2, 3)).toBe(5);
    });
  });
  ```

## Commands
| Command    | Purpose                                 |
|------------|-----------------------------------------|
| /feature   | Start a new feature development workflow |
| /fix       | Start a bug fixing workflow             |
| /docs      | Update or add documentation             |
| /test      | Write or update tests                   |
```