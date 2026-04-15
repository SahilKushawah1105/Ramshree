import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) { }

  private deleteFile(filePath: string) {
    if (!filePath || !filePath.startsWith('/uploads/')) return;

    const fileName = filePath.replace('/uploads/', '');
    const fullPath = path.join(process.cwd(), 'uploads', fileName);

    if (fs.existsSync(fullPath)) {
      try {
        fs.unlinkSync(fullPath);
        console.log(`Deleted file: ${fullPath}`);
      } catch (err) {
        console.error(`Failed to delete file: ${fullPath}`, err);
      }
    }
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productsRepository.create(productData);
    return this.productsRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, productData: Partial<Product>): Promise<Product> {
    const existing = await this.findOne(id);

    // Cleanup if image is changing
    if (productData.image && existing.image && productData.image !== existing.image) {
      this.deleteFile(existing.image);
    }

    await this.productsRepository.update(id, productData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const existing = await this.findOne(id);

    // Cleanup image on remove
    if (existing.image) {
      this.deleteFile(existing.image);
    }

    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
