type Props = {
  children?: React.ReactNode;
};

export default function EmptyState({ children = "No games selected" }: Props) {
  return (
    <div className="border border-dashed border-gray-400 p-3 text-center text-gray-400 uppercase text-xs rounded">
      {children}
    </div>
  );
}
