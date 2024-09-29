import { Request, Response } from "express";
import { controllerError } from "../utils/controllerError";
import OpenAI from "openai";
import { OPENAI_API_KEY } from "../config";

// Configurar OpenAI directamente con la API Key
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

interface ChatRequestBody {
  message: string;
}

const appContext = {
  role: 'system' as const, // Asegúrate de que el rol esté tipado correctamente
  content: `
    Eres un asistente que conoce todas las funcionalidades de una aplicación para el manejo integral de negocios.
    Esta aplicación maneja venta, facturación en AFIP,  stock, manejo de sucursales, proveedores, empleados, y estadísticas.
    Ademas de que es multilenguaje manejando ahora español, português e ingles.
    Puedes responder preguntas relacionadas con cómo usar la aplicación y sus capacidades.
  `,
};

class ChatController {
  async postMessage(
    req: Request<{}, {}, ChatRequestBody>,
    res: Response
  ): Promise<void> {
    try {
      const { message } = req.body;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          appContext, 
          { role: 'user', content: message },  
        ],
      });

      const assistantMessage = response.choices[0].message?.content;

      res.json({ response: assistantMessage });
    } catch (error) {
      controllerError(res, error, 500);
    }
  }
}

export default new ChatController();
