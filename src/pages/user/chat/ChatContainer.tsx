// import { useState } from "react";
// import ChatAI from "./ChatAI";
// import RoomChat from "./RoomChat";

// const ChatContainer = () => {
//     const [activeChat, setActiveChat] = useState<'ai' | 'staff'>('ai');

//     const switchToAI = () => setActiveChat('ai');
//     const switchToStaff = () => setActiveChat('staff');

//     return (
//         <>
//             {activeChat === 'ai' && <ChatAI onSwitch={switchToStaff} />}
//             {activeChat === 'staff' && <RoomChat onSwitch={switchToAI} />}
//         </>
//     );
// };

// export default ChatContainer;