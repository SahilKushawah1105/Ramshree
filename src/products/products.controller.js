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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ProductsController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var multer_1 = require("multer");
var path_1 = require("path");
var products_service_1 = require("./products.service");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var ProductsController = /** @class */ (function () {
    function ProductsController(productsService) {
        this.productsService = productsService;
    }
    ProductsController.prototype.findAll = function () {
        return this.productsService.findAll();
    };
    ProductsController.prototype.findOne = function (id) {
        return this.productsService.findOne(+id);
    };
    ProductsController.prototype.create = function (productData) {
        return this.productsService.create(productData);
    };
    ProductsController.prototype.update = function (id, productData) {
        return this.productsService.update(+id, productData);
    };
    ProductsController.prototype.partialUpdate = function (id, productData) {
        return this.productsService.update(+id, productData);
    };
    ProductsController.prototype.remove = function (id) {
        return this.productsService.remove(+id);
    };
    ProductsController.prototype.uploadImage = function (file) {
        return {
            url: "/uploads/".concat(file.filename)
        };
    };
    __decorate([
        (0, common_1.Get)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ProductsController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProductsController.prototype, "findOne");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ProductsController.prototype, "create");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Put)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", void 0)
    ], ProductsController.prototype, "update");
    __decorate([
        (0, common_1.Patch)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", void 0)
    ], ProductsController.prototype, "partialUpdate");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ProductsController.prototype, "remove");
    __decorate([
        (0, common_1.Post)('upload'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
            storage: (0, multer_1.diskStorage)({
                destination: './uploads',
                filename: function (req, file, cb) {
                    var randomName = Array(32)
                        .fill(null)
                        .map(function () { return Math.round(Math.random() * 16).toString(16); })
                        .join('');
                    return cb(null, "".concat(randomName).concat((0, path_1.extname)(file.originalname)));
                }
            })
        })),
        __param(0, (0, common_1.UploadedFile)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ProductsController.prototype, "uploadImage");
    ProductsController = __decorate([
        (0, common_1.Controller)('products'),
        __metadata("design:paramtypes", [products_service_1.ProductsService])
    ], ProductsController);
    return ProductsController;
}());
exports.ProductsController = ProductsController;
