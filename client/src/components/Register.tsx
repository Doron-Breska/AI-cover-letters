import React, { useRef } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

// Import useState for future use
// import { useState } from "react";

type Avatar = string | File;

interface NewUser {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  tech_info: string;
  personal_text: string;
  img: Avatar; // Updated type for image upload
  personal_info: PersonalInfo;
}

interface PersonalInfo {
  Leadership: string;
  Adaptability_Flexibility: string;
  Proactivity_Initiative: string;
  Attention_to_Detail: string;
  Spontaneity: string;
  Teamwork_Collaboration: string;
  Resilience: string;
  Innovativeness_Creativity: string;
  Emotional_Intelligence: string;
  tech_info: string; // Added tech_info field here
}

const Register: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const personalTextRef = useRef<HTMLTextAreaElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const leadershipRef = useRef<HTMLInputElement>(null);
  const adaptabilityRef = useRef<HTMLInputElement>(null);
  const proactivityRef = useRef<HTMLInputElement>(null);
  const attentionToDetailRef = useRef<HTMLInputElement>(null);
  const spontaneityRef = useRef<HTMLInputElement>(null);
  const teamworkRef = useRef<HTMLInputElement>(null);
  const resilienceRef = useRef<HTMLInputElement>(null);
  const innovativenessRef = useRef<HTMLInputElement>(null);
  const emotionalIntelligenceRef = useRef<HTMLInputElement>(null);

  // Add refs for skills, education, and work experience
  const skillsRef = useRef<HTMLInputElement>(null);
  const educationRef = useRef<HTMLInputElement>(null);
  const workExperienceRef = useRef<HTMLInputElement>(null);

  // Add a ref for techInfoRef

  // const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

     if (
       !usernameRef.current?.value ||
       !emailRef.current?.value ||
       !passwordRef.current?.value ||
       !firstNameRef.current?.value ||
       !lastNameRef.current?.value ||
       !skillsRef.current?.value ||
       !educationRef.current?.value ||
       !workExperienceRef.current?.value ||
       !personalTextRef.current?.value ||
       !imgRef.current?.files ||
       !leadershipRef.current?.value ||
       !adaptabilityRef.current?.value ||
       !proactivityRef.current?.value ||
       !attentionToDetailRef.current?.value ||
       !spontaneityRef.current?.value ||
       !teamworkRef.current?.value ||
       !resilienceRef.current?.value ||
       !innovativenessRef.current?.value ||
       !emotionalIntelligenceRef.current?.value
     ) {
       console.error("Please fill out all required fields");
       return;
     }

    const skillsValue = skillsRef.current?.value || "";
    const educationValue = educationRef.current?.value || "";
    const workExperienceValue = workExperienceRef.current?.value || "";

    // Concatenate the values into a single string
    const techInfoValue = `Skills:${skillsValue}. Education :${educationValue}.Previous work experience: ${workExperienceValue}`;

    const personalInfo: PersonalInfo = {
      Leadership: leadershipRef.current?.value || "0", // Default value of "0" if no value is set
      Adaptability_Flexibility: adaptabilityRef.current?.value || "0",
      Proactivity_Initiative: proactivityRef.current?.value || "0",
      Attention_to_Detail: attentionToDetailRef.current?.value || "0",
      Spontaneity: spontaneityRef.current?.value || "0",
      Teamwork_Collaboration: teamworkRef.current?.value || "0",
      Resilience: resilienceRef.current?.value || "0",
      Innovativeness_Creativity: innovativenessRef.current?.value || "0",
      Emotional_Intelligence: emotionalIntelligenceRef.current?.value || "0",
      tech_info: techInfoValue,
    };

    const newUser: NewUser = {
      username: usernameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      first_name: firstNameRef.current?.value || "",
      last_name: lastNameRef.current?.value || "",
      tech_info: techInfoValue, // Assign the concatenated value here as well
      personal_text: personalTextRef.current?.value || "",
      img: imgRef.current?.files
        ? imgRef.current.files[0]
        : "https://res.cloudinary.com/danq3q4qv/image/upload/v1683035195/avatars/default-profile-picture-avatar-photo-placeholder-vector-illustration-700-205664584_z4jvlo.jpg", // Updated for file upload
      personal_info: personalInfo,
    };

    try {
      const formData = new FormData();
      formData.append("username", newUser.username);
      formData.append("email", newUser.email);
      formData.append("password", newUser.password);
      formData.append("first_name", newUser.first_name);
      formData.append("last_name", newUser.last_name);
      formData.append("tech_info", newUser.tech_info);
      formData.append("personal_info", JSON.stringify(newUser.personal_info));
      formData.append("personal_text", newUser.personal_text);
      if (newUser.img) {
        formData.append("img", newUser.img);
      }
      // Append other fields as needed

      // Replace the API endpoint with your actual endpoint
      const response = await axios.post(
        "http://localhost:5001/api/users/new",
        formData
      );

      if (response.status === 200) {
        const data = response.data;
        if (data.status === "success") {
          // Optionally, you can dispatch login action and set user state as well, similar to the login process.
          // dispatch(login(data.user));
          console.log("we created a user:", data);

          // Redirect to a success page or login page
          // history.push("/login");

          // resetInputs();
        } else {
          // setErrorMessage("Registration failed: " + data.message);
        }
      }
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  return (
    <div className="flex flex-row gap-8">
      <div className="h-screen w-full max-w-xl md:h-auto  md:min-w-auto bg-gradient-to-br      from-indigo-500/20   dark:from-black/50 via-gray-100/90   dark:via-slate-800/80 to-gray-300/80   dark:to-black/50 flex rounded-2xl  md:p-5 shadow-lg items-stretch">
        <form
          onSubmit={handleSubmit}
          className="bg-azure-radiance flex flex-col rounded px-8 pt-6 pb-8 w-full max-w-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <input
              ref={usernameRef}
              type="text"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              ref={emailRef}
              type="email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name:
            </label>
            <input
              ref={firstNameRef}
              type="text"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name:
            </label>
            <input
              ref={lastNameRef}
              type="text"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              ref={passwordRef}
              type="password"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* Add three input fields for skills, education, and work experience */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Skills:
            </label>
            <input
              ref={skillsRef}
              type="text"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Education:
            </label>
            <input
              ref={educationRef}
              type="text"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Work Experience:
            </label>
            <input
              ref={workExperienceRef}
              type="text"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Personal Text:
            </label>
            <textarea
              ref={personalTextRef}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image URL:
            </label>
            <input
              ref={imgRef}
              type="file"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
      
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Create user
            </button>
          </div>
        </form>
      </div>
      <div className=" ">
        <div className="h-screen w-full max-w-xl md:h-auto  md:min-w-auto bg-gradient-to-br      from-indigo-500/20   dark:from-black/50 via-gray-100/90   dark:via-slate-800/80 to-gray-300/80   dark:to-black/50 flex rounded-2xl  md:p-5 shadow-lg items-stretch">
          <form className="bg-azure-radiance flex flex-col rounded px-8 pt-6 pb-8 w-full max-w-md">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Leadership:
              </label>
              <input ref={leadershipRef} type="range" required className="" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Adaptability & Flexibility:
              </label>
              <input ref={adaptabilityRef} type="range" required className="" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Proactivity_Initiative
              </label>
              <input ref={proactivityRef} type="range" required className="" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Attention_to_Detail
              </label>
              <input
                ref={attentionToDetailRef}
                type="range"
                required
                className=""
              />
            </div>{" "}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Spontaneity
              </label>
              <input ref={spontaneityRef} type="range" required className="" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                teamWork
              </label>
              <input ref={teamworkRef} type="range" required className="" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Resilience
              </label>
              <input ref={resilienceRef} type="range" required className="" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Creativity
              </label>
              <input
                ref={innovativenessRef}
                type="range"
                required
                className=""
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Emotional Intelligence
              </label>
              <input
                ref={emotionalIntelligenceRef}
                type="range"
                required
                className=" "
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
