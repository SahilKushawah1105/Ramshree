import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('chatbot')
export class ChatbotController {
    constructor(private readonly chatbotService: ChatbotService) { }

    @Public()
    @Post('query')
    async query(@Body() body: { message: string, history?: { role: string; content: string }[] }) {
        return this.chatbotService.getAIResponse(body.message, body.history || []);
    }
}
