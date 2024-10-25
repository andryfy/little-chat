import { useState } from 'react';

import { Avatar } from '@mui/material';

import { ButtonTheme, MessageInput, SendButton } from '@/components';

// Données pour les conversations
const conversations = [
  {
    id: 1,
    name: 'Henry Dholi',
    message: 'I came across your profile and...',
    status: 'online',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    name: 'Mariya Desoja',
    message: 'I like your confidence 👏',
    status: 'online',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 3,
    name: 'Robert Jhon',
    message: 'Can you share your offer?',
    status: 'online',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: 4,
    name: 'Sophia Loren',
    message: 'Looking forward to our meeting!',
    status: 'offline',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 5,
    name: 'Daniel Craig',
    message: 'Just sent you the details.',
    status: 'online',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 6,
    name: 'Emma Watson',
    message: 'That sounds amazing! Let’s do it!',
    status: 'offline',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    id: 7,
    name: 'Chris Hemsworth',
    message: 'Can you review the document?',
    status: 'online',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    id: 8,
    name: 'Scarlett Johansson',
    message: 'Thank you for your feedback 😊',
    status: 'offline',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: 9,
    name: 'Tom Holland',
    message: 'Let’s catch up tomorrow.',
    status: 'online',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
];

function Home() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Andri Thomas',
      text: 'I want to make an appointment tomorrow from 2:00 to 5:00pm?',
      time: '1:55pm',
      sentByUser: false,
    },
    {
      id: 2,
      sender: 'You',
      text: 'Hello, Thomas! I will check the schedule and inform you',
      time: '1:55pm',
      sentByUser: true,
    },
    {
      id: 3,
      sender: 'You',
      text: 'You are welcome!',
      time: '1:55pm',
      sentByUser: true,
    },
    {
      id: 4,
      sender: 'Andri Thomas',
      text: 'Great! Looking forward to hearing from you.',
      time: '1:56pm',
      sentByUser: false,
    },
    {
      id: 5,
      sender: 'You',
      text: 'I’ve checked; we have availability at that time. Confirming your appointment!',
      time: '2:00pm',
      sentByUser: true,
    },
    {
      id: 6,
      sender: 'Andri Thomas',
      text: 'Thank you so much!',
      time: '2:01pm',
      sentByUser: false,
    },
    {
      id: 7,
      sender: 'You',
      text: 'It’s my pleasure, Thomas. If you have any other requests, let me know.',
      time: '2:02pm',
      sentByUser: true,
    },
    {
      id: 8,
      sender: 'Andri Thomas',
      text: 'Will do. See you tomorrow!',
      time: '2:05pm',
      sentByUser: false,
    },
    {
      id: 9,
      sender: 'You',
      text: 'See you! Have a great day.',
      time: '2:06pm',
      sentByUser: true,
    },
    {
      id: 10,
      sender: 'Andri Thomas',
      text: 'One more thing: could you send a reminder tomorrow morning?',
      time: '2:07pm',
      sentByUser: false,
    },
    {
      id: 11,
      sender: 'You',
      text: 'Of course, I’ll set up a reminder for you.',
      time: '2:08pm',
      sentByUser: true,
    },
    {
      id: 12,
      sender: 'Andri Thomas',
      text: 'Perfect, thank you again!',
      time: '2:09pm',
      sentByUser: false,
    },
    {
      id: 13,
      sender: 'You',
      text: 'No problem at all, Thomas!',
      time: '2:10pm',
      sentByUser: true,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString(),
      sentByUser: true,
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen max-h-screen overflow-hidden flex">
      {/* Liste des conversations */}
      <div className="w-1/3 bg-white dark:bg-gray-800 p-6 shadow-md border-r dark:border-r-neutral-600 min-h-screen max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Active Conversations
          </h2>
          <ButtonTheme />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 mb-4 rounded-md bg-gray-200 dark:bg-gray-700 dark:text-gray-100"
        />
        <div>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className="flex items-center my-4 cursor-pointer py-1"
            >
              <Avatar src={conv.avatar} />
              <div className="ml-4">
                <h3 className="text-md font-bold text-gray-900 dark:text-gray-100">
                  {conv.name}
                </h3>
                <p className="text-sm font-thin text-gray-600 dark:text-gray-400">
                  {conv.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zone de chat */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
        <div className="flex items-center p-4 border-b dark:border-b-neutral-600">
          <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />
          <div className="ml-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Henry Dholi
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Reply to message
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sentByUser ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              <div className="max-w-xs">
                <div
                  className={`p-3 rounded-2xl ${
                    message.sentByUser
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100 rounded-bl-none'
                  }`}
                >
                  <p>{message.text}</p>
                </div>
                <span
                  className={`text-xs text-gray-500 dark:text-gray-400 block mt-1 ${
                    message.sentByUser ? 'text-right' : 'text-left'
                  }`}
                >
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Barre de saisie de message */}
        <div className="flex items-center border-t dark:border-t-neutral-600 p-4">
          <MessageInput />
        </div>
      </div>
    </div>
  );
}

export default Home;
