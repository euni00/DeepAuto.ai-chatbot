import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const menu = [{ label: '새 채팅' }, { label: '채팅 검색' }, { label: '라이브러리' }];

const projects = [
  'DeepAuto.ai 프로젝트1',
  'DeepAuto.ai 프로젝트2',
  'DeepAuto.ai 프로젝트3',
  'DeepAuto.ai 프로젝트4',
  'DeepAuto.ai 프로젝트5',
  'DeepAuto.ai 프로젝트6',
];

export default function SideBar() {
  return (
    <aside className="flex flex-col h-screen w-64 bg-zinc-950 text-zinc-100 border-r border-zinc-800">
      {/* Top Section */}
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-semibold">DeepAuto.ai ChatBot</span>
        </div>
        {menu.map((item, idx) => (
          <Button
            key={idx}
            variant="ghost"
            className="justify-start w-full gap-3 text-zinc-200 hover:bg-zinc-800"
          >
            {item.label}
          </Button>
        ))}
      </div>
      <Separator className="bg-zinc-800" />
      {/* Projects Section */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-xs text-zinc-400 mb-2">채팅</div>
        <div className="flex flex-col gap-1">
          {projects.map((proj, idx) => (
            <Button
              key={idx}
              variant="ghost"
              className="justify-start w-full text-zinc-300 hover:bg-zinc-800 px-2 py-1 rounded"
            >
              {proj}
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
