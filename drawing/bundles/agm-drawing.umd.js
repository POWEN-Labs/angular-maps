(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@agm/core'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@agm/drawing', ['exports', '@angular/core', 'rxjs', '@agm/core', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.agm = global.agm || {}, global.agm.drawing = {}), global.ng.core, global.rxjs, global.core$1, global.rxjs.operators));
}(this, (function (exports, core, rxjs, core$1, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var AgmDrawingManager = /** @class */ (function () {
        function AgmDrawingManager(_zone) {
            this._zone = _zone;
            /**
             * This event is fired when the user has finished drawing a circle.
             */
            this.circleComplete = new core.EventEmitter();
            /**
             * This event is fired when the user has finished drawing a marker.
             */
            this.markerComplete = new core.EventEmitter();
            /**
             * This event is fired when the user has finished drawing an overlay of any
             * type.
             */
            this.overlayComplete = new core.EventEmitter();
            /**
             * This event is fired when the user has finished drawing a polygon.
             */
            this.polygonComplete = new core.EventEmitter();
            /**
             * This event is fired when the user has finished drawing a polyline.
             */
            this.polylineComplete = new core.EventEmitter();
            /**
             * This event is fired when the user has finished drawing a rectangle.
             */
            this.rectangleComplete = new core.EventEmitter();
            this.eventSubscriptions = [];
        }
        AgmDrawingManager.prototype.setMap = function (map) {
            if (!google.maps.drawing && core.isDevMode()) {
                console.error('Cannot use drawing manager if drawing library is not ' +
                    'loaded. To fix, add libraries: [\'drawing\'] to the ' +
                    'lazyMapsAPILoaderConfig you passed to AgmCoreModule.forRoot');
                return;
            }
            if (map && !this.drawingManager) {
                this.drawingManager = new google.maps.drawing.DrawingManager({
                    map: map,
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
        };
        AgmDrawingManager.prototype.initEvents = function (drawingManager) {
            var _this = this;
            this.eventSubscriptions.push(this.createMvcObservable('circlecomplete', drawingManager)
                .subscribe(function (circle) { return _this._zone.run(function () { return _this.circleComplete.next(circle); }); }));
            this.eventSubscriptions.push(this.createMvcObservable('markercomplete', drawingManager)
                .subscribe(function (marker) { return _this._zone.run(function () { return _this.markerComplete.next(marker); }); }));
            this.eventSubscriptions.push(this.createMvcObservable('polygoncomplete', drawingManager)
                .subscribe(function (polygon) { return _this._zone.run(function () { return _this.polygonComplete.next(polygon); }); }));
            this.eventSubscriptions.push(this.createMvcObservable('polylinecomplete', drawingManager)
                .subscribe(function (polyline) { return _this._zone.run(function () { return _this.polylineComplete.next(polyline); }); }));
            this.eventSubscriptions.push(this.createMvcObservable('overlaycomplete', drawingManager)
                .subscribe(function (overlayevent) { return _this._zone.run(function () { return _this.overlayComplete.next(overlayevent); }); }));
            this.eventSubscriptions.push(this.createMvcObservable('rectanglecomplete', drawingManager)
                .subscribe(function (rectangle) { return _this._zone.run(function () { return _this.rectangleComplete.next(rectangle); }); }));
        };
        AgmDrawingManager.prototype.createMvcObservable = function (eventName, mvcObject) {
            return rxjs.fromEventPattern(function (handler) { return mvcObject.addListener(eventName, function (event) { return handler.apply(null, [event]); }); }, function (_handler, evListener) { return evListener.remove(); });
        };
        AgmDrawingManager.prototype.ngOnChanges = function (changes) {
            if (!this.drawingManager) {
                return;
            }
            var options = Object.entries(changes)
                .map(function (_a) {
                var _b = __read(_a, 2), prop = _b[0], change = _b[1];
                return [prop, change.currentValue];
            })
                .reduce(function (obj, _a) {
                var _b = __read(_a, 2), propName = _b[0], propValue = _b[1];
                obj[propName] = propValue;
                return obj;
            }, {});
            this.drawingManager.setOptions(options);
        };
        AgmDrawingManager.prototype.ngOnDestroy = function () {
            this.eventSubscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
        };
        return AgmDrawingManager;
    }());
    AgmDrawingManager.decorators = [
        { type: core.Directive, args: [{
                    selector: 'agm-drawing-manager',
                    exportAs: 'agmDrawingManager',
                },] }
    ];
    AgmDrawingManager.ctorParameters = function () { return [
        { type: core.NgZone }
    ]; };
    AgmDrawingManager.propDecorators = {
        drawingControl: [{ type: core.Input }],
        drawingMode: [{ type: core.Input }],
        drawingControlOptions: [{ type: core.Input }],
        circleOptions: [{ type: core.Input }],
        markerOptions: [{ type: core.Input }],
        polygonOptions: [{ type: core.Input }],
        polylineOptions: [{ type: core.Input }],
        rectangleOptions: [{ type: core.Input }],
        circleComplete: [{ type: core.Output }],
        markerComplete: [{ type: core.Output }],
        overlayComplete: [{ type: core.Output }],
        polygonComplete: [{ type: core.Output }],
        polylineComplete: [{ type: core.Output }],
        rectangleComplete: [{ type: core.Output }]
    };

    var AgmDrawingManagerTrigger = /** @class */ (function () {
        function AgmDrawingManagerTrigger(_agmMap) {
            this._agmMap = _agmMap;
        }
        AgmDrawingManagerTrigger.prototype.ngAfterViewInit = function () {
            var _this = this;
            this._agmMap.mapReady.pipe(operators.first()).subscribe(function (map) { return _this.drawingManager.setMap(map); });
        };
        AgmDrawingManagerTrigger.prototype.ngOnDestroy = function () {
            var _this = this;
            this._agmMap.mapReady.pipe(operators.first()).subscribe(function () { return _this.drawingManager.setMap(null); });
        };
        return AgmDrawingManagerTrigger;
    }());
    AgmDrawingManagerTrigger.decorators = [
        { type: core.Directive, args: [{
                    selector: 'agm-map[agmDrawingManager]',
                    exportAs: 'matDrawingManagerTrigger',
                },] }
    ];
    AgmDrawingManagerTrigger.ctorParameters = function () { return [
        { type: core$1.AgmMap, decorators: [{ type: core.Host }] }
    ]; };
    AgmDrawingManagerTrigger.propDecorators = {
        drawingManager: [{ type: core.Input, args: ['agmDrawingManager',] }]
    };

    var AgmDrawingModule = /** @class */ (function () {
        function AgmDrawingModule() {
        }
        return AgmDrawingModule;
    }());
    AgmDrawingModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [core$1.AgmCoreModule],
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

    exports.AgmDrawingManager = AgmDrawingManager;
    exports.AgmDrawingManagerTrigger = AgmDrawingManagerTrigger;
    exports.AgmDrawingModule = AgmDrawingModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=agm-drawing.umd.js.map
