/// <reference types="googlemaps" />
import { EventEmitter, NgZone, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
export declare class AgmDrawingManager implements OnChanges, OnDestroy {
    private _zone;
    /**
     * The enabled/disabled state of the drawing control. Defaults to `true`.
     *
     */
    drawingControl: boolean;
    /**
     * The DrawingManager's drawing mode, which defines the type of overlay to be
     * added on the map. A drawing mode of null means that the user can interact
     * with the map as normal, and clicks do not draw anything.
     */
    drawingMode: google.maps.drawing.OverlayType | null;
    /**
     * The display options for the drawing control.
     *
     */
    drawingControlOptions: google.maps.drawing.DrawingControlOptions;
    /**
     * Options to apply to any new circles created with this DrawingManager.
     * The `center` and `radius` properties are ignored, and the `map` property of a
     * new circle is always set to the DrawingManager's map.
     *
     */
    circleOptions: google.maps.CircleOptions;
    /**
     * Options to apply to any new markers created with this DrawingManager.
     * The `position` property is ignored, and the `map` property of a new marker
     * is always set to the DrawingManager's map.
     *
     */
    markerOptions: google.maps.MarkerOptions;
    /**
     * Options to apply to any new polygons created with this DrawingManager.
     * The `paths` property is ignored, and the map property of a new polygon is
     * always set to the DrawingManager's map.
     *
     */
    polygonOptions: google.maps.PolygonOptions;
    /**
     * Options to apply to any new polylines created with this DrawingManager.
     * The `path` property is ignored, and the map property of a new polyline is
     * always set to the DrawingManager's map.
     *
     */
    polylineOptions: google.maps.PolylineOptions;
    /**
     * Options to apply to any new rectangles created with this DrawingManager.
     * The `bounds` property is ignored, and the map property of a new rectangle
     * is always set to the DrawingManager's map.
     *
     */
    rectangleOptions: google.maps.RectangleOptions;
    /**
     * This event is fired when the user has finished drawing a circle.
     */
    circleComplete: EventEmitter<google.maps.Circle>;
    /**
     * This event is fired when the user has finished drawing a marker.
     */
    markerComplete: EventEmitter<google.maps.Marker>;
    /**
     * This event is fired when the user has finished drawing an overlay of any
     * type.
     */
    overlayComplete: EventEmitter<google.maps.drawing.OverlayCompleteEvent>;
    /**
     * This event is fired when the user has finished drawing a polygon.
     */
    polygonComplete: EventEmitter<google.maps.Polygon>;
    /**
     * This event is fired when the user has finished drawing a polyline.
     */
    polylineComplete: EventEmitter<google.maps.Polyline>;
    /**
     * This event is fired when the user has finished drawing a rectangle.
     */
    rectangleComplete: EventEmitter<google.maps.Rectangle>;
    private eventSubscriptions;
    private drawingManager;
    constructor(_zone: NgZone);
    setMap(map: google.maps.Map): void;
    initEvents(drawingManager: google.maps.drawing.DrawingManager): void;
    createMvcObservable<E>(eventName: string, mvcObject: google.maps.MVCObject): Observable<E>;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
