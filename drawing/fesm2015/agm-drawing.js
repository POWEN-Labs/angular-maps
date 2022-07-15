import { EventEmitter, isDevMode, Directive, NgZone, Input, Output, Host, NgModule } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import { AgmMap, AgmCoreModule } from '@agm/core';
import { first } from 'rxjs/operators';

class AgmDrawingManager {
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

class AgmDrawingManagerTrigger {
    constructor(_agmMap) {
        this._agmMap = _agmMap;
    }
    ngAfterViewInit() {
        this._agmMap.mapReady.pipe(first()).subscribe(map => this.drawingManager.setMap(map));
    }
    ngOnDestroy() {
        this._agmMap.mapReady.pipe(first()).subscribe(() => this.drawingManager.setMap(null));
    }
}
AgmDrawingManagerTrigger.decorators = [
    { type: Directive, args: [{
                selector: 'agm-map[agmDrawingManager]',
                exportAs: 'matDrawingManagerTrigger',
            },] }
];
AgmDrawingManagerTrigger.ctorParameters = () => [
    { type: AgmMap, decorators: [{ type: Host }] }
];
AgmDrawingManagerTrigger.propDecorators = {
    drawingManager: [{ type: Input, args: ['agmDrawingManager',] }]
};

class AgmDrawingModule {
}
AgmDrawingModule.decorators = [
    { type: NgModule, args: [{
                imports: [AgmCoreModule],
                declarations: [AgmDrawingManager, AgmDrawingManagerTrigger],
                exports: [AgmDrawingManager, AgmDrawingManagerTrigger],
            },] }
];

/*
 * Public API Surface of drawing
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AgmDrawingManager, AgmDrawingManagerTrigger, AgmDrawingModule };
//# sourceMappingURL=agm-drawing.js.map
