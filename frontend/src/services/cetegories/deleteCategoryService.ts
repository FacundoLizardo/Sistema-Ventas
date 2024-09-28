"use server";

export const deleteCategoryService = async ({
  token,
  companyId,
  id,
}: {
  token: string;
  companyId: string;
  id?: string;
}) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const queryParams = new URLSearchParams();

    if (companyId) {
      queryParams.append("companyId", companyId);
    }

    if (id) {
      queryParams.append("id", id);
    }

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/api/categories?${queryParams.toString()}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error en la respuesta del servidor: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error eliminando la categoría:", error);
    throw error;
  }
};
