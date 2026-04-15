import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BlogsService {
    constructor(
        @InjectRepository(Blog)
        private blogsRepository: Repository<Blog>,
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

    async create(createBlogDto: CreateBlogDto): Promise<Blog> {
        const blog = this.blogsRepository.create(createBlogDto);
        return this.blogsRepository.save(blog);
    }

    async findAll(): Promise<Blog[]> {
        return this.blogsRepository.find({
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: number): Promise<Blog> {
        const blog = await this.blogsRepository.findOne({ where: { id } });
        if (!blog) {
            throw new NotFoundException(`Blog with ID ${id} not found`);
        }
        return blog;
    }

    async update(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
        const existing = await this.findOne(id);

        // Cleanup if image is changing
        if (updateBlogDto.image && existing.image && updateBlogDto.image !== existing.image) {
            this.deleteFile(existing.image);
        }

        await this.blogsRepository.update(id, updateBlogDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const existing = await this.findOne(id);

        // Cleanup image on remove
        if (existing.image) {
            this.deleteFile(existing.image);
        }

        const result = await this.blogsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Blog with ID ${id} not found`);
        }
    }
}
