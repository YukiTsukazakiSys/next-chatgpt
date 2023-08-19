'use client';

import { Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Message } from './types/custom';
import { useRecoilValue } from 'recoil';
import { promptMsgAtom } from '@/atom/countAtom';
import { defaultPrompt } from '@/constants/constants';
import Chat from '@/components/chatBody';
import ThreeDotsLoader from '@/components/loader/ThreeDotsLoader';
import InputForm from '@/components/inputForm/InputForm';

const Home: NextPage = () => {
  const promptMsg: string = useRecoilValue(promptMsgAtom);
  const [chats, setChats] = useState<Message[]>([
    {
      role: 'system',
      content: promptMsg || defaultPrompt,
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (message: Message) => {
    try {
      setIsSubmitting(true);
      setChats((prev) => [...prev, message]);

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: [...chats, message].map((d) => ({
            role: d.role,
            content: d.content,
          })),
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      setChats((prev) => [...prev, data.result as Message]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white md:rounded-lg md:shadow-md p-4 md:p-10 my-10">
      <div className="mb-10">
        <AnimatePresence>
          {chats.slice(1, chats.length).map((chat, index) => {
            return <Chat role={chat.role} content={chat.content} key={index} />;
          })}
        </AnimatePresence>
        {isSubmitting && (
          <Flex alignSelf="flex-start" px="2rem" py="0.5rem">
            <ThreeDotsLoader />
          </Flex>
        )}
      </div>
      <InputForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Home;
