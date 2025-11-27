export const parseGeminiError = (e: unknown): string => {
  let message = 'Ocorreu um erro desconhecido. Por favor, tente novamente.';
  if (e instanceof Error) {
    message = e.message;
  } else if (typeof e === 'string') {
    message = e;
  }

  // Attempt to find and parse a JSON object within the error message.
  // This is more robust than just slicing from the first '{' which can fail if there's trailing text.
  let specificMessage = '';
  const jsonStartIndex = message.indexOf('{');
  const jsonEndIndex = message.lastIndexOf('}');
  
  if (jsonStartIndex > -1 && jsonEndIndex > jsonStartIndex) {
    try {
      const jsonString = message.substring(jsonStartIndex, jsonEndIndex + 1);
      const errorObj = JSON.parse(jsonString);
      // Handle two common error structures from Google APIs
      if (errorObj?.error?.message) {
        specificMessage = errorObj.error.message;
      } else if (errorObj?.message) {
        specificMessage = errorObj.message;
      }
    } catch (jsonError) {
      // It looked like JSON but wasn't valid. We'll proceed with the raw message.
      console.warn("Could not parse potential JSON from error message:", message);
    }
  }

  const messageToCheck = (specificMessage || message).toLowerCase();

  // Check for various API key and permission-related errors and show a unified, helpful message.
  const isApiKeyOrPermissionError =
    messageToCheck.includes('permission_denied') ||
    messageToCheck.includes('403') ||
    messageToCheck.includes('api key not valid') ||
    messageToCheck.includes('the caller does not have permission');

  if (isApiKeyOrPermissionError) {
    return "Acesso Negado: Sua chave de API (API Key) é inválida ou não tem as permissões necessárias. Para que o aplicativo funcione, verifique se as seguintes APIs estão ativadas em seu projeto do Google Cloud: 'Generative Language API' (para funções de texto e análise) e 'Vertex AI API' (para geração e edição de imagens). Além disso, confirme se a chave está correta e não possui restrições (como de website ou IP) que impeçam seu uso.";
  }

  // Check for invalid argument errors, which might be due to bad images.
  if (messageToCheck.includes('invalid argument')) {
    const suggestion = "Isso geralmente é causado por uma imagem corrompida, um formato de arquivo não suportado ou um problema na imagem enviada. Por favor, tente usar uma imagem diferente e com boa qualidade.";
    
    // If a specific message was parsed from the API response, include it for more context.
    if (specificMessage) {
      return `Argumento Inválido: ${specificMessage} ${suggestion}`;
    }
    
    // Fallback to a more informative generic message if no specific message could be parsed.
    return `Argumento Inválido: ${suggestion}`;
  }

  // If a specific message was parsed, return it, otherwise return the original message.
  return specificMessage || message;
};
