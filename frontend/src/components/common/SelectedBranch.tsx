export default function SelectedBranch({ branch }: { branch: string | null }) {
  return (
    <div className="italic font-bold text-sm text-secondary">
      {!branch ? (
        <p>Tu usuario no tiene una sucursal seleccionada</p>
      ) : (
        <p>{branch}</p>
      )}
    </div>
  );
}
