import React from "react";

function Container({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <section className={`mx-auto px-6 ${className ?? ""}`}>{children}</section>
  );
}

export default Container;
