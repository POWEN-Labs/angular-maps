import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { AgmDrawingManager } from './directives/drawing-manager';
import { AgmDrawingManagerTrigger } from './directives/drawing-manager-trigger';
export class AgmDrawingModule {
}
AgmDrawingModule.decorators = [
    { type: NgModule, args: [{
                imports: [AgmCoreModule],
                declarations: [AgmDrawingManager, AgmDrawingManagerTrigger],
                exports: [AgmDrawingManager, AgmDrawingManagerTrigger],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2luZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9kcmF3aW5nL3NyYy9saWIvZHJhd2luZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBT2hGLE1BQU0sT0FBTyxnQkFBZ0I7OztZQUw1QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUN4QixZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSx3QkFBd0IsQ0FBQztnQkFDM0QsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsd0JBQXdCLENBQUM7YUFDdkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZ21Db3JlTW9kdWxlIH0gZnJvbSAnQGFnbS9jb3JlJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBZ21EcmF3aW5nTWFuYWdlciB9IGZyb20gJy4vZGlyZWN0aXZlcy9kcmF3aW5nLW1hbmFnZXInO1xuaW1wb3J0IHsgQWdtRHJhd2luZ01hbmFnZXJUcmlnZ2VyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2RyYXdpbmctbWFuYWdlci10cmlnZ2VyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0FnbUNvcmVNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtBZ21EcmF3aW5nTWFuYWdlciwgQWdtRHJhd2luZ01hbmFnZXJUcmlnZ2VyXSxcbiAgZXhwb3J0czogW0FnbURyYXdpbmdNYW5hZ2VyLCBBZ21EcmF3aW5nTWFuYWdlclRyaWdnZXJdLFxufSlcbmV4cG9ydCBjbGFzcyBBZ21EcmF3aW5nTW9kdWxlIHtcbn1cbiJdfQ==