export const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div className="bg-destructive flex items-center gap-2 my-4 text-xs font-mediumtext-secondary-forground p-3 rounded-md">
      <p>{message}</p>
    </div>
  );
};
