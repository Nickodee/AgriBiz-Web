import { Component, ElementRef, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachment?: {
    type: 'image' | 'document';
    url: string;
    name: string;
  };
}

interface Chat {
  id: number;
  userId: number;
  name: string;
  avatar: string;
  unreadCount: number;
  lastMessage?: Message;
  online: boolean;
  role: string;
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  private platformId = inject(PLATFORM_ID);
  private readonly window = isPlatformBrowser(this.platformId) ? window : null;

  isMobileView(): boolean {
    return this.window ? this.window.innerWidth < 768 : false;
  }

  currentUserId: number = 1; // Simulating logged in user
  selectedChat: Chat | null = null;
  newMessage: string = '';
  searchQuery: string = '';

  chats: Chat[] = [
    {
      id: 1,
      userId: 2,
      name: 'Green Valley Farm',
      avatar: 'https://images.unsplash.com/photo-1507914372368-b2b085b925a1',
      unreadCount: 2,
      online: true,
      role: 'Seller',
      lastMessage: {
        id: 1,
        senderId: 2,
        text: 'Your order has been processed. When would you like it delivered?',
        timestamp: new Date('2025-10-21T10:30:00'),
        status: 'read'
      }
    },
    {
      id: 2,
      userId: 3,
      name: 'Dairy Delights',
      avatar: 'https://images.unsplash.com/photo-1546456073-92b9f0a8d413',
      unreadCount: 0,
      online: false,
      role: 'Seller',
      lastMessage: {
        id: 2,
        senderId: 1,
        text: 'Thank you for the prompt delivery!',
        timestamp: new Date('2025-10-20T15:45:00'),
        status: 'read'
      }
    }
  ];

  messages: { [chatId: number]: Message[] } = {
    1: [
      {
        id: 1,
        senderId: 2,
        text: 'Hello! Thank you for your order.',
        timestamp: new Date('2025-10-21T10:25:00'),
        status: 'read'
      },
      {
        id: 2,
        senderId: 2,
        text: 'Your order has been processed. When would you like it delivered?',
        timestamp: new Date('2025-10-21T10:30:00'),
        status: 'read'
      }
    ],
    2: [
      {
        id: 3,
        senderId: 1,
        text: 'The milk delivery was perfect!',
        timestamp: new Date('2025-10-20T15:40:00'),
        status: 'read'
      },
      {
        id: 4,
        senderId: 1,
        text: 'Thank you for the prompt delivery!',
        timestamp: new Date('2025-10-20T15:45:00'),
        status: 'read'
      }
    ]
  };

  selectChat(chat: Chat) {
    this.selectedChat = chat;
    chat.unreadCount = 0;
    setTimeout(() => this.scrollToBottom(), 0);
  }

  getFilteredChats() {
    return this.chats.filter(chat =>
      chat.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  sendMessage() {
    if (!this.selectedChat || !this.newMessage.trim()) return;

    const message: Message = {
      id: Math.max(...this.messages[this.selectedChat.id].map(m => m.id)) + 1,
      senderId: this.currentUserId,
      text: this.newMessage.trim(),
      timestamp: new Date(),
      status: 'sent'
    };

    this.messages[this.selectedChat.id].push(message);
    this.selectedChat.lastMessage = message;
    this.newMessage = '';

    setTimeout(() => this.scrollToBottom(), 0);

    // Simulate message delivery
    setTimeout(() => {
      message.status = 'delivered';
      // Simulate read receipt after 2 seconds
      setTimeout(() => {
        message.status = 'read';
      }, 2000);
    }, 1000);
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop =
        this.messageContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }

  getMessageStatus(status: string): string {
    switch(status) {
      case 'sent': return '✓';
      case 'delivered': return '✓✓';
      case 'read': return '✓✓';
      default: return '';
    }
  }

  getStatusColor(status: string): string {
    return status === 'read' ? 'text-blue-500' : 'text-gray-400';
  }
}
