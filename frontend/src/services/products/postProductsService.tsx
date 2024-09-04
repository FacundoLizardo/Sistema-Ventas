interface IproductCreationServiceParams {
    name: string;
    category: string;
    cost: number;
    finalPrice: number;
    discount: number;
    profitPercentage: number;
    stock: number;
    allowNegativeStock: boolean;
    trackStock: boolean;
    enabled: boolean;
    notesDescription: string;
    taxes: number;
    barcode: string;
  }
  
  export const postProductService = async (
    params: IproductCreationServiceParams,
    token?: string,
  ) => {
    try {
      if (!token) {
        throw new Error("No token provided");
      }
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(params),
        }
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const body = await response.json();
      return body;
    } catch (error) {
      console.error("Error posting product:", error);
      throw error;
    }
  };
  