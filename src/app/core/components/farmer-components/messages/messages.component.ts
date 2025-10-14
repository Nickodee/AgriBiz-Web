import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  id: string;
  senderId: string;
  text: string;
  time: Date;
  status: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  role: string;
  unread: number;
  status?: 'pending' | 'active' | 'closed';
  lastMessage: {
    text: string;
    time: Date;
  };
  messages: Message[];
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  searchQuery = '';
  newMessage = '';
  currentUserId = 'farmer-123'; // This would come from auth service
  selectedConversation: Conversation | null = null;

  conversations: Conversation[] = [
    {
      id: '1',
      name: 'John Kamau',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      role: 'Buyer',
      unread: 3,
      status: 'active',
      lastMessage: {
        text: 'I would like to place a bulk order for your premium coffee beans.',
        time: new Date('2025-10-14T09:30:00')
      },
      messages: [
        {
          id: 'm1',
          senderId: 'buyer-456',
          text: 'Hello! I\'m interested in your coffee beans.',
          time: new Date('2025-10-14T09:15:00'),
          status: 'read'
        },
        {
          id: 'm2',
          senderId: 'farmer-123',
          text: 'Hi John! Thank you for your interest. Our coffee beans are of premium quality.',
          time: new Date('2025-10-14T09:20:00'),
          status: 'read'
        },
        {
          id: 'm3',
          senderId: 'buyer-456',
          text: 'I would like to place a bulk order for your premium coffee beans.',
          time: new Date('2025-10-14T09:30:00'),
          status: 'delivered'
        }
      ]
    },
    {
      id: '2',
      name: 'Support Team',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      role: 'Customer Support',
      unread: 0,
      status: 'closed',
      lastMessage: {
        text: 'Your issue has been resolved. Please let us know if you need anything else.',
        time: new Date('2025-10-13T16:45:00')
      },
      messages: [
        {
          id: 'm4',
          senderId: 'farmer-123',
          text: 'I need help with updating my product listings.',
          time: new Date('2025-10-13T16:30:00'),
          status: 'read'
        },
        {
          id: 'm5',
          senderId: 'support-789',
          text: 'I\'ll guide you through the process.',
          time: new Date('2025-10-13T16:35:00'),
          status: 'read'
        },
        {
          id: 'm6',
          senderId: 'support-789',
          text: 'Your issue has been resolved. Please let us know if you need anything else.',
          time: new Date('2025-10-13T16:45:00'),
          status: 'read'
        }
      ]
    },
    {
      id: '3',
      name: 'Mary Wanjiku',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      role: 'Buyer',
      unread: 1,
      status: 'pending',
      lastMessage: {
        text: 'Are your vegetables organically grown?',
        time: new Date('2025-10-14T10:15:00')
      },
      messages: [
        {
          id: 'm7',
          senderId: 'buyer-101',
          text: 'Hello, I\'m interested in your vegetables.',
          time: new Date('2025-10-14T10:10:00'),
          status: 'read'
        },
        {
          id: 'm8',
          senderId: 'buyer-101',
          text: 'Are your vegetables organically grown?',
          time: new Date('2025-10-14T10:15:00'),
          status: 'delivered'
        }
      ]
    }
  ];

  get filteredConversations(): Conversation[] {
    return this.conversations.filter(conversation =>
      conversation.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      conversation.lastMessage.text.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectConversation(conversation: Conversation) {
    this.selectedConversation = conversation;
    conversation.unread = 0; // Mark as read when selected
    setTimeout(() => this.scrollToBottom(), 100);
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedConversation) return;

    const message: Message = {
      id: `m${Date.now()}`,
      senderId: this.currentUserId,
      text: this.newMessage.trim(),
      time: new Date(),
      status: 'sent'
    };

    this.selectedConversation.messages.push(message);
    this.selectedConversation.lastMessage = {
      text: message.text,
      time: message.time
    };

    this.newMessage = '';
    setTimeout(() => this.scrollToBottom(), 100);

    // Simulate response (in a real app, this would be handled by a service)
    this.simulateResponse();
  }

  private simulateResponse() {
    const conversation = this.selectedConversation;
    if (!conversation) return;

    setTimeout(() => {
      const responses = [
        'I\'ll look into that for you.',
        'Thank you for your message. I\'ll get back to you soon.',
        'That sounds good!',
        'Could you please provide more details?'
      ];

      const message: Message = {
        id: `m${Date.now()}`,
        senderId: `other-${conversation.id}`,
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date(),
        status: 'sent'
      };

      conversation.messages.push(message);
      conversation.lastMessage = {
        text: message.text,
        time: message.time
      };

      setTimeout(() => this.scrollToBottom(), 100);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  filterConversations() {
    // This is handled by the filteredConversations getter
  }
}
