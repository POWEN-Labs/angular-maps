import { __awaiter } from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { createMVCEventObservable } from '../../utils/mvcarray-utils';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
export class PolylineManager {
    constructor(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polylines = new Map();
    }
    static _convertPoints(line) {
        const path = line._getPoints().map((point) => {
            return { lat: point.latitude, lng: point.longitude };
        });
        return path;
    }
    static _convertPath(path) {
        const symbolPath = google.maps.SymbolPath[path];
        if (typeof symbolPath === 'number') {
            return symbolPath;
        }
        else {
            return path;
        }
    }
    static _convertIcons(line) {
        const icons = line._getIcons().map(agmIcon => ({
            fixedRotation: agmIcon.fixedRotation,
            offset: agmIcon.offset,
            repeat: agmIcon.repeat,
            icon: {
                anchor: new google.maps.Point(agmIcon.anchorX, agmIcon.anchorY),
                fillColor: agmIcon.fillColor,
                fillOpacity: agmIcon.fillOpacity,
                path: PolylineManager._convertPath(agmIcon.path),
                rotation: agmIcon.rotation,
                scale: agmIcon.scale,
                strokeColor: agmIcon.strokeColor,
                strokeOpacity: agmIcon.strokeOpacity,
                strokeWeight: agmIcon.strokeWeight,
            },
        }));
        // prune undefineds;
        icons.forEach(icon => {
            Object.entries(icon).forEach(([key, val]) => {
                if (typeof val === 'undefined') {
                    delete icon[key];
                }
            });
            if (typeof icon.icon.anchor.x === 'undefined' ||
                typeof icon.icon.anchor.y === 'undefined') {
                delete icon.icon.anchor;
            }
        });
        return icons;
    }
    addPolyline(line) {
        const polylinePromise = this._mapsWrapper.getNativeMap()
            .then(() => [PolylineManager._convertPoints(line),
            PolylineManager._convertIcons(line)])
            .then(([path, icons]) => this._mapsWrapper.createPolyline({
            clickable: line.clickable,
            draggable: line.draggable,
            editable: line.editable,
            geodesic: line.geodesic,
            strokeColor: line.strokeColor,
            strokeOpacity: line.strokeOpacity,
            strokeWeight: line.strokeWeight,
            visible: line.visible,
            zIndex: line.zIndex,
            path,
            icons,
        }));
        this._polylines.set(line, polylinePromise);
    }
    updatePolylinePoints(line) {
        const path = PolylineManager._convertPoints(line);
        const m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((l) => this._zone.run(() => l.setPath(path)));
    }
    updateIconSequences(line) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._mapsWrapper.getNativeMap();
            const icons = PolylineManager._convertIcons(line);
            const m = this._polylines.get(line);
            if (m == null) {
                return;
            }
            return m.then(l => this._zone.run(() => l.setOptions({ icons })));
        });
    }
    setPolylineOptions(line, options) {
        return this._polylines.get(line).then((l) => { l.setOptions(options); });
    }
    deletePolyline(line) {
        const m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((l) => {
            return this._zone.run(() => {
                l.setMap(null);
                this._polylines.delete(line);
            });
        });
    }
    getMVCPath(agmPolyline) {
        return __awaiter(this, void 0, void 0, function* () {
            const polyline = yield this._polylines.get(agmPolyline);
            return polyline.getPath();
        });
    }
    getPath(agmPolyline) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getMVCPath(agmPolyline)).getArray();
        });
    }
    createEventObservable(eventName, line) {
        return new Observable((observer) => {
            this._polylines.get(line).then((l) => {
                l.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
            });
        });
    }
    createPathEventObservable(line) {
        return __awaiter(this, void 0, void 0, function* () {
            const mvcPath = yield this.getMVCPath(line);
            return createMVCEventObservable(mvcPath);
        });
    }
}
PolylineManager.decorators = [
    { type: Injectable }
];
PolylineManager.ctorParameters = () => [
    { type: GoogleMapsAPIWrapper },
    { type: NgZone }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUtbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2xpYi9zZXJ2aWNlcy9tYW5hZ2Vycy9wb2x5bGluZS1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBSTVDLE9BQU8sRUFBRSx3QkFBd0IsRUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR2xFLE1BQU0sT0FBTyxlQUFlO0lBSTFCLFlBQW9CLFlBQWtDLEVBQVUsS0FBYTtRQUF6RCxpQkFBWSxHQUFaLFlBQVksQ0FBc0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBSHJFLGVBQVUsR0FDZCxJQUFJLEdBQUcsRUFBOEMsQ0FBQztJQUVzQixDQUFDO0lBRXpFLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBaUI7UUFDN0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQXVCLEVBQUUsRUFBRTtZQUM3RCxPQUFPLEVBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQThCLENBQUM7UUFDbEYsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQWtEO1FBQzVFLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQTJDLENBQUMsQ0FBQztRQUN2RixJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRTtZQUNsQyxPQUFPLFVBQVUsQ0FB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QkFDekQsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUsseUJBQXlCLENBQUMsSUFBaUI7O1lBQy9DLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QyxPQUFPLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLENBQUM7S0FBQTs7O1lBcklGLFVBQVU7OztZQUZGLG9CQUFvQjtZQU5SLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFnbVBvbHlsaW5lIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9wb2x5bGluZSc7XG5pbXBvcnQgeyBBZ21Qb2x5bGluZVBvaW50IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9wb2x5bGluZS1wb2ludCc7XG5pbXBvcnQgeyBjcmVhdGVNVkNFdmVudE9ic2VydmFibGUsIE1WQ0V2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvbXZjYXJyYXktdXRpbHMnO1xuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQb2x5bGluZU1hbmFnZXIge1xuICBwcml2YXRlIF9wb2x5bGluZXM6IE1hcDxBZ21Qb2x5bGluZSwgUHJvbWlzZTxnb29nbGUubWFwcy5Qb2x5bGluZT4+ID1cbiAgICAgIG5ldyBNYXA8QWdtUG9seWxpbmUsIFByb21pc2U8Z29vZ2xlLm1hcHMuUG9seWxpbmU+PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcHNXcmFwcGVyOiBHb29nbGVNYXBzQVBJV3JhcHBlciwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7fVxuXG4gIHByaXZhdGUgc3RhdGljIF9jb252ZXJ0UG9pbnRzKGxpbmU6IEFnbVBvbHlsaW5lKTogZ29vZ2xlLm1hcHMuTGF0TG5nTGl0ZXJhbFtdIHtcbiAgICBjb25zdCBwYXRoID0gbGluZS5fZ2V0UG9pbnRzKCkubWFwKChwb2ludDogQWdtUG9seWxpbmVQb2ludCkgPT4ge1xuICAgICAgcmV0dXJuIHtsYXQ6IHBvaW50LmxhdGl0dWRlLCBsbmc6IHBvaW50LmxvbmdpdHVkZX0gYXMgZ29vZ2xlLm1hcHMuTGF0TG5nTGl0ZXJhbDtcbiAgICB9KTtcbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9jb252ZXJ0UGF0aChwYXRoOiBrZXlvZiB0eXBlb2YgZ29vZ2xlLm1hcHMuU3ltYm9sUGF0aCB8IHN0cmluZyk6IGdvb2dsZS5tYXBzLlN5bWJvbFBhdGggfCBzdHJpbmcge1xuICAgIGNvbnN0IHN5bWJvbFBhdGggPSBnb29nbGUubWFwcy5TeW1ib2xQYXRoW3BhdGggYXMga2V5b2YgdHlwZW9mIGdvb2dsZS5tYXBzLlN5bWJvbFBhdGhdO1xuICAgIGlmICh0eXBlb2Ygc3ltYm9sUGF0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBzeW1ib2xQYXRoO1xuICAgIH0gZWxzZXtcbiAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9jb252ZXJ0SWNvbnMobGluZTogQWdtUG9seWxpbmUpOiBBcnJheTxnb29nbGUubWFwcy5JY29uU2VxdWVuY2U+IHtcbiAgICBjb25zdCBpY29ucyA9IGxpbmUuX2dldEljb25zKCkubWFwKGFnbUljb24gPT4gKHtcbiAgICAgIGZpeGVkUm90YXRpb246IGFnbUljb24uZml4ZWRSb3RhdGlvbixcbiAgICAgIG9mZnNldDogYWdtSWNvbi5vZmZzZXQsXG4gICAgICByZXBlYXQ6IGFnbUljb24ucmVwZWF0LFxuICAgICAgaWNvbjoge1xuICAgICAgICBhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludChhZ21JY29uLmFuY2hvclgsIGFnbUljb24uYW5jaG9yWSksXG4gICAgICAgIGZpbGxDb2xvcjogYWdtSWNvbi5maWxsQ29sb3IsXG4gICAgICAgIGZpbGxPcGFjaXR5OiBhZ21JY29uLmZpbGxPcGFjaXR5LFxuICAgICAgICBwYXRoOiBQb2x5bGluZU1hbmFnZXIuX2NvbnZlcnRQYXRoKGFnbUljb24ucGF0aCksXG4gICAgICAgIHJvdGF0aW9uOiBhZ21JY29uLnJvdGF0aW9uLFxuICAgICAgICBzY2FsZTogYWdtSWNvbi5zY2FsZSxcbiAgICAgICAgc3Ryb2tlQ29sb3I6IGFnbUljb24uc3Ryb2tlQ29sb3IsXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IGFnbUljb24uc3Ryb2tlT3BhY2l0eSxcbiAgICAgICAgc3Ryb2tlV2VpZ2h0OiBhZ21JY29uLnN0cm9rZVdlaWdodCxcbiAgICAgIH0sXG4gICAgfSBhcyBnb29nbGUubWFwcy5JY29uU2VxdWVuY2UpKTtcbiAgICAvLyBwcnVuZSB1bmRlZmluZWRzO1xuICAgIGljb25zLmZvckVhY2goaWNvbiA9PiB7XG4gICAgICBPYmplY3QuZW50cmllcyhpY29uKS5mb3JFYWNoKChba2V5LCB2YWxdKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGRlbGV0ZSAoaWNvbiBhcyBhbnkpW2tleV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHR5cGVvZiBpY29uLmljb24uYW5jaG9yLnggPT09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgIHR5cGVvZiBpY29uLmljb24uYW5jaG9yLnkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgZGVsZXRlIGljb24uaWNvbi5hbmNob3I7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gaWNvbnM7XG4gIH1cblxuICBhZGRQb2x5bGluZShsaW5lOiBBZ21Qb2x5bGluZSkge1xuICAgIGNvbnN0IHBvbHlsaW5lUHJvbWlzZSA9IHRoaXMuX21hcHNXcmFwcGVyLmdldE5hdGl2ZU1hcCgpXG4gICAgLnRoZW4oKCkgPT4gWyBQb2x5bGluZU1hbmFnZXIuX2NvbnZlcnRQb2ludHMobGluZSksXG4gICAgICAgICAgICAgICAgICBQb2x5bGluZU1hbmFnZXIuX2NvbnZlcnRJY29ucyhsaW5lKV0pXG4gICAgLnRoZW4oKFtwYXRoLCBpY29uc106IFtnb29nbGUubWFwcy5MYXRMbmdMaXRlcmFsW10sIGdvb2dsZS5tYXBzLkljb25TZXF1ZW5jZVtdXSkgPT5cbiAgICAgIHRoaXMuX21hcHNXcmFwcGVyLmNyZWF0ZVBvbHlsaW5lKHtcbiAgICAgICAgY2xpY2thYmxlOiBsaW5lLmNsaWNrYWJsZSxcbiAgICAgICAgZHJhZ2dhYmxlOiBsaW5lLmRyYWdnYWJsZSxcbiAgICAgICAgZWRpdGFibGU6IGxpbmUuZWRpdGFibGUsXG4gICAgICAgIGdlb2Rlc2ljOiBsaW5lLmdlb2Rlc2ljLFxuICAgICAgICBzdHJva2VDb2xvcjogbGluZS5zdHJva2VDb2xvcixcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogbGluZS5zdHJva2VPcGFjaXR5LFxuICAgICAgICBzdHJva2VXZWlnaHQ6IGxpbmUuc3Ryb2tlV2VpZ2h0LFxuICAgICAgICB2aXNpYmxlOiBsaW5lLnZpc2libGUsXG4gICAgICAgIHpJbmRleDogbGluZS56SW5kZXgsXG4gICAgICAgIHBhdGgsXG4gICAgICAgIGljb25zLFxuICAgIH0pKTtcbiAgICB0aGlzLl9wb2x5bGluZXMuc2V0KGxpbmUsIHBvbHlsaW5lUHJvbWlzZSk7XG4gIH1cblxuICB1cGRhdGVQb2x5bGluZVBvaW50cyhsaW5lOiBBZ21Qb2x5bGluZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHBhdGggPSBQb2x5bGluZU1hbmFnZXIuX2NvbnZlcnRQb2ludHMobGluZSk7XG4gICAgY29uc3QgbSA9IHRoaXMuX3BvbHlsaW5lcy5nZXQobGluZSk7XG4gICAgaWYgKG0gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gbS50aGVuKChsKSA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiBsLnNldFBhdGgocGF0aCkpKTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZUljb25TZXF1ZW5jZXMobGluZTogQWdtUG9seWxpbmUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLl9tYXBzV3JhcHBlci5nZXROYXRpdmVNYXAoKTtcbiAgICBjb25zdCBpY29ucyA9IFBvbHlsaW5lTWFuYWdlci5fY29udmVydEljb25zKGxpbmUpO1xuICAgIGNvbnN0IG0gPSB0aGlzLl9wb2x5bGluZXMuZ2V0KGxpbmUpO1xuICAgIGlmIChtID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIG0udGhlbihsID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IGwuc2V0T3B0aW9ucyh7aWNvbnN9KSApICk7XG4gIH1cblxuICBzZXRQb2x5bGluZU9wdGlvbnMobGluZTogQWdtUG9seWxpbmUsIG9wdGlvbnM6IHtbcHJvcE5hbWU6IHN0cmluZ106IGFueX0pOlxuICAgICAgUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3BvbHlsaW5lcy5nZXQobGluZSkudGhlbigobDogZ29vZ2xlLm1hcHMuUG9seWxpbmUpID0+IHsgbC5zZXRPcHRpb25zKG9wdGlvbnMpOyB9KTtcbiAgfVxuXG4gIGRlbGV0ZVBvbHlsaW5lKGxpbmU6IEFnbVBvbHlsaW5lKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgbSA9IHRoaXMuX3BvbHlsaW5lcy5nZXQobGluZSk7XG4gICAgaWYgKG0gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gbS50aGVuKChsOiBnb29nbGUubWFwcy5Qb2x5bGluZSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgbC5zZXRNYXAobnVsbCk7XG4gICAgICAgIHRoaXMuX3BvbHlsaW5lcy5kZWxldGUobGluZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZ2V0TVZDUGF0aChhZ21Qb2x5bGluZTogQWdtUG9seWxpbmUpOiBQcm9taXNlPGdvb2dsZS5tYXBzLk1WQ0FycmF5PGdvb2dsZS5tYXBzLkxhdExuZz4+IHtcbiAgICBjb25zdCBwb2x5bGluZSA9IGF3YWl0IHRoaXMuX3BvbHlsaW5lcy5nZXQoYWdtUG9seWxpbmUpO1xuICAgIHJldHVybiBwb2x5bGluZS5nZXRQYXRoKCk7XG4gIH1cblxuICBhc3luYyBnZXRQYXRoKGFnbVBvbHlsaW5lOiBBZ21Qb2x5bGluZSk6IFByb21pc2U8Z29vZ2xlLm1hcHMuTGF0TG5nW10+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuZ2V0TVZDUGF0aChhZ21Qb2x5bGluZSkpLmdldEFycmF5KCk7XG4gIH1cblxuICBjcmVhdGVFdmVudE9ic2VydmFibGU8VD4oZXZlbnROYW1lOiBzdHJpbmcsIGxpbmU6IEFnbVBvbHlsaW5lKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcbiAgICAgIHRoaXMuX3BvbHlsaW5lcy5nZXQobGluZSkudGhlbigobDogZ29vZ2xlLm1hcHMuUG9seWxpbmUpID0+IHtcbiAgICAgICAgbC5hZGRMaXN0ZW5lcihldmVudE5hbWUsIChlOiBUKSA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGUpKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZVBhdGhFdmVudE9ic2VydmFibGUobGluZTogQWdtUG9seWxpbmUpOiBQcm9taXNlPE9ic2VydmFibGU8TVZDRXZlbnQ8Z29vZ2xlLm1hcHMuTGF0TG5nPj4+IHtcbiAgICBjb25zdCBtdmNQYXRoID0gYXdhaXQgdGhpcy5nZXRNVkNQYXRoKGxpbmUpO1xuICAgIHJldHVybiBjcmVhdGVNVkNFdmVudE9ic2VydmFibGUobXZjUGF0aCk7XG4gIH1cbn1cbiJdfQ==