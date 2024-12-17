# Components

This directory contains Page Component Objects that represent the test interface of UI components in our application.

Page Component Objects:
- Encapsulate the behavior and selectors of specific UI components
- Can be reused across different page objects
- Help maintain a modular and DRY test architecture
- Should represent standalone UI components like modals, navigation bars, forms, etc.

Example usage:

```typescript
export class NavigationComponent {
  constructor(page: Page) {
    this.page = page;
  }
  async clickHomeButton() {
    // component specific actions
  }
}
```
