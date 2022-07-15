# Map Drawing for AGM

-----

this package adds drawing support to [AGM][agm].

## Installation

```sh
npm install @powen_labs/maps-drawing
# or
yarn add @powen_labs/maps-drawing
```

## Usage

1. Import the module

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component'
// add these imports
import { AgmCoreModule } from '@powen_labs/maps-core';
import { AgmDrawingModule } from '@powen_labs/maps-drawing'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: ['YOUR_API_KEY_HERE'],
      libraries: ['drawing']
    }),
    AgmDrawingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
2. use it in your template

```html
<agm-map style="height: 300px" [latitude]="51.673858" [longitude]="7.815982" [agmDrawingManager]="drawing">
</agm-map>
<agm-drawing-manager #drawing="agmDrawingManager" [drawingMode]="'circle'" [circleOptions]="{fillColor:'red', radius: 150}"></agm-drawing-manager>
```


[drawing-manager]: https://developers.google.com/maps/documentation/javascript/reference/#drawing
[agm]: https://angular-maps.com/
