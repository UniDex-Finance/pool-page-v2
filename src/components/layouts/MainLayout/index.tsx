import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default ({ children }: Props) => (
  <div className="flex flex-col">{children}</div>
);
