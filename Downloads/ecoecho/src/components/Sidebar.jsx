import React from 'react';
import FeedbackCard from './FeedbackCard';
import AIChat from './AIChat';

function Sidebar() {
  return (
    <aside className="sidebar">
      <FeedbackCard />
      <AIChat />
    </aside>
  );
}

export default Sidebar;