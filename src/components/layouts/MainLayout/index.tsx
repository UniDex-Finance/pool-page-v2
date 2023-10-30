import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default ({ children }: Props) => (
  <div className="flex flex-col">{children}</div>
);
