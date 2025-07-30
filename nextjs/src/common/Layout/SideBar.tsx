'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useGetChatSessionsQuery } from '@/features/chat/useChatService';
import { useAtom } from 'jotai';
import { sessionAtom } from '../store/chatStore';

export default function SideBar() {
  const chatSessions = useGetChatSessionsQuery();
  const [, setSessionId] = useAtom(sessionAtom);

  return (
    <aside className="flex flex-col h-screen w-64 bg-zinc-950 text-zinc-100 border-r border-zinc-800">
      {/* Top Section */}
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-semibold">DeepAuto.ai ChatBot</span>
        </div>
        <Button
          variant="ghost"
          className="justify-start w-full gap-3 text-zinc-200 hover:bg-zinc-800 hover:text-white flex items-center cursor-pointer"
          onClick={() => setSessionId(null)}
        >
          <span className="mr-1 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </span>
          새 채팅
        </Button>
        <Button
          variant="ghost"
          className="justify-start w-full gap-3 text-zinc-200 hover:bg-zinc-800 hover:text-white flex items-center cursor-pointer"
        >
          <span className="mr-1 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </span>
          채팅 검색
        </Button>
      </div>
      <Separator className="bg-zinc-800" />
      {/* Projects Section */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-xs text-zinc-400 mb-2">채팅</div>
        <div className="flex flex-col gap-1 h-full">
          {chatSessions?.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="justify-start w-full text-zinc-300 hover:bg-zinc-800 hover:text-white px-2 py-1 rounded cursor-pointer"
              onClick={() => setSessionId(item.sessionId)}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>
      <Separator className="bg-zinc-800" />
      {/* User Profile Section */}
      <div className="flex items-center gap-3 p-4 border-t border-zinc-800">
        <Avatar>
          <AvatarFallback>Y</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">YEEUN LEE</span>
          <span className="text-xs text-zinc-400">Plus</span>
        </div>
      </div>
    </aside>
  );
}
