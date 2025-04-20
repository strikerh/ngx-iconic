
# NgxIconic

[![npm version](https://badge.fury.io/js/ngx-iconic.svg)](https://www.npmjs.com/package/ngx-iconic)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A standalone Angular component for easily implementing Material Design icons in your Angular applications. NgxIconic provides a flexible and performant way to use Google's Material Icons with additional features like RTL support, size variants, and custom configurations.

## Features

- 🚀 Standalone component architecture
- 🎨 Full Material Design Icons support
- 🔄 Automatic RTL flipping support
- 📏 Predefined size variants
- ⚙️ Customizable configuration
- 🎯 Type-safe icon names
- 🌈 Custom color support

## Installation

```bash
npm install ngx-iconic
```

## Basic Usage

1. Import the NgxIconicModule in your app.module.ts:

```typescript
import { NgxIconicModule } from 'ngx-iconic';

@NgModule({
  imports: [
    NgxIconicModule.forRoot({
      // Optional configuration
      flipInRtl: true,
      iconBasePath: 'assets/icons'
    })
  ]
})
export class AppModule { }
```

2. Use the component in your templates:

```html
<iconic icon="home"></iconic>
<iconic icon="search" style="materialIconsOutlined"></iconic>
<iconic icon="favorite" color="#ff0000"></iconic>
```

## Standalone Usage

If you're using standalone components, you can import NgxIconComponent directly:

```typescript
import { NgxIconComponent } from 'ngx-iconic';

@Component({
  // ...
  imports: [NgxIconComponent]
})
```

## Configuration

### Global Configuration

You can configure NgxIconic globally using the `forRoot()` method:

```typescript
NgxIconicModule.forRoot({
  defaultIcon: 'all_out',
  iconBasePath: 'assets/icons',
  flipInRtl: true
});
```

Or using the provide function:

```typescript
import { provideNgxIconic } from 'ngx-iconic';

@NgModule({
  providers: [
    provideNgxIconic({
      defaultIcon: 'home',
      flipInRtl: true
    })
  ]
})
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| defaultIcon | string | 'all_out' | Fallback icon when none is specified |
| iconBasePath | string | 'assets/icons' | Base path for icon assets |
| flipInRtl | boolean | true | Whether icons should flip in RTL mode |

## Component API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| icon | IconNames | undefined | Name of the Material icon |
| type | IconTypes | 'materialIcons' | Icon type/style variant |
| flip | boolean | undefined | Manually control icon flipping |
| color | string | 'currentColor' | Icon color (CSS color value) |

### Icon Types

```typescript
type IconTypes = 
  | 'materialIcons'
  | 'materialIconsOutlined'
  | 'materialIconsRound'
  | 'materialIconsSharp'
  | 'materialIconsTwoTone'
```

### Size Classes

NgxIconic provides predefined size classes that you can use:

```html
<iconic icon="home" class="text-xs"></iconic>  <!-- 12px -->
<iconic icon="home" class="text-sm"></iconic>  <!-- 14px -->
<iconic icon="home" class="text-base"></iconic> <!-- 16px -->
<iconic icon="home" class="text-lg"></iconic>  <!-- 18px -->
<iconic icon="home" class="text-xl"></iconic>  <!-- 20px -->
<iconic icon="home" class="text-2xl"></iconic> <!-- 24px -->
<!-- ... up to text-9xl (128px) -->
```

## RTL Support

NgxIconic automatically handles RTL (Right-to-Left) scenarios:

1. Automatic flipping based on document or parent direction
2. Manual control using the `flip` input
3. Global RTL behavior configuration

```html
<!-- Will automatically flip in RTL context if flipInRtl is true -->
<iconic icon="arrow_forward"></iconic>

<!-- Manual control -->
<iconic icon="arrow_forward" [flip]="true"></iconic>
```

## Category Organization

Icons are organized into categories for better organization and type safety:

- Action
- Alert
- AV
- Communication
- Content
- Device
- Editor
- File
- Hardware
- Home
- Image
- Maps
- Navigation
- Notification
- Places
- Social
- Toggle

## Browser Support

NgxIconic supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

This README provides comprehensive documentation covering installation, usage, configuration, API reference, and features. Feel free to adjust any sections based on your specific needs or additional features.

Let me know if you'd like me to expand on any particular section or add more examples!
