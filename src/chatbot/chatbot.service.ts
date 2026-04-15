import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SettingsService } from '../settings/settings.service';

@Injectable()
export class ChatbotService {
    private readonly baseUrl: string;
    private readonly model: string;

    constructor(
        private configService: ConfigService,
        private settingsService: SettingsService,
    ) {
        this.baseUrl = this.configService.get<string>('OLLAMA_BASE_URL') || 'http://localhost:11434';
        this.model = this.configService.get<string>('OLLAMA_MODEL') || 'llama3.2:1b';
    }

    async getAIResponse(userMessage: string, history: { role: string; content: string }[] = []) {
        try {
            // Fetch system instructions from settings
            const settings = await this.settingsService.findAll();
            const systemInstruction = settings.chatbot_instructions || 'You are a helpful assistant for Ramshree International.';
            const chatbotEnabled = settings.chatbot_enabled === 'true';

            if (!chatbotEnabled) {
                return { message: 'Chatbot is currently disabled.' };
            }

            const messages = [
                { role: 'system', content: systemInstruction },
                ...history,
                { role: 'user', content: userMessage },
            ];

            const response = await axios.post(`${this.baseUrl}/api/chat`, {
                model: this.model,
                messages: messages,
                stream: false,
            });

            return {
                message: response.data.message.content,
            };
        } catch (error) {
            console.error('Ollama Error:', error.message);
            throw new InternalServerErrorException('Failed to get response from AI provider.');
        }
    }
}
