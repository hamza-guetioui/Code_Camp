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
    <main className="flex justify-center items-center p-16">
      <div
        ref={ref}
        className={`relative max-md:min-w-[80%] max-md:max-w-[80%] max-md:p-4 lg:w-1/3 p-8 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center gap-4 ${cn(
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
