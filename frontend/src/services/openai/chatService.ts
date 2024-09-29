"use server";

interface IChatMessage {
  message: string;
}

export const postChatMessageService = async (
  params: IChatMessage,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chats`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    console.error("Error posting chat message:", error);
    throw error;
  }
};
