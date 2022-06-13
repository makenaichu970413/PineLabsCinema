// ####################################
// React && Plugins
// ####################################
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { delay } from "../../utils/helper";
// ####################################

// ####################################
// REDUX
// ####################################
import { useStateValue } from "../../redux/StateProvider";
// ####################################

const statuses = (code) => {
  switch (code) {
    case 201:
      return { theme: "green", text: "success" };

    case 0:
      return {
        theme: "yellow",
        text: "loading...",
      };

    default:
      return { theme: "red", text: "failed" };
  }
};

function Message() {
  const [{ message }, dispatch] = useStateValue();
  const [text, setText] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (message) {
      const msgBox = document.querySelector(".message-box");
      msgBox.classList.add("active");

      let code = message["status"];
      setStatus(statuses(code));
      setText(message["message"]);

      if (code != 0) {
        const timer = setTimeout(() => {
          msgBox.classList.remove("active");
          delay(1000).then(() => {
            setText(null);
            setStatus(null);
            dispatch({ type: "SET_MESSAGE", message: null });
          });
        }, 3000);

        return () => clearTimeout(timer);
      }
    }
  }, [message]);

  return (
    <div className="message-box">
      <div className={`message ${status && status["theme"]}`}>
        {status && <h1>{status["text"]}</h1>}
        <h2>{text}</h2>
      </div>
    </div>
  );
}

export default Message;
