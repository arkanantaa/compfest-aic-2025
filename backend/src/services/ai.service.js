class AiService {
  async generateResponse(prompt) {
    // TODO: Integrate with a real LLM API
    return `This is a dummy response to your prompt: "${prompt}"`;
  }
}

module.exports = new AiService();
