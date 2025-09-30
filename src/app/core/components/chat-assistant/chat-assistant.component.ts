import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { ChatService, ChatMessage } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-assistant.component.html',
  styleUrls: ['./chat-assistant.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'scale(0.8)', opacity: 0 }))
      ])
    ])
  ]
})
export class ChatAssistantComponent implements AfterViewChecked, OnInit, OnDestroy {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  isOpen = false;
  isTyping = false;
  currentMessage = '';
  messages: ChatMessage[] = [];
  private messagesSubscription: Subscription | undefined;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.messagesSubscription = this.chatService.messages$.subscribe(
      messages => this.messages = messages
    );
  }

  ngOnDestroy() {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  async sendMessage(): Promise<void> {
    if (!this.currentMessage.trim() || this.isTyping) {
      return;
    }

    const userMessage: ChatMessage = {
      content: this.currentMessage,
      type: 'user',
      timestamp: new Date()
    };

    this.chatService.addMessage(userMessage);
    const messageText = this.currentMessage;
    this.currentMessage = '';
    this.isTyping = true;

    try {
      const response = await this.chatService.getAIResponse(messageText);
      this.chatService.addMessage(response);
    } catch (error) {
      console.error('Error sending message:', error);
      this.chatService.addMessage({
        content: 'Sorry, I encountered an error processing your message.',
        type: 'assistant',
        timestamp: new Date()
      });
    } finally {
      this.isTyping = false;
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    try {
      const element = this.messagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}
