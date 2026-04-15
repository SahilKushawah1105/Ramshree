import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductsService } from './products/products.service';
import { SettingsService } from './settings/settings.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly productsService: ProductsService,
    private readonly settingsService: SettingsService,
    private readonly usersService: UsersService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('admin/stats')
  async getStats() {
    const [products, settings, users] = await Promise.all([
      this.productsService.findAll(),
      this.settingsService.findAll(),
      this.usersService.findAll(),
    ]);

    return {
      totalProducts: products.length,
      settingsUpdated: Object.keys(settings).length,
      totalUsers: users.length,
    };
  }
}
