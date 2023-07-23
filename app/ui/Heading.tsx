type Props = {
  children: React.ReactNode;
};

export default function Heading({ children }: Props) {
  return <h3 className="text-lg mb-4">{children}</h3>;
}
