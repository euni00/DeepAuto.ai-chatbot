import SideBar from '@/common/Layout/SideBar';
import Container from '@/common/Layout/Container';
import ChatContainer from './chat';

export default function Home() {
  return (
    <div className="flex h-screen bg-zinc-900">
      <SideBar />
      <main className="flex-1 flex flex-col">
        <Container>
          <ChatContainer />
        </Container>
      </main>
    </div>
  );
}
