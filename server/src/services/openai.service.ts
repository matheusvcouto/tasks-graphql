import OpenAI from "openai";
import { Injectable } from "@nestjs/common";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";

@Injectable()
export class OpenaiService extends OpenAI {

  constructor() {
    super()
  }

  tools = {
    jsonResponse: async (
        prompt: string,
        model: ChatCompletionCreateParamsBase['model'] = 'gpt-4'
      ) => {
      const res = await this.chat.completions.create({
        messages: [{role: 'user', content: prompt}],
        model: model,
        response_format: { type: 'json_object' }
      })
      return res.choices[0].message.content
    }
  }
}
