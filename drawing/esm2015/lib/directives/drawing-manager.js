import { Directive, EventEmitter, Input, isDevMode, NgZone, Output } from '@angular/core';
import { fromEventPattern } from 'rxjs';
export class AgmDrawingManager {
    constructor(_zone) {
        this._zone = _zone;
        /**
         * This event is fired when the user has finished drawing a circle.
         */
        this.circleComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing a marker.
         */
        this.markerComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing an overlay of any
         * type.
         */
        this.overlayComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing a polygon.
         */
        this.polygonComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing a polyline.
         */
        this.polylineComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing a rectangle.
         */
        this.rectangleComplete = new EventEmitter();
        this.eventSubscriptions = [];
    }
    setMap(map) {
        if (!google.maps.drawing && isDevMode()) {
            console.error('Cannot use drawing manager if drawing library is not ' +
                'loaded. To fix, add libraries: [\'drawing\'] to the ' +
                'lazyMapsAPILoaderConfig you passed to AgmCoreModule.forRoot');
            return;
        }
        if (map && !this.drawingManager) {
            this.drawingManager = new google.maps.drawing.DrawingManager({
                map,
                circleOptions: this.circleOptions,
                markerOptions: this.markerOptions,
                polygonOptions: this.polygonOptions,
                polylineOptions: this.polylineOptions,
                rectangleOptions: this.rectangleOptions,
                drawingControl: this.drawingControl,
                drawingControlOptions: this.drawingControlOptions,
                drawingMode: this.drawingMode,
            });
            this.initEvents(this.drawingManager);
        }
        else if (!map && this.drawingManager) {
            this.drawingManager.setMap(null);
        }
        // else do nothing
    }
    initEvents(drawingManager) {
        this.eventSubscriptions.push(this.createMvcObservable('circlecomplete', drawingManager)
            .subscribe(circle => this._zone.run(() => this.circleComplete.next(circle))));
        this.eventSubscriptions.push(this.createMvcObservable('markercomplete', drawingManager)
            .subscribe(marker => this._zone.run(() => this.markerComplete.next(marker))));
        this.eventSubscriptions.push(this.createMvcObservable('polygoncomplete', drawingManager)
            .subscribe(polygon => this._zone.run(() => this.polygonComplete.next(polygon))));
        this.eventSubscriptions.push(this.createMvcObservable('polylinecomplete', drawingManager)
            .subscribe(polyline => this._zone.run(() => this.polylineComplete.next(polyline))));
        this.eventSubscriptions.push(this.createMvcObservable('overlaycomplete', drawingManager)
            .subscribe(overlayevent => this._zone.run(() => this.overlayComplete.next(overlayevent))));
        this.eventSubscriptions.push(this.createMvcObservable('rectanglecomplete', drawingManager)
            .subscribe(rectangle => this._zone.run(() => this.rectangleComplete.next(rectangle))));
    }
    createMvcObservable(eventName, mvcObject) {
        return fromEventPattern(handler => mvcObject.addListener(eventName, (event) => handler.apply(null, [event])), (_handler, evListener) => evListener.remove());
    }
    ngOnChanges(changes) {
        if (!this.drawingManager) {
            return;
        }
        const options = Object.entries(changes)
            .map(([prop, change]) => [prop, change.currentValue])
            .reduce((obj, [propName, propValue]) => {
            obj[propName] = propValue;
            return obj;
        }, {});
        this.drawingManager.setOptions(options);
    }
    ngOnDestroy() {
        this.eventSubscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
AgmDrawingManager.decorators = [
    { type: Directive, args: [{
                selector: 'agm-drawing-manager',
                exportAs: 'agmDrawingManager',
            },] }
];
AgmDrawingManager.ctorParameters = () => [
    { type: NgZone }
];
AgmDrawingManager.propDecorators = {
    drawingControl: [{ type: Input }],
    drawingMode: [{ type: Input }],
    drawingControlOptions: [{ type: Input }],
    circleOptions: [{ type: Input }],
    markerOptions: [{ type: Input }],
    polygonOptions: [{ type: Input }],
    polylineOptions: [{ type: Input }],
    rectangleOptions: [{ type: Input }],
    circleComplete: [{ type: Output }],
    markerComplete: [{ type: Output }],
    overlayComplete: [{ type: Output }],
    polygonComplete: [{ type: Output }],
    polylineComplete: [{ type: Output }],
    rectangleComplete: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2luZy1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvZHJhd2luZy9zcmMvbGliL2RpcmVjdGl2ZXMvZHJhd2luZy1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUF3QixNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQy9ILE9BQU8sRUFBRSxnQkFBZ0IsRUFBNEIsTUFBTSxNQUFNLENBQUM7QUFNbEUsTUFBTSxPQUFPLGlCQUFpQjtJQWdHNUIsWUFBb0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFuQ2pDOztXQUVHO1FBQ08sbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBc0IsQ0FBQztRQUVsRTs7V0FFRztRQUNPLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQXNCLENBQUM7UUFFbEU7OztXQUdHO1FBQ08sb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBNEMsQ0FBQztRQUV6Rjs7V0FFRztRQUNPLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQXVCLENBQUM7UUFFcEU7O1dBRUc7UUFDTyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBd0IsQ0FBQztRQUV0RTs7V0FFRztRQUNPLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUF5QixDQUFDO1FBRWhFLHVCQUFrQixHQUFtQixFQUFFLENBQUM7SUFLaEQsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFvQjtRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksU0FBUyxFQUFFLEVBQUU7WUFDdkMsT0FBTyxDQUFDLEtBQUssQ0FBQyx1REFBdUQ7Z0JBQ25FLHNEQUFzRDtnQkFDdEQsNkRBQTZELENBQUMsQ0FBQztZQUNqRSxPQUFPO1NBQ1I7UUFDRCxJQUFJLEdBQUcsSUFBSSxDQUFDLElB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QUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUM5RSxDQUFDOzs7WUFwTEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRSxtQkFBbUI7YUFDOUI7OztZQU5tRCxNQUFNOzs7NkJBYXZELEtBQUs7MEJBT0wsS0FBSztvQ0FNTCxLQUFLOzRCQVFMLEtBQUs7NEJBUUwsS0FBSzs2QkFRTCxLQUFLOzhCQVFMLEtBQUs7K0JBUUwsS0FBSzs2QkFLTCxNQUFNOzZCQUtOLE1BQU07OEJBTU4sTUFBTTs4QkFLTixNQUFNOytCQUtOLE1BQU07Z0NBS04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgaXNEZXZNb2RlLCBOZ1pvbmUsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudFBhdHRlcm4sIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdhZ20tZHJhd2luZy1tYW5hZ2VyJyxcbiAgZXhwb3J0QXM6ICdhZ21EcmF3aW5nTWFuYWdlcicsXG59KVxuZXhwb3J0IGNsYXNzIEFnbURyYXdpbmdNYW5hZ2VyIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3l7XG5cbiAgLyoqXG4gICAqIFRoZSBlbmFibGVkL2Rpc2FibGVkIHN0YXRlIG9mIHRoZSBkcmF3aW5nIGNvbnRyb2wuIERlZmF1bHRzIHRvIGB0cnVlYC5cbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIGRyYXdpbmdDb250cm9sOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgRHJhd2luZ01hbmFnZXIncyBkcmF3aW5nIG1vZGUsIHdoaWNoIGRlZmluZXMgdGhlIHR5cGUgb2Ygb3ZlcmxheSB0byBiZVxuICAgKiBhZGRlZCBvbiB0aGUgbWFwLiBBIGRyYXdpbmcgbW9kZSBvZiBudWxsIG1lYW5zIHRoYXQgdGhlIHVzZXIgY2FuIGludGVyYWN0XG4gICAqIHdpdGggdGhlIG1hcCBhcyBub3JtYWwsIGFuZCBjbGlja3MgZG8gbm90IGRyYXcgYW55dGhpbmcuXG4gICAqL1xuICBASW5wdXQoKSBkcmF3aW5nTW9kZTogZ29vZ2xlLm1hcHMuZHJhd2luZy5PdmVybGF5VHlwZSB8IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBkaXNwbGF5IG9wdGlvbnMgZm9yIHRoZSBkcmF3aW5nIGNvbnRyb2wuXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBkcmF3aW5nQ29udHJvbE9wdGlvbnM6IGdvb2dsZS5tYXBzLmRyYXdpbmcuRHJhd2luZ0NvbnRyb2xPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBPcHRpb25zIHRvIGFwcGx5IHRvIGFueSBuZXcgY2lyY2xlcyBjcmVhdGVkIHdpdGggdGhpcyBEcmF3aW5nTWFuYWdlci5cbiAgICogVGhlIGBjZW50ZXJgIGFuZCBgcmFkaXVzYCBwcm9wZXJ0aWVzIGFyZSBpZ25vcmVkLCBhbmQgdGhlIGBtYXBgIHByb3BlcnR5IG9mIGFcbiAgICogbmV3IGNpcmNsZSBpcyBhbHdheXMgc2V0IHRvIHRoZSBEcmF3aW5nTWFuYWdlcidzIG1hcC5cbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIGNpcmNsZU9wdGlvbnM6IGdvb2dsZS5tYXBzLkNpcmNsZU9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIE9wdGlvbnMgdG8gYXBwbHkgdG8gYW55IG5ldyBtYXJrZXJzIGNyZWF0ZWQgd2l0aCB0aGlzIERyYXdpbmdNYW5hZ2VyLlxuICAgKiBUaGUgYHBvc2l0aW9uYCBwcm9wZXJ0eSBpcyBpZ25vcmVkLCBhbmQgdGhlIGBtYXBgIHByb3BlcnR5IG9mIGEgbmV3IG1hcmtlclxuICAgKiBpcyBhbHdheXMgc2V0IHRvIHRoZSBEcmF3aW5nTWFuYWdlcidzIG1hcC5cbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIG1hcmtlck9wdGlvbnM6IGdvb2dsZS5tYXBzLk1hcmtlck9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIE9wdGlvbnMgdG8gYXBwbHkgdG8gYW55IG5ldyBwb2x5Z29ucyBjcmVhdGVkIHdpdGggdGhpcyBEcmF3aW5nTWFuYWdlci5cbiAgICogVGhlIGBwYXRoc2AgcHJvcGVydHkgaXMgaWdub3JlZCwgYW5kIHRoZSBtYXAgcHJvcGVydHkgb2YgYSBuZXcgcG9seWdvbiBpc1xuICAgKiBhbHdheXMgc2V0IHRvIHRoZSBEcmF3aW5nTWFuYWdlcidzIG1hcC5cbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIHBvbHlnb25PcHRpb25zOiBnb29nbGUubWFwcy5Qb2x5Z29uT3B0aW9ucztcblxuICAvKipcbiAgICogT3B0aW9ucyB0byBhcHBseSB0byBhbnkgbmV3IHBvbHlsaW5lcyBjcmVhdGVkIHdpdGggdGhpcyBEcmF3aW5nTWFuYWdlci5cbiAgICogVGhlIGBwYXRoYCBwcm9wZXJ0eSBpcyBpZ25vcmVkLCBhbmQgdGhlIG1hcCBwcm9wZXJ0eSBvZiBhIG5ldyBwb2x5bGluZSBpc1xuICAgKiBhbHdheXMgc2V0IHRvIHRoZSBEcmF3aW5nTWFuYWdlcidzIG1hcC5cbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIHBvbHlsaW5lT3B0aW9uczogZ29vZ2xlLm1hcHMuUG9seWxpbmVPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBPcHRpb25zIHRvIGFwcGx5IHRvIGFueSBuZXcgcmVjdGFuZ2xlcyBjcmVhdGVkIHdpdGggdGhpcyBEcmF3aW5nTWFuYWdlci5cbiAgICogVGhlIGBib3VuZHNgIHByb3BlcnR5IGlzIGlnbm9yZWQsIGFuZCB0aGUgbWFwIHByb3BlcnR5IG9mIGEgbmV3IHJlY3RhbmdsZVxuICAgKiBpcyBhbHdheXMgc2V0IHRvIHRoZSBEcmF3aW5nTWFuYWdlcidzIG1hcC5cbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIHJlY3RhbmdsZU9wdGlvbnM6IGdvb2dsZS5tYXBzLlJlY3RhbmdsZU9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBoYXMgZmluaXNoZWQgZHJhd2luZyBhIGNpcmNsZS5cbiAgICovXG4gIEBPdXRwdXQoKSBjaXJjbGVDb21wbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuQ2lyY2xlPigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgaGFzIGZpbmlzaGVkIGRyYXdpbmcgYSBtYXJrZXIuXG4gICAqL1xuICBAT3V0cHV0KCkgbWFya2VyQ29tcGxldGUgPSBuZXcgRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLk1hcmtlcj4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIGhhcyBmaW5pc2hlZCBkcmF3aW5nIGFuIG92ZXJsYXkgb2YgYW55XG4gICAqIHR5cGUuXG4gICAqL1xuICBAT3V0cHV0KCkgb3ZlcmxheUNvbXBsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5kcmF3aW5nLk92ZXJsYXlDb21wbGV0ZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgaGFzIGZpbmlzaGVkIGRyYXdpbmcgYSBwb2x5Z29uLlxuICAgKi9cbiAgQE91dHB1dCgpIHBvbHlnb25Db21wbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuUG9seWdvbj4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIGhhcyBmaW5pc2hlZCBkcmF3aW5nIGEgcG9seWxpbmUuXG4gICAqL1xuICBAT3V0cHV0KCkgcG9seWxpbmVDb21wbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuUG9seWxpbmU+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBoYXMgZmluaXNoZWQgZHJhd2luZyBhIHJlY3RhbmdsZS5cbiAgICovXG4gIEBPdXRwdXQoKSByZWN0YW5nbGVDb21wbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuUmVjdGFuZ2xlPigpO1xuXG4gIHByaXZhdGUgZXZlbnRTdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIHByaXZhdGUgZHJhd2luZ01hbmFnZXI6IGdvb2dsZS5tYXBzLmRyYXdpbmcuRHJhd2luZ01hbmFnZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfem9uZTogTmdab25lKSB7XG4gIH1cblxuICBzZXRNYXAobWFwOiBnb29nbGUubWFwcy5NYXApIHtcbiAgICBpZiAoIWdvb2dsZS5tYXBzLmRyYXdpbmcgJiYgaXNEZXZNb2RlKCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCB1c2UgZHJhd2luZyBtYW5hZ2VyIGlmIGRyYXdpbmcgbGlicmFyeSBpcyBub3QgJyArXG4gICAgICAgICdsb2FkZWQuIFRvIGZpeCwgYWRkIGxpYnJhcmllczogW1xcJ2RyYXdpbmdcXCddIHRvIHRoZSAnICtcbiAgICAgICAgJ2xhenlNYXBzQVBJTG9hZGVyQ29uZmlnIHlvdSBwYXNzZWQgdG8gQWdtQ29yZU1vZHVsZS5mb3JSb290Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChtYXAgJiYgIXRoaXMuZHJhd2luZ01hbmFnZXIpIHtcbiAgICAgIHRoaXMuZHJhd2luZ01hbmFnZXIgPSBuZXcgZ29vZ2xlLm1hcHMuZHJhd2luZy5EcmF3aW5nTWFuYWdlcih7XG4gICAgICAgICAgbWFwLFxuICAgICAgICAgIGNpcmNsZU9wdGlvbnM6IHRoaXMuY2lyY2xlT3B0aW9ucyxcbiAgICAgICAgICBtYXJrZXJPcHRpb25zOiB0aGlzLm1hcmtlck9wdGlvbnMsXG4gICAgICAgICAgcG9seWdvbk9wdGlvbnM6IHRoaXMucG9seWdvbk9wdGlvbnMsXG4gICAgICAgICAgcG9seWxpbmVPcHRpb25zOiB0aGlzLnBvbHlsaW5lT3B0aW9ucyxcbiAgICAgICAgICByZWN0YW5nbGVPcHRpb25zOiB0aGlzLnJlY3RhbmdsZU9wdGlvbnMsXG4gICAgICAgICAgZHJhd2luZ0NvbnRyb2w6IHRoaXMuZHJhd2luZ0NvbnRyb2wsXG4gICAgICAgICAgZHJhd2luZ0NvbnRyb2xPcHRpb25zOiB0aGlzLmRyYXdpbmdDb250cm9sT3B0aW9ucyxcbiAgICAgICAgICBkcmF3aW5nTW9kZTogdGhpcy5kcmF3aW5nTW9kZSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5pbml0RXZlbnRzKHRoaXMuZHJhd2luZ01hbmFnZXIpO1xuICAgIH0gZWxzZSBpZiAoIW1hcCAmJiB0aGlzLmRyYXdpbmdNYW5hZ2VyKSB7XG4gICAgICB0aGlzLmRyYXdpbmdNYW5hZ2VyLnNldE1hcChudWxsKTtcbiAgICB9XG4gICAgLy8gZWxzZSBkbyBub3RoaW5nXG4gIH1cblxuICBpbml0RXZlbnRzKGRyYXdpbmdNYW5hZ2VyOiBnb29nbGUubWFwcy5kcmF3aW5nLkRyYXdpbmdNYW5hZ2VyKSB7XG4gICAgdGhpcy5ldmVudFN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuY3JlYXRlTXZjT2JzZXJ2YWJsZTxnb29nbGUubWFwcy5DaXJjbGU+KCdjaXJjbGVjb21wbGV0ZScsIGRyYXdpbmdNYW5hZ2VyKVxuICAgICAgLnN1YnNjcmliZShjaXJjbGUgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5jaXJjbGVDb21wbGV0ZS5uZXh0KGNpcmNsZSkpKVxuICAgICk7XG4gICAgdGhpcy5ldmVudFN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuY3JlYXRlTXZjT2JzZXJ2YWJsZTxnb29nbGUubWFwcy5NYXJrZXI+KCdtYXJrZXJjb21wbGV0ZScsIGRyYXdpbmdNYW5hZ2VyKVxuICAgICAgLnN1YnNjcmliZShtYXJrZXIgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5tYXJrZXJDb21wbGV0ZS5uZXh0KG1hcmtlcikpKVxuICAgICk7XG4gICAgdGhpcy5ldmVudFN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuY3JlYXRlTXZjT2JzZXJ2YWJsZTxnb29nbGUubWFwcy5Qb2x5Z29uPigncG9seWdvbmNvbXBsZXRlJywgZHJhd2luZ01hbmFnZXIpXG4gICAgICAuc3Vic2NyaWJlKHBvbHlnb24gPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5wb2x5Z29uQ29tcGxldGUubmV4dChwb2x5Z29uKSkpXG4gICAgKTtcbiAgICB0aGlzLmV2ZW50U3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5jcmVhdGVNdmNPYnNlcnZhYmxlPGdvb2dsZS5tYXBzLlBvbHlsaW5lPigncG9seWxpbmVjb21wbGV0ZScsIGRyYXdpbmdNYW5hZ2VyKVxuICAgICAgLnN1YnNjcmliZShwb2x5bGluZSA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLnBvbHlsaW5lQ29tcGxldGUubmV4dChwb2x5bGluZSkpKVxuICAgICk7XG4gICAgdGhpcy5ldmVudFN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuY3JlYXRlTXZjT2JzZXJ2YWJsZTxnb29nbGUubWFwcy5kcmF3aW5nLk92ZXJsYXlDb21wbGV0ZUV2ZW50Pignb3ZlcmxheWNvbXBsZXRlJywgZHJhd2luZ01hbmFnZXIpXG4gICAgICAuc3Vic2NyaWJlKG92ZXJsYXlldmVudCA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLm92ZXJsYXlDb21wbGV0ZS5uZXh0KG92ZXJsYXlldmVudCkpKVxuICAgICk7XG4gICAgdGhpcy5ldmVudFN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuY3JlYXRlTXZjT2JzZXJ2YWJsZTxnb29nbGUubWFwcy5SZWN0YW5nbGU+KCdyZWN0YW5nbGVjb21wbGV0ZScsIGRyYXdpbmdNYW5hZ2VyKVxuICAgICAgLnN1YnNjcmliZShyZWN0YW5nbGUgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5yZWN0YW5nbGVDb21wbGV0ZS5uZXh0KHJlY3RhbmdsZSkpKVxuICAgICk7XG4gIH1cblxuICBjcmVhdGVNdmNPYnNlcnZhYmxlPEU+KGV2ZW50TmFtZTogc3RyaW5nLCBtdmNPYmplY3Q6IGdvb2dsZS5tYXBzLk1WQ09iamVjdCk6IE9ic2VydmFibGU8RT4ge1xuICAgIHJldHVybiBmcm9tRXZlbnRQYXR0ZXJuKFxuICAgICAgaGFuZGxlciA9PiBtdmNPYmplY3QuYWRkTGlzdGVuZXIoZXZlbnROYW1lLFxuICAgICAgICAoZXZlbnQ/OiBFKSA9PiBoYW5kbGVyLmFwcGx5KG51bGwsIFtldmVudF0pKSxcbiAgICAgIChfaGFuZGxlciwgZXZMaXN0ZW5lcjogZ29vZ2xlLm1hcHMuTWFwc0V2ZW50TGlzdGVuZXIpID0+IGV2TGlzdGVuZXIucmVtb3ZlKClcbiAgICApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kcmF3aW5nTWFuYWdlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3QuZW50cmllcyhjaGFuZ2VzKVxuICAgIC5tYXAoKFtwcm9wLCBjaGFuZ2VdKSA9PiBbcHJvcCwgY2hhbmdlLmN1cnJlbnRWYWx1ZV0pXG4gICAgLnJlZHVjZSgob2JqOiBhbnksIFtwcm9wTmFtZSwgcHJvcFZhbHVlXSkgPT4ge1xuICAgICAgb2JqW3Byb3BOYW1lXSA9IHByb3BWYWx1ZTtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSwge30pO1xuICAgIHRoaXMuZHJhd2luZ01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZXZlbnRTdWJzY3JpcHRpb25zLmZvckVhY2goc3Vic2NyaXB0aW9uID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG59XG4iXX0=