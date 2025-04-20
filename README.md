# NGX-Iconic

A standalone Angular icon component that provides easy access to Material Design icons similar to mat-icon but without Angular Material dependencies.

## Features

- Standalone Angular component
- Supports all Material Design icons
- RTL support with automatic icon flipping
- Custom icon sizing
- TypeScript type safety for icon names
- No Angular Material dependencies

## Installation

```bash
npm install ngx-iconic
```

## Demo

To run the demo locally:

1. Clone the repository
```bash
git clone https://github.com/strikerh/ngx-iconic.git
cd ngx-iconic
```

2. Install dependencies
```bash 
npm install
```

3. Start the demo application
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200`

## Usage

### Import the module

```typescript
import { NgxIconicModule } from 'ngx-iconic';

@NgModule({
  imports: [
    NgxIconicModule.forRoot({
      // Optional configuration
      flipInRtl: true,
      defaultIcon: 'all_out',
      iconBasePath: 'assets/icons'
    })
  ]
})
export class AppModule { }
```

### Use in templates

```html
<!-- Basic usage -->
<iconic icon="home"></iconic>

<!-- With custom color -->
<iconic icon="favorite" color="red"></iconic>

<!-- With custom size -->
<iconic icon="star" class="text-2xl"></iconic>

<!-- Force flip -->
<iconic icon="arrow_back" [flip]="true"></iconic>

<!-- Different icon type -->
<iconic icon="check" style="materialIconsOutlined"></iconic>
```

## Configuration

You can configure NGX-Iconic globally using the `forRoot()` method:

```typescript
NgxIconicModule.forRoot({
  flipInRtl: true, // Auto flip icons in RTL mode
  defaultIcon: 'all_out', // Default icon when none specified
  iconBasePath: 'assets/icons' // Base path for icon assets
});
```

## Available Sizes

The component supports the following size classes:
- text-xs
- text-sm
- text-base
- text-lg
- text-xl
- text-2xl
- text-3xl
- text-4xl
- text-5xl
- text-6xl
- text-7xl
- text-8xl
- text-9xl

## Icon Types

Supported icon types:
- materialIcons (default)
- materialIconsOutlined
- materialIconsRound
- materialIconsSharp
- materialIconsTwoTone

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Support

If you find this project useful, please consider giving it a ⭐️ on GitHub!
```

This README provides a comprehensive overview of the project while maintaining a professional and clear structure. Let me know if you'd like any modifications or additional sections.
