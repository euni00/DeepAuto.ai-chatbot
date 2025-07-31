import Container from '@/common/Layout/Container';
import SideBar from '@/common/Layout/SideBar';
import ChatContainer from './chat';

export default function Home() {
  return (
    <div className="flex h-max-screen bg-zinc-900">
      <SideBar />
      <main className="flex-1 flex flex-col overflow-y-auto">
        <Container>
          <ChatContainer />
        </Container>
      </main>
    </div>
  );
}
