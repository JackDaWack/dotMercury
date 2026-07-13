import {Panel, PanelGroup, PanelResizeHandle} from 'react-resizable-panels';
import TopBar from "./TopBar";
import StatusBar from "./StatusBar";

export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <TopBar />
      <PanelGroup direction="vertical">
        <Panel>
          {children}
        </Panel>
        <PanelResizeHandle />
        <Panel>
          <StatusBar />
        </Panel>
      </PanelGroup>
    </div>
  );
}