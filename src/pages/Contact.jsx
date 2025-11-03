import { useEffect } from "react";
import { useState } from "react";
import DOMPurify from "dompurify";

const apiUrl = import.meta.env.VITE_API_URL;
const apiToken = import.meta.env.VITE_API_TOKEN;
const captchaKey = import.meta.env.VITE_CAPTCHA_KEY;

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    window.recaptchaCallback = (token) => {
      setCaptchaToken(token);
    };
  }, []);

  if (!hasMounted) {
    return null;
  }

  const handleSendEmail = async (evt) => {
    setData(null);
    setLoading(true);
    evt.preventDefault();

    if (!captchaToken) {
      setData({ error: "Please complete captcha" });
      setLoading(false);
      return;
    }

    const form = evt.currentTarget;
    const spam = form.elements.namedItem("_gotcha");
    const name = form.elements.namedItem("name");
    const email = form.elements.namedItem("email");
    const message = form.elements.namedItem("message");

    if (spam && spam.value) {
      setLoading(false);
      return;
    }

    if (!name && !email && !message) {
      setData({ error: "Please fill in all required fields." });
      setLoading(false);
      return;
    }

    let nameValue = DOMPurify.sanitize(name.value, {
      ALLOWED_ATTR: [],
      ALLOWED_TAGS: [],
    });
    let emailValue = DOMPurify.sanitize(email.value, {
      ALLOWED_ATTR: [],
      ALLOWED_TAGS: [],
    });
    let messageValue = DOMPurify.sanitize(message.value, {
      ALLOWED_ATTR: [],
      ALLOWED_TAGS: [],
    });

    nameValue = nameValue.trim();
    emailValue = emailValue.trim();
    messageValue = messageValue.trim();

    if (!nameValue || !emailValue || !messageValue) {
      setData({ error: "Please fill in all required fields." });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-form-token": apiToken,
          "captcha-token": captchaToken,
        },
        body: JSON.stringify({
          name: nameValue,
          email: emailValue,
          message: messageValue,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setData({
          error: json.error || "Something went wrong, please try again later.",
        });
      } else {
        setData({ data: json.data });
        setTimeout(() => setData(null), 5000);
      }
    } catch (error) {
      setData({
        error: "Something went wrong, please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:p-16 flex flex-col items-center gap-4 sm:gap-8 lg:gap-16 text-dark justify-center w-full">
      <h1 className="font-bold font-heading text-2xl sm:text-[28px]">
        Contact
      </h1>

      <form
        onSubmit={handleSendEmail}
        className="w-full flex flex-col gap-4 sm:gap-8"
      >
        <label htmlFor="name" className="flex flex-col">
          <span className="text-xl font-bold font-heading mb-2">Name:</span>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Isabella Nguyen"
            required
            className="p-3 bg-dark text-white"
          />
        </label>
        <label htmlFor="email" className="flex flex-col">
          <span className="text-xl font-bold font-heading mb-2">Email:</span>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="isabella@example.ocm"
            required
            className="p-3 bg-dark text-white"
          />
        </label>
        <label htmlFor="message" className="flex flex-col">
          <span className="text-xl font-bold font-heading mb-2">Message:</span>
          <textarea
            id="message"
            name="message"
            placeholder="Feel free to share thoughts, feedback, or inquiries here..."
            required
            rows={6}
            className="p-3 bg-dark text-white"
          />
        </label>

        <input type="hidden" name="_gotcha" className="hidden" />

        <div className="self-center text-center">
          <button
            type="submit"
            className="text-white bg-main py-3 px-12 w-fit cursor-pointer hover:opacity-80 mt-8 font-heading text-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Sending Email..." : "Submit"}
          </button>
          <div className="mt-4">
            <span className="text-red-500">{data?.error}</span>
            <span className="text-green-600">{data?.data}</span>
          </div>
        </div>

        <div
          className="g-recaptcha self-center"
          data-sitekey={captchaKey}
          data-callback="recaptchaCallback"
        ></div>
      </form>

      <script
        src="https://www.google.com/recaptcha/api.js"
        async
        defer
      ></script>
    </div>
  );
}
