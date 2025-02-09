type TitleProps = {
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const cn = (className?: string) => className ?? "";

const Title: React.FC<TitleProps> = ({ className, children, ...rest }) => {
  return (
    <h1 className={`text-3xl font-bold mb-4 ${cn(className)}`} {...rest}>
      {children}
    </h1>
  );
};

export default Title;
