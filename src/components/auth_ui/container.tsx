import React, { forwardRef } from "react";

type ContainerProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const cn = (className?: string) => className ?? "";

const Container = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ContainerProps
>(({ className, children, ...rest }, ref) => {
  return (
    <main className="flex justify-center items-center h-screen">
      <div
        ref={ref}
        className={`w-1/3 p-8 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center gap-4 ${cn(
          className
        )}`}
        {...rest}
      >
        {children}
      </div>
    </main>
  );
});

Container.displayName = "Container";

export default Container;
