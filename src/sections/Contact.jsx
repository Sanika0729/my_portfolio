import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";

// ✅ CHANGE 1: Initialize EmailJS with Public Key from .env
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  // ✅ CHANGE 2: Updated handleSubmit to use environment variables
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Form submitted:", formData);

      // ✅ CHANGE 3: All credentials now from .env file
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,      // From .env
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,     // From .env
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Sanika Zagade",
          to_email: "zagade.sanika07@gmail.com",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY       // From .env
      );

      // ✅ CHANGE 4: Check if email was sent successfully
      if (response.status === 200) {
        setIsLoading(false);
        setFormData({ name: "", email: "", message: "" });
        showAlertMessage("success", "Your message has been sent successfully!");
        console.log("Email sent successfully!");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Email sending failed:", error);
      
      if (error.text) {
        showAlertMessage("danger", `Error: ${error.text}`);
      } else {
        showAlertMessage("danger", "Something went wrong! Please try again.");
      }
    }
  };

  return (
    <section className="relative flex items-center c-space section-spacing">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      
      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">Let's Talk</h2>
          <p className="font-normal text-neutral-400">
            Whether you're looking to create a new website, enhance your current platform, or bring a unique design and development project to life, I'm here to help deliver the best solution.
          </p>
        </div>

        <form className="w-full" ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="feild-label">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder="John Doe"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="feild-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="JohnDoe@email.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="feild-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              type="text"
              rows="4"
              className="field-input field-input-focus"
              placeholder="Share your thoughts..."
              autoComplete="off"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer transition-all ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed opacity-50"
                : "bg-radial from-lavender to-royal hover-animation hover:opacity-90"
            }`}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
