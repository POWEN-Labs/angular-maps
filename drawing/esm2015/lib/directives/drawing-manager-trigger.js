import { AgmMap } from '@agm/core';
import { Directive, Host, Input } from '@angular/core';
import { first } from 'rxjs/operators';
export class AgmDrawingManagerTrigger {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2luZy1tYW5hZ2VyLXRyaWdnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9kcmF3aW5nL3NyYy9saWIvZGlyZWN0aXZlcy9kcmF3aW5nLW1hbmFnZXItdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sRUFBaUIsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDakYsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBT3ZDLE1BQU0sT0FBTyx3QkFBd0I7SUFNbkMsWUFBNEIsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7SUFDM0MsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQzs7O1lBbkJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNEJBQTRCO2dCQUN0QyxRQUFRLEVBQUUsMEJBQTBCO2FBQ3JDOzs7WUFSUSxNQUFNLHVCQWVBLElBQUk7Ozs2QkFGaEIsS0FBSyxTQUFDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFnbU1hcCB9IGZyb20gJ0BhZ20vY29yZSc7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEhvc3QsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWdtRHJhd2luZ01hbmFnZXIgfSBmcm9tICcuL2RyYXdpbmctbWFuYWdlcic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2FnbS1tYXBbYWdtRHJhd2luZ01hbmFnZXJdJyxcbiAgZXhwb3J0QXM6ICdtYXREcmF3aW5nTWFuYWdlclRyaWdnZXInLFxufSlcbmV4cG9ydCBjbGFzcyBBZ21EcmF3aW5nTWFuYWdlclRyaWdnZXIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3l7XG5cbiAgLyoqIFRoZSBkcmF3aW5nIG1hbmFnZXIgdG8gYmUgYXR0YWNoZWQgdG8gdGhpcyB0cmlnZ2VyLiAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ2FnbURyYXdpbmdNYW5hZ2VyJykgZHJhd2luZ01hbmFnZXI6IEFnbURyYXdpbmdNYW5hZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKEBIb3N0KCkgcHJpdmF0ZSBfYWdtTWFwOiBBZ21NYXApIHtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9hZ21NYXAubWFwUmVhZHkucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUobWFwID0+IHRoaXMuZHJhd2luZ01hbmFnZXIuc2V0TWFwKG1hcCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fYWdtTWFwLm1hcFJlYWR5LnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuZHJhd2luZ01hbmFnZXIuc2V0TWFwKG51bGwpKTtcbiAgfVxufVxuIl19