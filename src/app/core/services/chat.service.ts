import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ChatMessage {
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();

  constructor() {
    // Initialize with welcome message
    this.addMessage({
      content: 'Hello! How can I help you with AgriBiz today?',
      type: 'assistant',
      timestamp: new Date()
    });
  }

  addMessage(message: ChatMessage): void {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }

  // Temporary mock AI response - will be replaced with actual AI service integration
  async getAIResponse(userMessage: string): Promise<ChatMessage> {
    // Mock response based on keywords
    let response = '';
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('farmer') || lowerMessage.includes('farming')) {
      response = 'As a farmer on AgriBiz, you can list your products, connect with buyers, and access agricultural resources. Would you like to know more about our farmer services?';
    } else if (lowerMessage.includes('buyer') || lowerMessage.includes('purchase')) {
      response = 'Buyers on AgriBiz can browse verified farmers\' products, make secure purchases, and manage their supply chain efficiently. Would you like to learn about our buyer features?';
    } else if (lowerMessage.includes('investor') || lowerMessage.includes('invest')) {
      response = 'Investors can discover vetted agricultural projects, track their investments, and contribute to Africa\'s agricultural growth. Would you like details about investment opportunities?';
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      response = 'Prices on AgriBiz are set by verified farmers and are competitive with market rates. You can view detailed pricing information for each product listing. Would you like to see some examples?';
    } else if (lowerMessage.includes('register') || lowerMessage.includes('sign up')) {
      response = 'You can register as a farmer, buyer, or investor on AgriBiz. The process is simple and secure. Would you like me to guide you through the registration process?';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = 'Hello! Welcome to AgriBiz. I\'m here to help you with any questions about our platform. What would you like to know about?';
    } else {
      response = 'I understand you\'re interested in AgriBiz. Could you please let me know if you\'re a farmer, buyer, or investor? That way, I can provide more specific information.';
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      content: response,
      type: 'assistant',
      timestamp: new Date()
    };
  }

  clearMessages(): void {
    this.messagesSubject.next([]);
    this.addMessage({
      content: 'Hello! How can I help you with AgriBiz today?',
      type: 'assistant',
      timestamp: new Date()
    });
  }
}
