# SkillSwap UI Framework

A comprehensive design system built with Tailwind CSS and React TypeScript for the SkillSwap application.

## 🎨 Design System

### Colors

- **Primary**: Blue gradient (#0ea5e9 to #0369a1)
- **Secondary**: Purple gradient (#d946ef to #a21caf)
- **Success**: Green (#22c55e)
- **Warning**: Orange (#f59e0b)
- **Error**: Red (#ef4444)
- **Neutral**: Gray scale (#fafafa to #171717)

### Typography

- **Display Font**: Poppins (for headings)
- **Body Font**: Inter (for body text)
- **Font Weights**: 300, 400, 500, 600, 700, 800

### Spacing

- Consistent spacing scale using Tailwind's spacing system
- Custom spacing: 18 (4.5rem), 88 (22rem), 128 (32rem)

### Shadows

- **Soft**: Subtle shadow for cards and buttons
- **Medium**: Medium shadow for hover states
- **Large**: Strong shadow for modals and overlays

## 🧩 Components

### Button

A versatile button component with multiple variants and states.

```tsx
import { Button } from './components/ui';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="error">Error</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// States
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>

// With Icons
<Button leftIcon={<Icon />}>With Left Icon</Button>
<Button rightIcon={<Icon />}>With Right Icon</Button>
```

### Input

Form input component with validation states and icons.

```tsx
import { Input } from "./components/ui";

<Input
  label="Email Address"
  placeholder="Enter your email"
  error="This field is required"
  helperText="We'll never share your email"
  leftIcon={<EmailIcon />}
  rightIcon={<CheckIcon />}
/>;
```

### Card

Container component with header, body, and footer sections.

```tsx
import { Card, CardHeader, CardBody, CardFooter } from "./components/ui";

<Card hover>
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardBody>
    <p>Card content goes here</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>;
```

### Badge

Small status indicators and tags.

```tsx
import { Badge } from './components/ui';

<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
```

### Alert

Notification and message components.

```tsx
import { Alert } from './components/ui';

<Alert variant="info" title="Information" onClose={() => setShow(false)}>
  This is an informational message
</Alert>

<Alert variant="success" title="Success">
  Operation completed successfully!
</Alert>
```

### Avatar

User profile picture component with fallback initials.

```tsx
import { Avatar } from './components/ui';

<Avatar name="John Doe" size="md" />
<Avatar src="/path/to/image.jpg" alt="Profile" size="lg" />
```

### SkillTag

Specialized component for displaying skills with levels.

```tsx
import { SkillTag } from './components/ui';

<SkillTag skill="React" level="expert" />
<SkillTag skill="TypeScript" level="advanced" />
<SkillTag skill="Node.js" level="intermediate" />
<SkillTag skill="Python" level="beginner" />

// Removable tags
<SkillTag
  skill="React"
  removable
  onRemove={(skill) => removeSkill(skill)}
/>
```

### LoadingSpinner

Loading indicator component.

```tsx
import { LoadingSpinner } from "./components/ui";

<LoadingSpinner size="md" color="primary" />;
```

## 🎯 Usage Guidelines

### Component Import

```tsx
// Import individual components
import { Button, Input, Card } from "./components/ui";

// Or import specific components
import Button from "./components/ui/Button";
```

### Styling

- Use Tailwind CSS classes for custom styling
- Leverage the design system's color palette and spacing
- Maintain consistency with existing components

### Accessibility

- All components include proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- Focus management

### Responsive Design

- Mobile-first approach
- Responsive breakpoints: sm, md, lg, xl
- Flexible layouts that adapt to screen sizes

## 🚀 Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **View Component Library**
   Navigate to `/ui-components` to see all components in action.

3. **Use Components**

   ```tsx
   import { Button, Card, Input } from "./components/ui";

   function MyComponent() {
     return (
       <Card>
         <CardBody>
           <Input label="Name" placeholder="Enter your name" />
           <Button variant="primary">Submit</Button>
         </CardBody>
       </Card>
     );
   }
   ```

## 📝 Best Practices

1. **Consistency**: Use the design system's colors, spacing, and typography
2. **Accessibility**: Always include proper labels and ARIA attributes
3. **Performance**: Use React.memo for components that don't need frequent re-renders
4. **Testing**: Write tests for component behavior and accessibility
5. **Documentation**: Keep component documentation up to date

## 🎨 Customization

### Theme Colors

Modify colors in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color',
        // ... other shades
      }
    }
  }
}
```

### Component Variants

Add new variants to components by extending the variants object:

```tsx
const variants = {
  // ... existing variants
  custom: "bg-custom-500 text-white hover:bg-custom-600",
};
```

## 🔧 Development

### Adding New Components

1. Create component file in `src/components/ui/`
2. Export from `src/components/ui/index.ts`
3. Add to component library page
4. Update documentation

### Component Structure

```tsx
import React from 'react';

interface ComponentProps {
  // Define props
}

const Component: React.FC<ComponentProps> = ({ /* props */ }) => {
  return (
    // Component JSX
  );
};

Component.displayName = 'Component';

export default Component;
```

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
