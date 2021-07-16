import React from "react";
import { Button } from "rebass";
import { useHistory } from "react-router-dom";

const LinkButton: React.FC<any> = ({ to, ...rest }) => {
  const history = useHistory();
  return (
    <Button
      {...rest}
      onClick={() => {
        history.push(to);
      }}
    />
  );
};

export default LinkButton;
