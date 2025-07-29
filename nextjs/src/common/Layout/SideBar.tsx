'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useGetChatSessionsQuery } from '@/features/chat/useChatService';
import { useAtom } from 'jotai';
import { sessionAtom } from '../store/session';

export default function SideBar() {
  const { data: chatSessions } = useGetChatSessionsQuery();
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
          className="justify-start w-full gap-3 text-zinc-200 hover:bg-zinc-800 hover:text-white"
          onClick={() => setSessionId(null)}
          >
            New Chat
        </Button>
        <Button
            variant="ghost"
            className="justify-start w-full gap-3 text-zinc-200 hover:bg-zinc-800 hover:text-white"
          >
            Search Chat
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
              className="justify-start w-full text-zinc-300 hover:bg-zinc-800 hover:text-white px-2 py-1 rounded"
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
