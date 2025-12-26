# Section Component

A simple, clean, and reusable section component with essential props for common use cases.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | HTML id attribute |
| `className` | `string` | `''` | CSS class names |
| `style` | `object` | `{}` | Inline styles |
| `children` | `ReactNode` | - | Child elements |
| `...rest` | `object` | - | Additional HTML attributes |

## Usage Examples

### Basic Usage
```jsx
import Section from '@/components/Section';

<Section id="hero" className="py-5 bg-primary">
  <h1>Welcome to our site</h1>
  <p>This is a hero section</p>
</Section>
```

### With Custom Styling
```jsx
<Section 
  id="about" 
  className="py-5 bg-light" 
  style={{ minHeight: '400px' }}
>
  <div className="container">
    <h2>About Us</h2>
    <p>Our story and mission</p>
  </div>
</Section>
```

### With Additional HTML Attributes
```jsx
<Section 
  id="contact" 
  className="py-5" 
  role="region"
  aria-label="Contact Information"
  data-testid="contact-section"
>
  <h2>Contact Us</h2>
  <p>Get in touch with our team</p>
</Section>
```

### Nested Sections
```jsx
<Section id="main" className="py-5">
  <Section id="header" className="mb-4">
    <h1>Main Title</h1>
  </Section>
  
  <Section id="content" className="row">
    <div className="col-md-6">
      <h2>Left Column</h2>
    </div>
    <div className="col-md-6">
      <h2>Right Column</h2>
    </div>
  </Section>
</Section>
```

## Migration from Complex Section Component

If you were using the previous complex Section component, here's how to migrate:

### Before (Complex)
```jsx
<Section 
  container
  row
  className="py-5"
  background="bg-primary"
  padding="px-4"
  textAlign="center"
  animation="fade-in"
>
  Content
</Section>
```

### After (Simple)
```jsx
<Section className="container row py-5 bg-primary px-4 text-center fade-in">
  Content
</Section>
```

## Best Practices

1. **Use Bootstrap Classes**: Add Bootstrap classes directly to `className` for layout and styling
2. **Keep it Simple**: Use the `...rest` spread for additional HTML attributes when needed
3. **Semantic HTML**: Use appropriate `id` attributes for navigation and accessibility
4. **Consistent Naming**: Use consistent naming conventions for section IDs

## Accessibility

The component supports all standard HTML section attributes:
- `role` - ARIA role
- `aria-label` - Accessible label
- `aria-labelledby` - Reference to labeling element
- `aria-describedby` - Reference to describing element
- `tabIndex` - Tab order
- `hidden` - Hide from screen readers

## Testing

The component works well with testing frameworks:
```jsx
<Section data-testid="hero-section" id="hero">
  Content
</Section>
```

## Performance

This simplified component has minimal overhead and renders efficiently. It's perfect for:
- Page sections
- Content blocks
- Layout containers
- Reusable UI sections