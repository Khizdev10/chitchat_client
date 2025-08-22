import Navbar from "../components/Navbar"

// media import
import mobile from '../media/mobile.png'
import mobile2 from '../media/mobile2.png'
import cat from '../media/safe.jpg'
import people from '../media/people.jpg'
// icons import 
import { FaRocket } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";

const Main = () => {
    return (
        <>
            <div className="bg-blue-900" style={{ height: "90vh", transform: "translateY(-20px)", clipPath: "polygon(0 0, 100% 0, 100% 95%, 0 100%)" }}>
                <Navbar />
                <div className="px-4" style={{
                    height: "90vh", display: "flex", flexWrap:"wrap", marginTop: "20px", justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <div className="main" style={{ paddingLeft: "15%", width: "46%", }}>
                        <h1 className=" text-3xl font-bold">Chit Chat | Chatting App</h1>
                        <p className=" semibold tracking-wider ">Welcome to my little corner of Chit Chat! I'm just here to vibe, connect, and have some light-hearted conversations.
                            Whether it's a quick hello, a random thought, or a fun story, feel free to drop a message. No pressure, just good vibes and friendly chats. 😊✨</p>
                        <div className="my-2">
                            <button className="btn bg-white text-black
                btn-sm py"><FaRocket size={18} /> Get Started </button>
                            <button className="btn bg-black-900
                         btn-sm py mx-2 px-6"><FaSignInAlt size={18} /> Login </button>
                        </div>
                    </div>

                    <div className="main" style={{
                        width: "33%",

                    }}>
                        <img src={mobile} style={{
                            position: "absolute",
                            top: "20%",
                            left: "60%",
                            maxWidth: "300px",
                            width: "100%",
                            height: "auto",
                            transform: "translateX(-50%) rotate(16deg)",
                            zIndex: 1
                        }} alt="" />
                        <img src={mobile2} style={{
                            position: "absolute",
                            top: "25%",
                            left: "60%",
                            maxWidth: "300px",
                            width: "100%",
                            height: "auto",
                            transform: "translateX(30%) rotate(16deg)",
                            zIndex: 2
                        }} alt="" />


                    </div>
                </div>
            </div>
            <div className="info flex flex-reverse justify-evenly items-center flex-row-reverse " style={{ minHeight: "80vh" }}>
                <div className="w-100" style={{ width: "50%" }}><h1 className="text-4xl font-bold">About </h1>
                    <p className="tracking-wide text-xl " style={{ width: "90%" }}>Chit Chat is your go-to space for meaningful, lighthearted conversations. With a clean, user-friendly interface and features like instant messaging, voice notes, and media sharing, it’s designed to keep the vibe casual and positive. Step into a world where every chat is a chance to connect, laugh, and make memories—because great conversations start with Chit Chat!</p>
                    <div className="my-2">
                        <button className="btn bg-white text-black
                btn-lg py"> <FaRocket size={18} /> Get Started 
                        </button>
                        <button className="btn bg-blue-900
                 btn-lg py mx-2 px-6"><FaSignInAlt size={18} /> Login </button>
                    </div>

                </div>
                <div><img src={mobile2} style={{ maxWidth: "300px", width: "100%", height: "auto", transform: "rotate(20deg)" }} alt="" /></div>
            </div>

            <div className="why bg-blue-900" style={{ minHeight: "80vh", transform: "translateY(-20px)", transform: "skewY(-5deg)" }}>
              
            <div style={{ transform: "skewY(5deg)" }} >
  <h1 className="text-4xl font-bold text-center my-20 py-20">
    Why Use Chit Chat?
  </h1>

  {/* Row 1 - Image Left, Text Right */}
  <div className="flex flex-col md:flex-row items-center justify-evenly gap-10 my-10 px-8">
    <img
      src={cat}
      style={{ maxWidth: "300px", width: "100%", height: "auto", }}
      alt="Secure Chat"
      className="rounded-xl shadow-lg"
    />
    <div className="max-w-lg">
      <h2 className="text-3xl font-semibold mb-4">Share Without Insecurity</h2>
      <p className="text-gray-200 text-xl">
         End-to-end encryption for secure data transmission. It has all the privacy you need. Nobody can see your messages, listen to your calls, or access your data. 
      </p>
    </div>
  </div>

  {/* Row 2 - Text Left, Image Right */}
  <div className="flex flex-col md:flex-row-reverse items-center justify-evenly gap-10 my-10 px-8">
    <img
      src={people}
style={{ maxWidth: "300px", width: "100%", height: "auto", }}
      alt="Fast Communication"
      className="rounded-xl shadow-lg"
    />
    <div className="max-w-lg">
      <h2 className="text-3xl font-semibold mb-4">Fast and Reliable</h2>
      <p className="text-gray-200   text-xl">
        Chit Chat delivers your messages instantly and without any compromise
        on security. Stay connected with your friends and family anytime,
        anywhere. 
      </p>
    </div>
  </div>
</div>

              
              
                {/* <div style={{ transform: "skewY(5deg)" }}>
                    <h1 className="text-3xl font-bold text-center my-20 py-20">Why Use Chit Chat?</h1>
                    <div className="flex justify-evenly items-center">
                        <div>
                            <h1>Share Without Insecurity</h1>
                            <p>State-of-the-art end-to-end encryption (powered by the open source Signal Protocol) keeps your conversations secure. We can't read your messages or listen to your calls, and no one else can either. Privacy isn’t an optional mode — it’s just the way that Signal works. Every message, every call, every time.</p>
                        </div>
                        <h2>Bye</h2>
                    </div>
                    <div></div>
                </div> */}
            </div>
            
            <div style={{ bottom: "0", width: "100%", marginTop:"100px" }}><h1 className="text-center font-bold">Copyright © 2025 Chit Chat. All rights reserved.</h1></div>
        </>
    )
}

export default Main

