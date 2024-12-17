# Pages

This directory contains Page Objects that represent full pages in our application.

Page Objects:
- Follow the Page Object Model (POM) design pattern
- Encapsulate page-specific selectors and behaviors
- Extend from `BasePage` for common functionality
- Abstract test logic from test implementation
- Make tests maintainable and readable

Structure:
- `base.page.ts` - Base class with common functionality
- Individual page classes (e.g., `my-spaces.page.ts`) - Represent specific pages

Example usage:

```typescript
const mySpacesPage = new MySpaces(page);
await mySpacesPage.open();
await mySpacesPage.isListContainerVisible();
```
