"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.Product = exports.ProductCategory = void 0;
var typeorm_1 = require("typeorm");
var ProductCategory;
(function (ProductCategory) {
    ProductCategory["GROUND_SPICES"] = "Ground Spices";
    ProductCategory["WHOLE_SPICES"] = "Whole Spices";
    ProductCategory["OIL_SEEDS"] = "Oil Seeds";
    ProductCategory["GRAINS_PULSES"] = "Grains & Pulses";
    ProductCategory["BLENDED_SPICES"] = "Blended Spices";
    ProductCategory["OTHER"] = "Other";
})(ProductCategory = exports.ProductCategory || (exports.ProductCategory = {}));
var Product = /** @class */ (function () {
    function Product() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Product.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Product.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], Product.prototype, "description");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Product.prototype, "shortDesc");
    __decorate([
        (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], Product.prototype, "price");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Product.prototype, "image");
    __decorate([
        (0, typeorm_1.Column)({
            type: 'simple-json',
            nullable: false,
            "default": function () { return "('[]')"; }
        }),
        __metadata("design:type", Array)
    ], Product.prototype, "categories");
    __decorate([
        (0, typeorm_1.Column)('simple-json', { nullable: true }),
        __metadata("design:type", Object)
    ], Product.prototype, "specs");
    __decorate([
        (0, typeorm_1.Column)('simple-json', { nullable: true }),
        __metadata("design:type", Array)
    ], Product.prototype, "packaging");
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Product.prototype, "createdAt");
    Product = __decorate([
        (0, typeorm_1.Entity)('products')
    ], Product);
    return Product;
}());
exports.Product = Product;
