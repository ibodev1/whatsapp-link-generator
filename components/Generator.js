import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function Generator() {
  const [countryCode, setCountryCode] = useState(null);
  const [number, setNumber] = useState(null);
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState(null);

  useEffect(() => {
    var url =
      countryCode &&
      number &&
      `https://wa.me/${countryCode
        .split(" ")
        .join("")
        .replace(/[^0-9 ]/g, "")
        .slice(0, 4)}${number
        .split(" ")
        .join("")
        .replace(/[^0-9 ]/g, "")
        .slice(0, 16)}${message && "?text=" + encodeURIComponent(message)}`;
    setUrl(url);
  }, [number, countryCode, message]);

  return (
    <div className="box lg:w-7/12 md:w-8/12 sm:w-9/12 w-11/12 bg-white text-gray-700 p-10 rounded-2xl shadow-lg">
      <Toaster />
      <h1 className="text-2xl font-medium mb-1">Whatsapp Link Generator</h1>
      {url ? (
        <div className="flex w-full h-12 bg-gray-600 text-gray-200 items-center justify-between rounded-lg overflow-hidden">
          <div className="flex items-center w-10/12 h-full">
            <span className="flex items-center px-2 h-full bg-gray-400">
              URL
            </span>
            <p className="truncate px-4">{url && url}</p>
          </div>
          <button
            onClick={() => {
              const copy = navigator.clipboard.writeText(url);
              toast.promise(copy, {
                loading: "Just a second..",
                success: "Copied To Clipboard!",
                error: "Error occurred while copying!",
              });
            }}
            className="w-2/12 h-full bg-gray-200 text-gray-800"
          >
            Copy to clipboard
          </button>
        </div>
      ) : null}
      <div className="flex">
        <div className="flex flex-col justify-center w-4/12 mr-2">
          <label htmlFor="country" className="text-gray-500 mx-1 my-1">
            Country code:
          </label>
          <input
            type="number"
            name="country"
            id="country"
            placeholder="90"
            maxLength="4"
            className="w-full p-2 border-2 border-indigo-500 outline-none rounded-lg"
            onChange={(e) => setCountryCode(e.target.value)}
            defaultValue={countryCode}
          />
        </div>
        <div className="flex flex-col justify-center w-8/12">
          <label htmlFor="number" className="text-gray-500 mx-1 my-1">
            Phone number:
          </label>
          <input
            type="number"
            name="number"
            id="number"
            placeholder="5507398372"
            maxLength="16"
            className="w-full p-2 border-2 border-indigo-500 outline-none rounded-lg"
            onChange={(e) => setNumber(e.target.value)}
            defaultValue={number}
          />
        </div>
      </div>
      <div className="flex flex-col my-1">
        <label htmlFor="message" className="text-gray-500 mx-1 my-1">
          Your message:
        </label>
        <textarea
          type="text"
          id="message"
          name="message"
          className="resize-none w-full h-24 p-2 border-2 border-indigo-500  rounded-lg outline-none"
          placeholder="Hi, I Love You. (Don't use emoji!)"
          maxLength="1024"
          onChange={(e) => setMessage(e.target.value)}
          defaultValue={message}
        />
      </div>
      <div className="my-2">
        <p>
          <b>Country Code : </b>
          <span>
            {countryCode &&
              countryCode
                .split(" ")
                .join("")
                .replace(/[^0-9 ]/g, "")
                .slice(0, 4)}
          </span>
        </p>
        <p>
          <b>Phone Number : </b>
          <span>
            {number &&
              number
                .split(" ")
                .join("")
                .replace(/[^0-9 ]/g, "")
                .slice(0, 16)}
          </span>
        </p>
        <p>
          <b>Message preview : </b>
          <br />
          {message ? (
            <pre className="border-2 border-indigo-500 rounded-lg p-2 my-2">
              {message && message.slice(0, 1024)}
            </pre>
          ) : null}
        </p>
      </div>
    </div>
  );
}

export default Generator;
