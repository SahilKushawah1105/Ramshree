import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { SettingsModule } from '../settings/settings.module';

@Module({
    imports: [SettingsModule],
    controllers: [ChatbotController],
    providers: [ChatbotService],
})
export class ChatbotModule { }
