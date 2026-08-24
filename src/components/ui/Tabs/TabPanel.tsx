interface TabPanelProps {
  tabId: string;
  activeTab: string;
  children: React.ReactNode;
}

export default function TabPanel({ tabId, activeTab, children }: TabPanelProps) {
  if (tabId !== activeTab) return null;
  return <div>{children}</div>;
}
