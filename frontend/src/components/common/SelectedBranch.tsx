export default function SelectedBranch({ branch }: { branch: string | null }) {

  return (
    <div className="italic font-bold text-sm text-secondary">
      {!branch ? (
        "Tu usuario no tiene una sucursal seleccionada"
      ) : (
        <div className="text-sm text-white">{branch}</div>
      )}
    </div>
  );
}

