// const Addpic = ()=>{
//     return(
//         <h1>Hello world this is the pic tab</h1>
//     )
// }

// export default Addpic


import { useState } from "react";
import { FiUpload, FiSkipForward } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Addpic(props) {

    // GETTING TOKEN FROM LOCALSTORAGE
    const token = localStorage.getItem("token")
    console.log("TOKEN GETTING IS : ", token)
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!image) return;

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("image", image);

            const res = await axios.post("http://localhost:3000/upload", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            let profilePic = res.data.url;
            console.log("Profile pic URL:", profilePic);

            if (profilePic) {
                try {
                    let userId = props.user._id
                  const res2 = await axios.post("http://localhost:3000/set-profile-pic", { userId,profilePic  })
                    console.log(res2.data.user)
                    props.updateUser(res2.data.user)
                    navigate("/")
                    // let userupdated = res.user;
                    // console.log(userupdated)
                }
                catch (e) {
                    console.log("Error saving to db profile pic : ", e)
                }
            }


            //   // Later: Save to user DB
            //   onComplete(uploadedUrl);
            // } catch (err) {
            //   console.error("Upload failed:", err);
            // } finally {
            //   setLoading(false);
            // }
        }
        catch (e) {
            console.log("error uploading file", e)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4">Set up your Profile Picture</h1>
                <p className="text-gray-400 mb-6">
                    Upload a profile picture or skip for now
                </p>

                {/* Preview Circle */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-full border-4 border-gray-700"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center rounded-full bg-gray-700 text-gray-400">
                            <FiUpload className="text-4xl" />
                        </div>
                    )}
                    <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700">
                        <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                        <FiUpload className="text-white" />
                    </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={handleUpload}
                        disabled={!image || loading}
                        className="px-6 py-2 bg-blue-600 rounded-full hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Uploading..." : "Save Picture"}
                    </button>

                    <button
                        onClick={() => {
                            // onComplete(null)
                            navigate('/')
                        }
                        }
                        className="px-6 py-2 bg-gray-700 rounded-full hover:bg-gray-600 flex items-center gap-2 cursor-pointer"
                    >
                        <FiSkipForward /> Skip
                    </button>
                </div>
            </div>
        </div>
    );
}
