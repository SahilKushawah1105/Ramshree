import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private settingsRepository: Repository<Setting>,
  ) {}

  async findAll(): Promise<Record<string, string>> {
    const settings = await this.settingsRepository.find();
    return settings.reduce((acc, setting) => {
      acc[setting.name] = setting.value;
      return acc;
    }, {});
  }

  async update(name: string, value: string): Promise<Setting> {
    let setting = await this.settingsRepository.findOne({ where: { name } });
    if (setting) {
      setting.value = value;
    } else {
      setting = this.settingsRepository.create({ name, value });
    }
    return this.settingsRepository.save(setting);
  }

  async updateMany(settings: Record<string, string>): Promise<void> {
    for (const [name, value] of Object.entries(settings)) {
      await this.update(name, value);
    }
  }
}
