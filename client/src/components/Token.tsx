import React, { useState } from "react";

const Token: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [tokenCount, setTokenCount] = useState<number>(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    const count = value.split(/\s+/).length;
    setTokenCount(count);
  };

  return (
    <div>
      <textarea value={text} onChange={handleTextChange}></textarea>
      <p>Estimated Token Count: {tokenCount}</p>
    </div>
  );
};

export default Token;
