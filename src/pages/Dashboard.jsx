import { useState } from "react";
import { FiSend, FiSearch, FiMoreVertical } from "react-icons/fi";

export default function Dashboard() {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: "Alice", lastMessage: "Hey, how are you?" },
    { id: 2, name: "Bob", lastMessage: "Let’s meet tomorrow." },
    { id: 3, name: "Charlie", lastMessage: "Typing..." },
  ];

  const messages = [
    { from: "Alice", text: "Hello!" },
    { from: "You", text: "Hey Alice, what's up?" },
    { from: "Alice", text: "All good, you?" },
  ];

  return (
    <main>
      <nav  className="bg-gray-900 h-10">
        <h1>this is the navbar yeah</h1>
      </nav>

 <parents className="flex justify-between">
      <sidebar className="bg-gray-900 h-100" style={{width:"10%",height:"97vh"}}>
         <h1>THisi is the sidebar yeah</h1>
         </sidebar>
      <content className="bg-gray-800 w-100vh" style={{width:"90%"}}>
        <h1>THISA IS THE DASSHBOAERS PAGW</h1>
      </content>
      </parents>
    </main>
  );
}
