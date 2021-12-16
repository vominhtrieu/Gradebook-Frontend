import React from "react";

export default function GradeBoardRow({
  children,
}: React.PropsWithChildren<{}>) {
  return <tr className="grade-board_row">{children}</tr>;
}
